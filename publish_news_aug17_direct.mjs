import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-08-17T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "great-things-family-office-20-percent-philanthropy-model-2026",
    title: "Great Things Family Office Places a 20% Giving Rule at Its Core",
    summary: "Nutrafol co-founder Giorgos Tsetis says his Great Things family office allocates at least 20% of annual net realised profits to philanthropy. CNBC reports that the firm has invested nearly $40 million and committed about $7 million to nonprofits over the past 18 months, combining venture-style pace with a formal giving framework.",
    category: "Family Offices",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/13/family-office-giorgos-tsetis-nutrafol.html",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "hillsborough-villa-de-verano-ai-wealth-record-sale-2026-08-17",
    title: "AI Wealth Helps Set a $70 Million Hillsborough Estate Record",
    summary: "A Lake Como-inspired Hillsborough estate has sold for $70 million to a buyer reported to work in artificial intelligence, setting a record for the town and Northern California in 2026. The Guardian reports that the 12-acre Villa de Verano transaction reflects continuing demand for ultra-prime homes around Silicon Valley.",
    category: "Real Estate",
    source: "The Guardian",
    articleUrl: "https://www.theguardian.com/us-news/2026/aug/12/san-francisco-70m-estate",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "lurssen-whisper-149-million-superyacht-market-2026",
    title: "Lürssen’s 95-Metre Whisper Joins the Market at €149 Million",
    summary: "The 95.2-metre Lürssen superyacht Whisper has been listed for sale after a 2025 interior refit. BOAT International reports that the yacht is asking €149 million and will be available for inspection around the Monaco Yacht Show, as limited supply keeps large Northern European yachts in focus.",
    category: "Superyachts",
    source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yacht-market-intelligence/brokerage-sales-news/95m-lurssen-motor-yacht-whisper-for-sale",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "wheels-up-fraser-yachts-private-jet-yacht-charter-partnership-2026",
    title: "Wheels Up and Fraser Yachts Link Private Aviation With Charter",
    summary: "Wheels Up and Fraser Yachts have announced a collaboration designed to coordinate private aviation, helicopter and selected seaplane transfers with bespoke yacht-charter itineraries. The partners describe a consultative air-and-sea model that extends from private flights to dockside arrivals and charter brokerage.",
    category: "Aviation",
    source: "Wheels Up / PR Newswire",
    articleUrl: "https://www.prnewswire.com/news-releases/wheels-up-and-fraser-yachts-partner-to-deliver-seamless-private-jet-to-yacht-luxury-experiences-302849128.html",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "lamborghini-revuelto-sv-limited-hybrid-2026",
    title: "Lamborghini Unveils a 1,963-Unit Revuelto SV Hybrid",
    summary: "Lamborghini has revealed the Revuelto SV, a limited hybrid V12 model capped at 1,963 cars and starting at $741,172. CNBC reports that the car produces more than 1,050 horsepower, combining three electric motors with the marque’s naturally aspirated V12 for a collector-focused flagship.",
    category: "Automotive",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/14/lamborghini-revuelto-sv-hybrid-price.html",
    imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "bmw-art-cars-munich-50th-anniversary-exhibition-2026",
    title: "BMW Unites Its 20 Art Cars in Munich for a 50th-Anniversary Show",
    summary: "BMW Welt is presenting all 20 BMW Art Cars together through the end of August, uniting works associated with artists including Alexander Calder, Andy Warhol, David Hockney and Julie Mehretu. The exhibition concludes the collection’s 50th-anniversary world tour and connects automotive design with blue-chip contemporary art.",
    category: "Art",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/bmw-art-cars-exhibition-munich-1238529706/",
    imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "private-operating-foundations-collectible-legacy-planning-2026",
    title: "Private Operating Foundations Offer Collectors a Long-Term Legacy Structure",
    summary: "Family Wealth Report examines how private operating foundations can preserve and display fine art, classic automobiles, rare books and other significant collections beyond an owner’s lifetime. The report highlights governance, tax, insurance, estate-planning and real-estate work required to create a durable public-facing collection structure.",
    category: "Philanthropy",
    source: "Family Wealth Report",
    articleUrl: "https://www.familywealthreport.com/article.php/Turning-A-Collection-Into-A-Legacy:-How-To-Create-And-Fund-A-Private-Operating-Foundation",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "amina-mesh-digital-assets-client-experience-2026",
    title: "AMINA Expands Digital-Asset Client Infrastructure Through Mesh",
    summary: "Swiss banking group AMINA is integrating the Mesh payments network to reduce friction for clients holding and trading digital assets. WealthBriefing reports that the initiative forms part of the bank’s wider effort to improve the wealth-management journey as clients seek more mature digital-asset capability.",
    category: "Technology",
    source: "WealthBriefing",
    articleUrl: "https://www.wealthbriefing.com/html/index.php/bluray/article.php?id=208445",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "monterey-car-week-500-million-collector-market-2026",
    title: "Monterey Car Week Auctions Target a Record $500 Million",
    summary: "CNBC reports that collector-car auctions during Monterey Car Week could reach $470 million to $500 million, potentially exceeding the previous record. Younger buyers are driving demand for modern supercars, while market data show sharply diverging performance between heritage classics and late-20th-century performance models.",
    category: "Markets",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/13/monterey-car-week-auctions-sales-estimates.html",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "family-offices-clean-energy-sustainability-direct-investment-2026",
    title: "Family Offices Sustain Direct Investment in Clean-Energy Startups",
    summary: "Ultrawealthy family offices made 57 direct investments in July, according to Fintrx data cited by CNBC, with more than 15% directed to clean-energy and sustainability companies. The activity highlights how family offices are pairing long-term capital with themes including power demand, advanced geothermal and synthetic aviation fuel.",
    category: "Family Offices",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/06/family-offices-sustainability-startups-july-dealmaking.html",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "italian-sea-group-rescue-investor-bidding-process-2026",
    title: "The Italian Sea Group Begins a Rescue-Investor Bidding Process",
    summary: "The Italian Sea Group is exploring a sale of its shipyards and brands through a formal bidding process while restructuring discussions continue. BOAT International reports that the move places one of Italy’s high-profile yacht-building groups at the centre of a closely watched superyacht-industry transaction.",
    category: "Markets",
    source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/boat-pro/news/tisg-italian-sea-group-investors-sanlorenzo-superyacht-shipyard",
    imageUrl: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "connected-air-sea-itineraries-luxury-concierge-demand-2026",
    title: "Connected Air-and-Sea Itineraries Reshape Luxury Concierge Demand",
    summary: "The Wheels Up and Fraser Yachts collaboration reflects a preference among global luxury travellers for a single coordinated itinerary rather than separate aviation, marine and ground arrangements. Its concierge model pairs private-flight options with yacht brokerage expertise, transfers and destination access.",
    category: "Luxury",
    source: "Fraser Yachts",
    articleUrl: "https://www.fraseryachts.com/en/news-detail/fraser-yachts-partners-with-wheels-up/",
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function validateBatch() {
  if (articles.length !== 12) throw new Error("Expected exactly 12 articles");
  if (articles.filter((article) => article.isFeatured).length !== 2) throw new Error("Expected exactly 2 featured articles");
  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`Invalid slug: ${article.slug}`);
    if (!allowedCategories.has(article.category)) throw new Error(`Invalid category: ${article.category}`);
    if (!article.imageUrl.startsWith("https://images.unsplash.com/photo-")) throw new Error(`Invalid Unsplash URL: ${article.slug}`);
    if (article.publishedAt.toISOString() !== "2026-08-17T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
  }
}

try {
  validateBatch();
  const jwtSecret = new TextEncoder().encode(requireEnv("JWT_SECRET"));
  const ownerOpenId = requireEnv("OWNER_OPEN_ID");
  const appId = requireEnv("VITE_APP_ID");
  const now = Math.floor(Date.now() / 1000);
  const sessionToken = await new SignJWT({ openId: ownerOpenId, appId, name: process.env.OWNER_NAME || "Billionaire Collection Owner" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + 300)
    .sign(jwtSecret);
  const response = await fetch(LIVE_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${sessionToken}` },
    body: JSON.stringify(superjson.serialize(articles)),
  });
  const responseText = await response.text();
  if (!response.ok) throw new Error(`Live tRPC request failed with HTTP ${response.status}: ${responseText}`);
  console.log(JSON.stringify({ success: true, count: articles.length, response: responseText }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-08-17.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
