import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-08-12T00:00:00.000Z");

const articles = [
  {
    slug: "ubs-global-wealth-report-2026-personal-wealth-growth",
    title: "UBS: Global Personal Wealth Rose 10.8% in 2025",
    summary: "UBS reports that global personal wealth rose 10.8% in US-dollar terms during 2025, extending a third consecutive year of expansion. The bank estimates that roughly one million new millionaires were created, with the United States accounting for almost half of that increase.",
    category: "Wealth",
    source: "UBS",
    articleUrl: "https://www.ubs.com/us/en/wealth-management/insights/global-wealth-report.html",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "california-wealth-tax-proposition-40-uhnw-planning",
    title: "California Wealth-Tax Proposal Returns to the UHNW Planning Agenda",
    summary: "California voters are set to decide in November whether to impose a one-time 5% wealth tax on billionaires resident in the state as of 1 January 2026. Advisors quoted by ThinkAdvisor point to advance planning around real estate ownership and philanthropic structures, while cautioning that the proposal's prospects remain uncertain.",
    category: "Markets",
    source: "ThinkAdvisor",
    articleUrl: "https://www.thinkadvisor.com/2026/08/11/how-uhnw-clients-can-brace-for-a-potential-california-wealth-tax/",
    imageUrl: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "hillsborough-estate-70-million-northern-california-record",
    title: "Hillsborough Estate Sells for $70 Million, Setting a 2026 Northern California Record",
    summary: "A 12,000-square-foot Hillsborough estate has traded for $70 million, the highest Northern California home sale reported so far in 2026 and a new record for the town. The 12-acre compound includes a main residence, guest house, sports pavilion and multiple recreational facilities; the buyer reportedly works in artificial intelligence.",
    category: "Real Estate",
    source: "ABC7 News",
    articleUrl: "https://abc7news.com/post/hillsborough-estate-sells-record-70-million-highest-northern-california-sale-2026/19637589/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "dearsan-delivers-queen-yaz-50m-superyacht",
    title: "Dearsan Delivers Its 50-Metre Flagship Superyacht, Queen Yaz",
    summary: "Turkish builder Dearsan Shipyard has delivered its 50.2-metre flagship Queen Yaz to her owner. The Red Yacht Design project centres outdoor entertaining around a Jacuzzi-equipped sundeck and a swim platform with unfolding bulwarks, while accommodating a modern, social onboard layout.",
    category: "Superyachts",
    source: "Boat International",
    articleUrl: "https://www.boatinternational.com/yachts/news/50m-yacht-queen-yaz-dearsan-shipyard-red-yacht-design-delivery",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "kismet-west-mediterranean-charter-availability-2026",
    title: "122-Metre Kismet Opens Late-Summer West Mediterranean Charter Dates",
    summary: "Lürssen's 122-metre Kismet has announced availability in the West Mediterranean from 24 August to 30 September. The 2024-delivered yacht accommodates 12 guests across eight cabins with a 36-person crew, alongside dedicated wellness, entertainment and watersports facilities.",
    category: "Luxury",
    source: "YachtCharterFleet",
    articleUrl: "https://www.yachtcharterfleet.com/news/122m-superyacht-charter-kismet-announces-late-summer-availability-in-the-west-mediterranean",
    imageUrl: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "private-aviation-tax-guide-2026-bonus-depreciation",
    title: "Private Aviation: 2026 Tax Rules Put Documentation at the Centre of Ownership Decisions",
    summary: "A new 2026 private-aviation tax guide highlights the distinction between aircraft ownership, fractional shares, jet cards and on-demand charter. It notes that qualifying owners may be eligible for 100% first-year bonus depreciation, subject to business-use requirements and rigorous contemporaneous flight documentation.",
    category: "Aviation",
    source: "Magellan Jets",
    articleUrl: "https://magellanjets.com/resources/dossier/private-aviation-financial-strategies-and-tax-guide-for-2026/",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "ferrari-288-gto-rm-sothebys-monterey-2026",
    title: "Low-Mileage Ferrari 288 GTO Could Bring Up to $11 Million at Monterey",
    summary: "RM Sotheby's is offering a 1985 Ferrari 288 GTO with 958 miles at its Monterey sale, where the car carries a $9 million to $11 million estimate. The Rosso Corsa example is chassis 99 of 272 built and is among six or fewer 288 GTOs believed to remain below 1,000 miles.",
    category: "Automotive",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/cars/pristine-ferrari-288-gto-halo-car-auction-1238534651/",
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "auction-houses-first-half-2026-art-market-collector-services",
    title: "Art Auction Houses Pair Strong First-Half Sales With a Broader Collector-Services Model",
    summary: "ARTnews reports that Christie's posted $4.5 billion in first-half sales, Sotheby's reached a record $4.4 billion and Phillips recorded $507 million in auction sales. The analysis argues that lending, private sales, advisory and luxury services are becoming as central to the leading houses' strategies as the evening auction room.",
    category: "Art",
    source: "ARTnews",
    articleUrl: "https://www.artnews.com/art-news/market/auction-house-h1-results-art-market-analysis-2026-1234792333/",
    imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "philanthropy-ai-flexible-giving-structures-2026",
    title: "AI's Rapid Development Raises the Case for More Flexible Philanthropic Structures",
    summary: "Wealth Management argues that faster technological change is reshaping long-horizon charitable planning for high-net-worth families. The article recommends keeping intended beneficiaries and gift structures adaptable as AI may change the needs, institutions and solutions that philanthropy seeks to support.",
    category: "Philanthropy",
    source: "Wealth Management",
    articleUrl: "https://www.wealthmanagement.com/philanthropy/philanthropy-in-the-age-of-ai",
    imageUrl: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "seia-tax-division-family-office-services-2026",
    title: "SEIA Adds Tax Division and Expands Family-Office Capabilities",
    summary: "Los Angeles-based $32.6 billion RIA Signature Estate & Investment Advisors has launched SEIA Tax Services and appointed Tim Gacsy to lead the new division. Its partnership with Baker Tilly Family Office expands support for multigenerational wealth, business ownership, liquidity events, governance and fiduciary accounting.",
    category: "Family Offices",
    source: "Wealth Management",
    articleUrl: "https://www.wealthmanagement.com/ria-news/seia-launches-tax-division-expands-family-office-services",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "ai-provenance-quantumspace-art-forgery-2026",
    title: "AI Provenance Tools Gain Ground in High-Value Art Authentication",
    summary: "ARTnews reports that QuantumSpace is using knowledge graphs to connect provenance, conservation, scientific and visual records in support of art authentication. The approach is designed to complement expert connoisseurship and give collectors, museums and dealers stronger evidence for high-value attribution decisions.",
    category: "Technology",
    source: "ARTnews",
    articleUrl: "https://www.artnews.com/art-news/news/museums-team-up-buy-artworks-new-ai-startup-tackles-art-forgery-more-morning-links-august-5-2026-1234794321/",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "time-to-drive-miami-collector-event-2026",
    title: "Miami's Time to Drive Will Unite Car and Watch Collectors This November",
    summary: "Time to Drive, a new Miami event founded by Lex Borrero and Perri Dash, will run from 6 to 8 November with automotive, watch, hospitality and collector programming. The inaugural format will bring together exhibitions, brand activations, collector gatherings and a separately ticketed historic track day.",
    category: "Luxury",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/style/watch-collector/time-to-drive-miami-event-for-watch-and-car-enthusiasts-1238537490/",
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

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

const payload = superjson.serialize(articles);
const response = await fetch(LIVE_ENDPOINT, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${sessionToken}`,
  },
  body: JSON.stringify(payload),
});

const responseText = await response.text();
if (!response.ok) {
  throw new Error(`Live tRPC request failed with HTTP ${response.status}: ${responseText}`);
}

console.log(responseText);
