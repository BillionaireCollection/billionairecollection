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

export default function Radio() {
  useSEO({
    title: "Billionaire Radio — Luxury Lifestyle Audio | A Billionaire Collection Company",
    description: "Billionaire Radio is the audio broadcast division of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Exclusive radio programming and podcasts for ultra-high-net-worth individuals covering luxury, business, and lifestyle.",
    keywords: "Billionaire Radio, Billionaire Collection radio, luxury lifestyle radio, UHNW podcast, luxury audio, Billionaire Collection broadcast, ultra-luxury radio, billionaire podcast",
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
        "name": "Billionaire Radio",
        "item": "https://billionairecollection.com/radio"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "name": "Billionaire Radio",
    "description": "Billionaire Radio is the audio broadcast division of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/radio",
    "broadcaster": {
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
      <PageHero badge="Billionaire Radio" title="Elite" titleAccent="Audio" subtitle="Curated audio content for the global elite — expert conversations on wealth, investment, lifestyle, and the forces shaping the world of ultra-high-net-worth individuals." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" cta={{ label: "Listen Now", href: "/media" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Podcast & Radio</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>
              Conversations That <span style={{ color: GOLD }}>Matter</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>
              Billionaire Radio and Podcast features intimate conversations with the world's most successful entrepreneurs, investors, and thought leaders. From wealth management strategies to the future of luxury, our programming delivers intelligence that moves markets and shapes lifestyles.
            </p>
            <Link href="/media"><button className="btn-ghost-gold">Back to Media</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
