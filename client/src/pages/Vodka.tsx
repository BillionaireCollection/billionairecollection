import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
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

export default function Vodka() {
  useSEO({
    title: "Ultra-Premium Vodka | Billionaire Vodka",
    description: "Explore Billionaire Vodka's collection of ultra-premium, limited-edition spirits. Crafted for the world's most discerning palates — rare distillations and bespoke bottles of extraordinary quality.",
    keywords: "ultra-premium vodka, luxury vodka, limited edition vodka, rare spirits, Billionaire Vodka, exclusive vodka, premium spirits",
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Billionaire Vodka — Ultra-Premium Spirits",
    "description": "Ultra-premium, limited-edition vodkas crafted for the world's most discerning palates — rare distillations and bespoke bottles of extraordinary quality.",
    "url": "https://billionairecollection.com/vodka",
    "brand": { "@type": "Brand", "name": "Billionaire Vodka" },
    "category": "Luxury Spirits",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStoreOnly",
      "seller": { "@type": "Organization", "name": "Billionaire Collection", "url": "https://billionairecollection.com" }
    }
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Vodka" title="Limited-Edition" titleAccent="Spirits" subtitle="Ultra-premium vodkas crafted for the most discerning palates — from crystal-clear Scandinavian expressions to rare single-grain distillations." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Enquire", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>Purity <span style={{ color: GOLD }}>Perfected</span></h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>Billionaire Vodka presents a curated selection of the world's most exceptional vodkas — each one a testament to the distiller's art. From the crystalline purity of Icelandic glacier water vodkas to the complex character of rare grain expressions aged in French oak, our collection represents the absolute pinnacle of the category.</p>
            <Link href="/card-concierge"><button className="btn-ghost-gold">Request a Tasting</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
