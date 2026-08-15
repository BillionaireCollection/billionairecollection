import { writeFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-08-15T00:00:00.000Z");

export const articles = [
  {
    slug: "great-things-family-office-20-percent-philanthropy-model",
    title: "Great Things Family Office Makes a 20% Giving Rule Central to Its Model",
    summary: "Nutrafol co-founder Giorgos Tsetis says his Great Things family office allocates at least 20% of annual net realised profits to philanthropy. CNBC reports that the firm has invested nearly $40 million and committed about $7 million to nonprofits over the past 18 months, combining venture-style pace with a formal giving framework.",
    category: "Family Offices",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/13/family-office-giorgos-tsetis-nutrafol.html",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "hillsborough-villa-de-verano-ai-wealth-record-sale",
    title: "AI Wealth Drives $70 Million Hillsborough Estate Record",
    summary: "A Lake Como-inspired Hillsborough estate has sold for $70 million to a buyer reported to work in artificial intelligence, setting a record for the town and Northern California in 2026. The Guardian reports that the 12-acre Villa de Verano transaction reflects increasing demand for off-market ultra-luxury homes around Silicon Valley.",
    category: "Real Estate",
    source: "The Guardian",
    articleUrl: "https://www.theguardian.com/us-news/2026/aug/12/san-francisco-70m-estate",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "wheels-up-fraser-yachts-private-jet-yacht-charter-partnership",
    title: "Wheels Up and Fraser Yachts Combine Private Air and Yacht Planning",
    summary: "Wheels Up and Fraser Yachts have announced a collaboration designed to coordinate private aviation, helicopter and selected seaplane transfers with bespoke yacht-charter itineraries. The partnership gives clients access to Fraser’s charter network while extending Wheels Up’s lifestyle offering across air and sea.",
    category: "Aviation",
    source: "Wheels Up / PR Newswire",
    articleUrl: "https://www.prnewswire.com/news-releases/wheels-up-and-fraser-yachts-partner-to-deliver-seamless-private-jet-to-yacht-luxury-experiences-302849128.html",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "mclaren-mcl-6gt-manual-supercar-concept-2026",
    title: "McLaren Previews a Manual-Gearbox Supercar for 2028",
    summary: "McLaren has revealed the McL 6GT concept, a prototype that previews the marque’s first production car with a manual gearbox since the F1. Robb Report says the Monterey Car Week display points to a limited, heritage-inspired model expected later this decade with a reported $1.5 million price point.",
    category: "Automotive",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/mclaren-mcl-6gt-concept-manual-transmission-1238555078/",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "bmw-art-cars-munich-exhibition-2026",
    title: "BMW Brings All 20 Art Cars Together in Munich",
    summary: "BMW Welt is presenting all 20 BMW Art Cars in one location through the end of August, bringing works associated with artists including Alexander Calder, Andy Warhol, David Hockney and Julie Mehretu together. The exhibition marks the culmination of the collection’s 50th-anniversary world tour.",
    category: "Art",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/bmw-art-cars-exhibition-munich-1238529706/",
    imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "wanderlust95-hybrid-explorer-yacht-concept",
    title: "Wanderlust95 Reimagines the Compact Hybrid Explorer Yacht",
    summary: "DYDXL Design Forge has presented Wanderlust95, a 32.49-metre hybrid explorer-yacht concept with a diesel-electric propulsion system and battery-supported silent cruising. Robb Report notes that the design concentrates pool, beach-club and social areas into a 106-foot platform conceived for long-range discovery.",
    category: "Superyachts",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/marine/dydxl-design-forge-wanderlust95-yacht-1238554363/",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "amina-mesh-digital-assets-client-experience",
    title: "AMINA Uses Payments-Network Integration to Streamline Digital Assets",
    summary: "Swiss banking group AMINA is integrating the Mesh payments network to reduce friction for clients holding and trading digital assets. WealthBriefing reports that the initiative is part of the bank’s wider effort to improve the client journey as wealth firms expand digital-asset capability.",
    category: "Technology",
    source: "WealthBriefing",
    articleUrl: "https://www.wealthbriefing.com/html/index.php/bluray/article.php?id=208445",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "private-operating-foundations-collectible-legacy-planning",
    title: "Private Operating Foundations Offer Collectors a Legacy Structure",
    summary: "Family Wealth Report examines how private operating foundations can preserve and display fine art, classic automobiles, rare books and other significant collections beyond an owner’s lifetime. The article highlights the governance, tax, insurance, estate-planning and real-estate work required to establish a durable public-facing collection structure.",
    category: "Philanthropy",
    source: "Family Wealth Report",
    articleUrl: "https://www.familywealthreport.com/article.php/Turning-A-Collection-Into-A-Legacy:-How-To-Create-And-Fund-A-Private-Operating-Foundation",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "monterey-car-week-auctions-500-million-younger-buyers",
    title: "Monterey Car Week Auctions Eye a $500 Million Collector-Car Week",
    summary: "CNBC reports that Monterey Car Week auctions could approach $500 million, supported by younger buyers moving into the collector market and a broad roster of headline lots. The concentration of auctions, concours events and new-model debuts continues to make Monterey a key price-discovery moment for high-value automobiles.",
    category: "Markets",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/13/monterey-car-week-auctions-sales-estimates.html",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "lamborghini-revuelto-sv-hybrid-flagship-2026",
    title: "Lamborghini Reveals the Revuelto SV as Its New Flagship Hybrid",
    summary: "Lamborghini has unveiled the Revuelto SV, positioning the hybrid V12 as its most powerful production model to date. CNBC reports that the limited flagship arrives as performance marques use Monterey Car Week to showcase low-volume models for collectors seeking both design distinction and modern hybrid engineering.",
    category: "Automotive",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/14/lamborghini-revuelto-sv-hybrid-price.html",
    imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "elena-of-london-saint-tropez-regatta-charter-sale",
    title: "Elena of London Offers a Saint-Tropez Regatta Charter Experience",
    summary: "The 180-foot sailing yacht Elena of London is being offered for charter around Les Voiles de Saint-Tropez, where guests can take part in a landmark Mediterranean regatta. The offering illustrates sustained demand for participation-led charter experiences that combine historic sailing pedigree with luxury hospitality.",
    category: "Superyachts",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/marine/elena-of-london-sailing-yacht-charter-regatta-1238553128/",
    imageUrl: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "ultra-luxury-concierge-demand-connected-air-sea-travel",
    title: "Connected Air-and-Sea Itineraries Reshape Luxury Concierge Demand",
    summary: "The new Wheels Up and Fraser Yachts collaboration reflects an increasing preference among global luxury travellers for a single coordinated itinerary rather than separate aviation, marine and ground arrangements. Its combined concierge model pairs private flight options with yacht brokerage expertise, transfers and destination access.",
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

try {
  const jwtSecret = new TextEncoder().encode(requireEnv("JWT_SECRET"));
  const ownerOpenId = requireEnv("OWNER_OPEN_ID");
  const appId = requireEnv("VITE_APP_ID");
  const now = Math.floor(Date.now() / 1000);
  const sessionToken = await new SignJWT({
    openId: ownerOpenId,
    appId,
    name: process.env.OWNER_NAME || "Billionaire Collection Owner",
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + 300)
    .sign(jwtSecret);

  const response = await fetch(LIVE_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify(superjson.serialize(articles)),
  });
  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Live tRPC request failed with HTTP ${response.status}: ${responseText}`);
  }
  console.log(JSON.stringify({ success: true, count: articles.length, response: responseText }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await writeFile("/tmp/billionaire-collection-news-upsert-2026-08-15.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
