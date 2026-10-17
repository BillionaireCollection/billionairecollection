import { appendFile } from "node:fs/promises";
import { SignJWT } from "jose";
import superjson from "superjson";

const LIVE_ENDPOINT = "https://billionairecollection.com/api/trpc/news.upsertMany";
const ERROR_LOG = "/tmp/billionaire-collection-news-upsert-2026-10-08.error.log";
const publishedAt = new Date("2026-10-08T00:00:00.000Z");
const allowedCategories = new Set([
  "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art",
  "Philanthropy", "Luxury", "Technology", "Markets", "Family Offices",
]);

export const articles = [
  {
    slug: "family-offices-back-ai-reprice-geopolitical-risk-2026",
    title: "Family Offices Back AI While Repricing Geopolitical Risk",
    summary: "JPMorgan Private Bank’s survey of 125 international family offices found artificial intelligence was the dominant investment priority, cited by 74 percent, while 66 percent identified geopolitical risk as their greatest portfolio concern. Public equities attracted the most new capital in the prior six months, with 25 percent increasing allocations, and 43 percent made new allocations to alternatives.",
    category: "Family Offices",
    source: "WealthBriefing",
    articleUrl: "https://www.wealthbriefing.com/html/article.php/family-offices-push-further-into-ai%2C-fret-over-geopolitics--jp-morgan",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "monaco-yacht-show-superyacht-market-motion-2026",
    title: "Monaco Yacht Show 2026 Charts a Superyacht Market in Motion",
    summary: "At the 35th Monaco Yacht Show, 118 superyachts valued at an estimated €4.5 billion, including 50 delivered in 2026, filled Port Hercule alongside 560 exhibitors. The show reports constrained leading-yard build slots through 2028 and 2029 and more than €4 billion in brokerage sales during the first half of 2026.",
    category: "Superyachts",
    source: "Monaco Yacht Show",
    articleUrl: "https://www.monacoyachtshow.com/en/mys2026-the-superyacht-market-in-motion",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "eu-aml-rules-private-yacht-purchases-2026",
    title: "Why Europe’s New AML Rules Are Rewriting the Private Yacht Purchase Playbook",
    summary: "Regulation EU 2024/1624 introduces threshold-based reporting for non-commercial watercraft acquisitions priced at least €7.5 million, generally from 10 July 2027. SuperyachtNews says dealers and connected financial institutions may have separate reporting duties, while qualifying non-EU holding companies can face beneficial-ownership registration requirements before completion.",
    category: "Superyachts",
    source: "SuperyachtNews",
    articleUrl: "https://www.superyachtnews.com/owner/the-eu-reporting-rules-reshaping-private-yacht-purchases",
    imageUrl: "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "ai-billionaire-effect-wealth-gap-2026",
    title: "AI’s Billionaire Effect: How the Boom Is Widening the Wealth Gap",
    summary: "CNBC’s Robert Frank examines the technology billionaires emerging amid the artificial-intelligence boom, whom the network describes as the AI rich. The segment focuses on how AI-driven wealth concentration is widening the gap between this cohort and everyone else.",
    category: "Wealth",
    source: "CNBC",
    articleUrl: "https://www.cnbc.com/video/2026/10/07/ai-boom-fuels-tech-billionaires-heres-what-to-know.html",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "swire-ultra-prime-miami-residences-sales-2026",
    title: "Swire’s Ultra-Prime Miami Residences Break Ground After $1.7 Billion Sales Surge",
    summary: "Swire Properties’ ultra-prime branded Miami residential scheme has broken ground after generating a reported $1.7 billion in sales. PrimeResi identifies the development as Swire’s largest luxury residential project to date and says the scheme is on track for completion in 2030.",
    category: "Real Estate",
    source: "PrimeResi",
    articleUrl: "https://primeresi.com/ultra-prime-branded-miami-scheme-breaks-ground-after-1-7bn-sales-haul/",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "tech-fortunes-record-845-billion-surge-2026",
    title: "Tech Fortunes Drive a Record $845 Billion Billionaire Surge",
    summary: "Bloomberg’s Billionaires Index reports that roughly 100 technology fortunes among the world’s 500 richest people gained a combined $845 billion through 30 September. The increase was the largest recorded for the first nine months of any year, making technology fortunes the standout source of billionaire wealth growth in 2026’s opening three quarters.",
    category: "Technology",
    source: "Bloomberg",
    articleUrl: "https://www.bloomberg.com/news/articles/2026-10-05/bloomberg-billionaires-index-ai-boom-puts-musk-zuckerberg-in-top-10-of-ranking",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isFeatured: true,
    publishedAt,
  },
  {
    slug: "us-luxury-spending-high-end-resilience-2026",
    title: "US Luxury Spending Falters as High-End Resilience Is Tested",
    summary: "US luxury credit-card purchases fell 6 percent year over year in September, marking a third consecutive monthly decline, according to Citi data based on millions of transactions. Spending on leather goods and ready-to-wear improved sequentially, while watches and luxury jewellery weakened further, although Citi said brands serving higher-end consumers should remain relatively resilient.",
    category: "Luxury",
    source: "Reuters",
    articleUrl: "https://www.reuters.com/business/finance/us-luxury-spending-slows-ahead-midterms-credit-card-data-shows-2026-10-06/",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "fall-carlisle-superbird-collector-car-auction-2026",
    title: "Fall Carlisle’s $275,400 Superbird Leads a Charity-Boosted Season Finale",
    summary: "Carlisle Auctions’ 2026 Fall Carlisle Collector Car Auction brought more than 400 collector vehicles to market, with a 1970 Plymouth Superbird leading sales at $275,400 including fees. The event generated $50,120 for charity, while a 1970 Plymouth Cuda, 1969 Chevrolet Camaro and 1963 Chevrolet Corvette Split Window were also among the leading sales.",
    category: "Automotive",
    source: "Old Cars Weekly",
    articleUrl: "https://www.oldcarsweekly.com/2026-fall-carlisle-collector-car-auction-results",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "christies-abu-dhabi-middle-eastern-art-auction-2026",
    title: "Christie’s Sets Abu Dhabi Debut with 70-Work Middle Eastern Art Auction",
    summary: "Christie’s will stage its first fine-art auction in Abu Dhabi on 1 November, presenting MAWASIM: 20 Years of Modern and Contemporary Middle Eastern Art at The Abu Dhabi EDITION. The 70-work sale spans nine decades and includes newly announced highlights by artists including Faisel Laibi Sahi, Fahrelnissa Zeid and Mohammed Chabâa, with estimates reaching $700,000.",
    category: "Art",
    source: "Christie’s Press Centre",
    articleUrl: "https://press.christies.com/christies-reveals-further-highlights-ahead-of-its-first-landmark-abu-dhabi-fine-art-auction/",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "private-aviation-branded-terminals-2026",
    title: "Private Aviation’s New Luxury: Branded Terminals Bring the Jet Experience Landside",
    summary: "Aviation Week reports that demand for private-jet travel is prompting providers including NetJets, Flexjet and Magellan Jets to make multimillion-dollar investments in branded private terminals. NetJets is opening a dedicated client terminal in Augusta, Georgia, while fixed-base operators are also investing in business-aviation facilities.",
    category: "Aviation",
    source: "Aviation Week",
    articleUrl: "https://aviationweek.com/business-aviation/airports-fbos-suppliers/new-luxury-why-private-jet-providers-are-opening",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "strong-earnings-volatile-fourth-quarter-2026",
    title: "Strong Earnings Meet a More Volatile Fourth Quarter",
    summary: "U.S. Bank Wealth Management says resilient consumer spending, business investment and strong earnings have supported record stock prices entering the final quarter of 2026. It warns that higher energy costs and rising interest rates could pressure inflation, borrowing costs and market leadership, while diversification across equities, bonds, infrastructure and suitable private markets may help.",
    category: "Markets",
    source: "U.S. Bank Wealth Management",
    articleUrl: "https://www.usbank.com/investing/financial-perspectives/market-news/economic-news.html",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    isFeatured: false,
    publishedAt,
  },
  {
    slug: "ken-griffin-carnegie-mellon-three-billion-gift-2026",
    title: "Ken Griffin’s $3 Billion Carnegie Mellon Gift Rewrites the Blueprint for Higher Education",
    summary: "Carnegie Mellon University says Ken Griffin has committed a historic $3 billion gift to strengthen its Pittsburgh campus and launch Carnegie Mellon University Miami. The investment includes $1 billion for Pittsburgh, $2 billion for the Miami campus and plans for a 35-acre Wynwood site serving more than 3,500 students, with enrollment targeted for 2028 pending approvals.",
    category: "Philanthropy",
    source: "Carnegie Mellon University",
    articleUrl: "https://www.cmu.edu/news/stories/archives/2026/september/carnegie-mellon-university-announces-historic-3-billion-gift-from-ken-griffin-pioneering-a-new-model",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
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
  if (articles.filter((article) => article.isFeatured).length !== 2) throw new Error("Expected exactly 2 featured articles");

  const slugs = new Set();
  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`Invalid slug: ${article.slug}`);
    if (slugs.has(article.slug)) throw new Error(`Duplicate slug: ${article.slug}`);
    if (!allowedCategories.has(article.category)) throw new Error(`Invalid category: ${article.category}`);
    if (!/^https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9-]+\?w=800&q=80$/.test(article.imageUrl)) throw new Error(`Invalid Unsplash URL: ${article.slug}`);
    if (article.publishedAt.toISOString() !== "2026-10-08T00:00:00.000Z") throw new Error(`Invalid publication date: ${article.slug}`);
    if (!article.title || !article.summary || !article.source || !article.articleUrl) throw new Error(`Missing required field: ${article.slug}`);
    if (article.summary.split(/[.!?]+(?:\s|$)/).filter(Boolean).length < 2) throw new Error(`Summary must contain at least two sentences: ${article.slug}`);
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
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
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
  await appendFile(ERROR_LOG, `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
