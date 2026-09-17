import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-10T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "michael-dell-passes-jeff-bezos-billionaire-rankings-2026",
    title: "Michael Dell Overtakes Jeff Bezos in Forbes’ Billionaire Rankings",
    summary: "Forbes reported that Michael Dell’s estimated fortune rose by $4.6 billion to $267.7 billion as Dell Technologies shares reached an all-time high. The move put Dell ahead of Jeff Bezos in the publication’s rankings at the time and reflected the market impact of AI-hardware demand.",
    category: "Markets", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/antoniopequenoiv/2026/09/08/michael-dell-passes-jeff-bezos-in-billionaire-rankings-hits-no-3-for-first-time/",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "ai-super-rich-reshape-jets-yachts-cars-2026",
    title: "The New AI Super-Rich Are Reshaping Demand for Jets, Yachts and Cars",
    summary: "The Financial Times, republished by the Financial Post, reports that fortunes created by artificial intelligence are bringing younger, digitally native buyers into private aviation, yachting and supercars. Their preferences emphasise privacy, speed, wellness and personalisation, alongside app- and messaging-led service expectations.",
    category: "Luxury", source: "Financial Post / Financial Times",
    articleUrl: "https://financialpost.com/financial-times/the-new-ai-super-rich-are-reshaping-the-market-for-jets-yachts-and-cars",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "monaco-yacht-show-private-wealth-planning-2026",
    title: "Monaco Yacht Show Returns as Private-Wealth Planning Takes Centre Stage",
    summary: "Citywealth reports that the Monaco Yacht Show will welcome 120 superyachts to Port Hercule from 23 to 26 September, including 43 new yachts launched this year. The publication also highlights changing conversations around succession, property ownership and private-client planning among internationally mobile families in Monaco.",
    category: "Superyachts", source: "Citywealth",
    articleUrl: "https://www.citywealthmag.com/news/monaco-2026-british-wealth-private-client-reform-and-the-monaco-yacht-show/",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "altrata-global-ultra-wealth-luxury-spending-2026",
    title: "Altrata Maps the Expanding Scale of Global Ultra-Wealth",
    summary: "Altrata estimates that 510,810 ultra-high-net-worth individuals held $59.8 trillion at June 2025 and forecasts continued growth through 2030. Its research also estimates $290 billion of luxury-goods spending and $207 billion of philanthropic donations by this global cohort.",
    category: "Wealth", source: "Altrata",
    articleUrl: "https://altrata.com/reports/world-ultra-wealth-report-2025",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "uhnw-private-aviation-time-saving-jet-cards-2026",
    title: "UHNW Travellers Reframe Private Aviation Around Time and Access",
    summary: "Forbes reports that ultra-high-net-worth consumers increasingly use private aviation as a time-saving and flexibility-led tool for business and family travel. The analysis describes a growing preference for asset-light access such as jet cards, rather than aircraft ownership and its operating burden.",
    category: "Aviation", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/jefffromm/2026/08/20/ultra-high-net-worth-consumers-value-time-as-private-aviation-benefits/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "pininfarina-six-bespoke-branded-residences-2026",
    title: "Pininfarina Takes Its Design Language Into $16.95 Million Residences",
    summary: "Robb Report says Pininfarina and MV Group USA are creating six fully furnished U.S. residences of roughly 8,000 square feet each. The $16.95 million homes, excluding land, are positioned as a design-led alternative to a conventional custom-build process.",
    category: "Real Estate", source: "Robb Report",
    articleUrl: "https://robbreport.com/shelter/homes-for-sale/pininfarina-launching-standalone-branded-homes-1238484980/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "i-dynasty-tops-nine-figure-yacht-market-2026",
    title: "I Dynasty Leads the Nine-Figure Superyacht Brokerage Market",
    summary: "BOAT International lists the 100.8-metre I Dynasty at an asking price of €240 million, leading its current ranking of the 50 most expensive yachts for sale. The roundup places Lady Lara at €230 million and the 114.2-metre Luna at €200 million, underscoring continued depth in the upper brokerage market.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yacht-market-intelligence/brokerage-sales-news/most-expensive-yachts-for-sale",
    imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "billionaire-buyers-trophy-art-market-concentration-2026",
    title: "Trophy Art’s Reliance on Billionaire Buyers Deepens",
    summary: "The Art Newspaper reports that fewer than 0.3% of auction lots generated almost 45% of global auction sales by value in 2025. The analysis identifies an increasingly concentrated market at the very top, where billionaire collectors have outsized influence.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monterey-car-week-collector-auction-market-2026",
    title: "Monterey Car Week Reaffirms the Depth of the Collector-Car Market",
    summary: "Robb Report said auction sales at Monterey Car Week reached $755.6 million through Saturday, led by the 1964 Shelby Cobra Daytona Coupe at $42.905 million. The results also highlighted a $40 million Ferrari Luce Tailor Made sale benefiting the Ferrari Foundation for education.",
    category: "Automotive", source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/lists/10-most-expensive-auction-cars-monterey-car-week-1238566475/",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "philanthropy-advice-high-net-worth-families-2026",
    title: "Philanthropic Expertise Moves Higher on the UHNW Advisory Agenda",
    summary: "Foundation Source cites a study in which 88% of high-net-worth clients discuss charitable giving with advisers. The analysis argues that technology can streamline administration, while human guidance remains central to conversations about family values and long-term impact.",
    category: "Philanthropy", source: "Foundation Source",
    articleUrl: "https://foundationsource.com/blog/balancing-technology-and-human-expertise-ceo-joe-mrak-in-wealth-managements-2026-midyear-outlook/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "wealthy-travellers-fall-luxury-travel-peak-2026",
    title: "Wealthy Travellers Turn Autumn Into Luxury Travel’s New Peak Season",
    summary: "CNBC, citing Virtuoso, reports that fall luxury-travel bookings are up 59% year on year and sales are up 69%. The shift reflects affluent travellers moving trips into September and October in pursuit of milder weather and fewer peak-summer crowds.",
    category: "Luxury", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/04/fall-travel-wealthy-europe.html",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-offices-jurisdictional-diversification-2026",
    title: "Family Offices Reassess Jurisdictional Diversification",
    summary: "Family Wealth Report says internationally minded U.S. family offices are increasingly treating jurisdictional diversification as a complement to portfolio diversification. The opinion piece links the shift to global mobility, cross-border structures, governance and alternatives exposure.",
    category: "Family Offices", source: "Family Wealth Report",
    articleUrl: "https://www.familywealthreport.com/article.php/Why-Jurisdictional-Diversification-Is-Critical-To-US-Family-Offices%E2%80%99-New-Global-Mindset-%C2%A0?id=208596",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
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
    if (article.publishedAt.toISOString() !== "2026-09-10T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-10.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
