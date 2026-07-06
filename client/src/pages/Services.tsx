import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
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

export default function Services() {
  useSEO({
    title: "Billionaire Services Division — Funding, Golf, Travel & Card",
    description: "Billionaire Services provides elite funding solutions, private golf access, ultra-luxury travel, and the exclusive Billionaire Card — a complete suite of premium services for UHNW individuals.",
    keywords: "Billionaire Services, elite funding, private golf, luxury travel, Billionaire Card, UHNW services, premium lifestyle services",
  });
  const services = [
    { label: "Funding & Investments", icon: "💰", desc: "Access to exclusive investment opportunities, private equity, and funding solutions for ultra-high-net-worth individuals and family offices.", href: "/funding" },
    { label: "Golf", icon: "⛳", desc: "Private access to the world's most exclusive golf courses, tournaments, and bespoke golf travel experiences.", href: "/golf" },
    { label: "Travel", icon: "✈️", desc: "Bespoke travel experiences curated for the world's most discerning travellers — private islands, expedition yachts, and exclusive resort access.", href: "/travel" },
    { label: "Billionaire Card", icon: "💳", desc: "The world's most exclusive membership card — granting 24/7 access to a dedicated concierge team and a world of elite privileges.", href: "/card" },
  ];
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Services" title="Elite Services" titleAccent="Curated for You" subtitle="A comprehensive suite of bespoke services designed for ultra-high-net-worth individuals — from investment opportunities to private golf and bespoke travel." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" cta={{ label: "Billionaire Card", href: "/card" }} ctaSecondary={{ label: "Concierge", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Our Services</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>Every Desire <span style={{ color: GOLD }}>Fulfilled</span></h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {services.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.1}>
                <Link href={s.href}>
                  <div className="bc-glass-card" style={{ padding: "3rem 2.5rem", height: "100%", cursor: "pointer" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>{s.icon}</div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.375rem", color: "#fff", marginBottom: "1rem" }}>{s.label}</h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{s.desc}</p>
                    <div style={{ marginTop: "2rem", fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>Explore →</div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
