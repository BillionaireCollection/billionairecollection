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

export default function Champagne() {
  useSEO({
    title: "Billionaire Champagne — Premier Millésimé Cuvée | A Billionaire Collection Company",
    description: "Billionaire Champagne is the premier millésimé cuvée champagne house within the Billionaire Collection ecosystem. Ultra-premium and rare champagnes — Cristal, Dom Pérignon, Krug, and exclusive private cuvées — curated by Billionaire Collection, the parent company of the world's premier luxury brand portfolio.",
    keywords: "Billionaire Champagne, Billionaire Collection champagne, premier cuvée champagne, ultra-premium champagne, rare champagne, Cristal, Dom Pérignon, Krug, luxury champagne house, Billionaire Collection products",
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
        "name": "Billionaire Champagne",
        "item": "https://billionairecollection.com/champagne"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Billionaire Champagne \u2014 Premier Mill\u00e9sim\u00e9 Cuv\u00e9e",
    "description": "Billionaire Champagne is the premier mill\u00e9sim\u00e9 cuv\u00e9e champagne house within the Billionaire Collection ecosystem.",
    "url": "https://billionairecollection.com/champagne",
    "brand": {
      "@type": "Brand",
      "name": "Billionaire Champagne"
    },
    "category": "Luxury Champagne",
    "manufacturer": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStoreOnly",
      "seller": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://billionairecollection.com"
      }
    },
    "parentOrganization": {"@type": "Organization", "name": "Billionaire Collection", "url": "https://billionairecollection.com"}
  }
]);
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Champagne" title="Ultra-Premium" titleAccent="Cuvées" subtitle="The world's most exclusive champagnes — from legendary Prestige Cuvées to rare single-vineyard expressions and bespoke private label creations." image="https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/billionaire-champagne-bottle_9021fd5a.png" cta={{ label: "Enquire", href: "/card-concierge" }} />
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
