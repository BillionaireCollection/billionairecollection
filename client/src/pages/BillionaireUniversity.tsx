/* ============================================================
   BILLIONAIRE COLLECTION — Billionaire University (/university)
   Wealth Preservation: Learn. Master. Apply.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

const BU_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/ppmZdiZKLUQkdQiQ.png";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const PILLARS = [
  {
    title: "Asset Protection",
    desc: "Structures that shield your wealth from litigation, creditors, and economic shocks.",
    icon: "◆",
  },
  {
    title: "Generational Transfer",
    desc: "Frameworks for passing wealth to the next generation with minimal loss.",
    icon: "◆",
  },
  {
    title: "Legacy Building",
    desc: "Creating a family name and reputation that outlasts any single generation.",
    icon: "◆",
  },
];

const PRINCIPLES = [
  { label: "Learn the principles.", delay: 0 },
  { label: "Master the principles.", delay: 0.12 },
  { label: "Apply the principles to your own wealth.", delay: 0.24 },
];

export default function BillionaireUniversity() {
  useSEO({
    title: "Billionaire University | Wealth Preservation — Billionaire Collection",
    description: "Old money families don't just earn more — they think differently. For the first time, the principles of asset protection, generational transfer, and legacy building are available outside the private clubs and family offices where they have been kept for generations.",
    keywords: "billionaire university, wealth preservation, asset protection, generational wealth transfer, legacy building, old money principles, UHNW education, billionaire collection",
    url: "https://billionairecollection.com/university",
  });

  return (
    <div style={{ background: "#000" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: "680px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.25) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(8rem, 16vh, 13rem)" }}>
          {/* BU Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "center" }}
          >
            <img
              src={BU_LOGO}
              alt="Billionaire University"
              style={{ height: "80px", width: "auto", objectFit: "contain" }}
            />
          </motion.div>

          {/* Three principles */}
          <div style={{ marginBottom: "3rem" }}>
            {PRINCIPLES.map((p) => (
              <motion.p
                key={p.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + p.delay, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 400,
                  fontSize: "clamp(0.9rem, 1.8vw, 1.125rem)",
                  color: GOLD,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                  lineHeight: 1.5,
                }}
              >
                {p.label}
              </motion.p>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}
          >
            <a href="https://www.billionaireuniversity.com" target="_blank" rel="noopener noreferrer">
              <button className="btn-gold" style={{ letterSpacing: "0.18em", fontSize: "0.6875rem", padding: "1rem 2.25rem" }}>
                Visit Billionaire University
              </button>
            </a>
            <Link href="/golden-ticket">
              <span
                style={{ fontFamily: FONT_UI, fontWeight: 400, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", cursor: "pointer", borderBottom: `1px solid rgba(201,168,76,0.3)`, paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = GOLD; (e.target as HTMLElement).style.borderColor = GOLD; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)"; }}
              >Golden Ticket</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: "9rem 0 7rem" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
              <span className="bc-badge" style={{ marginBottom: "1.75rem" }}>Old Money Principles</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.875rem, 3.5vw, 3rem)", color: "#fff", lineHeight: 1.25, marginBottom: "2.5rem" }}>
                They Don't Just Earn More.<br />
                <span style={{ color: GOLD, fontStyle: "italic" }}>They Think Differently.</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                Old money families don't just earn more — they think differently. They structure differently. They protect differently. For the first time, these principles are available outside the private clubs, family offices, and elite advisory circles where they have been kept for generations.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section style={{ padding: "0 0 9rem", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="container" style={{ paddingTop: "7rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                <img
                  src={BU_LOGO}
                  alt="Billionaire University"
                  style={{ height: "100px", width: "auto", objectFit: "contain" }}
                />
              </div>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", lineHeight: 1.25 }}>
                The Three <span style={{ color: GOLD }}>Pillars of Preservation</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {PILLARS.map((pillar, i) => (
              <FadeUp key={pillar.title} delay={i * 0.12}>
                <div
                  className="bc-glass-card"
                  style={{ padding: "3.5rem 2.5rem", height: "100%", display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <span style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.25em", color: GOLD }}>
                    {pillar.icon} {pillar.title}
                  </span>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.5rem", color: "#fff", lineHeight: 1.3, margin: 0 }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BREAK ── */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.03)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
              <div style={{ width: "40px", height: "1px", background: GOLD, margin: "0 auto 2.5rem" }} />
              <blockquote style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.375rem, 2.5vw, 2rem)", color: "#fff", lineHeight: 1.55, fontStyle: "italic", margin: "0 0 2.5rem" }}>
                "These principles have been kept inside private clubs, family offices, and elite advisory circles for generations. Until now."
              </blockquote>
              <div style={{ width: "40px", height: "1px", background: GOLD, margin: "0 auto" }} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "9rem 0", textAlign: "center" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
              <img
                src={BU_LOGO}
                alt="Billionaire University"
                style={{ height: "110px", width: "auto", objectFit: "contain" }}
              />
            </div>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.875rem, 3.5vw, 3rem)", color: "#fff", marginBottom: "1.5rem" }}>
              Begin Your <span style={{ color: GOLD, fontStyle: "italic" }}>Education</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.45)", maxWidth: "480px", margin: "0 auto 3rem", lineHeight: 1.75 }}>
              The principles of old money wealth preservation are now available to those who seek them. Your legacy begins here.
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
              <a href="https://www.billionaireuniversity.com" target="_blank" rel="noopener noreferrer">
                <button className="btn-gold" style={{ letterSpacing: "0.18em", fontSize: "0.6875rem", padding: "1.125rem 2.5rem" }}>
                  Visit Billionaire University
                </button>
              </a>
              <Link href="/ecosystem">
                <button className="btn-ghost-gold">Explore the Ecosystem</button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
