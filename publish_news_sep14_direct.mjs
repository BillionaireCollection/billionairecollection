import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-14T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "larry-ellison-oracle-share-sale-plan-september-2026",
    title: "Larry Ellison’s Oracle Trading Plan Puts $7.5 Billion of Shares in Play",
    summary: "Caproasia reports that Oracle co-founder Larry Ellison has a trading plan to sell 50 million Oracle shares, valued in the report at $7.5 billion, between June and October 2026. The transaction plan places a closely watched technology founder at the intersection of public-markets liquidity and ultra-wealth capital allocation.",
    category: "Markets", source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/09/12/united-states-billionaire-oracle-founder-larry-ellison-age-82-with-210-billion-fortune-to-sell-7-5-billion-of-oracle-shares-50-million-shares-from-2026-june-to-2026-october/",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "global-uhnw-population-wealth-report-2026",
    title: "Global UHNW Wealth Nears $60 Trillion as the Population Passes Half a Million",
    summary: "Altrata’s World Ultra Wealth Report estimates that 510,810 individuals held ultra-high-net-worth status in June 2025, with collective wealth of $59.8 trillion. The report positions the cohort’s investment behaviour, luxury consumption and philanthropy as influential forces across global markets.",
    category: "Wealth", source: "Altrata",
    articleUrl: "https://altrata.com/reports/world-ultra-wealth-report-2025",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "family-offices-luxury-real-estate-frontier-2026",
    title: "Family Offices Treat Luxury Real Estate as Both Lifestyle Asset and Strategy",
    summary: "Family Office Networks reports that luxury real estate is increasingly being considered by family offices as a portfolio diversifier as well as a personal asset. Its analysis points to smart-home technology, sustainability and emerging luxury markets as part of the current selection criteria.",
    category: "Real Estate", source: "Family Office Networks",
    articleUrl: "https://fon.network/luxury-real-estate-a-growing-frontier-for-family-offices/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "real-estate-holding-structures-family-offices-2026",
    title: "For Family Offices, the Real-Estate Wrapper Can Matter as Much as the Building",
    summary: "FO Pro’s latest real-estate analysis argues that ownership structures can shape tax planning, governance, liquidity and succession outcomes before a family office evaluates the asset itself. The publication frames structure as a primary due-diligence question for private capital considering property allocations.",
    category: "Family Offices", source: "FO Pro",
    articleUrl: "https://thefopro.com/the-wrapper-matters-more-than-the-building-evaluating-real-estate-before-capital-moves/",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "vanish-monaco-yacht-show-brokerage-2026",
    title: "Feadship’s Vanish Headlines Monaco’s €148 Million Superyacht Brokerage Line-Up",
    summary: "BOAT International identifies the 71.5-metre Feadship Vanish, offered at €148 million, as the most expensive yacht listed in its Monaco Yacht Show 2026 round-up. The same brokerage selection includes the 74-metre Synthesis at €132 million and the 77.7-metre Malia at €110 million.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/expensive-yachts-for-sale-monaco-yacht-show-2026",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "uhnw-private-aviation-time-access-2026",
    title: "UHNW Travellers Continue to Price Private Aviation Around Time and Access",
    summary: "Forbes examines why time efficiency and flexibility remain central to private-aviation decisions for ultra-high-net-worth consumers. The report contrasts whole-aircraft ownership with access-led options including jet cards and fractional programmes.",
    category: "Aviation", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/jefffromm/2026/08/20/ultra-high-net-worth-consumers-value-time-as-private-aviation-benefits/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-office-backs-dupont-registry-luxury-auto-2026",
    title: "Family-Office Capital Backs duPont REGISTRY Group’s Luxury-Auto Platform",
    summary: "FO Pro reports that the family office of Vantage Data Centers chief executive and collector Sureel Choksi has made a strategic investment in Miami-based duPont REGISTRY Group. The terms were not disclosed, while the platform said the investment supports its position in the high-end automotive market.",
    category: "Automotive", source: "FO Pro",
    articleUrl: "https://thefopro.com/deal-round-up-family-offices-back-a-mobility-platform-a-social-shopping-app-and-a-luxury-auto-marketplace/",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "trophy-art-auction-market-concentration-2026",
    title: "Trophy Art’s Dependence on Billionaire Buyers Deepens",
    summary: "The Art Newspaper reports that 1,761 works, fewer than 0.3% of auction lots in 2025, generated nearly 45% of global auction value. The analysis highlights the degree to which a small group of ultra-wealthy collectors can influence demand at the market’s upper end.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-family-office-operations-governance-2026",
    title: "Family Offices Move from AI Curiosity to Operational Governance",
    summary: "Family Office Networks’ current analysis considers how artificial intelligence can streamline operations and generate investment insights for family offices. It also stresses that privacy, security and decision oversight remain essential as firms assess practical deployment.",
    category: "Technology", source: "Family Office Networks",
    articleUrl: "https://fon.network/artificial-intelligence-and-its-impact-on-family-office-operations/",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "legacy-philanthropy-family-office-governance-2026",
    title: "Legacy Philanthropy Moves Closer to the Centre of Family-Office Governance",
    summary: "Family Office Networks describes legacy philanthropy as a strategy connecting family values, governance and measurable impact. The discussion identifies foundations, impact investment and next-generation participation as core ways families can build durable giving programmes.",
    category: "Philanthropy", source: "Family Office Networks",
    articleUrl: "https://fon.network/legacy-philanthropy-a-strategic-approach-for-family-offices-in-2026/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "uhnw-luxury-travel-demand-exclusive-suites-2026",
    title: "UHNW Demand Intensifies for the World’s Most Exclusive Suites and Lodges",
    summary: "Forbes reports that Virtuoso’s June luxury bookings carried an average nightly rate of $1,983, while future trips above $100,000 were up 49%. The report depicts a competition for scarce suites, private residences and lodge takeovers among affluent travellers seeking distinctive access.",
    category: "Luxury", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/douggollan/2026/08/13/global-uhnws-compete-to-book-expensive-suites-lodges-experiences/",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-office-networks-strategic-collaboration-2026",
    title: "Family Offices Revisit Strategic Collaboration to Access Complex Opportunities",
    summary: "Family Office Networks explores strategic collaborations as a way for family offices to share specialist perspectives and evaluate opportunities that may be difficult to access alone. The article positions clear alignment, due diligence and trusted relationships as central to effective co-investment activity.",
    category: "Family Offices", source: "Family Office Networks",
    articleUrl: "https://fon.network/strategic-collaborations-the-future-of-family-office-investments/",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
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
    if (article.publishedAt.toISOString() !== "2026-09-14T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-14.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
