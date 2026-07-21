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
    title: "Billionaire Vodka — Ultra-Premium Spirits | A Billionaire Collection Company",
    description: "Billionaire Vodka is the ultra-premium spirits brand within the Billionaire Collection ecosystem. Limited-edition vodkas crafted for the world's most discerning palates — curated by Billionaire Collection, the parent company of the world's premier luxury brand portfolio.",
    keywords: "Billionaire Vodka, Billionaire Collection spirits, ultra-premium vodka, limited edition vodka, luxury spirits, rare vodka, Billionaire Collection products, UHNW spirits, premium vodka brand",
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
        "name": "Billionaire Vodka",
        "item": "https://billionairecollection.com/vodka"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Billionaire Vodka \u2014 Ultra-Premium Spirits",
    "description": "Billionaire Vodka is the ultra-premium spirits brand within the Billionaire Collection ecosystem.",
    "url": "https://billionairecollection.com/vodka",
    "brand": {
      "@type": "Brand",
      "name": "Billionaire Vodka"
    },
    "category": "Luxury Spirits",
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
      <PageHero badge="Billionaire Vodka" title="Limited-Edition" titleAccent="Spirits" subtitle="Ultra-premium vodkas crafted for the most discerning palates — from crystal-clear Scandinavian expressions to rare single-grain distillations." image="https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/billionaire-vodka-bottle_cb8d04b6.png" cta={{ label: "Enquire", href: "/card-concierge" }} />
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
