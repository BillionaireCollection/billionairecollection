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

export default function Magazine() {
  useSEO({
    title: "Billionaire Collection Magazine — The Luxury Authority | A Billionaire Collection Publication",
    description: "Billionaire Collection Magazine is the flagship publication of Billionaire Collection, the parent company of the world's premier luxury ecosystem. The definitive magazine for ultra-high-net-worth individuals — covering real estate, yachts, aviation, art, and the global luxury market since 2005.",
    keywords: "Billionaire Collection Magazine, luxury magazine, UHNW publication, billionaire magazine London, luxury lifestyle editorial, Billionaire Collection publication, ultra-luxury magazine, luxury media group",
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
        "name": "Billionaire Collection Magazine",
        "item": "https://billionairecollection.com/magazine"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Periodical",
    "name": "Billionaire Collection Magazine",
    "description": "The flagship publication of Billionaire Collection, the parent company of the world's premier luxury ecosystem. The definitive luxury magazine since 2005.",
    "url": "https://billionairecollection.com/magazine",
    "publisher": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Magazine" title="The Definitive" titleAccent="Luxury Publication" subtitle="The world's most prestigious print and digital magazine for ultra-high-net-worth individuals — featuring in-depth profiles, market intelligence, and the finest luxury editorial." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Subscribe", href: "/news" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>The Magazine</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>
              Intelligence for the <span style={{ color: GOLD }}>Global Elite</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>
              Billionaire Magazine is the definitive publication for those who have achieved extraordinary success. Each issue features exclusive interviews with world leaders, billionaires, and cultural icons; in-depth analysis of global wealth trends; and the finest luxury editorial spanning fashion, art, travel, and real estate.
            </p>
            <Link href="/news"><button className="btn-ghost-gold">Read Latest News</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
