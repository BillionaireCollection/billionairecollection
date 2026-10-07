import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const ERROR_LOG = "/tmp/billionaire-collection-news-upsert-2026-10-07.error.log";
const publishedAt = new Date("2026-10-07T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "forbes-400-youngest-billionaires-ai-boom-2026",
    title: "AI Boom Puts Seven New Billionaires Under 40 on the 2026 Forbes 400",
    summary: "Forbes reports that 10 billionaires under 40 made the 2026 Forbes 400, up from four a year earlier, with seven newcomers building fortunes through the AI boom. The group is estimated at a combined $169 billion, while Cognition cofounder Steven Hao became the youngest member after the company’s $2 billion funding round at a $48 billion valuation.",
    category: "Wealth", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/aliciapark/2026/09/15/the-10-youngest-billionaires-on-the-2026-forbes-400-list/",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "altrata-global-billionaire-population-record-2026",
    title: "Global Billionaire Population Reaches Record 3,795 as Wealth Hits $15.1 Trillion",
    summary: "Altrata’s 2026 Billionaire Census says the global billionaire population reached an all-time high of 3,795 in 2025, while collective wealth rose 12.8% to $15.1 trillion. The report identifies the artificial-intelligence investment boom as a major driver of wealth creation and keeps North America as the leading billionaire region.",
    category: "Wealth", source: "Altrata",
    articleUrl: "https://altrata.com/reports/billionaire-census-2026",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "billionaires-ultra-private-compounds-landmaxxing-2026",
    title: "Billionaires Turn Neighboring Properties Into Ultra-Private Compounds",
    summary: "Robb Report says ultra-wealthy buyers are increasingly acquiring neighbouring properties to increase privacy, preserve views and create larger multigenerational compounds. The South Florida trend includes Jeff Bezos’s roughly $234 million Indian Creek assemblage and a $67 million Manalapan parcel divided between Larry Ellison and David MacNeil.",
    category: "Real Estate", source: "Robb Report",
    articleUrl: "https://robbreport.com/shelter/homes-for-sale/landmaxxing-billionaires-buying-the-house-next-door-1238487795/",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "isa-yachts-belita-798m-flagship-launch-2026",
    title: "ISA Yachts Launches 79.8m Flagship Superyacht Belita",
    summary: "ISA Yachts has launched Belita, a 79.8-metre custom superyacht that becomes the Palumbo-owned brand’s largest project to date by length and volume. The 2,220GT flagship has exterior design by Espen Øino, naval engineering by Palumbo Superyachts and Hydro Tec, and interiors by Peter Marino Architect.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/isa-yachts-custom-80-metre-flagship-yacht-belita-launch",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "private-jet-growth-slows-despite-uhnw-expansion-2026",
    title: "Private-Jet Growth Slows Despite Expansion of the Ultra-Wealthy",
    summary: "Forbes reports that private-jet activity slowed in late 2026 even as the population of people worth more than $30 million continued to expand. WingX recorded seven year-over-year declines in worldwide departures across 13 weeks, while ARGUS TraqPak reported only 0.3% growth in North American flight hours in August.",
    category: "Aviation", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/douggollan/2026/10/04/cruel-summer-wealth-is-growing-but-private-jet-growth-is-slowing-down/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "amelia-island-modern-supercars-111-million-auction-2026",
    title: "Rare Modern Supercars Drive a $111 Million Amelia Island Collector-Car Auction",
    summary: "Broad Arrow Auctions generated $111 million at its Amelia Island sale, led by a 2003 Ferrari Enzo at $15 million and a 2005 Porsche Carrera GT at $6.7 million. CNBC reports that demand for rare 1990s and 2000s hypercars and supercars is strengthening as younger wealthy collectors enter the market.",
    category: "Automotive", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/03/12/classic-car-art-auctions-results-wealth-resilience.html",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "global-art-auction-sales-rebound-68-billion-h1-2026",
    title: "Global Art Auction Sales Rebound to $6.8 Billion in the First Half of 2026",
    summary: "Bank of America Private Bank says Christie’s, Sotheby’s and Phillips recorded $6.8 billion in combined auction sales in the first half of 2026, the strongest first-half total since 2022. Its report points to renewed demand for established artists and says affluent collectors are increasingly using advisers and art lending within their collection strategies.",
    category: "Art", source: "Bank of America Private Bank",
    articleUrl: "https://www.privatebank.bankofamerica.com/articles/art-market-fall-update.html",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "us-charitable-giving-megadonors-bequests-record-2025",
    title: "U.S. Charitable Giving Topped $600 Billion in 2025 as Megadonors and Bequests Drove Growth",
    summary: "U.S. charitable giving reached a record $617.2 billion in 2025, according to the Giving USA report, with a 16.6% increase in charitable bequests to $62.19 billion. CNBC reports that nine donors accounted for $22.32 billion of the total, including $6.65 billion from MacKenzie Scott.",
    category: "Philanthropy", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/06/25/us-charitable-giving-megadonors.html",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "porsche-high-end-models-lower-sales-strategy-2026",
    title: "Porsche Turns to High-End Models as It Prepares for a Lower-Sales Era",
    summary: "Porsche is reshaping its strategy around high-end sports cars and luxury SUVs as it prepares for persistently lower sales. Reuters reports that the automaker aims to bring its future break-even point below 200,000 vehicles while pursuing a value-over-volume approach and reducing costs.",
    category: "Luxury", source: "Reuters",
    articleUrl: "https://www.reuters.com/business/autos-transportation/porsche-braces-lower-sales-era-seeks-lifeline-luxury-2026-10-07/",
    imageUrl: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-valuations-create-unprecedented-technology-wealth-2026",
    title: "AI Valuations Create Unprecedented Wealth for Founders, Investors and Employees",
    summary: "Bloomberg reports that the rise in AI valuations has created unprecedented wealth for founders, early-stage investors and employees holding stock options. The development places AI-linked fortunes at the centre of contemporary technology wealth creation, with effects across finance and the wider economy.",
    category: "Technology", source: "Bloomberg",
    articleUrl: "https://www.bloomberg.com/news/newsletters/2026-10-05/ai-billionaires-drive-845-billion-surge-in-wealth-this-year",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "citi-family-offices-positive-returns-markets-2026",
    title: "Citi Survey Finds 90% of Leading Family Offices Posted Gains in 2026 So Far",
    summary: "A Citi Wealth survey of 351 family offices across 41 countries found that nearly 90% reported positive portfolio performance in 2026 so far, with public equities the largest reported allocation at 30%. Inflation was the leading concern, while respondents generally favoured selective portfolio adjustments and additional developed-market equity exposure.",
    category: "Markets", source: "Financial Express",
    articleUrl: "https://www.financialexpress.com/market/global-markets/90-of-family-offices-made-money-this-year-where-are-they-investing/4352302/",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "billionaire-family-offices-geothermal-ai-neurotechnology-september-2026",
    title: "Billionaire Family Offices Back Geothermal, AI and Neurotechnology Deals in September",
    summary: "CNBC reports that private investment firms tied to ultra-wealthy families made 42 direct company investments in September, including major rounds in geothermal energy, AI, semiconductor manufacturing and brain implants. The Fintrx data highlighted a $135 million geothermal round led by John Arnold’s Centaurus Capital and John Doerr’s family office, with participation from Bill Gates’ private venture firm.",
    category: "Family Offices", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/10/01/billionaire-family-offices-back-geothermal-energy-in-september.html",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
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
    if (article.publishedAt.toISOString() !== "2026-10-07T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile(ERROR_LOG, `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
