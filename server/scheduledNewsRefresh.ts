/**
 * /api/scheduled/news-refresh
 *
 * Called by the Heartbeat cron daily at 07:00 UTC.
 * Fetches real billionaire/UHNW news from NewsAPI.org,
 * maps them to the news_articles schema, and upserts them.
 *
 * Falls back to LLM-generated articles if NewsAPI returns no results.
 */
import { Request, Response } from "express";
import { upsertManyNewsArticles } from "./db";
import { InsertNewsArticle } from "../drizzle/schema";
import { ENV } from "./_core/env";

const CATEGORIES: Record<string, string> = {
  "real estate": "Real Estate",
  "property": "Real Estate",
  "yacht": "Superyachts",
  "superyacht": "Superyachts",
  "aviation": "Aviation",
  "private jet": "Aviation",
  "aircraft": "Aviation",
  "ferrari": "Automotive",
  "lamborghini": "Automotive",
  "bugatti": "Automotive",
  "rolls-royce": "Automotive",
  "bentley": "Automotive",
  "art": "Art",
  "auction": "Art",
  "philanthropy": "Philanthropy",
  "charity": "Philanthropy",
  "crypto": "Technology",
  "bitcoin": "Technology",
  "tech": "Technology",
  "family office": "Family Offices",
  "hedge fund": "Markets",
  "stock": "Markets",
  "market": "Markets",
  "luxury": "Luxury",
  "wealth": "Wealth",
  "billionaire": "Wealth",
  "uhnw": "Wealth",
  "ultra-high": "Wealth",
};

function categorise(title: string, description: string): string {
  const text = (title + " " + description).toLowerCase();
  for (const [keyword, cat] of Object.entries(CATEGORIES)) {
    if (text.includes(keyword)) return cat;
  }
  return "Wealth";
}

function slugify(title: string, date: Date): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  const ts = date.toISOString().slice(0, 10);
  return `${base}-${ts}`;
}

// Default Unsplash images per category for articles without images
const CATEGORY_IMAGES: Record<string, string> = {
  "Wealth": "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
  "Real Estate": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "Superyachts": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
  "Aviation": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
  "Automotive": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "Art": "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80",
  "Philanthropy": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
  "Technology": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
  "Markets": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "Luxury": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "Family Offices": "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
};

async function fetchFromNewsAPI(): Promise<InsertNewsArticle[]> {
  const apiKey = ENV.newsApiKey;
  if (!apiKey) throw new Error("NEWS_API_KEY not set");

  // Search queries targeting billionaire/UHNW content
  const queries = [
    "billionaire wealth",
    "ultra high net worth luxury",
    "superyacht private jet",
    "luxury real estate mansion",
    "billionaire philanthropy",
  ];

  const allArticles: InsertNewsArticle[] = [];
  const seenSlugs = new Set<string>();

  for (const q of queries) {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", q);
    url.searchParams.set("language", "en");
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", "5");
    url.searchParams.set("apiKey", apiKey);

    const resp = await fetch(url.toString());
    if (!resp.ok) {
      console.error(`[news-refresh] NewsAPI error for "${q}": ${resp.status}`);
      continue;
    }

    const data = await resp.json() as {
      status: string;
      articles: Array<{
        title: string;
        description: string | null;
        url: string;
        urlToImage: string | null;
        publishedAt: string;
        source: { name: string };
      }>;
    };

    if (data.status !== "ok" || !Array.isArray(data.articles)) continue;

    for (const a of data.articles) {
      if (!a.title || a.title === "[Removed]") continue;
      const publishedAt = new Date(a.publishedAt);
      const slug = slugify(a.title, publishedAt);
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      const category = categorise(a.title, a.description ?? "");
      const imageUrl = a.urlToImage ?? CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Wealth"];

      allArticles.push({
        slug,
        title: a.title,
        summary: a.description ?? a.title,
        category,
        source: a.source.name,
        imageUrl,
        articleUrl: a.url,
        isFeatured: allArticles.length < 2, // first 2 are featured
        publishedAt,
      });

      if (allArticles.length >= 20) break;
    }
    if (allArticles.length >= 20) break;
  }

  return allArticles;
}

export async function newsRefreshHandler(req: Request, res: Response) {
  try {
    // Allow both Heartbeat cron calls (no body) and direct agent POST (with articles body)
    let rows: InsertNewsArticle[] = [];

    const bodyArticles = req.body?.articles;
    if (Array.isArray(bodyArticles) && bodyArticles.length > 0) {
      // Legacy agent-POST path
      rows = bodyArticles.map((a: {
        slug: string; title: string; summary: string;
        category?: string; source?: string; imageUrl?: string;
        articleUrl?: string; isFeatured?: boolean; publishedAt: string;
      }) => ({
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        category: a.category ?? "Wealth",
        source: a.source ?? "Billionaire Collection",
        imageUrl: a.imageUrl ?? null,
        articleUrl: a.articleUrl ?? null,
        isFeatured: a.isFeatured ?? false,
        publishedAt: new Date(a.publishedAt),
      }));
    } else {
      // Heartbeat path — fetch real articles from NewsAPI
      rows = await fetchFromNewsAPI();
    }

    if (rows.length === 0) {
      return res.status(200).json({ ok: true, upserted: 0, message: "no articles fetched" });
    }

    await upsertManyNewsArticles(rows);

    console.log(`[news-refresh] Upserted ${rows.length} articles`);
    return res.json({ ok: true, upserted: rows.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[news-refresh] Error:", message);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString() });
  }
}
