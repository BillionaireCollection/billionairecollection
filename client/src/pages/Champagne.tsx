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

export default function Champagne() {
  useSEO({
    title: "Ultra-Premium Champagne | Billionaire Collection",
    description: "Discover and acquire ultra-premium champagne cuvées from the world's most exclusive houses through Billionaire Collection. Rare vintages and prestige cuvées for the discerning palate.",
    keywords: "premium champagne, rare champagne, luxury champagne, prestige cuvée, vintage champagne",
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Champagne" title="Ultra-Premium" titleAccent="Cuvées" subtitle="The world's most exclusive champagnes — from legendary Prestige Cuvées to rare single-vineyard expressions and bespoke private label creations." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Enquire", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>The Art of <span style={{ color: GOLD }}>Champagne</span></h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>Billionaire Champagne presents an extraordinary collection of the world's most sought-after cuvées — from the legendary Cristal and Dom Pérignon to ultra-rare Krug Clos du Mesnil and Salon Blanc de Blancs. Each bottle in our collection represents the pinnacle of the champagne maker's art, sourced directly from the finest houses in the Champagne region of France.</p>
            <Link href="/card-concierge"><button className="btn-ghost-gold">Request a Tasting</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
