/* ============================================================
   BILLIONAIRE TUTOR — Faculty Recruitment Page
   Recruiting self-made millionaires & billionaires to teach
   inside Billionaire University.
   Neo-Deco Maximalism: cinematic dark luxury, gold accents.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

const HERO_BG = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=80";
const OPPORTUNITY_BG = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&q=80";
const WHY_JOIN_BG = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80";

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.75rem",
      marginBottom: "1.5rem",
    }}>
      <div style={{ width: "32px", height: "1px", background: GOLD }} />
      <span style={{
        fontFamily: FONT_UI, fontSize: "0.6875rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.2em", color: GOLD,
      }}>
        {children}
      </span>
      <div style={{ width: "32px", height: "1px", background: GOLD }} />
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CRITERIA = [
  {
    icon: "◆",
    title: "Self-Made Wealth",
    desc: "You built your fortune from the ground up — through enterprise, investment, or innovation. Inherited wealth does not qualify. Your story must be one of creation.",
  },
  {
    icon: "◆",
    title: "Proven Track Record",
    desc: "You have a verifiable history of significant financial achievement. Whether $1M or $1B, your results speak for themselves and can withstand scrutiny.",
  },
  {
    icon: "◆",
    title: "Genuine Passion to Teach",
    desc: "You are driven by more than prestige. You have a real desire to share your lived experience and hard-won wisdom with the next generation of ambitious leaders.",
  },
  {
    icon: "◆",
    title: "UHNW Mindset & Values",
    desc: "You think and operate at the highest level. You understand discretion, excellence, and the responsibility that comes with extraordinary success.",
  },
];

const BENEFITS = [
  {
    num: "01",
    title: "Lasting Legacy",
    desc: "Your knowledge and experience will shape the next generation of self-made wealth creators. This is your opportunity to leave an impact that outlasts any single business venture.",
  },
  {
    num: "02",
    title: "Prestigious Platform",
    desc: "Billionaire University sits within the full Billionaire Collection ecosystem — estates, aviation, superyachts, fine art, and more. Your association carries weight.",
  },
  {
    num: "03",
    title: "Elite Peer Network",
    desc: "Join a curated community of exceptional self-made individuals. The connections formed within this faculty are as valuable as the teaching itself.",
  },
  {
    num: "04",
    title: "Reach & Amplification",
    desc: "Your story, your methods, and your brand are amplified across the Billionaire Collection media network — television, magazine, radio, and digital platforms.",
  },
];

const HOW_STEPS = [
  { num: "01", title: "Express Interest", desc: "Complete the faculty application form below. Our team reviews every submission personally." },
  { num: "02", title: "Personal Review", desc: "Your application is reviewed by the Billionaire Collection central team. We assess fit, credibility, and alignment with our values." },
  { num: "03", title: "Connected via Billionaire Tutor", desc: "Qualified applicants are connected through the Billionaire Tutor platform for a confidential conversation about the opportunity." },
  { num: "04", title: "Faculty Invitation", desc: "Selected coaches receive a formal invitation to teach and mentor inside Billionaire University — on your own terms." },
];

export default function BillionaireTutor() {
  useSEO({
    title: "Join the Faculty — Billionaire University | Billionaire Collection",
    description: "Billionaire University is selectively recruiting self-made millionaires and billionaires to teach and mentor the next generation of wealth creators. If you built your fortune from the ground up and have a passion to share your lived experience, we want to hear from you.",
    keywords: "billionaire university faculty, wealth coach recruitment, self-made millionaire mentor, teach at billionaire university, billionaire tutor faculty, wealth coaching opportunity, billionaire collection, elite mentorship faculty, self-made billionaire coach",
    url: "https://www.billionairecollection.com/billionaire-tutor",
    image: HERO_BG,
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Billionaire Collection", "item": "https://www.billionairecollection.com" },
        { "@type": "ListItem", "position": 2, "name": "Billionaire University", "item": "https://www.billionairecollection.com/technology" },
        { "@type": "ListItem", "position": 3, "name": "Join the Faculty", "item": "https://www.billionairecollection.com/billionaire-tutor" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Billionaire Tutor",
      "description": "The faculty recruitment and mentorship layer for Billionaire University — part of the Billionaire Collection luxury ecosystem.",
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
      "@type": "EducationalOrganization",
      "name": "Billionaire University",
      "description": "Elite wealth and business education platform within the Billionaire Collection ecosystem, taught by verified self-made millionaires and billionaires.",
      "url": "https://www.billionaireuniversity.com",
      "parentOrganization": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://www.billionairecollection.com",
      },
    },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", ventures: "", journey: "", linkedin: "",
  });

  const submitMutation = trpc.facultyApplication.submit.useMutation({
    onSuccess: () => { setSubmitted(true); setFormError(""); },
    onError: (err: { message?: string }) => setFormError(err.message || "Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    submitMutation.mutate({
      ...form,
      source: "billionairecollection.com/billionaire-tutor",
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: `1px solid rgba(201,168,76,0.2)`,
    padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.9375rem",
    color: "#fff", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_UI, fontSize: "0.6875rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.5rem",
  };

  return (
    <div style={{ background: "#000", color: "#fff" }}>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

        {/* Gold top line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "100px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <div style={{ width: "32px", height: "1px", background: GOLD }} />
              <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: GOLD }}>
                Billionaire Collection · Billionaire University
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: FONT_HEADING, fontWeight: 400,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.1, color: "#fff", maxWidth: "820px", marginBottom: "1.5rem",
            }}
          >
            Join the Faculty of{" "}
            <span style={{ color: GOLD }}>Billionaire University</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontFamily: FONT_UI, fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(255,255,255,0.65)", maxWidth: "640px",
              lineHeight: 1.8, marginBottom: "3rem",
            }}
          >
            We are selectively inviting self-made millionaires and billionaires with a passion for sharing their lived experiences to teach and mentor the next generation of wealth creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "4rem" }}
          >
            <a
              href="#apply"
              className="btn-gold"
              style={{ fontSize: "0.8125rem", letterSpacing: "0.12em", textDecoration: "none" }}
            >
              Apply to Join the Faculty
            </a>
            <a
              href="https://www.billionairetutor.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONT_UI, fontSize: "0.8125rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: `1px solid rgba(201,168,76,0.4)`,
                color: GOLD, padding: "0.875rem 2.5rem",
                textDecoration: "none", display: "inline-block",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              Explore billionairetutor.com →
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "2rem 3rem" }}
          >
            {[
              { stat: "Tier 1", label: "Self-made coaches only" },
              { stat: "40+", label: "Countries represented" },
              { stat: "100%", label: "Verified lived experience" },
            ].map((item) => (
              <div key={item.stat}>
                <div style={{ fontFamily: FONT_HEADING, fontSize: "2rem", color: GOLD, fontWeight: 400 }}>{item.stat}</div>
                <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — THE OPPORTUNITY
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#000" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: "3rem 5rem", alignItems: "center" }}>
            {/* Image */}
            <FadeUp>
              <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                <img
                  src={OPPORTUNITY_BG}
                  alt="Billionaire University — The Opportunity"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Gold frame accent */}
                <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", right: "-1.5rem", bottom: "-1.5rem", border: `1px solid rgba(201,168,76,0.25)`, pointerEvents: "none" }} />
              </div>
            </FadeUp>

            {/* Text */}
            <FadeUp delay={0.15}>
              <SectionBadge>The Opportunity</SectionBadge>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "2rem", lineHeight: 1.2 }}>
                Building the World's Most Prestigious{" "}
                <span style={{ color: GOLD }}>Wealth Education Platform</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                Billionaire University is the elite wealth and business education vertical within the Billionaire Collection ecosystem — a global luxury group spanning estates, aviation, superyachts, fine art, media, and more.
              </p>
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                We are not building another online course platform. We are building a living institution — one where the curriculum is delivered by individuals who have actually walked the path. Where theory is replaced by lived experience, and where every lesson carries the weight of real consequence.
              </p>
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
                Self-made coaches are the cornerstone of this vision. Your story, your methods, and your mindset are the curriculum. We provide the platform, the prestige, and the reach.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — WHO WE'RE LOOKING FOR
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#050505" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <SectionBadge>Selection Criteria</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>
              Who We Are{" "}
              <span style={{ color: GOLD }}>Looking For</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "580px", margin: "1.5rem auto 0", lineHeight: 1.8 }}>
              We are highly selective. Every faculty member is personally reviewed by the Billionaire Collection team. These are our non-negotiable criteria.
            </p>
          </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.08)" }}>
            {CRITERIA.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div style={{
                  padding: "3rem 2.5rem",
                  background: "#050505",
                  transition: "background 0.3s",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#050505"; }}
                >
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: GOLD, letterSpacing: "0.2em", marginBottom: "1.25rem" }}>{item.icon}</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.375rem", color: "#fff", marginBottom: "1rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — WHY JOIN AS FACULTY
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#000", position: "relative", overflow: "hidden" }}>
        {/* Background texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${WHY_JOIN_BG})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.06,
        }} />
        <div className="container" style={{ position: "relative", maxWidth: "1100px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <SectionBadge>Faculty Benefits</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>
              Why Join as{" "}
              <span style={{ color: GOLD }}>Faculty</span>
            </h2>
          </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "2rem" }}>
            {BENEFITS.map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.1}>
                <div style={{ padding: "2.5rem 2rem", border: `1px solid rgba(201,168,76,0.1)`, transition: "border-color 0.3s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.1)"; }}
                >
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "3rem", color: "rgba(201,168,76,0.15)", fontWeight: 400, lineHeight: 1, marginBottom: "1.5rem" }}>{item.num}</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", marginBottom: "1rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "8rem 0", background: "#050505" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <SectionBadge>The Process</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>
              How It{" "}
              <span style={{ color: GOLD }}>Works</span>
            </h2>
          </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "0" }}>
            {HOW_STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div style={{ position: "relative", padding: "2.5rem 2rem" }}>
                  {/* Connector line */}
                  {i < HOW_STEPS.length - 1 && (
                    <div style={{
                      position: "absolute", top: "3.25rem", right: 0,
                      width: "1px", height: "calc(100% - 6.5rem)",
                      background: "rgba(201,168,76,0.15)",
                      display: "none",
                    }} />
                  )}
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "2.5rem", color: "rgba(201,168,76,0.2)", fontWeight: 400, lineHeight: 1, marginBottom: "1.25rem" }}>{step.num}</div>
                  <div style={{ width: "32px", height: "1px", background: GOLD, marginBottom: "1.25rem" }} />
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.125rem", color: "#fff", marginBottom: "0.75rem" }}>{step.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <a
              href="https://www.billionairetutor.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONT_UI, fontSize: "0.8125rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: `1px solid rgba(201,168,76,0.4)`,
                color: GOLD, padding: "0.875rem 2.5rem",
                textDecoration: "none", display: "inline-block",
                transition: "border-color 0.2s",
              }}
            >
              Learn More at billionairetutor.com →
            </a>
          </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — LEAD CAPTURE FORM
      ══════════════════════════════════════════════════════ */}
      <section id="apply" style={{ padding: "8rem 0", background: "#000", position: "relative" }}>
        {/* Gold accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        <div className="container" style={{ maxWidth: "720px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionBadge>Begin Your Journey</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1rem" }}>
              Apply to Join the{" "}
              <span style={{ color: GOLD }}>Faculty</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              Complete the form below to express your interest in teaching at Billionaire University. Every application is reviewed personally by the Billionaire Collection team, who will respond directly.
            </p>
          </div>
          </FadeUp>

          {submitted ? (
            <FadeUp>
              <div style={{
                padding: "3rem",
                border: `1px solid rgba(201,168,76,0.4)`,
                background: "rgba(201,168,76,0.04)",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: FONT_HEADING, fontSize: "1.5rem", color: GOLD, marginBottom: "1rem" }}>
                  Application Received
                </div>
                <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                  Thank you for your interest in joining the Billionaire University faculty. Your application has been received and will be reviewed personally by our team. We will be in touch directly.
                </p>
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={0.1}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>LinkedIn or Website</label>
                    <input
                      type="text"
                      placeholder="linkedin.com/in/yourprofile"
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Current / Previous Ventures</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your businesses, investments, or ventures that demonstrate your self-made wealth..."
                    value={form.ventures}
                    onChange={(e) => setForm({ ...form, ventures: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div style={{ marginBottom: "2.5rem" }}>
                  <label style={labelStyle}>Your Journey & What You'd Like to Teach</label>
                  <textarea
                    rows={5}
                    placeholder="Share your story — how you built your wealth from the ground up — and describe what you would like to teach or mentor inside Billionaire University..."
                    value={form.journey}
                    onChange={(e) => setForm({ ...form, journey: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {formError && (
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "#e57373", marginBottom: "1.5rem" }}>{formError}</p>
                )}

                <button
                  type="submit"
                  className="btn-gold"
                  disabled={submitMutation.isPending}
                  style={{ width: "100%", fontSize: "0.875rem", letterSpacing: "0.15em", padding: "1.125rem" }}
                >
                  {submitMutation.isPending ? "Submitting…" : "Submit Faculty Application"}
                </button>

                <p style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.6 }}>
                  Your application is received directly by the Billionaire Collection team. All submissions are treated with complete discretion.
                </p>
              </form>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — ECOSYSTEM TIES / FOOTER CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "#050505", borderTop: `1px solid rgba(201,168,76,0.1)` }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionBadge>Part of the Billionaire Collection</SectionBadge>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#fff" }}>
              The Ecosystem Behind{" "}
              <span style={{ color: GOLD }}>Billionaire University</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", maxWidth: "600px", margin: "1.5rem auto 0", lineHeight: 1.8 }}>
              Billionaire University is one vertical within a global luxury ecosystem spanning estates, aviation, superyachts, fine art, media, and more. Faculty members are aligned with the full power of the Billionaire Collection brand.
            </p>
          </div>
          </FadeUp>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem 2.5rem", marginBottom: "4rem" }}>
            {[
              { label: "Billionaire University", href: "/technology" },
              { label: "Billionaire Tutor", href: "https://www.billionairetutor.com", external: true },
              { label: "Billionaire Estates", href: "/estates" },
              { label: "Billionaire Air", href: "/air" },
              { label: "Billionaire Boat", href: "/boat" },
              { label: "Billionaire Media Group", href: "/media" },
              { label: "Billionaire Counsel", href: "https://billionairecounsel.com", external: true },
              { label: "Billionaire Collection", href: "/" },
            ].map((item) => (
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = GOLD; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href}>
                  <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = GOLD; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            ))}
          </div>

          <FadeUp delay={0.2}>
          <div style={{ textAlign: "center" }}>
            <a
              href="#apply"
              className="btn-gold"
              style={{ fontSize: "0.875rem", letterSpacing: "0.15em", textDecoration: "none" }}
            >
              Apply to Join the Faculty
            </a>
          </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
