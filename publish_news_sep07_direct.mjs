import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-07T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "manhattan-six-figure-luxury-rentals-pied-a-terre-tax-2026",
    title: "Manhattan’s Six-Figure Luxury Rentals Rise as Pied-à-Terre Tax Reshapes Demand",
    summary: "Fox Business reports that seven times as many Manhattan apartments are now commanding monthly rents above $100,000 compared with the prior year. Market participants are assessing how the city’s new pied-à-terre tax could encourage some wealthy second-home users to rent rather than buy.",
    category: "Real Estate", source: "Fox Business",
    articleUrl: "https://www.foxbusiness.com/real-estate/luxury-real-estate-ceo-gives-blunt-response-nyc-rents-soar-over-100k-amid-new-pied-a-terre-tax",
    imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "los-angeles-private-jet-tax-assessments-2026",
    title: "Los Angeles County Targets Private-Jet Taxes Using Flight Data",
    summary: "The Los Angeles Times reports that the county has issued hundreds of tax bills to private-aircraft owners it says did not pay local assessments. The programme uses aircraft-location information to identify jets habitually situated in the county, with officials expecting additional public revenue.",
    category: "Aviation", source: "Los Angeles Times",
    articleUrl: "https://www.latimes.com/california/story/2026-09-02/la-county-tax-collector-celebrity-jets",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ikonic-yachts-family-office-advisory-model-2026",
    title: "Ikonic Yachts Brings a Family-Office Model to Superyacht Ownership",
    summary: "Forbes reports that Ikonic Yachts is positioning its acquisition, charter, sale and management services as a coordinated advisory platform for UHNW owners. Its Sovereign data platform is intended to provide visibility into operating costs, valuation, risk and compliance alongside lifestyle planning.",
    category: "Family Offices", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/jefffromm/2026/09/01/ultra-high-net-worth-users-get-a-family-office-view-to-super-yachts/",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "lurssen-project-elusive-sale-2030-delivery-2026",
    title: "Lürssen’s 122.5-Metre Project Elusive Is Sold for 2030 Delivery",
    summary: "BOAT International reports that Moran Yacht & Ship announced the sale of the 122.5-metre Lürssen Project Elusive while the yacht remains under construction in Germany. The deal points to continued demand for the largest, bespoke yachts with long construction lead times.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/biggest-yachting-news-stories-august-2026",
    imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "tankoa-tx450-custom-superyacht-launch-2026",
    title: "Tankoa Launches a Fully Custom 148-Foot Superyacht",
    summary: "Robb Report says Tankoa has launched the bespoke TX450, a 148-foot yacht created for an experienced owner from the Middle East. The launch underscores continued appetite for one-off builds tailored around a principal’s individual operating and hospitality requirements.",
    category: "Superyachts", source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/marine/tankoa-custom-tx450-superyacht-launch-1238616499/",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "baz-mobu-atrium-superyacht-concept-2026",
    title: "A 12-Foot Atrium Anchors the New Mobu Superyacht Concept",
    summary: "Robb Report reports that BAZ Yacht Design’s 108-foot Mobu concept is designed around a 12-foot atrium. The interior architecture seeks to create a sense of scale and openness rarely associated with a yacht of that size.",
    category: "Superyachts", source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/marine/baz-yacht-design-mobu-superyacht-concept-1238617810/",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monterey-car-week-762-million-collector-market-2026",
    title: "Monterey Car Week’s $762 Million Result Signals a New Collector Era",
    summary: "Art & Object reports that five auction houses generated a combined $762 million at Monterey Car Week, materially ahead of the previous record. The results point to strong interest in modern supercars, with 11 vehicles clearing $10 million and younger collectors increasingly shaping demand.",
    category: "Automotive", source: "Art & Object",
    articleUrl: "https://www.artandobject.com/news/next-generation-collectors-reshape-montereys-762-million-car-week",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "trophy-art-billionaire-collector-concentration-2026",
    title: "Trophy Art’s Reliance on Billionaire Buyers Deepens",
    summary: "The Art Newspaper reports that fewer than 0.3% of auction lots accounted for nearly 45% of global auction value in 2025. New research links the market’s concentration at the very top to a narrow group of ultra-wealthy collectors and wider wealth inequality.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "bny-uhnw-great-wealth-transfer-multidecade-2026",
    title: "BNY Says UHNW Wealth Transfer May Be a Multi-Decade Transition",
    summary: "Spear’s reports that BNY Wealth research identifies family dynamics, tax and regulatory uncertainty, and longevity planning as key factors in the timing of UHNW wealth transfer. The report also highlights a gap between intentions and completed succession conversations with the next generation.",
    category: "Family Offices", source: "Spear’s",
    articleUrl: "https://spearswms.com/wealth/uhnw-great-wealth-transfer-could-take-decades-bny-says/",
    imageUrl: "https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "coefficient-giving-one-billion-ai-philanthropy-2026",
    title: "Coefficient Giving Raises Its Global-Health Commitment to $1 Billion",
    summary: "The Chronicle of Philanthropy reports that Coefficient Giving increased its 2026 commitment to GiveWell-recommended global-health groups from $175 million to $1 billion. The organisation is preparing grantees for the possibility that future AI wealth creation could substantially expand philanthropic capacity.",
    category: "Philanthropy", source: "The Chronicle of Philanthropy",
    articleUrl: "https://www.philanthropy.com/news/coefficient-giving-boosts-pledge-to-1-billion-banking-on-an-ai-windfall/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "forbes-august-2026-top-ten-fortunes-technology-wealth",
    title: "Forbes Tracks Major Technology-Driven Shifts Among the World’s Richest",
    summary: "Forbes’ latest top-ten wealth analysis records substantial changes in the fortunes of leading technology founders as public-market valuations move. The update illustrates the scale at which technology, cloud infrastructure and AI-linked companies continue to shape the global wealth ranking.",
    category: "Wealth", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/forbeswealthteam/article/the-top-ten-richest-people-in-the-world/",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-billionaires-private-jet-superyacht-luxury-boom-2026",
    title: "AI-Created Fortunes Are Lifting Demand for Private Jets and Superyachts",
    summary: "Yahoo Finance reports that luxury-travel demand is strengthening even as broader consumer spending becomes more cautious. The analysis links part of the momentum to a new cohort of AI-fuelled fortunes seeking time-saving aviation and high-end yachting experiences.",
    category: "Luxury", source: "Yahoo Finance",
    articleUrl: "https://finance.yahoo.com/economy/articles/us-shoppers-pull-back-ai-181500695.html",
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
  if (articles.filter(article => article.isFeatured).length !== 2) throw new Error("Expected exactly 2 featured articles");
  const slugs = new Set();
  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`Invalid slug: ${article.slug}`);
    if (slugs.has(article.slug)) throw new Error(`Duplicate slug: ${article.slug}`);
    if (!allowedCategories.has(article.category)) throw new Error(`Invalid category: ${article.category}`);
    if (!/^https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9-]+\?w=800&q=80$/.test(article.imageUrl)) throw new Error(`Invalid Unsplash URL: ${article.slug}`);
    if (article.publishedAt.toISOString() !== "2026-09-07T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
    const responseText = await response.text();
    if (!response.ok) throw new Error(`Live tRPC request failed with HTTP ${response.status}: ${responseText}`);
    console.log(JSON.stringify({ success: true, count: articles.length, response: responseText }));
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-07.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
