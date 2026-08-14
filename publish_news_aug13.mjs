import { writeFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-08-13T00:00:00.000Z");

export const articles = [
  {
    slug: "ubs-family-offices-2026-allocation-reset",
    title: "UBS: European Family Offices Prepare for a 2026 Allocation Reset",
    summary: "UBS reports that 67% of European family offices expect to change their strategic asset allocation in 2026. Artificial intelligence, infrastructure, and power and resources are the three leading themes shaping their capital plans.",
    category: "Family Offices",
    source: "UBS",
    articleUrl: "https://www.ubs.com/je/en/wealthmanagement/who-we-serve/family-office-and-uhnw/global-family-office-report.html",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "luxury-home-sales-outpace-starter-market-2026",
    title: "Luxury Home Sales Continue to Outpace the US Starter Market",
    summary: "Luxury home sales in the United States rose 6.2% year-on-year in May, according to data cited by CNBC, while starter-home sales fell 5.4%. The split illustrates how equity-market wealth and cash flexibility continue to support demand at the top end of residential property.",
    category: "Real Estate",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/08/07/housing-k-shaped-economy-luxury-starter-homes.html",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "ziff-family-pawling-estate-sale-2026",
    title: "Ziff Family Sells 1,300-Acre New York Estate for $33.32 Million",
    summary: "The Ziff family has sold its 1,300-acre Pawling estate in Dutchess County, New York, including a 55,000-square-foot mansion, for $33.32 million. Caproasia reports that the family, led by brothers Dirk, Robert and Daniel Ziff, built Ziff Brothers Investments after inheriting the former media fortune.",
    category: "Real Estate",
    source: "Caproasia",
    articleUrl: "https://www.caproasia.com/2026/08/13/united-states-ex-media-billionaire-ziff-family-with-15-billion-fortune-sells-new-york-1300-acres-estate-with-55000-sq-ft-mansion-pawling-dutchess-county-new-york-for-33-32-million-ziff-family/",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "north-american-private-aviation-july-growth",
    title: "North American Private Aviation Records Another Month of Growth",
    summary: "North American private-jet activity rose about 4.3% year-on-year in July, according to ARGUS TRAQPak data reported by Private Jet Card Comparisons. Analysts expect activity to remain positive in August, with a 3.5% year-on-year increase forecast.",
    category: "Aviation",
    source: "Private Jet Card Comparisons",
    articleUrl: "https://privatejetcardcomparisons.com/2026/08/11/north-america-records-yet-another-yoy-monthly-increase/",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "wheels-up-fraser-yachts-jet-to-yacht-journeys",
    title: "Wheels Up and Fraser Yachts Link Private Flights With Yacht Charters",
    summary: "Wheels Up and Fraser Yachts have formed a partnership designed to connect private-air clients with yacht-charter planning. The offer combines preferred charter access with Fraser’s global network and a fleet of more than 2,300 luxury yachts available for charter.",
    category: "Luxury",
    source: "Corporate Jet Investor",
    articleUrl: "https://www.corporatejetinvestor.com/news/wheels-up-fraser-yachts/",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "silver-yachts-project-h780-explorer-catamaran",
    title: "Silver Yachts Signs for a New Long-Range Explorer Catamaran",
    summary: "Silver Yachts has contracted Project H780, a custom 26-metre aluminium explorer catamaran for private family cruising. The design pairs a 4,000-nautical-mile range at 11 knots with a fast-passage profile and is scheduled for delivery in 2028.",
    category: "Superyachts",
    source: "Boat International",
    articleUrl: "https://www.boatinternational.com/yachts/news/silver-yachts-signs-contract-custom-explorer-catamaran-project-h780",
    imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "superyachts-evolve-into-full-time-homes",
    title: "Superyachts Are Evolving Into Full-Time Homes for UHNW Owners",
    summary: "Robb Report describes a growing group of yacht owners using superyachts as primary residences rather than seasonal escapes. Satellite connectivity, hybrid propulsion, stabilisation and home-style amenities are shaping vessels designed for extended, mobile living.",
    category: "Superyachts",
    source: "Robb Report",
    articleUrl: "https://robbreport.com/motors/marine/why-the-wealthy-are-living-full-time-on-superyachts-1238546790/",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "salon-prive-2026-hypercar-heaven-collector-market",
    title: "Salon Privé Expands Its Focus on Modern Hypercar Collecting",
    summary: "Salon Privé 2026 will introduce new Limited Production Supercars and Hypercar Heaven concours classes at Blenheim Palace. The additions reflect growing collector attention on performance icons from Ferrari, Bugatti, Pagani, Rimac and other modern marques.",
    category: "Automotive",
    source: "Boat International",
    articleUrl: "https://www.boatinternational.com/boat-presents/salon-prive-2026-blenheim-palace-concours-elegance-supercars",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "global-auction-market-record-h1-2026",
    title: "Global Auction Sales Reach $6.77 Billion in Record First Half",
    summary: "ArtTactic data cited by Observer puts first-half 2026 sales across Christie’s, Sotheby’s and Phillips at $6.77 billion including buyer’s premium, up 69.8% year-on-year. Major single-owner collections and demand for luxury categories helped propel the strongest first-half result since 2022.",
    category: "Art",
    source: "Observer",
    articleUrl: "https://observer.com/2026/07/art-market-auctions-christies-sothebys-h1-2026-auction-results-newhouse-lewis-luxury/",
    imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "italian-art-auctions-selective-growth-2026",
    title: "Italian Art Auctions Rise 8.3% as Collectors Prioritise Quality",
    summary: "Italian auction turnover reached €181.8 million in the first half of 2026, up 8.3% from the previous year, according to Arteconomy data reported by Il Sole 24 Ore. The market remains selective, with collectors favouring quality, clear provenance and estimates aligned with current demand.",
    category: "Art",
    source: "Il Sole 24 Ore",
    articleUrl: "https://en.ilsole24ore.com/art/italian-auctions-in-the-first-half-of-2026-brisk-but-selective-trading-AJC6FSc",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "california-philanthropy-index-donor-environment",
    title: "California’s Donor Environment Comes Under New Scrutiny",
    summary: "Fortune reports that California, home to 246 billionaires according to an Oxfam report, ranked last in the Philanthropy Roundtable’s state index with a score of 2.73 out of 10. The index considers donor protections, tax treatment and regulatory conditions for charitable activity.",
    category: "Philanthropy",
    source: "Fortune",
    articleUrl: "https://fortune.com/2026/08/06/california-most-billionaires-worst-for-philanthropic-donations/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "ai-monetisation-cloud-revenues-wealth-portfolios",
    title: "AI Monetisation Is Beginning to Show in Cloud Revenues",
    summary: "UBP says second-quarter results have strengthened the case that artificial-intelligence investment is moving into observable revenue across the value chain. The bank cites average cloud-revenue growth of 43% in the quarter while maintaining a selective view on technology exposure amid elevated valuation and volatility risks.",
    category: "Technology",
    source: "Union Bancaire Privée",
    articleUrl: "https://www.ubp.com/en/news-insights/newsroom/ubp-house-view-august-2026",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
];

if (process.argv[1]?.endsWith("publish_news_aug13.mjs")) {
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
    await writeFile("/tmp/billionaire-collection-news-upsert-2026-08-13.error.log", `${new Date().toISOString()} ${message}\n`);
    console.error(message);
    process.exitCode = 1;
  }
}
