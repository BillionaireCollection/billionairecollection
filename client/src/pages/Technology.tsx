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
    title: "Billionaire Technology Division — Digital & Vitality",
    description: "Billionaire Technology encompasses Billionaire Digital, Billionaire University, and Billionaire Vitality — pioneering digital innovation and longevity science for ultra-high-net-worth individuals.",
    keywords: "Billionaire Technology, Billionaire Digital, Billionaire University, Billionaire Vitality, luxury technology, UHNW tech, longevity science",
  });
  const divisions = [
    {
      label: "Billionaire University",
      icon: "🎓",
      desc: "The world's most exclusive educational platform for ultra-high-net-worth individuals — masterclasses, mentorship, and knowledge from the world's greatest minds.",
      detail: "Curated curricula spanning wealth preservation, geopolitical intelligence, alternative investments, and the art of living — delivered by Nobel laureates, heads of state, and industry titans.",
    },
    {
      label: "Billionaire Digital",
      icon: "💻",
      desc: "Cutting-edge digital solutions for UHNW individuals and family offices — from bespoke technology infrastructure to AI-powered wealth management tools.",
      detail: "Proprietary AI platforms, cybersecurity architecture, digital asset custody, and bespoke software engineering — engineered for the demands of the ultra-wealthy.",
    },
    {
      label: "Billionaire Vitality",
      icon: "⚕️",
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
                  <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>{d.icon}</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.375rem", color: "#fff", marginBottom: "1rem" }}>{d.label}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{d.desc}</p>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: "2rem" }}>{d.detail}</p>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>Coming Soon</div>
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
