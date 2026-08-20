import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-08-19T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "new-family-offices-pivot-direct-investing-private-equity-2026-08-19",
    title: "New Family Offices Show a Strong Pivot Toward Direct Investing",
    summary: "FINTRX data reported by Family Wealth Report show that 92.7% of newly tracked family offices list interest in direct investments and 89.6% in private equity. The latest cohort also shows reduced stated interest in hedge funds and private credit, underlining an emphasis on control and operating-company exposure.",
    category: "Family Offices",
    source: "Family Wealth Report",
    articleUrl: "https://www.familywealthreport.com/article.php/New-Family-Offices-Show-Pivot-To-Direct-Investing-%E2%80%93-Data-?id=208576",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "california-proposition-40-billionaire-wealth-planning-2026-08-19",
    title: "California’s Proposition 40 Drives New UHNW Planning Conversations",
    summary: "Citywealth’s current private-wealth review frames California’s proposed Proposition 40 as a planning issue for founders and families with concentrated business, securities and intellectual-property wealth. The discussion is focusing attention on flexible multi-jurisdictional structures, trust planning and the interaction between tax exposure and asset mobility.",
    category: "Wealth",
    source: "Citywealth",
    articleUrl: "https://www.citywealthmag.com/news/american-summer-at-citywealth-california-dreaming-wealth-at-scale/",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "i-dynasty-240-million-superyacht-market-lead-2026",
    title: "I Dynasty Tops the Brokerage Market at €240 Million",
    summary: "BOAT International’s latest review of the 50 most expensive yachts for sale places the 100.8-metre I Dynasty at the top of the current market with a €240 million asking price. The Passenger Yacht Code-certified superyacht can host up to 36 guests and illustrates the scale of the nine-figure brokerage market ahead of the autumn show season.",
    category: "Superyachts",
    source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yacht-market-intelligence/brokerage-sales-news/most-expensive-yachts-for-sale",
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
    slug: "first-ferrari-luce-40-million-auction-sale-2026",
    title: "First Ferrari Luce Changes Hands for $40 Million",
    summary: "Robb Report reports that the first Ferrari Luce sold for $40 million during the collector-car week on the Monterey Peninsula. The result demonstrates the premium placed on first-production, limited-run and special-series Ferrari models by global collectors.",
    category: "Automotive",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/first-example-ferrari-luce-40-million-auction-1238562379/",
    imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "rijksmuseum-rare-seventeenth-century-drawing-book-2026",
    title: "Rijksmuseum Receives a Rare Book of 17th-Century Drawings",
    summary: "The Rijksmuseum has received a rare book of 17th-century drawings, according to ARTnews reporting carried by Robb Report. The acquisition highlights enduring institutional demand for historically important works on paper and the role of private and public collecting in preserving cultural assets.",
    category: "Art",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/shelter/art-collectibles/rijksmuseum-rare-book-of-drawings-1238567071/",
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
    if (article.publishedAt.toISOString() !== "2026-08-19T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-08-19.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
