import { articles as priorArticles } from "./publish_news_aug13.mjs";

const publishedAt = new Date("2026-08-14T00:00:00.000Z");

export const articles = priorArticles.map(article => ({ ...article, publishedAt }));

articles[3] = {
  slug: "acj320neo-conversions-ultra-wealthy-direct-routes",
  title: "ACJ320neo Conversions Rise as UHNW Buyers Seek 12-Hour Direct Routes",
  summary: "Completion centres are reporting growing demand for Airbus Corporate Jet ACJ320neo conversions from ultra-high-net-worth buyers seeking nonstop missions beyond 12 hours. The airliner-derived platform offers residential-scale layouts, including bedrooms, conference rooms and lounges, while retaining intercontinental capability.",
  category: "Aviation",
  source: "EmptyJet",
  articleUrl: "https://emptyjet.com/news/acj320neo-conversions-rise-as-ultra-wealthy-seek-12-hour-direct-routes",
  imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  isFeatured: false,
  publishedAt,
};

articles[7] = {
  slug: "monterey-car-week-2026-collector-market-focus",
  title: "Monterey Car Week Puts the Collector Market Centre Stage",
  summary: "Monterey Car Week is under way through 17 August, bringing The Quail, RM Sotheby's, Gooding & Company, Broad Arrow and Mecum into one concentrated programme for collectors. The 14 August schedule pairs rare-car displays with major auction activity, reinforcing Monterey's place in the global collector-automotive calendar.",
  category: "Automotive",
  source: "What's Up Monterey",
  articleUrl: "https://whatsupmonterey.com/events/monterey-car-week",
  imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  isFeatured: false,
  publishedAt,
};
