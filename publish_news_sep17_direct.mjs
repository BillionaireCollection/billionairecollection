import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-17T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "coinex-hong-kong-crypto-exchange-shutdown-september-2026",
    title: "CoinEx Announces Closure of Its Hong Kong Crypto Exchange",
    summary: "Caproasia reports that CoinEx announced it will shut down after what it described as difficulties operating a cryptocurrency exchange. The report cites $70 million in daily trading volume and states that users must withdraw assets by 22 December 2026.",
    category: "Markets", source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/09/16/hong-kong-cryptocurrency-exchange-coinex-with-70-million-daily-trading-volume-announced-shut-down-15-9-26-due-to-difficultly-in-operating-cryptocurrency-exchange-users-to-withdraw-by-2026-december/",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "family-offices-tax-aware-long-short-strategies-2026",
    title: "Wealthy Investors Pour Billions Into Tax-Aware Long-Short Strategies",
    summary: "CNBC reports that assets in tax-aware long-short strategies have risen beyond $170 billion, up from $2 billion in 2022, according to Tax Alpha Insider. The publication highlights leverage, complex exits, fees and possible tax scrutiny as risks alongside the potential tax deferral benefits.",
    category: "Markets", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/11/wealthy-investors-tax-aware-long-short-strategies.html",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "family-offices-oil-gas-assets-structural-demand-2026",
    title: "Family Offices Target Oil and Gas Assets as Energy Demand Reshapes Deal Flow",
    summary: "CNBC reports growing interest from ultra-high-net-worth investors and family offices in oil and gas assets, driven by long-term energy demand rather than short-term commodity moves. The report says first-half 2026 oil-and-gas deal spending reached a two-year high, though competition has made attractive valuations harder to secure.",
    category: "Family Offices", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/10/wealthy-investors-oil-gas-assets.html",
    imageUrl: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "uhnw-wealth-transfer-multidecade-planning-2026",
    title: "UHNW Wealth Transfer May Be a Multi-Decade Process, BNY Says",
    summary: "Spear’s reports that family dynamics were the leading influence on wealth-transfer timing in a BNY Wealth study of 501 people with substantial assets. The article also notes that many plans remain incomplete and that heirs often have limited involvement in transfer decisions.",
    category: "Wealth", source: "Spear’s",
    articleUrl: "https://spearswms.com/wealth/uhnw-great-wealth-transfer-could-take-decades-bny-says/",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-office-superyacht-advisory-model-2026",
    title: "Superyacht Ownership Moves Toward a Family-Office Advisory Model",
    summary: "Forbes profiles a yachting adviser seeking to integrate acquisition, sale, charter and management into a single family-office-style service. The report says 50-metre yachts can carry annual operating costs of several million dollars, reinforcing the importance of cost and operating transparency.",
    category: "Superyachts", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/jefffromm/2026/09/01/ultra-high-net-worth-users-get-a-family-office-view-to-super-yachts/",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monaco-yacht-show-market-report-2026",
    title: "SuperYacht Times Publishes Its Monaco Yacht Show Market Report",
    summary: "SuperYacht Times published its Monaco Yacht Show Market Report 2026 on 16 September, adding a current market reference point ahead of the event. The accessible listing confirms the report’s publication, while its detailed market statistics are contained in the underlying digital edition.",
    category: "Superyachts", source: "SuperYacht Times",
    articleUrl: "https://issuu.com/superyachttimes/docs/mys_market_report_2026",
    imageUrl: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "private-aviation-family-office-luxury-travel-2026",
    title: "Private Aviation Becomes a Core Luxury-Travel Tool for Family Offices",
    summary: "Family Office Networks identifies schedule flexibility, privacy, security and smaller-airport access as primary private-aviation benefits for family offices. Its analysis also highlights sustainability as an increasingly relevant consideration in the sector.",
    category: "Aviation", source: "Family Office Networks",
    articleUrl: "https://fon.network/private-aviation-a-key-component-of-luxury-travel-for-family-offices/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "next-generation-collectors-luxury-art-market-2026",
    title: "Next-Generation Collectors Shift Luxury Demand Beyond Traditional Fine Art",
    summary: "The Art Newspaper reports that Christie’s, Sotheby’s and Phillips generated a combined $9.4 billion in first-half 2026 sales, while collectibles and luxury watches attracted increased attention. Its analysis describes a younger affluent buyer cohort that often values pop-culture and luxury assets alongside, or instead of, established fine art.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/10/from-poussin-and-pollock-to-pokemon-and-super-mario-bros-the-market-is-shifting",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monaco-super-prime-property-ownership-transparency-2026",
    title: "Monaco’s Super-Prime Market Brings Ownership Transparency Into Focus",
    summary: "Citywealth reports that Monaco property transactions reached €5.9 billion in 2025, with 35 of 64 newly built homes selling for more than €20 million. Its private-client guide also examines proposed transparency measures for property held through foreign legal entities.",
    category: "Real Estate", source: "Citywealth",
    articleUrl: "https://www.citywealthmag.com/news/monaco-2026-british-wealth-private-client-reform-and-the-monaco-yacht-show/",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "herbert-wertheim-ferrari-luce-charity-auction-2026",
    title: "Herbert Wertheim’s $40 Million Ferrari Purchase Highlights Charity Auctions",
    summary: "Fortune reports that philanthropist Herbert Wertheim paid $40 million for a Ferrari Luce pre-production chassis at a Sotheby’s charity auction benefiting the Ferrari Foundation. The sale price was more than 36 times the $1.1 million presale estimate cited by the publication.",
    category: "Automotive", source: "Fortune",
    articleUrl: "https://fortune.com/2026/08/28/american-billionaire-ferrari-luce-tax-break-40-million-philanthropy/",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-philanthropy-purpose-before-year-end-2026",
    title: "Wealthy Families Are Urged to Set Giving Strategy Before Year-End",
    summary: "Forbes argues that donor-advised funds and private foundations are structures rather than full philanthropic strategies. Its guidance encourages families to define purpose, priorities, governance and participation before making year-end gifts.",
    category: "Philanthropy", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/krisputnamwalkerly/2026/09/04/dont-wait-until-december-to-discuss-charitable-giving/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "wealthy-travellers-autumn-luxury-booking-surge-2026",
    title: "Wealthy Travellers Shift Luxury Escapes Into the Autumn Season",
    summary: "CNBC reports that fall luxury-travel and experience bookings were up 59% year on year according to Virtuoso, with September sales up 77%. The trend reflects affluent travellers moving trips away from crowded summer months into a more competitive autumn season.",
    category: "Luxury", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/04/fall-travel-wealthy-europe.html",
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
    if (article.publishedAt.toISOString() !== "2026-09-17T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-17.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
