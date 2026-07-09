/**
 * /api/scheduled/news-refresh
 *
 * Called by the AGENT cron daily at 07:00 UTC.
 * The agent POSTs an array of news articles as JSON.
 * This handler validates the cron identity and upserts the articles.
 */
import { Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { upsertManyNewsArticles } from "./db";
import { InsertNewsArticle } from "../drizzle/schema";

export async function newsRefreshHandler(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron) {
      return res.status(403).json({ error: "cron-only endpoint" });
    }

    const articles: Array<{
      slug: string;
      title: string;
      summary: string;
      category?: string;
      source?: string;
      imageUrl?: string;
      articleUrl?: string;
      isFeatured?: boolean;
      publishedAt: string; // ISO string from agent
    }> = req.body?.articles;

    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ error: "articles array required" });
    }

    const rows: InsertNewsArticle[] = articles.map((a) => ({
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

    await upsertManyNewsArticles(rows);

    return res.json({ ok: true, upserted: rows.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[news-refresh] Error:", message);
    return res.status(500).json({
      error: message,
      stack,
      context: { url: req.url, taskUid: (req as Request & { taskUid?: string }).taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}
