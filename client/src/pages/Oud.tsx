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

export default function Oud() {
  useSEO({
    title: "Billionaire Oud — Bespoke Arabian Fragrances | A Billionaire Collection Company",
    description: "Billionaire Oud is the bespoke Arabian fragrance brand within the Billionaire Collection ecosystem. The rarest ouds and luxury fragrances sourced from the world's finest agarwood estates — curated by Billionaire Collection, the parent company of the world's premier luxury brand portfolio.",
    keywords: "Billionaire Oud, Billionaire Collection fragrance, Arabian oud, luxury fragrance, rare agarwood, bespoke perfume, Billionaire Collection products, UHNW fragrance, premium oud brand",
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
        "name": "Billionaire Oud",
        "item": "https://billionairecollection.com/oud"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Billionaire Oud \u2014 Bespoke Arabian Fragrances",
    "description": "Billionaire Oud is the bespoke Arabian fragrance brand within the Billionaire Collection ecosystem.",
    "url": "https://billionairecollection.com/oud",
    "brand": {
      "@type": "Brand",
      "name": "Billionaire Oud"
    },
    "category": "Luxury Fragrance",
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
      <PageHero badge="Billionaire Oud" title="Bespoke" titleAccent="Arabian Fragrances" subtitle="The rarest oud oils and bespoke fragrances from the world's most prestigious Arabian perfumers — presented in hand-crafted crystal flacons of extraordinary beauty." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Enquire", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>The Scent of <span style={{ color: GOLD }}>Luxury</span></h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>Billionaire Oud presents the world's most exclusive collection of oud oils and Arabian fragrances. Sourced from the finest agarwood forests of Cambodia, India, and the Arabian Peninsula, each fragrance is a masterwork of olfactory art — complex, rare, and utterly distinctive. Our bespoke service allows clients to commission entirely personalised fragrances, created by master perfumers to their exact specifications.</p>
            <Link href="/card-concierge"><button className="btn-ghost-gold">Commission a Fragrance</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
