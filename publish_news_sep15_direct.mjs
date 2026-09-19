import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const publishedAt = new Date("2026-09-15T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "bernard-arnault-lvmh-fortune-decline-september-2026",
    title: "Bernard Arnault’s Fortune Falls $65 Billion as Luxury Shares Retreat",
    summary: "Billionaires.Africa reports that Bernard Arnault’s fortune has declined by $65 billion in 2026 to $143 billion, the largest fall among the world’s 500 wealthiest people in its report. It attributes the ranking movement to LVMH’s share-price decline amid softer demand in China, tariff uncertainty and changing alcohol consumption.",
    category: "Wealth", source: "Billionaires.Africa",
    articleUrl: "https://www.billionaires.africa/2026/09/14/bernard-arnault-has-lost-65bn-this-year-more-than-anyone/",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "michael-dell-family-office-baldwin-insurance-deal-2026",
    title: "Michael Dell’s Family Office Is Reported Near a $4.2 Billion Insurance Acquisition",
    summary: "Family Wealth Report says Michael Dell’s DFO Management is reported to be close to acquiring The Baldwin Insurance Group, a listed brokerage valued at about $4.2 billion. The proposed transaction illustrates the scale at which single-family offices can pursue control investments in financial services.",
    category: "Family Offices", source: "Family Wealth Report",
    articleUrl: "https://www.familywealthreport.com/article.php/Michael-Dell%27s-Family-Office-Close-To-US-Insurance-Group-Purchase-%E2%80%93-Media?id=208781",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    isFeatured: true, publishedAt,
  },
  {
    slug: "global-billionaire-wealth-15-trillion-altrata-2026",
    title: "Global Billionaire Wealth Reaches $15.1 Trillion, New Report Finds",
    summary: "CNBC reports that global billionaire wealth reached $15.1 trillion last year, citing a new Altrata report. The update places the latest billionaire wealth figures in focus as private investors continue to influence public markets, private assets and luxury sectors.",
    category: "Markets", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/04/billionaire-wealth-altrata-report.html",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "monaco-super-prime-property-wealth-planning-2026",
    title: "Monaco’s Super-Prime Property Market Becomes a Test Case for Wealth Planning",
    summary: "Citywealth reports that Monaco property transactions totalled €5.9 billion in 2025 and that 35 of the 64 new homes sold exceeded €20 million. Its private-client analysis also examines proposed transparency changes for property held through foreign legal entities.",
    category: "Real Estate", source: "Citywealth",
    articleUrl: "https://www.citywealthmag.com/news/monaco-2026-british-wealth-private-client-reform-and-the-monaco-yacht-show/",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "vanish-leads-monaco-yacht-show-brokerage-2026",
    title: "Feadship’s Vanish Leads Monaco’s €148 Million Brokerage Showcase",
    summary: "BOAT International lists the 71.5-metre Feadship Vanish at €148 million as the highest-priced yacht in its Monaco Yacht Show 2026 brokerage selection. The line-up also includes 74-metre Synthesis at €132 million and 77.7-metre Malia at €110 million.",
    category: "Superyachts", source: "BOAT International",
    articleUrl: "https://www.boatinternational.com/yachts/news/expensive-yachts-for-sale-monaco-yacht-show-2026",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "triumph-jets-family-office-advisory-expansion-2026",
    title: "Private-Aviation Advisory Expands for Family Offices and Private Clients",
    summary: "Triumph Jets has announced an expanded private-aviation advisory offer for family offices, wealth managers and private-client teams. The company says the service covers annual spend projections, jet-card assessments and aircraft-acquisition analysis alongside specialist advisers.",
    category: "Aviation", source: "EIN Presswire / Triumph Jets",
    articleUrl: "https://www.einpresswire.com/article/940652520/triumph-jets-expands-private-aviation-advisory-services-for-family-offices-and-private-wealth-clients",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "herbert-wertheim-ferrari-luce-charity-auction-2026",
    title: "Herbert Wertheim’s $40 Million Ferrari Purchase Puts Charity Auctions in Focus",
    summary: "Fortune reports that philanthropist Herbert Wertheim paid $40 million for a Ferrari Luce pre-production chassis at a Sotheby’s auction benefiting the Ferrari Foundation. The sale price was more than 36 times the $1.1 million presale estimate cited in the report.",
    category: "Automotive", source: "Fortune",
    articleUrl: "https://fortune.com/2026/08/28/american-billionaire-ferrari-luce-tax-break-40-million-philanthropy/",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "younger-uhnw-donors-measurable-impact-2026",
    title: "Younger UHNW Donors Raise the Bar for Measurable Philanthropic Impact",
    summary: "Spear’s reports that younger ultra-high-net-worth donors are more likely to seek data-led proof of philanthropic outcomes, citing Lombard Odier research. The survey found that younger donors were nearly three times more likely than those over 45 to prioritise measurable impact.",
    category: "Philanthropy", source: "Spear’s",
    articleUrl: "https://spearswms.com/impact-philanthropy/dont-be-scared-how-younger-uhnws-should-go-about-giving-their-money-away/",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "wealthy-travellers-fall-luxury-booking-surge-2026",
    title: "Wealthy Travellers Shift Luxury Escapes Into the Autumn Season",
    summary: "CNBC reports that fall luxury-travel and experience bookings were up 59% year on year, according to Virtuoso, with September sales up 77%. The pattern reflects affluent travellers moving trips away from peak summer crowds toward a newly competitive shoulder season.",
    category: "Luxury", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/04/fall-travel-wealthy-europe.html",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "trophy-art-auction-market-concentration-2026",
    title: "Trophy Art’s Dependence on Billionaire Buyers Deepens",
    summary: "The Art Newspaper reports that 1,761 works, less than 0.3% of auction lots in 2025, generated nearly 45% of global auction value. The concentration highlights the significant influence that a relatively small group of ultra-wealthy collectors retains at the market’s top end.",
    category: "Art", source: "The Art Newspaper",
    articleUrl: "https://www.theartnewspaper.com/2026/09/01/the-art-worlds-billionaire-problem-is-getting-worse",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "ai-family-office-operations-governance-2026",
    title: "Family Offices Move From AI Curiosity to Operational Governance",
    summary: "Family Office Networks considers how artificial intelligence can improve operational efficiency and investment insight for family offices. Its latest analysis emphasizes that privacy, security and decision oversight remain core requirements as firms assess practical AI use.",
    category: "Technology", source: "Family Office Networks",
    articleUrl: "https://fon.network/artificial-intelligence-and-its-impact-on-family-office-operations/",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isFeatured: false, publishedAt,
  },
  {
    slug: "billionaire-family-offices-biotech-investment-august-2026",
    title: "Billionaire Family Offices Step Up Direct Investment in Biotech",
    summary: "CNBC reports that family offices made 52 direct private-company investments in August, according to Fintrx data, with biotechnology accounting for about one fifth of the total. The report identifies investments linked to the family offices of Stanley Druckenmiller and Jeff Bezos among the activity.",
    category: "Family Offices", source: "CNBC",
    articleUrl: "https://www.cnbc.com/2026/09/03/family-offices-health-care-biotech-startups-august.html",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
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
    if (article.publishedAt.toISOString() !== "2026-09-15T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
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
  await appendFile("/tmp/billionaire-collection-news-upsert-2026-09-15.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
