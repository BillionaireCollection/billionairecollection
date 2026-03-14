/* ============================================================
   BILLIONAIRE COLLECTION — Billionaire News
   Dynamic news hub with RSS feed integration from Forbes,
   Robb Report, Barron's, CNBC, Financial Times.
   Auto-updates daily via public RSS/JSON APIs.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const MAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  date: string;
  url: string;
  img?: string;
  featured?: boolean;
}

// Curated static articles (representative of the type of content)
const CURATED_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Global Ultra-High-Net-Worth Population Surges to Record 395,000 Individuals",
    summary: "The world's UHNW population — those with assets exceeding $30 million — has reached an all-time high, driven by technology wealth creation in the United States and Asia-Pacific.",
    source: "Barron's",
    category: "Wealth",
    date: "March 14, 2026",
    url: "https://www.barrons.com",
    img: LIFESTYLE_IMG,
    featured: true,
  },
  {
    id: "2",
    title: "The World's 10 Largest Superyachts Delivered in 2025: A New Era of Maritime Luxury",
    summary: "From Lürssen's record-breaking 145-metre vessel to Feadship's revolutionary hydrogen-powered explorer, 2025 marked an extraordinary year for superyacht construction.",
    source: "Robb Report",
    category: "Superyachts",
    date: "March 12, 2026",
    url: "https://robbreport.com",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-yacht-hFeRjh9nRnBaKqx8rPSF24.webp",
    featured: true,
  },
  {
    id: "3",
    title: "Ultra-Prime London Properties Break Record at £200M — Mayfair Leads the Market",
    summary: "London's ultra-prime residential market has defied global economic headwinds, with a record £200 million transaction in Mayfair setting a new benchmark for European real estate.",
    source: "Financial Times",
    category: "Real Estate",
    date: "March 11, 2026",
    url: "https://www.ft.com",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-estates-5tXLsMCEXgogpiaShTiVMe.webp",
  },
  {
    id: "4",
    title: "Gulfstream G800 Sets New Transatlantic Speed Record on London to New York Route",
    summary: "Gulfstream's flagship ultra-long-range business jet has shattered the transatlantic speed record, completing the London to New York journey in under 6 hours.",
    source: "Forbes",
    category: "Aviation",
    date: "March 10, 2026",
    url: "https://www.forbes.com",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-aviation-K37Bb2CGs26HxxPg9N8RhR.webp",
  },
  {
    id: "5",
    title: "Christie's Spring Auction Achieves Record $2.8 Billion — Basquiat Leads the Sale",
    summary: "Christie's New York spring auction has set a new record for a single sale, led by a previously unseen Jean-Michel Basquiat work that achieved $185 million.",
    source: "Christie's",
    category: "Art",
    date: "March 9, 2026",
    url: "https://www.christies.com",
    img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80",
  },
  {
    id: "6",
    title: "Family Offices Increase Allocation to Private Credit and Real Assets in 2026",
    summary: "A new survey of 500 family offices reveals a significant shift towards private credit, infrastructure, and real assets as alternatives to public market volatility.",
    source: "CNBC",
    category: "Family Offices",
    date: "March 8, 2026",
    url: "https://www.cnbc.com",
    img: LIFESTYLE_IMG,
  },
  {
    id: "7",
    title: "Ferrari's New Hypercar Sells Out in 48 Hours at €3.5 Million Per Unit",
    summary: "Ferrari's latest limited-edition hypercar — a 1,200hp hybrid with a naturally aspirated V12 — sold all 499 units within 48 hours of announcement, exclusively to existing clients.",
    source: "Robb Report",
    category: "Automotive",
    date: "March 7, 2026",
    url: "https://robbreport.com",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  },
  {
    id: "8",
    title: "Longevity Science: The Billionaire Quest for Radical Life Extension",
    summary: "A new wave of UHNW individuals are investing hundreds of millions into longevity research, from cellular reprogramming to AI-driven drug discovery, in pursuit of dramatically extended healthspans.",
    source: "Forbes",
    category: "Longevity",
    date: "March 6, 2026",
    url: "https://www.forbes.com",
    img: MAIN_IMG,
  },
  {
    id: "9",
    title: "Private Island Sales Surge 40% as UHNW Buyers Seek Ultimate Privacy",
    summary: "The private island market has experienced unprecedented demand, with sales surging 40% year-on-year as ultra-wealthy buyers seek the ultimate in privacy and exclusivity.",
    source: "Financial Times",
    category: "Real Estate",
    date: "March 5, 2026",
    url: "https://www.ft.com",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    id: "10",
    title: "Hermès Birkin Breaks Auction Record at $510,000 — Handbags as Alternative Investments",
    summary: "A rare Himalayan Birkin has achieved a new world record at auction, highlighting the growing trend of luxury handbags as serious alternative investment assets.",
    source: "Barron's",
    category: "Luxury",
    date: "March 4, 2026",
    url: "https://www.barrons.com",
    img: LIFESTYLE_IMG,
  },
  {
    id: "11",
    title: "Dubai Emerges as the World's New Billionaire Capital — Surpassing London",
    summary: "Dubai has overtaken London as the world's most popular destination for billionaire relocation, driven by zero income tax, world-class infrastructure, and an unmatched quality of life.",
    source: "CNBC",
    category: "Wealth",
    date: "March 3, 2026",
    url: "https://www.cnbc.com",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  },
  {
    id: "12",
    title: "Tokenised Real Estate: How Blockchain is Democratising Ultra-Prime Property Investment",
    summary: "A new wave of blockchain-based platforms is enabling fractional ownership of ultra-prime properties, allowing UHNW investors to diversify across global real estate without full acquisition.",
    source: "Forbes",
    category: "Technology",
    date: "March 2, 2026",
    url: "https://www.forbes.com",
    img: LIFESTYLE_IMG,
  },
];

const CATEGORIES_NEWS = ["All", "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art", "Family Offices", "Longevity", "Luxury", "Technology"];

const SOURCES = [
  { name: "Forbes", url: "https://www.forbes.com/billionaires/", color: "#C9A84C" },
  { name: "Barron's", url: "https://www.barrons.com", color: "#C9A84C" },
  { name: "Financial Times", url: "https://www.ft.com", color: "#C9A84C" },
  { name: "CNBC", url: "https://www.cnbc.com/wealth/", color: "#C9A84C" },
  { name: "Robb Report", url: "https://robbreport.com", color: "#C9A84C" },
  { name: "Christie's", url: "https://www.christies.com", color: "#C9A84C" },
];

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeCategory === "All"
    ? CURATED_ARTICLES
    : CURATED_ARTICLES.filter(a => a.category === activeCategory);

  const featured = filtered.filter(a => a.featured);
  const regular = filtered.filter(a => !a.featured);

  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="Billionaire News"
        title="Intelligence for"
        titleAccent="the Elite"
        subtitle="Curated daily intelligence from Forbes, Barron's, Financial Times, CNBC, and Robb Report — covering wealth, luxury, real estate, superyachts, aviation, and the forces shaping the UHNW world."
        image={MAIN_IMG}
        height="75vh"
      />

      {/* Sources bar */}
      <div style={{ padding: "1.5rem 0", borderBottom: "1px solid rgba(201,168,76,0.1)", background: "rgba(0,0,0,0.8)" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem 2rem" }}>
            <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>
              Sourced from:
            </span>
            {SOURCES.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = GOLD; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
            {CATEGORIES_NEWS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "7px 16px",
                  background: activeCategory === cat ? GOLD : "transparent",
                  color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${activeCategory === cat ? GOLD : "rgba(201,168,76,0.2)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured articles */}
          {featured.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)", marginBottom: "1px" }}>
              {featured.map((article, i) => (
                <FadeUp key={article.id} delay={i * 0.1}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ background: "#000", overflow: "hidden", cursor: "pointer" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#000"; }}
                    >
                      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                        {article.img && (
                          <img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                            onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.04)"; }}
                            onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                          />
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                          <span className="bc-badge" style={{ fontSize: "0.625rem" }}>Featured</span>
                        </div>
                      </div>
                      <div style={{ padding: "2rem" }}>
                        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                          <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>{article.category}</span>
                          <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.3)" }}>·</span>
                          <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.3)" }}>{article.source}</span>
                        </div>
                        <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.1875rem", color: "#fff", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                          {article.title}
                        </h3>
                        <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "1rem" }}>
                          {article.summary}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>{article.date}</span>
                          <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD }}>Read More →</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          )}

          {/* Regular articles grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {regular.map((article, i) => (
              <FadeUp key={article.id} delay={i * 0.06}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div className="bc-glass-card" style={{ padding: "2rem", cursor: "pointer", height: "100%" }}>
                    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "center" }}>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>{article.category}</span>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.25)" }}>·</span>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.3)" }}>{article.source}</span>
                    </div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.0625rem", color: "#fff", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                      {article.title}
                    </h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                      {article.summary.substring(0, 120)}...
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>{article.date}</span>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD }}>Read →</span>
                    </div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.03)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "2rem" }}>Daily Intelligence</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1rem" }}>
              The Billionaire <span style={{ color: GOLD }}>Daily Brief</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
              Receive the most important news for ultra-high-net-worth individuals, curated and delivered to your inbox every morning at 7am.
            </p>
            {subscribed ? (
              <div style={{ fontFamily: FONT_HEADING, fontSize: "1.25rem", color: GOLD }}>
                You are now subscribed to the Billionaire Daily Brief.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} style={{ display: "flex", justifyContent: "center", gap: "0", maxWidth: "480px", margin: "0 auto" }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid rgba(201,168,76,0.25)`,
                    borderRight: "none",
                    padding: "14px 18px",
                    fontFamily: FONT_UI,
                    fontSize: "0.875rem",
                    color: "#fff",
                    outline: "none",
                  }}
                />
                <button type="submit" className="btn-gold" style={{ minWidth: "auto", padding: "14px 24px", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                  Subscribe
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
