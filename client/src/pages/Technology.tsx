/* ============================================================
   BILLIONAIRE COLLECTION — Technology Page
   Neo-Deco Maximalism: Three.js sphere as section motif.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SphereAnimation from "@/components/SphereAnimation";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export default function Technology() {
  useSEO({
    title: "Billionaire Technology — University, Digital & Vitality | A Billionaire Collection Division",
    description: "Billionaire Technology is the technology and education division of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Encompassing Billionaire University, Billionaire Digital, Billionaire Vitality, and Billionaire Peptide — innovation for the ultra-high-net-worth.",
    keywords: "Billionaire Technology, Billionaire Collection technology, Billionaire University, Billionaire Digital, Billionaire Vitality, Billionaire Peptide, UHNW technology, luxury tech division, Billionaire Collection innovation",
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
        "name": "Billionaire Technology",
        "item": "https://billionairecollection.com/technology"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Billionaire Technology",
    "description": "Billionaire Technology is the technology and education division of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/technology",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  const divisions = [
    {
      label: "Billionaire University",
      icon: null,
      logo: "/manus-storage/billionaire-university-logo_6bb39c00.jpg",
      href: "https://www.billionaireuniversity.com/",
      desc: "The world's most exclusive educational platform for ultra-high-net-worth individuals — masterclasses, mentorship, and knowledge from the world's greatest minds.",
      detail: "Curated curricula spanning wealth preservation, geopolitical intelligence, alternative investments, and the art of living — delivered by Nobel laureates, heads of state, and industry titans.",
    },
    {
      label: "Billionaire Counsel",
      icon: null,
      logo: "/manus-storage/billionaire-counsel-signing-room_56044cd8.webp",
      href: "https://www.billionairecounsel.com/",
      desc: "The world's most exclusive private wealth counsel for ultra-high-net-worth individuals and family offices — protecting, preserving, and transferring wealth across generations.",
      detail: "Asset protection, estate planning, tax advisory, family governance, and international structuring — delivered by elite advisors across 47 jurisdictions with absolute discretion.",
    },
    {
      label: "Billionaire Vitality",
      icon: null,
      logo: "/manus-storage/billionaire-vitality-lifestyle_cd6e79ee.png",
      href: "https://www.billionairevitality.com/",
      desc: "Elite health and longevity programmes designed for peak performance — combining the latest in medical science with the most exclusive wellness retreats.",
      detail: "Precision medicine, cellular reprogramming research, biometric optimisation, and access to the world's foremost longevity clinics — for those who demand more from life.",
    },
  ];

  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="Billionaire Technology"
        title="The Future of"
        titleAccent="Elite Living"
        subtitle="Three pioneering divisions at the intersection of technology, education, and human performance — engineered exclusively for ultra-high-net-worth individuals."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp"
        cta={{ label: "Explore Divisions", href: "#divisions" }}
      />

      {/* ── SPHERE SHOWCASE SECTION ── */}
      <section style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}>
        {/* Sphere background */}
        <div style={{ position: "absolute", right: "-15%", top: "50%", transform: "translateY(-50%)", width: "700px", height: "700px", opacity: 0.35, pointerEvents: "none" }} className="hidden lg:block">
          <SphereAnimation />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.04) 0%, #000 60%)" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "600px" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>The Vision</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                An Interconnected <span style={{ color: GOLD }}>Ecosystem</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Billionaire Technology represents the convergence of human ambition and technological mastery. Like the orbiting nodes of our sphere — each division is independent yet intrinsically connected, forming a unified whole greater than its parts.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                From the acquisition of knowledge at Billionaire University, to the digital infrastructure of Billionaire Digital, to the biological optimisation of Billionaire Vitality — each pillar reinforces the others, creating a complete framework for elite human performance.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── DIVISIONS GRID ── */}
      <section id="divisions" style={{ padding: "6rem 0 8rem" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Technology Divisions</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Three Pillars of <span style={{ color: GOLD }}>Innovation</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {divisions.map((d, i) => (
              <FadeUp key={d.label} delay={i * 0.1}>
                <div className="bc-glass-card" style={{ padding: "3rem 2.5rem", height: "100%" }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    {d.logo ? (
                      <img
                        src={d.logo}
                        alt={d.label + " image"}
                        style={{
                          width: "100%",
                          height: "140px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginBottom: "0.5rem",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: "2.5rem" }}>{d.icon}</div>
                    )}
                  </div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.375rem", color: "#fff", marginBottom: "1rem" }}>{d.label}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{d.desc}</p>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: "2rem" }}>{d.detail}</p>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px" }}>Visit {d.label} →</a>
                  ) : (
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>Coming Soon</div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", marginBottom: "1.5rem" }}>
              Be Among the <span style={{ color: GOLD }}>First</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
              Register your interest in Billionaire Technology. Our team will contact you when each division launches.
            </p>
            <Link href="/card-concierge">
              <button className="btn-gold">Register Interest</button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
