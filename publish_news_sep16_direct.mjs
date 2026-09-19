import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-16T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "coinex-announces-hong-kong-exchange-shutdown-2026",
    title: "CoinEx Announces Hong Kong Exchange Shutdown After Operational Difficulties",
    summary: "Caproasia reports that CoinEx announced it will shut down after what the exchange described as difficulty operating a cryptocurrency exchange. The report cites $70 million in daily trading volume and says users are required to withdraw assets by 22 December 2026.",
    category: "Markets", source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/09/16/hong-kong-cryptocurrency-exchange-coinex-with-70-million-daily-trading-volume-announced-shut-down-15-9-26-due-to-difficultly-in-operating-cryptocurrency-exchange-users-to-withdraw-by-2026-december/",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "bernard-arnault-lvmh-fortune-decline-september-2026",
    title: "Bernard Arnault’s Fortune Falls $65 Billion as Luxury Shares Retreat",
    summary: "Billionaires.Africa reports that Bernard Arnault’s fortune has fallen by $65 billion in 2026 to $143 billion, the sharpest decline among the world’s 500 wealthiest people in its report. It links the movement largely to LVMH’s share-price fall amid weaker demand in China, tariff uncertainty and changing alcohol consumption.",
    category: "Wealth", source: "Billionaires.Africa",
    articleUrl: "https://www.billionaires.africa/2026/09/14/bernard-arnault-has-lost-65bn-this-year-more-than-anyone/",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "michael-dell-family-office-baldwin-insurance-deal-2026",
    title: "Michael Dell’s Family Office Is Reported Near a $4.2 Billion Insurance Acquisition",
    summary: "Family Wealth Report says Michael Dell’s DFO Management is reported to be close to acquiring The Baldwin Insurance Group, a listed brokerage valued at about $4.2 billion. The report illustrates how single-family offices are pursuing control investments beyond their founders’ core businesses.",
    category: "Family Offices", source: "Family Wealth Report",
    articleUrl: "https://www.familywealthreport.com/article.php/Michael-Dell%27s-Family-Office-Close-To-US-Insurance-Group-Purchase-%E2%80%93-Media?id=208781",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "private-aviation-family-office-luxury-travel-2026",
    title: "Private Aviation Becomes a Core Luxury-Travel Tool for Family Offices",
    summary: "Family Office Networks identifies schedule flexibility, privacy, security and access to smaller airports as central reasons family offices use private aviation. Its current analysis also highlights the rising relevance of sustainability choices as clients evaluate private-travel providers.",
    category: "Aviation", source: "Family Office Networks",
    articleUrl: "https://fon.network/private-aviation-a-key-component-of-luxury-travel-for-family-offices/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-offices-fine-art-luxury-market-2026",
    title: "Family Offices Recast Fine Art as Investment, Passion and Legacy",
    summary: "Family Office Networks reports that family offices are integrating art ownership into broader wealth strategies while retaining personal and cultural motivations. The discussion highlights provenance, authentication and next-generation engagement as key collection-management priorities.",
    category: "Art", source: "Family Office Networks",
    articleUrl: "https://fon.network/fine-art-ownership-how-family-offices-are-shaping-the-luxury-market/",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "luxury-yachts-family-office-investment-wave-2026",
    title: "Family Offices Re-examine Luxury Yachts as Alternative Assets",
    summary: "Family Office Networks says family offices are increasingly assessing luxury yachts through both lifestyle and investment lenses. Its analysis points to charter potential, sustainability, fractional ownership and technical due diligence as key questions for prospective owners.",
    category: "Superyachts", source: "Family Office Networks",
    articleUrl: "https://fon.network/luxury-yachts-the-investment-wave-among-family-offices/",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monaco-super-prime-property-wealth-planning-2026",
    title: "Monaco’s Super-Prime Property Market Puts Ownership Structures Under the Spotlight",
    summary: "Citywealth reports that Monaco property transactions reached €5.9 billion in 2025, with 35 of the 64 new homes sold above €20 million. The article also outlines proposed transparency changes for Monaco real estate held through foreign legal entities.",
    category: "Real Estate", source: "Citywealth",
    articleUrl: "https://www.citywealthmag.com/news/monaco-2026-british-wealth-private-client-reform-and-the-monaco-yacht-show/",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "herbert-wertheim-ferrari-luce-charity-auction-2026",
    title: "Herbert Wertheim’s $40 Million Ferrari Purchase Brings Charity Auctions Into Focus",
    summary: "Fortune reports that philanthropist Herbert Wertheim paid $40 million for a Ferrari Luce pre-production chassis at a Sotheby’s auction benefiting the Ferrari Foundation. The sale price was more than 36 times the $1.1 million presale estimate cited by the publication.",
    category: "Automotive", source: "Fortune",
    articleUrl: "https://fortune.com/2026/08/28/american-billionaire-ferrari-luce-tax-break-40-million-philanthropy/",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-philanthropy-purpose-before-year-end-2026",
    title: "Wealthy Families Are Urged to Set Giving Strategy Before Year-End",
    summary: "Forbes argues that charitable vehicles such as donor-advised funds and private foundations are not substitutes for a defined giving strategy. Its guidance encourages wealthy families to agree purpose, priorities, decision-making and family participation well before year-end gifts are due.",
    category: "Philanthropy", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/krisputnamwalkerly/2026/09/04/dont-wait-until-december-to-discuss-charitable-giving/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "wealthy-travellers-fall-luxury-booking-surge-2026",
    title: "Wealthy Travellers Shift Luxury Escapes Into the Autumn Season",
    summary: "CNBC reports that fall luxury-travel and experience bookings were up 59% year on year according to Virtuoso, with September sales up 77%. The trend reflects affluent travellers moving trips away from crowded summer months into an increasingly competitive autumn season.",
    category: "Luxury", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/04/fall-travel-wealthy-europe.html",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "luxury-collectibles-family-office-strategies-2026",
    title: "Luxury Collectibles Gain Ground in Family-Office Asset Strategies",
    summary: "Family Office Networks describes art, classic cars, rare wines and sporting memorabilia as increasingly relevant tangible assets for family offices. The report underscores due diligence, specialist advice, provenance, storage and liquidity as essential to managing the category responsibly.",
    category: "Luxury", source: "Family Office Networks",
    articleUrl: "https://fon.network/the-evolving-role-of-luxury-collectibles-in-family-offices/",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-family-office-operations-governance-2026",
    title: "Family Offices Move From AI Curiosity to Operational Governance",
    summary: "Family Office Networks considers how artificial intelligence can improve operational efficiency and investment insight for family offices. Its analysis maintains that privacy, security and human decision oversight are essential as firms deploy new tools.",
    category: "Technology", source: "Family Office Networks",
    articleUrl: "https://fon.network/artificial-intelligence-and-its-impact-on-family-office-operations/",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
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
    if (article.publishedAt.toISOString() !== "2026-09-16T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-16.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
