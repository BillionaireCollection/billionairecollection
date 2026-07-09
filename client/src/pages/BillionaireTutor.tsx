/* ============================================================
   BILLIONAIRE TUTOR — Contextual Landing Page
   Part of the Billionaire Collection Ecosystem
   Neo-Deco Maximalism: cinematic luxury, gold accents,
   8 sections: hero → lived experience → BT difference →
   how it works → coach archetypes → testimonials →
   lead form → ecosystem ties
   ============================================================ */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#D4AF77";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

// ── Hero background — cinematic mentorship in luxury setting
const HERO_BG = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80";
// ── Section backgrounds
const MENTOR_BG = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80";
const BOARDROOM_BG = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80";

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

// ── Gold divider line
function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2rem 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)" }} />
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

// ── Section label badge
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: FONT_UI,
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: GOLD,
      border: `1px solid rgba(201,168,76,0.4)`,
      padding: "0.35rem 1rem",
      marginBottom: "1.5rem",
    }}>
      {children}
    </span>
  );
}

// ── Coach archetype card data
const ARCHETYPES = [
  {
    title: "The Empire Builder",
    subtitle: "From Zero to Nine Figures",
    desc: "Built from nothing — no inheritance, no safety net. Navigated failure, pivoted relentlessly, and constructed multi-industry empires through sheer will and strategic clarity.",
    traits: ["Business scaling", "Resilience frameworks", "Capital allocation"],
    icon: "◆",
  },
  {
    title: "The Wealth Architect",
    subtitle: "Generational Wealth Strategist",
    desc: "Mastered the art of preserving and multiplying wealth across generations. Specialises in asset protection, family office structures, and legacy planning across multiple jurisdictions.",
    traits: ["Estate planning", "Tax optimisation", "Family governance"],
    icon: "◈",
  },
  {
    title: "The Market Oracle",
    subtitle: "Alternative Investment Pioneer",
    desc: "Identified and capitalised on emerging asset classes before they became mainstream. From private equity to digital assets, this coach sees patterns others miss.",
    traits: ["Private equity", "Alternative assets", "Deal sourcing"],
    icon: "◉",
  },
  {
    title: "The Mindset Titan",
    subtitle: "Performance & Psychology Coach",
    desc: "Understands that the greatest barrier to extraordinary wealth is internal. Combines elite psychology with real-world billionaire experience to unlock peak performance.",
    traits: ["Decision-making", "Mental models", "High-performance habits"],
    icon: "◎",
  },
  {
    title: "The Global Operator",
    subtitle: "International Business Strategist",
    desc: "Built businesses across 20+ countries. Navigates geopolitical complexity, cross-border capital flows, and international expansion with the precision of a seasoned statesman.",
    traits: ["Global expansion", "Geopolitical intelligence", "Cross-border deals"],
    icon: "◇",
  },
  {
    title: "The Tech Visionary",
    subtitle: "Founder & Innovation Leader",
    desc: "Turned disruptive ideas into category-defining companies. Understands venture ecosystems, product-market fit, and the psychology of building teams that execute at scale.",
    traits: ["Venture strategy", "Product vision", "Team building"],
    icon: "◐",
  },
];

// ── How it works steps
const HOW_STEPS = [
  {
    num: "01",
    title: "Discover & Inspire",
    desc: "Explore the Billionaire Tutor network here within the Collection. Understand the calibre of coaches and the transformation they deliver.",
  },
  {
    num: "02",
    title: "Submit Your Interest",
    desc: "Complete the personal introduction form below. Your submission is received directly by the Billionaire Collection team for personalised attention.",
  },
  {
    num: "03",
    title: "Personal Response",
    desc: "Our team personally reviews every submission and responds with tailored coach recommendations aligned to your wealth goals and stage.",
  },
  {
    num: "04",
    title: "Deep-Dive Experience",
    desc: "Explore full coach profiles, programmes, and booking on billionairetutor.com — your gateway to the world's most elite self-made mentors.",
  },
];

// ── Testimonials / outcome stories
const TESTIMONIALS = [
  {
    quote: "Working with a self-made billionaire coach through Billionaire Tutor changed the trajectory of my entire business. Not theory — lived wisdom that I could apply immediately.",
    name: "Alexander M.",
    title: "Founder, Private Equity Group",
    location: "Dubai",
  },
  {
    quote: "The difference between a coach who inherited wealth and one who built it from nothing is immeasurable. My Billionaire Tutor coach had walked every step of the path I was on.",
    name: "Victoria S.",
    title: "CEO, Global Logistics Group",
    location: "London",
  },
  {
    quote: "Within six months of working with my coach, I restructured my entire wealth architecture. The ROI on this mentorship is unlike anything else in the Collection.",
    name: "James O.",
    title: "Managing Director, Family Office",
    location: "Singapore",
  },
];

// ── Wealth stage options for the form
const WEALTH_STAGES = [
  "Building my first $1M",
  "$1M – $10M net worth",
  "$10M – $50M net worth",
  "$50M – $100M net worth",
  "$100M+ net worth",
  "Prefer not to say",
];

export default function BillionaireTutor() {
  useSEO({
    title: "Billionaire Tutor — Elite Self-Made Wealth Coaches | Billionaire Collection",
    description: "Access Tier 1 self-made millionaire and billionaire wealth coaches through Billionaire Tutor — a Billionaire Collection vertical. Connect with mentors who built their fortunes from the ground up and now share battle-tested strategies for wealth acceleration.",
    keywords: "billionaire tutor, wealth coach, self-made millionaire mentor, billionaire mentor, wealth coaching, elite mentorship, billionaire collection, wealth acceleration, financial coaching",
    url: "https://www.billionairecollection.com/billionaire-tutor",
    image: HERO_BG,
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Billionaire Collection", "item": "https://www.billionairecollection.com" },
        { "@type": "ListItem", "position": 2, "name": "Billionaire Tutor", "item": "https://www.billionairecollection.com/billionaire-tutor" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Billionaire Tutor",
      "description": "The premier gateway to Tier 1 self-made millionaire and billionaire wealth coaches — part of the Billionaire Collection luxury ecosystem.",
      "url": "https://www.billionairetutor.com",
      "sameAs": ["https://www.billionairetutor.com"],
      "parentOrganization": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://www.billionairecollection.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Billionaire Tutor",
      "description": "Elite self-made wealth coaching and mentorship connecting ultra-high-net-worth individuals with verified self-made millionaire and billionaire coaches.",
      "provider": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://www.billionairecollection.com",
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://www.billionairecollection.com",
      },
      "url": "https://www.billionairecollection.com/billionaire-tutor",
      "areaServed": "Worldwide",
      "audience": {
        "@type": "Audience",
        "audienceType": "Ultra-high-net-worth individuals, entrepreneurs, investors",
      },
    },
  ]);

  // ── Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    wealthStage: "",
    mentorGoal: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const submitMutation = trpc.tutorLead.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormError("");
    },
    onError: (err) => {
      setFormError(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Please provide your name and email.");
      return;
    }
    submitMutation.mutate({
      ...formData,
      source: "billionairecollection.com/billionaire-tutor",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover", backgroundPosition: "center 30%",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

        {/* Part of BC badge — top right */}
        <div style={{ position: "absolute", top: "100px", right: "2rem", zIndex: 2, textAlign: "right" }}>
          <Link href="/">
            <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", cursor: "pointer" }}>
              Part of Billionaire Collection
            </span>
          </Link>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "120px", maxWidth: "900px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionBadge>Billionaire Collection · Elite Mentorship</SectionBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            Access Tier 1 Self-Made Wealth Coaches{" "}
            <span style={{ color: GOLD }}>Who've Already Walked the Path</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ fontFamily: FONT_UI, fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "2.5rem" }}
          >
            Learn directly from millionaires and billionaires who built their fortunes from the ground up — and now passionately share the lived strategies that actually work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <a
              href="#claim-access"
              style={{
                fontFamily: FONT_UI, fontSize: "0.8125rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                color: "#000", padding: "1rem 2.5rem",
                textDecoration: "none", display: "inline-block",
              }}
            >
              Claim Your Golden Ticket
            </a>
            <a
              href="https://www.billionairetutor.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONT_UI, fontSize: "0.8125rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: `1px solid rgba(201,168,76,0.6)`,
                color: GOLD, padding: "1rem 2.5rem",
                textDecoration: "none", display: "inline-block",
              }}
            >
              Explore billionairetutor.com →
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}
          >
            {[
              { stat: "93%", label: "of self-made millionaires credit mentors" },
              { stat: "Tier 1", label: "verified self-made coaches only" },
              { stat: "Global", label: "network across 40+ countries" },
            ].map((item) => (
              <div key={item.stat}>
                <div style={{ fontFamily: FONT_HEADING, fontSize: "2rem", color: GOLD, fontWeight: 400 }}>{item.stat}</div>
                <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em", marginTop: "0.25rem" }}>{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — THE POWER OF LIVED EXPERIENCE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        {/* Subtle background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${MENTOR_BG})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.06,
        }} />

        <div className="container" style={{ position: "relative", maxWidth: "1100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            <FadeUp>
              <SectionBadge>The Difference</SectionBadge>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2, color: "#fff", marginBottom: "1.5rem" }}>
                The Power of{" "}
                <span style={{ color: GOLD }}>Lived Experience</span>
              </h2>
              <GoldDivider />
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                There is a profound difference between a coach who studied wealth and one who built it — from nothing, through adversity, with everything on the line. Tier 1 self-made coaches don't teach tactics from textbooks. They transfer lived patterns of thinking, decision-making, resilience, and opportunity creation that only emerge from having done it at the highest levels.
              </p>
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
                Research consistently confirms what the world's most successful individuals already know: <strong style={{ color: "rgba(255,255,255,0.85)" }}>93% of self-made millionaires credit a mentor as pivotal to their success.</strong> The most transformative guidance comes from those who have personally navigated the full journey — from scarcity mindsets and early struggles to scaling businesses, managing wealth, and creating generational impact.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Inherited Wealth Advisor", desc: "Theoretical knowledge. Textbook strategies. No skin in the game.", negative: true },
                  { label: "Academic Financial Coach", desc: "Credentials without context. Theory without the scars of execution.", negative: true },
                  { label: "Tier 1 Self-Made Mentor", desc: "Battle-tested wisdom. Lived patterns. The full journey — from zero to extraordinary.", negative: false },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: "1.5rem 2rem",
                    border: `1px solid ${item.negative ? "rgba(255,255,255,0.08)" : `rgba(201,168,76,0.4)`}`,
                    background: item.negative ? "transparent" : "rgba(201,168,76,0.05)",
                    position: "relative",
                  }}>
                    {!item.negative && (
                      <div style={{
                        position: "absolute", top: "-1px", left: 0, right: 0, height: "2px",
                        background: `linear-gradient(to right, ${GOLD}, transparent)`,
                      }} />
                    )}
                    <div style={{ fontFamily: FONT_HEADING, fontSize: "1rem", color: item.negative ? "rgba(255,255,255,0.4)" : "#fff", marginBottom: "0.5rem" }}>
                      {item.negative ? "✗ " : "✓ "}{item.label}
                    </div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: item.negative ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)" }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — THE BILLIONAIRE TUTOR DIFFERENCE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#000" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <FadeUp>
            <SectionBadge>Our Curation Standard</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2, color: "#fff", marginBottom: "1rem" }}>
              The Billionaire Tutor{" "}
              <span style={{ color: GOLD }}>Difference</span>
            </h2>
            <GoldDivider />
          </FadeUp>

          <FadeUp delay={0.15}>
            <p style={{ fontFamily: FONT_UI, fontSize: "1.125rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: "4rem" }}>
              Every coach in the Billionaire Tutor network is rigorously verified as genuinely self-made at the highest levels — with a documented journey from humble or challenging beginnings to extraordinary wealth, and a genuine passion for mentoring the next generation. No inherited fortunes. No theoretical advisors. Only those who have earned the right to teach.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {[
              { icon: "◆", title: "Verified Self-Made", desc: "Every coach's wealth journey is independently verified. Only those who built from the ground up qualify." },
              { icon: "◈", title: "Genuine Passion to Mentor", desc: "We select coaches who are driven by legacy and impact — not just additional income streams." },
              { icon: "◉", title: "Battle-Tested Wisdom", desc: "Real patterns of success from navigating failure, scaling businesses, and managing extraordinary wealth." },
              { icon: "◎", title: "Ecosystem Integration", desc: "Seamlessly connected to the full Billionaire Collection — estates, aviation, counsel, and beyond." },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div style={{ padding: "3rem 2rem", background: "#0a0a0a", height: "100%" }}>
                  <div style={{ fontSize: "1.5rem", color: GOLD, marginBottom: "1rem" }}>{item.icon}</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontSize: "1.125rem", color: "#fff", fontWeight: 400, marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#0a0a0a", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${BOARDROOM_BG})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.05,
        }} />
        <div className="container" style={{ position: "relative", maxWidth: "1100px" }}>
          <FadeUp className="" delay={0}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <SectionBadge>Seamless Ecosystem Integration</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>
              How It <span style={{ color: GOLD }}>Works</span>
            </h2>
          </div></FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "2rem" }}>
            {HOW_STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div style={{ position: "relative", padding: "2.5rem 2rem" }}>
                  {/* Connector line */}
                  {i < HOW_STEPS.length - 1 && (
                    <div style={{
                      position: "absolute", top: "3rem", right: "-1rem",
                      width: "2rem", height: "1px",
                      background: `linear-gradient(to right, ${GOLD}, transparent)`,
                      display: "none",
                    }} />
                  )}
                  <div style={{
                    fontFamily: FONT_HEADING, fontSize: "3rem", fontWeight: 400,
                    color: "rgba(201,168,76,0.2)", lineHeight: 1, marginBottom: "1.25rem",
                  }}>
                    {step.num}
                  </div>
                  <div style={{ width: "32px", height: "2px", background: GOLD, marginBottom: "1.25rem" }} />
                  <h3 style={{ fontFamily: FONT_HEADING, fontSize: "1.125rem", color: "#fff", fontWeight: 400, marginBottom: "0.75rem" }}>{step.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{step.desc}</p>
                  {step.num === "04" && (
                    <a
                      href="https://www.billionairetutor.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-block", marginTop: "1rem", fontFamily: FONT_UI, fontSize: "0.75rem", color: GOLD, textDecoration: "none", letterSpacing: "0.08em", borderBottom: `1px solid rgba(201,168,76,0.4)`, paddingBottom: "2px" }}
                    >
                      Visit billionairetutor.com →
                    </a>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — COACH ARCHETYPES
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#000" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionBadge>Curated Network</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>
              Coach <span style={{ color: GOLD }}>Archetypes</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "1.5rem auto 0", lineHeight: 1.8 }}>
              Every coach in our network represents a distinct pathway to extraordinary wealth. Discover which archetype aligns with your goals and current stage.
            </p>
          </div></FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.08)" }}>
            {ARCHETYPES.map((arch, i) => (
              <FadeUp key={arch.title} delay={i * 0.08}>
                <div style={{
                  padding: "2.5rem 2rem",
                  background: "#000",
                  height: "100%",
                  transition: "background 0.3s",
                  cursor: "default",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#0a0a0a")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#000")}
                >
                  <div style={{ fontSize: "1.25rem", color: GOLD, marginBottom: "1rem" }}>{arch.icon}</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontSize: "1.25rem", color: "#fff", fontWeight: 400, marginBottom: "0.25rem" }}>{arch.title}</h3>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>{arch.subtitle}</div>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{arch.desc}</p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {arch.traits.map(t => (
                      <span key={t} style={{
                        fontFamily: FONT_UI, fontSize: "0.6875rem", letterSpacing: "0.08em",
                        color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.2)",
                        padding: "0.2rem 0.6rem",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="https://www.billionairetutor.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONT_UI, fontSize: "0.8125rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: `1px solid rgba(201,168,76,0.5)`,
                color: GOLD, padding: "0.875rem 2.5rem",
                textDecoration: "none", display: "inline-block",
              }}
            >
              View All Coaches on billionairetutor.com →
            </a>
          </div></FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — TESTIMONIALS / TRANSFORMATION
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#0a0a0a" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionBadge>Transformation & Impact</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>
              The Results Speak for{" "}
              <span style={{ color: GOLD }}>Themselves</span>
            </h2>
          </div></FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.12}>
                <div style={{
                  padding: "2.5rem",
                  border: "1px solid rgba(201,168,76,0.15)",
                  background: "rgba(201,168,76,0.02)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: `linear-gradient(to right, ${GOLD}, transparent)`,
                  }} />
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "3rem", color: GOLD, opacity: 0.3, lineHeight: 1, marginBottom: "1rem" }}>"</div>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "2rem" }}>
                    {t.quote}
                  </p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.25rem" }}>
                    <div style={{ fontFamily: FONT_HEADING, fontSize: "1rem", color: "#fff" }}>{t.name}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: GOLD, letterSpacing: "0.08em", marginTop: "0.25rem" }}>{t.title}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.125rem" }}>{t.location}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Impact stats */}
          <FadeUp delay={0.3}>
          <div style={{ marginTop: "5rem" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1px", background: "rgba(201,168,76,0.1)",
            }}>
              {[
                { stat: "93%", label: "Credit mentors as pivotal" },
                { stat: "10×", label: "Average wealth acceleration" },
                { stat: "40+", label: "Countries represented" },
                { stat: "100%", label: "Verified self-made coaches" },
              ].map((item) => (
                <div key={item.stat} style={{ padding: "2.5rem", background: "#0a0a0a", textAlign: "center" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "2.5rem", color: GOLD, fontWeight: 400 }}>{item.stat}</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", marginTop: "0.5rem" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div></FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — LEAD CAPTURE FORM
      ══════════════════════════════════════════════════════ */}
      <section id="claim-access" style={{ padding: "8rem 0", background: "#000", position: "relative" }}>
        {/* Gold accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        <div className="container" style={{ maxWidth: "720px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionBadge>Begin Your Journey</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1rem" }}>
              Request a Personal{" "}
              <span style={{ color: GOLD }}>Introduction</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              Complete the form below and our team will personally respond with tailored coach recommendations aligned to your wealth goals. Your submission is received directly by the Billionaire Collection admin team.
            </p>
          </div></FadeUp>

          {submitted ? (
            <FadeUp>
              <div style={{
                padding: "3rem",
                border: `1px solid rgba(201,168,76,0.4)`,
                background: "rgba(201,168,76,0.04)",
                textAlign: "center",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>◆</div>
                <h3 style={{ fontFamily: FONT_HEADING, fontSize: "1.75rem", color: "#fff", fontWeight: 400, marginBottom: "1rem" }}>
                  Your Introduction Has Been Received
                </h3>
                <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Our team will personally review your submission and respond with curated coach recommendations. In the meantime, explore the full Billionaire Tutor experience.
                </p>
                <a
                  href="https://www.billionairetutor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: FONT_UI, fontSize: "0.8125rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                    color: "#000", padding: "0.875rem 2.5rem",
                    textDecoration: "none", display: "inline-block",
                  }}
                >
                  Explore billionairetutor.com →
                </a>
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={0.1}>
              <form onSubmit={handleSubmit} style={{
                padding: "3rem",
                border: "1px solid rgba(201,168,76,0.2)",
                background: "#0a0a0a",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

                {/* Hidden source tracking */}
                <input type="hidden" name="source" value="billionairecollection.com/billionaire-tutor" />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.5rem" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      style={{
                        width: "100%", padding: "0.875rem 1rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff", fontFamily: FONT_UI, fontSize: "0.9375rem",
                        outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.5rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      style={{
                        width: "100%", padding: "0.875rem 1rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff", fontFamily: FONT_UI, fontSize: "0.9375rem",
                        outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.5rem" }}>
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: "100%", padding: "0.875rem 1rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff", fontFamily: FONT_UI, fontSize: "0.9375rem",
                      outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.5rem" }}>
                    Current Wealth Stage
                  </label>
                  <select
                    name="wealthStage"
                    value={formData.wealthStage}
                    onChange={handleChange}
                    style={{
                      width: "100%", padding: "0.875rem 1rem",
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: formData.wealthStage ? "#fff" : "rgba(255,255,255,0.35)",
                      fontFamily: FONT_UI, fontSize: "0.9375rem",
                      outline: "none", boxSizing: "border-box", cursor: "pointer",
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  >
                    <option value="">Select your current stage</option>
                    {WEALTH_STAGES.map(s => (
                      <option key={s} value={s} style={{ background: "#0a0a0a" }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.5rem" }}>
                    What Are You Seeking Most from a Self-Made Mentor?
                  </label>
                  <textarea
                    name="mentorGoal"
                    value={formData.mentorGoal}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your wealth goals, current challenges, and what you hope to gain from working with a self-made billionaire coach..."
                    style={{
                      width: "100%", padding: "0.875rem 1rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff", fontFamily: FONT_UI, fontSize: "0.9375rem",
                      outline: "none", boxSizing: "border-box",
                      resize: "vertical", lineHeight: 1.7,
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {formError && (
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "#ef4444", marginBottom: "1rem" }}>
                    {formError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  style={{
                    width: "100%", padding: "1.125rem",
                    background: submitMutation.isPending ? "rgba(201,168,76,0.5)" : `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                    color: "#000", fontFamily: FONT_UI, fontSize: "0.8125rem",
                    fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                    border: "none", cursor: submitMutation.isPending ? "not-allowed" : "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  {submitMutation.isPending ? "Submitting..." : "Request My Personal Introduction"}
                </button>

                <p style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
                  Your submission is received directly by the Billionaire Collection team. We personally respond to every qualified enquiry. For the full coach experience, visit{" "}
                  <a href="https://www.billionairetutor.com" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "none" }}>billionairetutor.com</a>.
                </p>
              </form>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — ECOSYSTEM TIES / FOOTER BRIDGE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "#0a0a0a", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container" style={{ maxWidth: "1100px", textAlign: "center" }}>
          <FadeUp>
            <SectionBadge>Part of the Billionaire Collection</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", marginBottom: "1rem" }}>
              One Ecosystem. Extraordinary Access.
            </h2>
            <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto 3rem", lineHeight: 1.8 }}>
              Billionaire Tutor is one vertical within the world's premier luxury ecosystem — curating access to the extraordinary in every dimension of ultra-high-net-worth life.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
              {[
                { label: "Estates", href: "/estates" },
                { label: "Superyachts", href: "/boat" },
                { label: "Private Aviation", href: "/air" },
                { label: "Automotive", href: "/car" },
                { label: "Billionaire University", href: "/technology" },
                { label: "Billionaire Counsel", href: "/technology" },
                { label: "Billionaire Vitality", href: "/technology" },
                { label: "Fine Art", href: "/art" },
                { label: "Champagne", href: "/champagne" },
                { label: "Cigars", href: "/cigar" },
              ].map((item) => (
                <Link key={item.label} href={item.href}>
                  <span style={{
                    fontFamily: FONT_UI, fontSize: "0.75rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
                    cursor: "pointer", transition: "color 0.2s",
                    textDecoration: "none",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <Link href="/">
              <span style={{
                fontFamily: FONT_HEADING, fontSize: "1.25rem", color: "#fff",
                letterSpacing: "0.05em", cursor: "pointer",
              }}>
                BILLIONAIRE <span style={{ color: GOLD }}>COLLECTION</span>
              </span>
            </Link>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", marginTop: "0.75rem", letterSpacing: "0.1em" }}>
              EST. LONDON · THE WORLD'S PREMIER LUXURY ECOSYSTEM
            </p>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
