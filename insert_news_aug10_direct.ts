import "dotenv/config";
import { upsertManyNewsArticles } from "./server/db";

const today = new Date("2026-08-10T09:00:00.000Z");

const articles = [
  {
    slug: "ubs-global-wealth-report-2026-57-million-millionaires",
    title: "UBS Global Wealth Report 2026: World Now Has 57 Million Millionaires",
    summary: "The UBS Global Wealth Report 2026 reveals that more than 57 million people worldwide now hold wealth of at least $1 million, with nearly one million new millionaires created in 2025 alone. The United States accounts for almost half of global millionaire growth, producing more than 1,000 new millionaires every day. Switzerland leads the world in average wealth per adult at approximately $777,500, while the UHNW population continues to expand at record pace.",
    category: "Wealth",
    source: "UBS Global Wealth Report",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    isFeatured: true,
    publishedAt: today,
  },
  {
    slug: "amadea-megayacht-sold-187-million-abbas-sajwani",
    title: "Seized Megayacht Amadea Sold for $187 Million to 27-Year-Old Dubai Billionaire",
    summary: "The 348-foot superyacht Amadea, seized by US authorities in 2022 from sanctioned Russian oligarch Suleiman Kerimov, has been sold for $187 million to Abbas Sajwani, the 27-year-old son of Dubai property tycoon Hussain Sajwani. The sale marks one of the most high-profile yacht transactions of 2026 and underscores the continued appetite among Gulf billionaires for trophy superyachts. Sajwani acquired the vessel through a US court-approved process.",
    category: "Superyachts",
    source: "CNBC",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    isFeatured: true,
    publishedAt: today,
  },
  {
    slug: "hillsborough-estate-70-million-northern-california-record",
    title: "Hillsborough Estate Sets Northern California Record at $70 Million",
    summary: "A gated estate in Hillsborough, California has sold for $70 million, setting a new record for the highest residential sale in Northern California in 2026 and the highest in the city's history. The property, which originally listed at $88 million in February, attracted significant interest from Silicon Valley's AI-boom wealth class. The sale reflects the broader surge in US ultra-luxury real estate, with $3.7 billion in $30 million-plus transactions recorded in the first half of 2026.",
    category: "Real Estate",
    source: "Wall Street Journal",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "laguna-beach-110-million-off-market-sale-2026",
    title: "$110 Million Off-Market Laguna Beach Sale Signals Ultra-Luxury Surge",
    summary: "A never-listed beachfront estate in Laguna Beach, California has sold for $110 million in an off-market transaction, becoming one of the most significant residential deals of 2026. The sale contributes to a record $3.7 billion in ultra-luxury dollar volume year-on-year, driven by tech founders and UHNW buyers seeking trophy coastal properties. The transaction highlights the growing preference among billionaire buyers for discreet, off-market acquisitions.",
    category: "Real Estate",
    source: "Luxury Abode",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "global-art-market-4-4-billion-h1-2026-christies-sothebys",
    title: "Christie's, Sotheby's and Phillips Post $4.4 Billion in H1 2026 — Up 87%",
    summary: "The three major auction houses combined for $4.4 billion in art sales during the first half of 2026, an 87% increase over the same period in 2025, according to the Art Basel and UBS Global Art Market Report. Auction sales climbed 59% to $3.4 billion while private sales rose 52% to $826 million, an all-time high. UHNW collectors from the Middle East and Asia Pacific led acquisition activity across Picasso, Basquiat and emerging contemporary artists.",
    category: "Art",
    source: "Art Basel / UBS",
    imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "private-jet-charter-market-cagr-14-7-percent-2026-2033",
    title: "Private Jet Management Market Growing at 14.7% CAGR Through 2033",
    summary: "The global private jet management and operation market is expanding at a compound annual growth rate of 14.7% through 2033, driven by surging UHNW demand, fractional ownership programmes and the entry of new ultra-high-net-worth buyers from emerging markets. The global charter jet service market is forecast to grow at 7.9% CAGR between 2026 and 2035. Operators report that same-day charter demand has reached a point where the market can no longer consistently accommodate last-minute bookings.",
    category: "Aviation",
    source: "Private Jet Card Comparisons",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "european-superyacht-charter-destination-index-2026",
    title: "European Superyacht Charter Destination Index 2026: Where UHNW Charterers Are Going",
    summary: "A new European Superyacht Charter Destination Index for 2026 reveals the precise destinations attracting the highest concentration of UHNW charterers, factoring in true costs, VAT by country, exclusivity scores and the regulatory squeeze reshaping the market. The Mediterranean remains dominant, but emerging destinations in the Adriatic and Eastern Mediterranean are gaining ground as charterers seek exclusivity. The report notes superyacht sales rebounded 70% in 2025, with the 2026 order book at record levels.",
    category: "Superyachts",
    source: "Luxury Abode",
    imageUrl: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "bugatti-bolide-hypercar-4-7-million-2026",
    title: "Bugatti Bolide: The $4.7 Million Track Hypercar Redefining Automotive Exclusivity",
    summary: "Bugatti's Bolide hypercar, priced at approximately $4.7 million, continues to attract the world's most discerning collectors in 2026 as the brand's most extreme track-focused machine. With production strictly limited and every unit already allocated, the Bolide represents the pinnacle of Bugatti's engineering philosophy — a car built purely for performance without compromise. The hypercar market has delivered some of the most extraordinary automobiles ever built in 2026, with Lamborghini, Ferrari and Pagani also commanding record prices.",
    category: "Automotive",
    source: "Robb Report",
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "bentley-residences-miami-uhnw-branded-living-2026",
    title: "Bentley Residences Miami: Where Ultra-Luxury Living Meets Private In-Residence Car Garages",
    summary: "Bentley Residences Miami is redefining oceanfront UHNW living with private in-residence car garages that allow owners to park their vehicles on their own floor via a dedicated car elevator. The development reflects the growing trend of automotive-branded luxury residences catering to collectors who refuse to separate their passion for cars from their living environment. At the ultra-high-net-worth level, buyers are no longer shopping for homes — they are curating lifestyle ecosystems.",
    category: "Real Estate",
    source: "Mansion Global",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "uhnw-population-record-levels-knight-frank-wealth-report-2026",
    title: "Global UHNW Population Reaches Record Levels in 2026, Knight Frank Reports",
    summary: "The Knight Frank Wealth Report 2026 confirms that the global ultra-high-net-worth population has reached record levels, with emerging wealth hubs in India, the Middle East and Southeast Asia driving the most significant growth. Indian and Gulf billionaires are increasingly competing for the same trophy assets — from ultra-prime real estate to superyachts and private aviation — as their European and American counterparts. Family offices are expanding their mandates to include alternative assets at an unprecedented rate.",
    category: "Wealth",
    source: "Knight Frank",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "uae-private-aviation-expansion-jetex-dc-aviation-2026",
    title: "UAE Private Aviation Ecosystem Expands Aggressively as Gulf Demand Surges",
    summary: "The UAE's private aviation ecosystem expanded aggressively through 2025 and into 2026, with operators including Jetex and DC Aviation Al-Futtaim adding significant new capacity to meet surging demand from Gulf UHNW clients. Dubai and Abu Dhabi have consolidated their positions as the Middle East's premier private aviation hubs, with new FBO facilities and expanded hangar capacity coming online. The growth reflects the broader shift of global wealth towards the Gulf, where a new generation of billionaires is driving demand for bespoke aviation solutions.",
    category: "Aviation",
    source: "The Platinum Capital",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
  {
    slug: "trillion-dollar-wealth-transfer-family-offices-art-2026",
    title: "The Trillion-Dollar Wealth Transfer: How Family Offices Are Reshaping the Art Market",
    summary: "The ongoing intergenerational wealth transfer — estimated at over $84 trillion globally — is fundamentally reshaping the art market as next-generation UHNW heirs bring different tastes, digital fluency and ESG priorities to their collecting strategies. Family offices are increasingly acting as institutional art buyers, with the global art market reaching an estimated $59.6 billion in total sales in 2025. The convergence of family office capital and art market sophistication is creating new dynamics at the top end of the market.",
    category: "Family Offices",
    source: "Art Bystander",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    isFeatured: false,
    publishedAt: today,
  },
];

async function main() {
  console.log(`Inserting ${articles.length} articles for 10 August 2026...`);
  await upsertManyNewsArticles(articles as any);
  console.log("Done! All 12 articles inserted successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
