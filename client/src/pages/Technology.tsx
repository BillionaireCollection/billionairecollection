import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";

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
  const divisions = [
    { label: "Billionaire University", icon: "🎓", desc: "The world's most exclusive educational platform for ultra-high-net-worth individuals — masterclasses, mentorship, and knowledge from the world's greatest minds.", href: "#" },
    { label: "Billionaire Digital", icon: "💻", desc: "Cutting-edge digital solutions for UHNW individuals and family offices — from bespoke technology infrastructure to AI-powered wealth management tools.", href: "#" },
    { label: "Billionaire Vitality", icon: "⚕️", desc: "Elite health and longevity programmes designed for peak performance — combining the latest in medical science with the most exclusive wellness retreats.", href: "#" },
  ];
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Technology" title="The Future of" titleAccent="Elite Living" subtitle="Three pioneering divisions at the intersection of technology, education, and human performance — engineered exclusively for ultra-high-net-worth individuals." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" cta={{ label: "Explore Divisions", href: "#divisions" }} />
      <section id="divisions" style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Technology Divisions</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>Three Pillars of <span style={{ color: GOLD }}>Innovation</span></h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {divisions.map((d, i) => (
              <FadeUp key={d.label} delay={i * 0.1}>
                <div className="bc-glass-card" style={{ padding: "3rem 2.5rem", height: "100%" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>{d.icon}</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.375rem", color: "#fff", marginBottom: "1rem" }}>{d.label}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{d.desc}</p>
                  <div style={{ marginTop: "2rem", fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>Coming Soon</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
