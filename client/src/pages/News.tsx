/* ============================================================
   BILLIONAIRE COLLECTION — Billionaire News
   Live RSS feeds: Forbes, Robb Report, WSJ.
   Auto-refreshes every 30 minutes. Falls back to curated articles.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PageHero from "@/components/PageHero";
import { useNewsFeeds } from "@/hooks/useNewsFeeds";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const MAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

const CATEGORIES_NEWS = ["All", "Wealth", "Real Estate", "Superyachts", "Aviation", "Automotive", "Art", "Family Offices", "Longevity", "Luxury", "Technology", "Markets"];

const SOURCES = [
  { name: "Forbes", url: "https://www.forbes.com/billionaires/" },
  { name: "Barron's", url: "https://www.barrons.com" },
  { name: "Financial Times", url: "https://www.ft.com" },
  { name: "CNBC", url: "https://www.cnbc.com/wealth/" },
  { name: "Robb Report", url: "https://robbreport.com" },
  { name: "Wall Street Journal", url: "https://www.wsj.com" },
  { name: "Christie's", url: "https://www.christies.com" },
];

// Fallback image pool for live articles that lack images
const FALLBACK_IMGS = [
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80",
];

export default function News() {
  useSEO({
    title: "Billionaire Collection News — Luxury, Business & Lifestyle Intelligence",
    description: "Stay informed with Billionaire Collection News — the official news channel of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Covering luxury real estate, superyachts, private aviation, fine art, and the global UHNW lifestyle.",
    keywords: "Billionaire Collection news, luxury news, UHNW news, billionaire lifestyle news, luxury real estate news, superyacht news, private aviation news, Billionaire Collection media, luxury intelligence",
  });
  useJsonLd([
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Billionaire Collection",
        "item": "https://billionairecollection.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "News",
        "item": "https://billionairecollection.com/news"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Billionaire Collection News",
    "description": "The official news channel of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/news",
    "publisher": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => setSubscribed(true),
    onError: (err) => setSubscribeError(err.message || "Something went wrong. Please try again."),
  });
  const { articles, loading, liveCount, lastUpdated, refresh } = useNewsFeeds();

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featured = filtered.filter(a => a.featured).slice(0, 2);
  const regular = filtered.filter(a => !a.featured);

  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="Billionaire News"
        title="Intelligence for"
        titleAccent="the Elite"
        subtitle="Live intelligence from Forbes, Robb Report, Wall Street Journal, and more — covering wealth, luxury, real estate, superyachts, aviation, and the forces shaping the UHNW world."
        image={MAIN_IMG}
        height="75vh"
      />

      {/* ── LIVE STATUS BAR ── */}
      <div style={{ padding: "1.25rem 0", borderBottom: "1px solid rgba(201,168,76,0.1)", background: "rgba(0,0,0,0.9)" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem 2rem" }}>
              {/* Live indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ width: "6px", height: "6px", borderRadius: "50%", background: liveCount > 0 ? "#4ade80" : GOLD }}
                />
                <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.15em", color: liveCount > 0 ? "#4ade80" : GOLD }}>
                  {loading ? "Loading…" : liveCount > 0 ? `Live — ${liveCount} new articles` : "Curated"}
                </span>
              </div>
              <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)" }}>
                Sources:
              </span>
              {SOURCES.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = GOLD; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                >
                  {s.name}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {lastUpdated && (
                <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.25)" }}>
                  Updated {lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button
                onClick={refresh}
                disabled={loading}
                style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, background: "transparent", border: `1px solid rgba(201,168,76,0.3)`, padding: "5px 12px", cursor: "pointer", opacity: loading ? 0.5 : 1 }}
              >
                {loading ? "…" : "↻ Refresh"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER ── */}
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
                onMouseEnter={(e) => { if (activeCategory !== cat) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; } }}
                onMouseLeave={(e) => { if (activeCategory !== cat) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; } }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading skeleton */}
          {loading && articles.length === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ background: "#0a0a0a", padding: "2rem", height: "200px" }}>
                  <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}>
                    <div style={{ height: "12px", background: "rgba(201,168,76,0.15)", marginBottom: "1rem", width: "40%" }} />
                    <div style={{ height: "16px", background: "rgba(255,255,255,0.08)", marginBottom: "0.75rem" }} />
                    <div style={{ height: "16px", background: "rgba(255,255,255,0.05)", width: "80%" }} />
                  </motion.div>
                </div>
              ))}
            </div>
          )}

          {/* Featured articles */}
          {featured.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)", marginBottom: "1px" }}>
              {featured.map((article, i) => (
                <FadeUp key={article.id} delay={i * 0.1}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ background: "#000", overflow: "hidden", cursor: "pointer" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#000"; }}
                    >
                      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                        <img
                          src={article.img || FALLBACK_IMGS[i % FALLBACK_IMGS.length]}
                          alt={article.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.04)"; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMGS[i % FALLBACK_IMGS.length]; }}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
                        <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", gap: "0.5rem" }}>
                          <span className="bc-badge" style={{ fontSize: "0.625rem" }}>Featured</span>
                          {article.id.startsWith("live-") && (
                            <span style={{ fontFamily: FONT_UI, fontSize: "0.5625rem", textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 8px", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)", color: "#4ade80" }}>Live</span>
                          )}
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
              <FadeUp key={article.id} delay={i * 0.05}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div className="bc-glass-card" style={{ padding: "2rem", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                    {article.img && (
                      <div style={{ overflow: "hidden", marginBottom: "1.25rem", aspectRatio: "16/9" }}>
                        <img
                          src={article.img}
                          alt={article.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>{article.category}</span>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.25)" }}>·</span>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.3)" }}>{article.source}</span>
                      {article.id.startsWith("live-") && (
                        <span style={{ fontFamily: FONT_UI, fontSize: "0.5625rem", textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 6px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}>Live</span>
                      )}
                    </div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.0625rem", color: "#fff", lineHeight: 1.4, marginBottom: "0.75rem", flex: 1 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                      {article.summary.substring(0, 130)}
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

          {filtered.length === 0 && !loading && (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.3)", fontSize: "0.875rem" }}>No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
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
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: FONT_HEADING, fontSize: "1.25rem", color: GOLD }}>
                You are now subscribed to the Billionaire Daily Brief.
              </motion.div>
            ) : (
              <>
              {subscribeError && <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "#e57373", marginBottom: "0.5rem" }}>{subscribeError}</p>}
              <form onSubmit={(e) => { e.preventDefault(); setSubscribeError(""); subscribeMutation.mutate({ email }); }} style={{ display: "flex", justifyContent: "center", gap: "0", maxWidth: "480px", margin: "0 auto" }}>
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
              </>)
            }
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
