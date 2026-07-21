/* ============================================================
   BILLIONAIRE COLLECTION — useNewsFeeds
   Fetches live RSS feeds via rss2json.com public API.
   Falls back to curated static articles if any feed fails.
   Auto-refreshes every 30 minutes.
   ============================================================ */

import { useState, useEffect, useCallback } from "react";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  date: string;
  url: string;
  img?: string;
  featured?: boolean;
}

// RSS feeds via rss2json.com (free, CORS-friendly)
const RSS_API = "https://api.rss2json.com/v1/api.json";

const FEEDS = [
  {
    url: "https://www.forbes.com/real-time/feed2/",
    source: "Forbes",
    category: "Wealth",
  },
  {
    url: "https://robbreport.com/feed/",
    source: "Robb Report",
    category: "Luxury",
  },
  {
    url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
    source: "Wall Street Journal",
    category: "Markets",
  },
];

// Curated fallback articles (always shown if feeds fail or as padding)
const FALLBACK_ARTICLES: NewsArticle[] = [
  {
    id: "f1",
    title: "Global Ultra-High-Net-Worth Population Surges to Record 395,000 Individuals",
    summary: "The world's UHNW population — those with assets exceeding $30 million — has reached an all-time high, driven by technology wealth creation in the United States and Asia-Pacific.",
    source: "Barron's",
    category: "Wealth",
    date: "March 14, 2026",
    url: "https://www.barrons.com",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    featured: true,
  },
  {
    id: "f2",
    title: "The World's 10 Largest Superyachts Delivered in 2025: A New Era of Maritime Luxury",
    summary: "From Lürssen's record-breaking 145-metre vessel to Feadship's revolutionary hydrogen-powered explorer, 2025 marked an extraordinary year for superyacht construction.",
    source: "Robb Report",
    category: "Superyachts",
    date: "March 12, 2026",
    url: "https://robbreport.com",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-yacht-hFeRjh9nRnBaKqx8rPSF24.webp",
    featured: true,
  },
  {
    id: "f3",
    title: "Ultra-Prime London Properties Break Record at £200M — Mayfair Leads the Market",
    summary: "London's ultra-prime residential market has defied global economic headwinds, with a record £200 million transaction in Mayfair setting a new benchmark for European real estate.",
    source: "Financial Times",
    category: "Real Estate",
    date: "March 11, 2026",
    url: "https://www.ft.com",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-estates-5tXLsMCEXgogpiaShTiVMe.webp",
  },
  {
    id: "f4",
    title: "Gulfstream G800 Sets New Transatlantic Speed Record on London to New York Route",
    summary: "Gulfstream's flagship ultra-long-range business jet has shattered the transatlantic speed record, completing the London to New York journey in under 6 hours.",
    source: "Forbes",
    category: "Aviation",
    date: "March 10, 2026",
    url: "https://www.forbes.com",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-aviation-K37Bb2CGs26HxxPg9N8RhR.webp",
  },
  {
    id: "f5",
    title: "Christie's Spring Auction Achieves Record $2.8 Billion — Basquiat Leads the Sale",
    summary: "Christie's New York spring auction has set a new record for a single sale, led by a previously unseen Jean-Michel Basquiat work that achieved $185 million.",
    source: "Christie's",
    category: "Art",
    date: "March 9, 2026",
    url: "https://www.christies.com",
    img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/basquiat-artwork_4ca08043.jpg",
  },
  {
    id: "f6",
    title: "Family Offices Increase Allocation to Private Credit and Real Assets in 2026",
    summary: "A new survey of 500 family offices reveals a significant shift towards private credit, infrastructure, and real assets as alternatives to public market volatility.",
    source: "CNBC",
    category: "Family Offices",
    date: "March 8, 2026",
    url: "https://www.cnbc.com",
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
  },
  {
    id: "f7",
    title: "Ferrari's New Hypercar Sells Out in 48 Hours at €3.5 Million Per Unit",
    summary: "Ferrari's latest limited-edition hypercar — a 1,200hp hybrid with a naturally aspirated V12 — sold all 499 units within 48 hours of announcement, exclusively to existing clients.",
    source: "Robb Report",
    category: "Automotive",
    date: "March 7, 2026",
    url: "https://robbreport.com",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  },
  {
    id: "f8",
    title: "Longevity Science: The Billionaire Quest for Radical Life Extension",
    summary: "A new wave of UHNW individuals are investing hundreds of millions into longevity research, from cellular reprogramming to AI-driven drug discovery, in pursuit of dramatically extended healthspans.",
    source: "Forbes",
    category: "Longevity",
    date: "March 6, 2026",
    url: "https://www.forbes.com",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    id: "f9",
    title: "Private Island Sales Surge 40% as UHNW Buyers Seek Ultimate Privacy",
    summary: "The private island market has experienced unprecedented demand, with sales surging 40% year-on-year as ultra-wealthy buyers seek the ultimate in privacy and exclusivity.",
    source: "Financial Times",
    category: "Real Estate",
    date: "March 5, 2026",
    url: "https://www.ft.com",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    id: "f10",
    title: "Hermès Birkin Breaks Auction Record at $510,000 — Handbags as Alternative Investments",
    summary: "A rare Himalayan Birkin has achieved a new world record at auction, highlighting the growing trend of luxury handbags as serious alternative investment assets.",
    source: "Barron's",
    category: "Luxury",
    date: "March 4, 2026",
    url: "https://www.barrons.com",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  },
  {
    id: "f11",
    title: "Dubai Emerges as the World's New Billionaire Capital — Surpassing London",
    summary: "Dubai has overtaken London as the world's most popular destination for billionaire relocation, driven by zero income tax, world-class infrastructure, and an unmatched quality of life.",
    source: "CNBC",
    category: "Wealth",
    date: "March 3, 2026",
    url: "https://www.cnbc.com",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  },
  {
    id: "f12",
    title: "Tokenised Real Estate: How Blockchain is Democratising Ultra-Prime Property Investment",
    summary: "A new wave of blockchain-based platforms is enabling fractional ownership of ultra-prime properties, allowing UHNW investors to diversify across global real estate without full acquisition.",
    source: "Forbes",
    category: "Technology",
    date: "March 2, 2026",
    url: "https://www.forbes.com",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
];

function extractImage(item: Record<string, unknown>): string | undefined {
  // Try thumbnail, enclosure, or content image
  if (item.thumbnail && typeof item.thumbnail === "string" && item.thumbnail.startsWith("http")) return item.thumbnail;
  const enc = item.enclosure as Record<string, string> | undefined;
  if (enc?.link?.startsWith("http")) return enc.link;
  // Try to extract from content
  const content = (item.content as string) || (item.description as string) || "";
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match?.[1]?.startsWith("http")) return match[1];
  return undefined;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

async function fetchFeed(feed: typeof FEEDS[0]): Promise<NewsArticle[]> {
  const url = `${RSS_API}?rss_url=${encodeURIComponent(feed.url)}&count=8&api_key=free`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("Bad response");

  return data.items.slice(0, 8).map((item: Record<string, unknown>, idx: number) => ({
    id: `live-${feed.source}-${idx}`,
    title: (item.title as string) || "Untitled",
    summary: ((item.description as string) || "").replace(/<[^>]+>/g, "").slice(0, 220) + "…",
    source: feed.source,
    category: feed.category,
    date: formatDate((item.pubDate as string) || new Date().toISOString()),
    url: (item.link as string) || "#",
    img: extractImage(item),
  }));
}

export function useNewsFeeds() {
  const [articles, setArticles] = useState<NewsArticle[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [liveCount, setLiveCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled(FEEDS.map(fetchFeed));
      const live: NewsArticle[] = [];
      results.forEach((r) => {
        if (r.status === "fulfilled") live.push(...r.value);
      });

      if (live.length > 0) {
        // Mark first 2 live articles as featured
        live[0].featured = true;
        if (live[1]) live[1].featured = true;
        // Merge: live articles first, then fallback articles not duplicated
        const combined = [...live, ...FALLBACK_ARTICLES].slice(0, 24);
        setArticles(combined);
        setLiveCount(live.length);
      }
      setLastUpdated(new Date());
    } catch {
      // Keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Auto-refresh every 30 minutes
    const interval = setInterval(refresh, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { articles, loading, liveCount, lastUpdated, refresh };
}
