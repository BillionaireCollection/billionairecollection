import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-06T00:00:00.000Z");
const allowedCategories = new Set(["Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art", "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices"]);

export const articles = [
  { slug: "altrata-uhnw-population-forecast-2030-2026", title: "The Global UHNW Population Is Forecast to Reach 676,970 by 2030", summary: "Altrata’s latest World Ultra Wealth Report forecasts that the ultra-wealthy population will rise 31% from its mid-2025 level to 676,970 people by 2030. The research defines the cohort as individuals with more than $30 million in net worth and estimates its combined wealth at $59.8 trillion.", category: "Wealth", source: "Altrata", articleUrl: "https://altrata.com/reports/world-ultra-wealth-report-2025", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80", isFeatured: true, publishedAt },
  { slug: "forbes-september-2026-top-ten-richest-wealth", title: "Forbes Puts the World’s Top Ten Fortunes at $2.8 Trillion", summary: "Forbes’ September ranking says the world’s ten richest people are together worth $2.8 trillion, compared with $2.6 trillion a month earlier. The update highlights the continued influence of technology-linked fortunes on the summit of global wealth.", category: "Wealth", source: "Forbes", articleUrl: "https://www.forbes.com/sites/forbeswealthteam/article/the-top-ten-richest-people-in-the-world/", imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "larry-page-family-office-coconut-grove-lease-2026", title: "Larry Page’s Family Office Is Reported to Take Space in Coconut Grove", summary: "Managers of Wealth reports that billionaire Google co-founder Larry Page’s family office has quietly leased space in Coconut Grove. The move puts another prominent private-capital operation in a Miami neighbourhood that continues to draw high-net-worth principals and advisers.", category: "Real Estate", source: "Managers of Wealth", articleUrl: "https://managersofwealth.com/billionaire-google-co-founder-larry-pages-family-office-quietly-leases-in-coconut-grove/", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "lurssen-project-elusive-sale-2030-delivery-2026", title: "Lürssen’s 122.5-Metre Project Elusive Sells for 2030 Delivery", summary: "BOAT International reports that Moran Yacht & Ship has announced the sale of the 122.5-metre Lürssen Project Elusive, already in build at the German yard. The scheduled 2030 delivery signals continuing appetite for the largest, longest-lead-time superyacht commissions.", category: "Superyachts", source: "BOAT International", articleUrl: "https://www.boatinternational.com/yachts/news/biggest-yachting-news-stories-august-2026", imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80", isFeatured: true, publishedAt },
  { slug: "delta-marine-zembra-explorer-yacht-launch-2026", title: "Delta Marine Launches the 46-Metre Explorer Yacht Zembra", summary: "BOAT International reports that Delta Marine has launched the 46.3-metre explorer yacht Zembra in Seattle for experienced owners. The project combines long-range cruising ambitions with aviation and submersible capability for remote itineraries.", category: "Superyachts", source: "BOAT International", articleUrl: "https://www.boatinternational.com/yachts/news/delta-marine-project-zembra-superyacht-launch", imageUrl: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "ikonic-yachts-family-office-model-uhnw-2026", title: "Ikonic Yachts Applies a Family-Office Model to Yacht Ownership", summary: "Forbes reports that Ikonic Yachts is combining acquisition, sale, charter and management advice for UHNW yacht owners. Its Sovereign platform is presented as a way to support discussions around operating costs, compliance, risk and valuation.", category: "Family Offices", source: "Forbes", articleUrl: "https://www.forbes.com/sites/jefffromm/2026/09/01/ultra-high-net-worth-users-get-a-family-office-view-to-super-yachts/", imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "los-angeles-private-aircraft-tax-assessments-2026", title: "Los Angeles Uses Aircraft Data to Pursue Unpaid Private-Jet Taxes", summary: "The Los Angeles Times reports that the county used aircraft-location data to assess hundreds of private-plane owners it says had escaped taxation. The initiative is expected to add about $38 million in revenue and has included assessments linked to high-profile jet owners.", category: "Aviation", source: "Los Angeles Times", articleUrl: "https://www.latimes.com/california/story/2026-09-02/la-county-tax-collector-celebrity-jets", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "monterey-car-week-762-million-collector-market-2026", title: "Monterey Car Week’s $762 Million Sales Mark a New Collector Era", summary: "Art & Object reports that five auction houses generated a combined $762 million at Monterey Car Week, exceeding the previous 2022 high. The analysis points to increased modern-supercar demand, with 11 vehicles selling for more than $10 million.", category: "Automotive", source: "Art & Object", articleUrl: "https://www.artandobject.com/news/next-generation-collectors-reshape-montereys-762-million-car-week", imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "trophy-art-market-wealth-concentration-2026", title: "Trophy Art’s Dependence on Billionaire Buyers Is Growing", summary: "The Art Newspaper reports that fewer than 0.3% of auction lots accounted for nearly 45% of global auction value in 2025. Its analysis links the top-heavy market for blue-chip works to a smaller group of ultra-wealthy buyers and wider wealth concentration.", category: "Art", source: "The Art Newspaper", articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse", imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "family-office-philanthropy-impact-strategies-2026", title: "Family Offices Shift Philanthropy Toward Strategic, Measurable Impact", summary: "Family Office Networks reports that UHNW families are increasingly connecting philanthropy to impact investing, collaborative giving and formal measurement. The article also identifies a growing role for next-generation family members in shaping a family’s social-impact agenda.", category: "Philanthropy", source: "Family Office Networks", articleUrl: "https://fon.network/philanthropic-strategies-how-family-offices-drive-meaningful-change/", imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "family-offices-du-pont-registry-luxury-auto-investment-2026", title: "A Family Office Invests in the Luxury Auto Platform duPont REGISTRY", summary: "The FO Pro reports a strategic investment in duPont REGISTRY Group by the family office of Vantage Data Centers CEO Sureel Choksi. The deal is part of a recent round-up of family-office capital directed at mobility, social shopping and high-end automotive infrastructure.", category: "Family Offices", source: "The FO Pro", articleUrl: "https://thefopro.com/deal-round-up-family-offices-back-a-mobility-platform-a-social-shopping-app-and-a-luxury-auto-marketplace/", imageUrl: "https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&q=80", isFeatured: false, publishedAt },
  { slug: "billionaire-vacation-destinations-luxury-travel-2026", title: "A New Index Maps the Ultra-Luxury Destinations Favoured by Billionaires", summary: "Yahoo Creators reports that a 2026 luxury-travel index ranks the French Riviera and Monaco as leading billionaire vacation destinations. The analysis weighs private-aviation access, high-end accommodation, villas, fine dining and elite leisure in the world’s most exclusive resort markets.", category: "Luxury", source: "Yahoo Creators", articleUrl: "https://creators.yahoo.com/lifestyle/story/10-ultra-luxury-billionaire-vacation-spots--where-the-worlds-richest-people-go-to-disappear-220115415.html", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", isFeatured: false, publishedAt },
];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

export function validateBatch() {
  if (articles.length !== 12) throw new Error("Expected exactly 12 articles");
  if (articles.filter(article => article.isFeatured).length !== 2) throw new Error("Expected exactly 2 featured articles");
  const slugs = new Set();
  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`Invalid slug: ${article.slug}`);
    if (slugs.has(article.slug)) throw new Error(`Duplicate slug: ${article.slug}`);
    if (!allowedCategories.has(article.category)) throw new Error(`Invalid category: ${article.category}`);
    if (!/^https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9-]+\?w=800&q=80$/.test(article.imageUrl)) throw new Error(`Invalid Unsplash URL: ${article.slug}`);
    if (article.publishedAt.toISOString() !== "2026-09-06T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
    if (!article.title || !article.summary || !article.source || !article.articleUrl) throw new Error(`Missing required field: ${article.slug}`);
    slugs.add(article.slug);
  }
}

try {
  validateBatch();
  if (process.env.NEWS_VALIDATE_ONLY === "1") {
    console.log(JSON.stringify({ valid: true, count: articles.length, featured: articles.filter(article => article.isFeatured).length }));
  } else {
    const secret = new TextEncoder().encode(requireEnv("JWT_SECRET"));
    const now = Math.floor(Date.now() / 1000);
    const token = await new SignJWT({ openId: requireEnv("OWNER_OPEN_ID"), appId: requireEnv("VITE_APP_ID"), name: process.env.OWNER_NAME || "Billionaire Collection Owner" })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt(now)
      .setExpirationTime(now + 300)
      .sign(secret);
    const response = await fetch(LIVE_ENDPOINT, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify(superjson.serialize(articles)) });
    const responseText = await response.text();
    if (!response.ok) throw new Error(`Live tRPC request failed with HTTP ${response.status}: ${responseText}`);
    console.log(JSON.stringify({ success: true, count: articles.length, response: responseText }));
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-06.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
