import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-13T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "firehawk-aerospace-raise-valuation-2026",
    title: "Firehawk Aerospace Targets a $1.25 Billion Valuation in New Raise",
    summary: "Caproasia reports that Firehawk Aerospace is seeking $200 million at a $1.25 billion valuation. The 2020-founded company manufactures rocket motors and propellants for missile and artillery systems, placing it among the latest technology businesses drawing ultra-wealth attention.",
    category: "Technology", source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/09/13/united-states-missile-rocket-motor-company-firehawk-aerospace-to-raise-200-million-at-1-25-billion-valuation-founded-in-2020-by-will-edwards-ronald-jones-steve-edward/",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "global-billionaire-wealth-passion-assets-2026",
    title: "Billionaire Wealth Reaches New Heights as Passion Assets Take Centre Stage",
    summary: "Fortune, citing Altrata, reports that the global billionaire population reached 3,795 with combined wealth of $15.1 trillion in 2025. The analysis identifies sports ownership, philanthropy and passion assets including superyachts, watches and art as important channels for influence and portfolio expression.",
    category: "Wealth", source: "Fortune",
    articleUrl: "https://fortune.com/2026/08/27/record-3795-billionaires-in-the-world-like-jeff-bezos-favorite-investments-sports-and-philanthropy/",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "vanish-leads-monaco-yacht-show-brokerage-market-2026",
    title: "Feadship’s Vanish Leads Monaco’s €148 Million Brokerage Showcase",
    summary: "BOAT International lists the 71.5-metre Feadship Vanish at €148 million as the highest-priced yacht for sale at the 2026 Monaco Yacht Show. The event’s brokerage line-up also includes 74-metre Synthesis at €132 million and 77.7-metre Malia at €110 million.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/expensive-yachts-for-sale-monaco-yacht-show-2026",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-offices-trophy-real-estate-strategy-2026",
    title: "Family Offices Put Trophy Real Estate at the Heart of Long-Term Strategy",
    summary: "Family Office Networks describes trophy real estate as a potential source of diversification, long-term appreciation and family legacy. Its analysis identifies direct ownership, co-investment, specialist funds and joint ventures as routes for family-office capital into premium property.",
    category: "Real Estate", source: "Family Office Networks",
    articleUrl: "https://fon.network/trophy-real-estate-the-strategic-investment-choices-of-family-offices/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "uhnw-private-aviation-time-access-2026",
    title: "UHNW Travellers Reframe Private Aviation Around Time and Access",
    summary: "Forbes describes private aviation as a time-saving and flexibility-led decision for ultra-high-net-worth consumers. Its analysis highlights access products such as jet cards and fractional ownership alongside the operating complexity of whole-aircraft ownership.",
    category: "Aviation", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/jefffromm/2026/08/20/ultra-high-net-worth-consumers-value-time-as-private-aviation-benefits/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-wealth-private-assets-demand-2026",
    title: "AI Wealth Is Resetting Demand for Trophy Homes, Jets and Yachts",
    summary: "The Financial Times, republished by the Financial Post, reports that newly created AI fortunes are reshaping demand for high-end homes, private jets, yachts and personalised cars. The report characterises a younger buyer cohort as focused on privacy, speed, wellness and digitally enabled service.",
    category: "Luxury", source: "Financial Post / Financial Times",
    articleUrl: "https://financialpost.com/financial-times/the-new-ai-super-rich-are-reshaping-the-market-for-jets-yachts-and-cars",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "trusted-networks-family-office-asset-2026",
    title: "Trusted Networks Become a Strategic Asset for Family Offices",
    summary: "Family Office Networks argues that trusted peer relationships can support access to proprietary opportunities, market intelligence and co-investment collaboration. The analysis also stresses the governance needed to manage privacy, conflicts of interest and information asymmetry.",
    category: "Family Offices", source: "Family Office Networks",
    articleUrl: "https://fon.network/networking-as-an-asset-for-family-offices-in-2026/",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "direct-investment-family-office-strategies-2026",
    title: "Family Offices Pursue Direct Investment for Greater Control",
    summary: "Family Office Networks says direct investment can give family offices greater control, flexibility and sector selection than conventional pooled allocations. Its research points to due diligence, governance, relationship access and technology-enabled decision making as core execution requirements.",
    category: "Family Offices", source: "Family Office Networks",
    articleUrl: "https://fon.network/direct-investment-trends-shaping-family-office-strategies/",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "legacy-philanthropy-family-office-governance-2026",
    title: "Legacy Philanthropy Takes a Larger Role in Family-Office Governance",
    summary: "Family Office Networks describes an increased focus on aligning philanthropy with long-term family values, governance and measurable impact. The report identifies foundations, impact investing and next-generation participation as important parts of a durable giving strategy.",
    category: "Philanthropy", source: "Family Office Networks",
    articleUrl: "https://fon.network/legacy-philanthropy-a-strategic-approach-for-family-offices-in-2026/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "trophy-art-auction-market-concentration-2026",
    title: "Trophy Art’s Dependence on Billionaire Buyers Deepens",
    summary: "The Art Newspaper reports that 1,761 works, less than 0.3% of 2025 auction lots, generated nearly 45% of global auction value. Its analysis describes a concentrated market in which a small group of ultra-wealthy collectors exerts significant influence over top-end demand.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "world-most-expensive-cars-2026",
    title: "The World’s Most Expensive Cars Redefine the Modern Collector Garage",
    summary: "Robb Report’s current ranking charts the highest-priced hypercars, luxury saloons and super SUVs on the market. The edition includes the Ferrari Luce at $640,000 and notes that the first example sold for $40 million at Monterey in 2026.",
    category: "Automotive", source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/lists/most-expensive-cars-1234885095/",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "global-uhnws-exclusive-luxury-travel-2026",
    title: "Global UHNWs Compete for the Most Exclusive Suites and Lodges",
    summary: "Forbes reports that Virtuoso’s June luxury bookings carried an average nightly rate of $1,983, while future trips costing more than $100,000 were up 49%. The article says ultra-high-net-worth families are increasingly competing for limited suites, exclusive residences and private-lodge takeovers.",
    category: "Luxury", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/douggollan/2026/08/13/global-uhnws-compete-to-book-expensive-suites-lodges-experiences/",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

export function validateBatch() {
  if (articles.length !== 12) throw new Error("Expected exactly 12 articles");
  if (articles.filter((article) => article.isFeatured).length !== 2) throw new Error("Expected exactly 2 featured articles");
  const slugs = new Set();
  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`Invalid slug: ${article.slug}`);
    if (slugs.has(article.slug)) throw new Error(`Duplicate slug: ${article.slug}`);
    if (!allowedCategories.has(article.category)) throw new Error(`Invalid category: ${article.category}`);
    if (!/^https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9-]+\?w=800&q=80$/.test(article.imageUrl)) throw new Error(`Invalid Unsplash URL: ${article.slug}`);
    if (article.publishedAt.toISOString() !== "2026-09-13T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
    if (!article.title || !article.summary || !article.source || !article.articleUrl) throw new Error(`Missing required field: ${article.slug}`);
    slugs.add(article.slug);
  }
}

try {
  validateBatch();
  if (process.env.NEWS_VALIDATE_ONLY === "1") {
    console.log(JSON.stringify({ valid: true, count: articles.length, featured: articles.filter((article) => article.isFeatured).length }));
  } else {
    const secret = new TextEncoder().encode(requireEnv("JWT_SECRET"));
    const now = Math.floor(Date.now() / 1000);
    const token = await new SignJWT({
      openId: requireEnv("OWNER_OPEN_ID"),
      appId: requireEnv("VITE_APP_ID"),
      name: process.env.OWNER_NAME || "Billionaire Collection Owner",
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt(now)
      .setExpirationTime(now + 300)
      .sign(secret);
    const response = await fetch(LIVE_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify(superjson.serialize(articles)),
    });
    const responseBody = await response.json().catch(() => null);
    if (!response.ok) {
      const detail = responseBody?.error?.json?.message || response.statusText || "No response detail";
      throw new Error(`Live tRPC request failed with HTTP ${response.status}: ${detail}`);
    }
    console.log(JSON.stringify({ success: true, count: articles.length, response: responseBody }));
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-13.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
