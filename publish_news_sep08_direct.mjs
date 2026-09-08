import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-08T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "altrata-ultra-wealth-population-forecast-2030-2026",
    title: "Altrata Forecasts a 31% Expansion in the Global Ultra-Wealthy Population",
    summary: "Altrata forecasts that the global UHNW population will reach 676,970 people by 2030, a 31% increase from H1 2025. The research frames the growth as a durable shift for private banks, luxury businesses, philanthropies and advisers serving fortunes above $30 million.",
    category: "Wealth", source: "Altrata",
    articleUrl: "https://altrata.com/articles/who-are-the-ultra-wealthy-in-2026-how-is-that-population-changing-and-what-do-organizations-engaging-them-need-to-know",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "forbes-top-ten-richest-technology-fortunes-september-2026",
    title: "Forbes Tracks Technology’s Continued Grip on the World’s Largest Fortunes",
    summary: "Forbes’ latest top-ten wealth ranking shows how public-market moves continue to reshape the fortunes of leading technology founders. The update highlights the scale at which AI, cloud infrastructure and platform businesses influence the global billionaire hierarchy.",
    category: "Wealth", source: "Forbes",
    articleUrl: "https://www.forbes.com/sites/forbeswealthteam/article/the-top-ten-richest-people-in-the-world/",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "palm-beach-ham-and-cheese-house-105-million-2026",
    title: "Palm Beach’s Landmark ‘Ham and Cheese House’ Lists for $105 Million",
    summary: "Robb Report reports that the landmarked Palm Beach residence known locally as the Ham and Cheese House has come to market at $105 million. The Billionaire’s Row property combines an Italian Romanesque design with a private tunnel leading toward the ocean.",
    category: "Real Estate", source: "Robb Report",
    articleUrl: "https://robbreport.com/shelter/homes-for-sale/ham-and-cheese-house-south-florida-palm-beach-1238619425/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "tribeca-warehouse-loft-68-million-2026",
    title: "A $6.8 Million Tribeca Loft Brings Warehouse Heritage to Luxury Living",
    summary: "Robb Report says a four-bedroom loft inside an 1896 Tribeca warehouse building has entered the market at $6.8 million. The updated residence retains original architectural character while serving demand for design-led Manhattan homes.",
    category: "Real Estate", source: "Robb Report",
    articleUrl: "https://robbreport.com/shelter/homes-for-sale/tribeca-loft-new-york-city-1238621493/",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "los-angeles-private-jet-tax-assessments-2026",
    title: "Los Angeles County Uses Flight Data in Private-Jet Tax Assessments",
    summary: "The Los Angeles Times reports that Los Angeles County has issued hundreds of assessments to private-aircraft owners it says did not pay local taxes. Officials use aircraft-location information to identify jets habitually situated in the county and expect additional revenue from the programme.",
    category: "Aviation", source: "Los Angeles Times",
    articleUrl: "https://www.latimes.com/california/story/2026-09-02/la-county-tax-collector-celebrity-jets",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "feadship-milky-way-delivered-to-owner-2026",
    title: "Feadship’s 89.6-Metre Milky Way Is Delivered to Its Owner",
    summary: "BOAT International reports that Feadship’s Project 828, also known as Milky Way, has left the yard following delivery. The owner’s brief called for a flexible, multi-use onboard environment that balances active living with relaxation.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/biggest-yachting-news-stories-august-2026",
    imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "poland-growth-luxury-yacht-power-player-2026",
    title: "Poland Emerges as a Quiet Power Player in Luxury Yachting",
    summary: "Robb Report examines Poland’s growing role in luxury yacht construction, led by successful launches and builders including Sunreef. The shift illustrates how specialist craftsmanship and design capability are broadening the geography of premium yacht production.",
    category: "Superyachts", source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/marine/lists/poland-luxury-yachts-1238609579/",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "isa-fast-naan-first-viper-130-launch-2026",
    title: "ISA Launches the First Viper 130, Fast Naan, Ahead of Cannes",
    summary: "BOAT International reports that ISA Yachts has launched Fast Naan, the first 38.8-metre unit from its Viper 130 series. The yacht is scheduled for its public debut at the Cannes Yachting Festival, with the model built for performance-led Mediterranean cruising.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/biggest-yachting-news-stories-august-2026",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monterey-car-week-762-million-collector-market-2026",
    title: "Monterey Car Week’s $762 Million Result Signals a New Collector Era",
    summary: "Art & Object reports that five auction houses generated a combined $762 million during Monterey Car Week, with 11 cars achieving prices above $10 million. The result points to strong demand for high-calibre modern supercars as younger collectors exert more influence on the market.",
    category: "Automotive", source: "Art & Object",
    articleUrl: "https://www.artandobject.com/news/next-generation-collectors-reshape-montereys-762-million-car-week",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "trophy-art-billionaire-collector-concentration-2026",
    title: "Trophy Art’s Reliance on Billionaire Buyers Deepens",
    summary: "The Art Newspaper reports that fewer than 0.3% of auction lots accounted for almost 45% of global auction sales by value in 2025. New research links the concentration at the market’s top end to a narrower group of ultra-wealthy collectors and wider wealth inequality.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "family-offices-speeding-up-philanthropic-impact-2026",
    title: "Family Offices Are Pushing for Faster, More Flexible Philanthropy",
    summary: "Dwealth.news argues that family offices can move rapidly when urgent social or humanitarian needs emerge. The analysis positions their governance structures and private-capital flexibility as potential advantages in coordinating targeted philanthropic action.",
    category: "Philanthropy", source: "Dwealth.news",
    articleUrl: "https://dwealth.news/2026/09/family-offices-speeding-up-philantropic-impact/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-billionaires-private-jet-superyacht-luxury-boom-2026",
    title: "AI-Created Fortunes Are Lifting Demand for Private Jets and Superyachts",
    summary: "Yahoo Finance reports that luxury providers are seeing stronger demand from a new cohort of AI-fuelled fortunes, even as broader consumer spending weakens. The analysis identifies private aviation, yachting and supercars as areas being reshaped by clients seeking discretion, efficiency and tailored experiences.",
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
    if (article.publishedAt.toISOString() !== "2026-09-08T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-08.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
