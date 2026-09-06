import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-05T00:00:00.000Z");
const allowedCategories = new Set(["Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art", "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices"]);

export const articles = [
  {
    slug: "forbes-september-2026-worlds-ten-richest-people",
    title: "The World’s Ten Richest Now Hold $2.8 Trillion",
    summary: "Forbes’ September ranking places Elon Musk first and says the ten wealthiest people are collectively worth $2.8 trillion, up from $2.6 trillion a month earlier. The update tracks a sharp rebound in technology-linked fortunes and changing positions among the world’s biggest private wealth holders.",
    category: "Wealth",
    source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/forbeswealthteam/article/the-top-ten-richest-people-in-the-world/",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "eu-yan-sang-family-bishopsgate-bungalow-sale-2026",
    title: "Singapore’s Bishopsgate Sees a S$40 Million Family Bungalow Sale",
    summary: "Caproasia reports that family members of Eu Yan Sang International sold a Bishopsgate bungalow near Orchard Road for S$40 million. The buyer is reported to be a family member of Nippon Paint co-president Wee Siew Kim, underlining continued activity in Singapore’s tightly held prime-residential market.",
    category: "Real Estate",
    source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/09/05/singapore-based-traditional-chinese-medicine-group-eu-yan-sang-international-family-members-sell-singapore-bungalow-near-shopping-district-orchard-road-bishopsgate-for-32-million-s40-million-to/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "johor-royal-family-singapore-land-development-2026",
    title: "Johor Royal Family’s Singapore Land Draws Focus on Prime Development",
    summary: "Caproasia reports on plans involving 16.6 hectares near Singapore’s Holland Road and Tyersall Avenue that have been held by Johor’s royal family for more than a century. The report highlights the scale, taxation and residential-development implications surrounding one of the city-state’s most closely watched private landholdings.",
    category: "Real Estate",
    source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/09/05/malaysia-billionaire-king-johor-state-ruler-sultan-ibrahim-iskandar-eldest-son-tunku-ismail-sultan-ibrahim-may-need-to-pay-1-6-billion-of-tax-for-selling-16-6-hectares-of-land-in-singapore-after/",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "lurssen-project-elusive-superyacht-sale-2030-delivery",
    title: "Lürssen’s 122.5-Metre Project Elusive Is Sold for 2030 Delivery",
    summary: "BOAT International reports that Moran Yacht & Ship has announced the sale of the in-build 122.5-metre Lürssen Project Elusive. Construction is already under way in Bremen, with delivery scheduled for 2030, signalling sustained demand at the very top of the new-build market.",
    category: "Superyachts",
    source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/biggest-yachting-news-stories-august-2026",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "delta-marine-zembra-explorer-yacht-launch-2026",
    title: "Delta Marine Launches Explorer Yacht Zembra for Global Cruising",
    summary: "BOAT International reports that Delta Marine has launched the 46.3-metre explorer yacht Zembra in Seattle. Commissioned in 2023 for experienced owners, the vessel includes a helicopter landing area, an amphibious aircraft and a submersible for remote cruising.",
    category: "Superyachts",
    source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/delta-marine-project-zembra-superyacht-launch",
    imageUrl: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "ikonic-yachts-family-office-ownership-model-2026",
    title: "Ikonic Yachts Brings a Family-Office Lens to Ownership",
    summary: "Forbes reports that Ikonic Yachts is positioning acquisition, sale, charter and management as an integrated advisory service for UHNW families. The firm says its Sovereign platform supports valuation, cost, risk and compliance discussions using historical operating data.",
    category: "Family Offices",
    source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/jefffromm/2026/09/01/ultra-high-net-worth-users-get-a-family-office-view-to-super-yachts/",
    imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "los-angeles-private-jet-tax-assessments-2026",
    title: "Los Angeles Steps Up Private-Jet Tax Assessments",
    summary: "The Los Angeles Times reports that the county issued assessments to hundreds of private-aircraft owners after using aircraft-location data to identify planes it says had escaped taxation. The report identifies notices tied to high-profile owners and projects roughly $38 million in additional county revenue.",
    category: "Aviation",
    source: "Los Angeles Times",
    articleUrl: "https://www.latimes.com/california/story/2026-09-02/la-county-tax-collector-celebrity-jets",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "monterey-car-week-762-million-next-generation-collectors",
    title: "Monterey Car Week’s $762 Million Result Signals a New Collector Class",
    summary: "Art & Object reports that five auction houses recorded $762 million in sales during Monterey Car Week, ahead of the prior high set in 2022. The analysis points to increased demand for modern supercars, with 11 vehicles selling for more than $10 million.",
    category: "Automotive",
    source: "Art & Object",
    articleUrl: "https://www.artandobject.com/news/next-generation-collectors-reshape-montereys-762-million-car-week",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "art-market-billionaire-concentration-research-2026",
    title: "Research Warns That Trophy Art Is Becoming Ever More Billionaire-Dependent",
    summary: "The Art Newspaper reports on research linking greater wealth concentration to a more top-heavy art market. It says fewer than 0.3% of lots accounted for almost 45% of global auction value in 2025, while a small pool of ultra-wealthy buyers increasingly sets the pace for trophy works.",
    category: "Art",
    source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "family-offices-luxury-auto-marketplace-investment-2026",
    title: "Family Offices Back Mobility, Social Commerce and Luxury Autos",
    summary: "The FO Pro reports that family offices deployed capital this week across mobility, social shopping and the luxury-automotive market. The roundup includes a strategic investment in duPont REGISTRY Group by the family office of Vantage Data Centers chief executive Sureel Choksi.",
    category: "Family Offices",
    source: "The FO Pro",
    articleUrl: "https://thefopro.com/deal-round-up-family-offices-back-a-mobility-platform-a-social-shopping-app-and-a-luxury-auto-marketplace/",
    imageUrl: "https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "indian-family-offices-private-capital-evolution-2026",
    title: "Indian Family Offices Shift from Wealth Preservation to Private Capital",
    summary: "Julius Baer’s latest playbook describes Indian family offices as becoming more professionalised, globally connected allocators of private capital. The report cites growing interest in alternatives, direct investments, AI-enabled operations and cross-border structures as wealth transfers to younger generations.",
    category: "Family Offices",
    source: "Julius Baer",
    articleUrl: "https://www.juliusbaer.com/en/insights/wealth-insights/family/india-family-office-report/",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "club-med-ipo-fosun-premium-resort-strategy-2026",
    title: "Fosun’s Club Med IPO Plan Keeps Premium Resorts in Focus",
    summary: "Caproasia reports that Club Med, owned by billionaire Guo Guangchang’s Fosun Tourism Group, has filed for a Hong Kong IPO. The proposed listing places a premium all-inclusive resort platform at the centre of a wider strategy to monetise a high-end global travel business.",
    category: "Luxury",
    source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/09/01/china-billionaire-guo-guangchang-fosun-tourism-group-subsidiary-premium-all-inclusive-resorts-club-med-files-hong-kong-ipo-plans-ipo-2026-2h-or-2027-to-raise-500-million-fosun-led-investor-group-ac/",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
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
    if (article.publishedAt.toISOString() !== "2026-09-05T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
    if (!article.title || !article.summary || !article.source || !article.articleUrl) throw new Error(`Missing required field: ${article.slug}`);
    slugs.add(article.slug);
  }
}

if (process.env.NEWS_VALIDATE_ONLY !== "1") {
  try {
    validateBatch();
    const secret = new TextEncoder().encode(requireEnv("JWT_SECRET"));
    const now = Math.floor(Date.now() / 1000);
    const token = await new SignJWT({ openId: requireEnv("OWNER_OPEN_ID"), appId: requireEnv("VITE_APP_ID"), name: process.env.OWNER_NAME || "Billionaire Collection Owner" })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt(now)
      .setExpirationTime(now + 300)
      .sign(secret);
    const response = await fetch(LIVE_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify(superjson.serialize(articles)),
    });
    const responseText = await response.text();
    if (!response.ok) throw new Error(`Live tRPC request failed with HTTP ${response.status}: ${responseText}`);
    console.log(JSON.stringify({ success: true, count: articles.length, response: responseText }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-05.error.log", `${new Date().toISOString()} ${message}\n`);
    console.error(message);
    process.exitCode = 1;
  }
}
