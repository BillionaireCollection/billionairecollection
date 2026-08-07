/* ============================================================
   BILLIONAIRE WISDOM — /billionaire-wisdom
   Cross-promotion page: Billionaire Collection → Billionaire University
   Dark navy, gold accents, Inter font, square buttons
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#c9a84c";
const NAVY = "#0a0e1a";
const NAVY_DARK = "#080c18";

// ── Video data ──────────────────────────────────────────────
const VIDEOS = [
  {
    id: "X_PcXDkqNZg",
    name: "Michael Jordan",
    title: "Top 10 Rules for Success",
    category: "MINDSET & DISCIPLINE",
    quote: "Limits, like fears, are often just an illusion. The key is to push through what others believe is impossible.",
    fallback: "linear-gradient(135deg,#1a0a0a,#3d1515)",
  },
  {
    id: "OBG50aoUwlI",
    name: "Taylor Swift",
    title: "NYU Commencement Speech 2022",
    category: "RESILIENCE & BRANDING",
    quote: "Hard work will always be rewarded. Fearlessness means taking risks even when the outcome is uncertain.",
    fallback: "linear-gradient(135deg,#1a0a1a,#3d1540)",
  },
  {
    id: "pAt5OVl0mnA",
    name: "Elon Musk",
    title: "The Billionaire Interview",
    category: "VISION & RISK",
    quote: "When something is important enough, you do it even if the odds are not in your favour. Persistence separates those who build empires from those who dream of them.",
    fallback: "linear-gradient(135deg,#0a0e1a,#152040)",
  },
  {
    id: "b8ka0qVGipA",
    name: "Sara Blakely",
    title: "Spanx Founder Interview",
    category: "ENTREPRENEURSHIP",
    quote: "Failure is not the outcome — failure is not trying. Don't be intimidated by what you don't know.",
    fallback: "linear-gradient(135deg,#1a0f0a,#402515)",
  },
  {
    id: "d-znKk6nHjE",
    name: "Jay-Z",
    title: "10 Rules for Success",
    category: "WEALTH BUILDING",
    quote: "I'm not a businessman — I'm a business, man. Wealth is built by owning assets, not just earning income.",
    fallback: "linear-gradient(135deg,#0a1a0a,#154015)",
  },
  {
    id: "Up9-C4_8dVo",
    name: "Jack Ma",
    title: "Original 1999 Sales Pitch",
    category: "PERSISTENCE",
    quote: "Today is hard, tomorrow will be worse, but the day after tomorrow will be sunshine. Most people give up on tomorrow evening.",
    fallback: "linear-gradient(135deg,#1a1500,#403500)",
  },
  {
    id: "lC_TMK-k-AI",
    name: "Mukesh Ambani",
    title: "5 Insights in 5 Minutes",
    category: "SCALE & LEGACY",
    quote: "Think big. Think fast. Think ahead. Ideas are no one's monopoly — execution and scale are what create generational wealth.",
    fallback: "linear-gradient(135deg,#001a1a,#004040)",
  },
  {
    id: "hDl2RqHet-o",
    name: "Stephen Schwarzman",
    title: "Blackstone Founder Interview",
    category: "CAPITAL & STRATEGY",
    quote: "It's as easy to do something big as it is to do something small, so reach for a fantasy worthy of your pursuit.",
    fallback: "linear-gradient(135deg,#0d0d1a,#202040)",
  },
];

// ── Countdown timer hook ─────────────────────────────────────
function useCountdown() {
  const getDeadline = () => {
    try {
      const stored = localStorage.getItem("bu_cohort_deadline");
      if (stored) return parseInt(stored, 10);
      const deadline = Date.now() + 14 * 24 * 60 * 60 * 1000;
      localStorage.setItem("bu_cohort_deadline", String(deadline));
      return deadline;
    } catch {
      return Date.now() + 14 * 24 * 60 * 60 * 1000;
    }
  };

  const [deadline] = useState(getDeadline);
  const [remaining, setRemaining] = useState(Math.max(0, deadline - Date.now()));

  useEffect(() => {
    const tick = setInterval(() => {
      setRemaining(Math.max(0, deadline - Date.now()));
    }, 1000);
    return () => clearInterval(tick);
  }, [deadline]);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((remaining % (1000 * 60)) / 1000);

  return { days, hours, mins, secs };
}

// ── VideoCard component ──────────────────────────────────────
function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const [playing, setPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const thumbUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div style={{ background: "#0d1120", border: "1px solid rgba(201,168,76,0.15)", display: "flex", flexDirection: "column" }}>
      {/* Thumbnail / iframe */}
      <div
        style={{ position: "relative", width: "100%", paddingBottom: "56.25%", overflow: "hidden", cursor: "pointer" }}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            src={embedUrl}
            title={`${video.name} — ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Thumbnail image or fallback gradient */}
            {!imgError ? (
              <img
                src={thumbUrl}
                alt={`${video.name} — ${video.title}`}
                onError={() => setImgError(true)}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, background: video.fallback }} />
            )}
            {/* Dark overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
            {/* Category badge */}
            <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: GOLD, color: "#000", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", padding: "0.2rem 0.5rem", textTransform: "uppercase" }}>
              {video.category}
            </div>
            {/* Name + title overlay at bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)", padding: "1.5rem 0.75rem 0.75rem" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
                ▶ {video.title}
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", fontFamily: "Inter, sans-serif" }}>
                {video.name}
              </div>
            </div>
            {/* Play button */}
            <div
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: "52px", height: "52px", borderRadius: "50%",
                background: "rgba(0,0,0,0.6)", border: `2px solid ${GOLD}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.12)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translate(-50%,-50%) scale(1)")}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill={GOLD}>
                <polygon points="4,2 16,9 4,16" />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "Inter, sans-serif" }}>{video.name}</div>
        <div style={{ color: GOLD, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{video.category}</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", fontStyle: "italic", lineHeight: 1.6, flex: 1 }}>"{video.quote}"</div>
        <button
          onClick={() => setPlaying(true)}
          style={{
            marginTop: "0.75rem",
            width: "100%",
            minHeight: "48px",
            background: "transparent",
            border: `1px solid ${GOLD}`,
            color: GOLD,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 0,
            WebkitTapHighlightColor: "transparent",
            whiteSpace: "normal",
            padding: "0.5rem 1rem",
          }}
        >
          WATCH THE INTERVIEW
        </button>
      </div>
    </div>
  );
}

// ── Countdown box ────────────────────────────────────────────
function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: "center", background: NAVY_DARK, border: `1px solid ${GOLD}`, padding: "1.25rem 1rem", minWidth: "70px" }}>
      <div style={{ color: GOLD, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, fontFamily: "Inter, sans-serif", lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.4rem" }}>
        {label}
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────
export default function BillionaireWisdom() {
  const { days, hours, mins, secs } = useCountdown();

  useSEO({
    title: "Free Billionaire Insights | Billionaire University — A Billionaire Collection Company",
    description: "Watch billionaires share their wealth principles for free, then learn how to apply them with Billionaire University's Wealth Preservation Mastery programme. A Billionaire Collection company.",
    keywords: "billionaire wisdom, billionaire university, wealth preservation, free billionaire interviews, billionaire collection, UHNW education, generational wealth",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Billionaire Collection", "item": "https://billionairecollection.com" },
        { "@type": "ListItem", "position": 2, "name": "Free Billionaire Insights", "item": "https://billionairecollection.com/billionaire-wisdom" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free Billionaire Insights — Billionaire University",
      "description": "Watch billionaires share their wealth principles and learn how to apply them with Billionaire University.",
      "url": "https://billionairecollection.com/billionaire-wisdom",
      "isPartOf": { "@type": "WebSite", "url": "https://billionairecollection.com" },
      "parentOrganization": { "@type": "Organization", "name": "Billionaire Collection", "url": "https://billionairecollection.com" },
    },
  ]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const btnGold: React.CSSProperties = {
    background: GOLD, color: "#000", border: "none", padding: "1rem 2rem",
    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
    cursor: "pointer", borderRadius: 0, whiteSpace: "normal", minHeight: "48px",
    WebkitTapHighlightColor: "transparent",
  };
  const btnOutlineWhite: React.CSSProperties = {
    background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)",
    padding: "1rem 2rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", cursor: "pointer", borderRadius: 0, whiteSpace: "normal",
    minHeight: "48px", WebkitTapHighlightColor: "transparent",
  };
  const btnOutlineGold: React.CSSProperties = {
    background: "transparent", color: GOLD, border: `1px solid ${GOLD}`,
    padding: "1rem 2rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", cursor: "pointer", borderRadius: 0, whiteSpace: "normal",
    minHeight: "48px", WebkitTapHighlightColor: "transparent",
  };

  return (
    <div style={{ background: NAVY, fontFamily: "Inter, sans-serif", overflowX: "hidden", color: "#fff" }}>

      {/* ── 1. HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem 4rem" }}>
        {/* Radial gold glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Gold top border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div style={{ display: "inline-block", border: `1px solid ${GOLD}`, color: GOLD, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", padding: "0.4rem 1rem", textTransform: "uppercase", marginBottom: "2rem" }}>
            ⭐ FREE BILLIONAIRE INSIGHTS
          </div>

          {/* H1 */}
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "1.5rem", color: "#fff" }}>
            Watch Billionaires Share Their Secrets…<br />
            <span style={{ color: GOLD }}>Then Learn How to Actually Apply Them</span>
          </h1>

          {/* Subtext */}
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto 2.5rem" }}>
            The world's most successful people have shared their principles openly. The question is: do you have the framework to turn their wisdom into <strong style={{ color: "#fff" }}>generational wealth</strong>?
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "3rem" }}>
            <button style={{ ...btnGold, width: "100%", maxWidth: "400px" }} onClick={() => scrollTo("cta-section")}>
              START YOUR WEALTH PRESERVATION JOURNEY
            </button>
            <button style={{ ...btnOutlineWhite, width: "100%", maxWidth: "320px" }} onClick={() => scrollTo("insights-section")}>
              WATCH FREE INSIGHTS BELOW
            </button>
          </div>

          {/* Trust stats */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
            {[
              { icon: "👥", text: "16,000+ Students Enrolled" },
              { icon: "🛡", text: "Family Office Approved" },
              { icon: "📈", text: "$5M–$50M+ Revenue Cohorts" },
            ].map(s => (
              <div key={s.text} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. INSPIRATION TRAP ── */}
      <section style={{ background: NAVY_DARK, padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {/* Gold divider */}
          <div style={{ width: "16px", height: "3px", background: GOLD, margin: "0 auto 2.5rem" }} />
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, textAlign: "center", marginBottom: "2rem" }}>
            The Inspiration Trap
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1.25rem" }}>
            Every year, millions of people watch billionaire interviews, take notes, feel inspired — and then <strong style={{ color: "#fff" }}>nothing changes</strong>. The inspiration fades within 48 hours. The principles they heard remain abstract. The gap between understanding and execution stays exactly where it was.
          </p>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1.25rem" }}>
            The problem is not a lack of information. It is a lack of a <strong style={{ color: GOLD }}>structured framework for implementation</strong>. Billionaire University was built specifically to close that gap — taking the principles you already admire and giving you the precise systems, structures, and strategies to apply them to your own wealth journey.
          </p>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            The videos below are not entertainment. They are the foundation. What Billionaire University provides is the architecture that transforms those principles into <strong style={{ color: GOLD }}>generational wealth</strong> — the kind that survives recessions, transitions between generations, and the test of time.
          </p>
        </div>
      </section>

      {/* ── 3. VIDEO GRID ── */}
      <section id="insights-section" style={{ padding: "6rem 1.5rem", background: NAVY }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Featured Billionaire Insights
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "600px", margin: "0 auto", fontStyle: "italic" }}>
              Watch these powerful interviews — then discover how Billionaire University helps you apply every principle they share.
            </p>
          </div>

          {/* Video grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
            {VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
          </div>

          {/* Mid-section CTA */}
          <div style={{ border: `1px solid ${GOLD}`, borderLeft: `4px solid ${GOLD}`, padding: "2.5rem", background: "rgba(201,168,76,0.04)", textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "0.75rem", fontStyle: "italic" }}>Inspired by what you've seen?</p>
            <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Now learn how to <span style={{ color: GOLD }}>actually apply these principles</span> to your wealth.
            </h3>
            <button style={{ ...btnGold }} onClick={() => scrollTo("cta-section")}>
              EXPLORE THE WEALTH PRESERVATION PROGRAMME
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. BU DIFFERENCE ── */}
      <section style={{ background: NAVY_DARK, padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
          {/* Left: text */}
          <div>
            <div style={{ width: "16px", height: "3px", background: GOLD, marginBottom: "2rem" }} />
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
              The Billionaire University Difference
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Billionaire University is the education arm of the Billionaire Collection ecosystem — built for founders, executives, and entrepreneurs who are serious about preserving and multiplying wealth across generations.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Unlike conventional business education, every module is built on principles drawn directly from the strategies of ultra-high-net-worth families, family offices, and the world's most enduring wealth dynasties.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                "Old Money wealth preservation principles taught by practitioners",
                "Family office structures accessible to entrepreneurs at any stage",
                "Tax efficiency strategies used by ultra-high-net-worth families",
                "Generational wealth transfer frameworks and estate planning",
                "Asset protection systems that survive economic downturns",
              ].map(item => (
                <li key={item} style={{ display: "flex", gap: "0.75rem", color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  <span style={{ color: GOLD, flexShrink: 0, marginTop: "0.2rem" }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: feature cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { icon: "🏆", title: "Cohort-Based Learning", desc: "Study alongside founders with $5M–$50M+ in revenue in intimate cohorts of serious wealth builders." },
              { icon: "🛡", title: "Family Office Access", desc: "Gain access to structures and strategies previously reserved for ultra-high-net-worth families." },
              { icon: "📈", title: "Proven Frameworks", desc: "Every module is built on principles that have preserved wealth through recessions, market crashes, and generational transitions." },
            ].map(card => (
              <div key={card.title} style={{ background: NAVY, border: "1px solid rgba(201,168,76,0.2)", padding: "1.75rem" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{card.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", color: "#fff" }}>{card.title}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.7 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SOCIAL PROOF ── */}
      <section style={{ padding: "6rem 1.5rem", background: NAVY }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Join 16,000+ Wealth Builders Worldwide
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              Founders, executives, and family office principals from 47 countries have already applied these frameworks to their wealth.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px", background: `rgba(201,168,76,0.15)`, marginBottom: "4rem" }}>
            {[
              { value: "16,000+", label: "Students Enrolled" },
              { value: "$5M–$50M+", label: "Cohort Revenue Range" },
              { value: "47+", label: "Countries Represented" },
              { value: "94%", label: "Student Satisfaction" },
            ].map(s => (
              <div key={s.label} style={{ background: NAVY_DARK, padding: "2rem", textAlign: "center" }}>
                <div style={{ color: GOLD, fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, marginBottom: "0.4rem" }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { quote: "Within 6 months of completing the Wealth Preservation course, I restructured my holding company and reduced my effective tax rate by 18%. The ROI on this programme is extraordinary.", name: "James R.", role: "Founder, $12M Revenue Business" },
              { quote: "I've attended Harvard Executive Education and multiple elite programmes. Billionaire University's approach to generational wealth is unlike anything I've encountered. Practical, actionable, and transformative.", name: "Priya S.", role: "Family Office Principal" },
              { quote: "The old money principles taught here aren't taught anywhere else. My grandfather built wealth but never taught us how to keep it. This programme filled that gap completely.", name: "Marcus T.", role: "Second-Generation Entrepreneur" },
            ].map(t => (
              <div key={t.name} style={{ background: NAVY_DARK, border: "1px solid rgba(201,168,76,0.15)", padding: "2rem" }}>
                <div style={{ color: GOLD, fontSize: "1rem", marginBottom: "1rem", letterSpacing: "0.05em" }}>★★★★★</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1.25rem" }}>"{t.quote}"</p>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{t.name}</div>
                <div style={{ color: GOLD, fontSize: "0.75rem", marginTop: "0.2rem" }}>{t.role}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button style={{ ...btnGold }} onClick={() => scrollTo("cta-section")}>
              JOIN THE NEXT COHORT
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. COUNTDOWN + FINAL CTA ── */}
      <section id="cta-section" style={{ background: NAVY_DARK, padding: "6rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {/* Urgency badge */}
          <div style={{ display: "inline-block", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)", color: "#f87171", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", padding: "0.4rem 1rem", textTransform: "uppercase", marginBottom: "2rem" }}>
            🕐 LIMITED SPOTS — NEXT COHORT FILLING FAST
          </div>

          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Applications Close In
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
            Early applicants receive priority access + exclusive bonus resources
          </p>

          {/* Countdown */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <CountBox value={days} label="Days" />
            <CountBox value={hours} label="Hours" />
            <CountBox value={mins} label="Mins" />
            <CountBox value={secs} label="Secs" />
          </div>

          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "2.5rem" }}>
            Once you've watched these billionaires share their principles, the only question remaining is: <strong style={{ color: "#fff" }}>will you be the person who acts on them?</strong>
          </p>

          {/* 3 stacked CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "480px", margin: "0 auto" }}>
            <a href="https://www.billionaireuniversity.com/wealth-preservation" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ ...btnGold, width: "100%" }}>
                ENROL NOW — WEALTH PRESERVATION MASTERY ($997)
              </button>
            </a>
            <a href="https://www.billionaireuniversity.com/wealth-preservation" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ ...btnOutlineGold, width: "100%" }}>
                APPLY FOR THE NEXT COHORT
              </button>
            </a>
            <a href="https://www.billionaireuniversity.com/contact" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ ...btnOutlineWhite, width: "100%" }}>
                SPEAK WITH AN ADVISOR
              </button>
            </a>
          </div>

          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
            Cohorts include founders with $5M–$50M+ in revenue. Spots are strictly limited.
          </p>

          {/* Footer attribution */}
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
            © {new Date().getFullYear()} Billionaire Collection. Billionaire University is a Billionaire Collection company.
          </p>
        </div>
      </section>

    </div>
  );
}
