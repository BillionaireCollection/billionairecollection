import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-12T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "altrata-billionaire-census-2026-wealth-record",
    title: "Altrata Census Puts Billionaire Wealth at $15.1 Trillion",
    summary: "Caproasia’s summary of the Altrata Billionaire Census 2026 reports 3,795 billionaires holding a combined $15.1 trillion of wealth. The census also identifies 553,100 ultra-high-net-worth individuals and places the United States at the top of the country ranking with 1,265 billionaires.",
    category: "Wealth", source: "Caproasia / Altrata",
    articleUrl: "https://www.caproasia.com/2026/09/10/altrata-billionaire-census-2026-3795-billionaires-with-15-1-trillion-wealth-553100-uhnw-population-top-5-countries-with-most-billionaires-united-states-1265-china-363-germany-221-r/",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "lurssen-project-elusive-superyacht-sold-2030-delivery",
    title: "Lürssen’s 122.5-Metre Project Elusive Is Sold for 2030 Delivery",
    summary: "BOAT International reports that Moran Yacht & Ship announced the sale of Lürssen’s 122.5-metre Project Elusive, now under construction in Bremen. The project marks another ultra-large new-build commitment at the top of the superyacht market, with delivery scheduled for 2030.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/biggest-yachting-news-stories-august-2026",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "family-offices-trophy-real-estate-strategy-2026",
    title: "Family Offices Treat Trophy Property as a Portfolio and Legacy Asset",
    summary: "Family Office Networks describes trophy real estate as a strategic asset class for family offices seeking diversification, long-term appreciation and a connection to family legacy. The analysis identifies direct ownership, co-investment, specialist funds and joint ventures as common routes into premium property.",
    category: "Real Estate", source: "Family Office Networks",
    articleUrl: "https://fon.network/trophy-real-estate-the-strategic-investment-choices-of-family-offices/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "uhnw-private-aviation-time-access-2026",
    title: "UHNW Travellers Reframe Private Aviation Around Time and Access",
    summary: "Forbes describes private aviation as an increasingly time-saving and flexibility-led decision for ultra-high-net-worth consumers. Its analysis highlights asset-light options including jet cards and fractional access, alongside the operating complexity of whole-aircraft ownership.",
    category: "Aviation", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/jefffromm/2026/08/20/ultra-high-net-worth-consumers-value-time-as-private-aviation-benefits/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-wealth-reshapes-private-assets-2026",
    title: "AI Wealth Reshapes Demand for Jets, Yachts and Performance Cars",
    summary: "The Financial Times, republished by the Financial Post, reports that fortunes created in the AI boom are reshaping demand for trophy homes, private jets, yachts and personalised cars. The report characterises a younger buyer cohort as highly focused on privacy, speed, wellness and digital service.",
    category: "Luxury", source: "Financial Post / Financial Times",
    articleUrl: "https://financialpost.com/financial-times/the-new-ai-super-rich-are-reshaping-the-market-for-jets-yachts-and-cars",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-office-direct-investment-trends-2026",
    title: "Direct Investment Gains Ground in Family-Office Strategies",
    summary: "Family Office Networks says family offices are pursuing direct investments for greater control, flexibility and sector selection. Its analysis stresses due diligence, governance, relationship access and technology-enabled processes as essential to building a durable direct-investment programme.",
    category: "Family Offices", source: "Family Office Networks",
    articleUrl: "https://fon.network/direct-investment-trends-shaping-family-office-strategies/",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "networking-as-family-office-asset-2026",
    title: "Trusted Networks Emerge as a Strategic Family-Office Asset",
    summary: "Family Office Networks argues that trusted peer relationships are becoming as important as capital for accessing opportunity, intelligence and co-investment partnerships. The report also highlights the need to manage privacy, conflicts of interest and information asymmetry through clear governance.",
    category: "Family Offices", source: "Family Office Networks",
    articleUrl: "https://fon.network/networking-as-an-asset-for-family-offices-in-2026/",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "legacy-philanthropy-family-office-governance-2026",
    title: "Legacy Philanthropy Moves Into Family-Office Governance",
    summary: "Family Office Networks reports a growing emphasis on aligning philanthropic activity with long-term family values, governance and measurable impact. It identifies foundations, impact investments and next-generation participation as key elements in creating durable giving strategies.",
    category: "Philanthropy", source: "Family Office Networks",
    articleUrl: "https://fon.network/legacy-philanthropy-a-strategic-approach-for-family-offices-in-2026/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "trophy-art-auction-market-billions-2026",
    title: "Trophy Art’s Dependence on Billionaire Buyers Deepens",
    summary: "The Art Newspaper reports that 1,761 works, fewer than 0.3% of auction lots sold in 2025, generated nearly 45% of global auction value. Its analysis describes an increasingly concentrated market in which a small pool of ultra-wealthy buyers competes for museum-quality works.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monterey-car-week-collector-market-2026",
    title: "Monterey Car Week Demonstrates the Depth of the Collector-Car Market",
    summary: "Robb Report said Monterey Car Week auction sales reached $755.6 million through Saturday, led by a 1964 Shelby Cobra Daytona Coupe at $42.905 million. The report also noted a $40 million Ferrari Luce Tailor Made sale supporting the Ferrari Foundation for education.",
    category: "Automotive", source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/lists/10-most-expensive-auction-cars-monterey-car-week-1238566475/",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "global-uhnws-compete-exclusive-luxury-travel-2026",
    title: "Global UHNWs Compete for the Most Exclusive Suites and Lodges",
    summary: "Forbes reports that Virtuoso’s June luxury bookings carried an average nightly rate of $1,983, while future trips costing more than $100,000 were up 49%. The article says ultra-high-net-worth families are competing globally for limited suites, exclusive residences and private lodge takeovers.",
    category: "Luxury", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/douggollan/2026/08/13/global-uhnws-compete-to-book-expensive-suites-lodges-experiences/",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monaco-yacht-show-private-wealth-2026",
    title: "Monaco Yacht Show Connects Superyachts With Private-Wealth Planning",
    summary: "Citywealth reports that 120 superyachts, including 43 new yachts launched in 2026, are due at the Monaco Yacht Show from 23 to 26 September. Its coverage places the event alongside private-client themes of succession, property ownership and internationally mobile wealth.",
    category: "Superyachts", source: "Citywealth",
    articleUrl: "https://www.citywealthmag.com/news/monaco-2026-british-wealth-private-client-reform-and-the-monaco-yacht-show/",
    imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
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
    if (article.publishedAt.toISOString() !== "2026-09-12T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-12.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
