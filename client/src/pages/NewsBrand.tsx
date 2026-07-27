/* ============================================================
   BILLIONAIRE NEWS — Brand Page (/news-brand)
   Media Division — UHNW news, insights & market intelligence
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const COVERAGE_AREAS = [
  { icon: "◆", title: "Ultra-Prime Real Estate", desc: "Off-market deals, trophy property transactions, and global estate market intelligence for UHNW buyers and sellers." },
  { icon: "◆", title: "Private Aviation & Yachting", desc: "Fleet acquisitions, charter market trends, and bespoke vessel launches from the world's leading shipyards and OEMs." },
  { icon: "◆", title: "Wealth & Investment", desc: "Family office strategies, alternative asset allocation, private equity deal flow, and macro intelligence for ultra-wealthy investors." },
  { icon: "◆", title: "Luxury Lifestyle", desc: "Exclusive product launches, private member events, fine art auctions, and the cultural movements shaping UHNW living." },
  { icon: "◆", title: "Technology & Innovation", desc: "Emerging technologies disrupting wealth management, longevity science, AI-driven advisory, and digital asset markets." },
  { icon: "◆", title: "Global Markets", desc: "Currency, commodities, and geopolitical intelligence with direct relevance to the portfolios of the world's wealthiest individuals." },
];

const FORMATS = [
  {
    label: "Breaking Intelligence",
    desc: "Real-time market-moving news delivered directly to Billionaire Card members before it reaches mainstream financial media.",
    img: "/images/bc-news-hero.jpg",
  },
  {
    label: "In-Depth Analysis",
    desc: "Long-form investigative journalism and expert commentary from former Goldman Sachs partners, family office principals, and industry insiders.",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
  },
  {
    label: "Exclusive Interviews",
    desc: "One-on-one conversations with billionaires, heads of state, and the architects of the world's most influential luxury and wealth empires.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
  },
];

const STATS = [
  { value: "40+", label: "Countries covered" },
  { value: "500+", label: "Expert contributors" },
  { value: "24/7", label: "Live intelligence feed" },
  { value: "$1T+", label: "Assets tracked daily" },
];

export default function NewsBrand() {
  useSEO({
    title: "Billionaire News — UHNW Intelligence & Market Insights | A Billionaire Collection Company",
    description: "Billionaire News is the premier intelligence and news platform for ultra-high-net-worth individuals. Real-time market intelligence, exclusive interviews, and in-depth analysis covering real estate, private aviation, wealth management, and luxury lifestyle.",
    keywords: "Billionaire News, UHNW news, ultra high net worth news, luxury market intelligence, billionaire collection news, private equity news, family office intelligence, luxury lifestyle news",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Billionaire Collection", "item": "https://billionairecollection.com" },
        { "@type": "ListItem", "position": 2, "name": "Media", "item": "https://billionairecollection.com/media" },
        { "@type": "ListItem", "position": 3, "name": "Billionaire News", "item": "https://billionairecollection.com/news-brand" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": "Billionaire News",
      "description": "The premier intelligence and news platform for ultra-high-net-worth individuals.",
      "url": "https://billionairecollection.com/news-brand",
      "parentOrganization": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://billionairecollection.com",
      },
    },
  ]);

  return (
    <div style={{ background: "#000" }}>
      {/* ── Hero ── */}
      <PageHero
        badge="Billionaire News"
        title="Intelligence for the"
        titleAccent="Ultra-Wealthy"
        subtitle="The world's only news platform built exclusively for ultra-high-net-worth individuals — delivering real-time market intelligence, exclusive interviews, and in-depth analysis that moves wealth."
        image="/images/bc-news-hero.jpg"
        cta={{ label: "Back to Media", href: "/media" }}
      />

      {/* ── About ── */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>About Billionaire News</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.25 }}>
                News That Moves <span style={{ color: GOLD }}>Billions</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Billionaire News was founded on a single conviction: the world's wealthiest individuals deserve a news platform that speaks their language, understands their portfolios, and delivers intelligence before it becomes public knowledge.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "2rem" }}>
                With a network of over 500 expert contributors spanning 40+ countries — including former central bank governors, hedge fund managers, and luxury industry insiders — Billionaire News provides the depth, speed, and exclusivity that no mainstream outlet can match.
              </p>
              <Link href="/media"><button className="btn-ghost-gold">Back to Media</button></Link>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(201,168,76,0.12)" }}>
                {STATS.map((s) => (
                  <div key={s.label} className="bc-glass-card" style={{ padding: "2.5rem", textAlign: "center" }}>
                    <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "2.25rem", color: GOLD, marginBottom: "0.5rem" }}>{s.value}</div>
                    <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Coverage Areas ── */}
      <section style={{ padding: "6rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>Editorial Coverage</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Six Pillars of <span style={{ color: GOLD }}>UHNW Intelligence</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {COVERAGE_AREAS.map((area, i) => (
              <FadeUp key={area.title} delay={i * 0.05}>
                <div className="bc-glass-card" style={{ padding: "2.5rem", height: "100%" }}>
                  <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: GOLD, display: "block", marginBottom: "1rem" }}>{area.icon} Coverage</span>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.2rem", color: "#fff", marginBottom: "0.875rem" }}>{area.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{area.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formats ── */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>Content Formats</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Intelligence in <span style={{ color: GOLD }}>Every Format</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: "2rem" }}>
            {FORMATS.map((f, i) => (
              <FadeUp key={f.label} delay={i * 0.1}>
                <div className="bc-glass-card" style={{ overflow: "hidden" }}>
                  <div style={{ height: "220px", overflow: "hidden" }}>
                    <img src={f.img} alt={f.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)" }} />
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", marginBottom: "0.75rem" }}>{f.label}</h3>
                    <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{f.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Access CTA ── */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.03)", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Exclusive Access</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                Intelligence Reserved for <span style={{ color: GOLD }}>Members Only</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Full access to Billionaire News — including the live intelligence feed, exclusive interviews, and breaking market alerts — is reserved for Billionaire Card members and Golden Ticket holders.
              </p>
              <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/card"><button className="btn-gold">Apply for Billionaire Card</button></Link>
                <Link href="/golden-ticket"><button className="btn-ghost-gold">The Golden Ticket</button></Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
