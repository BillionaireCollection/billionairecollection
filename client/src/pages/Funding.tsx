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

export default function Funding() {
  useSEO({
    title: "Billionaire Funding — Elite Capital & Private Finance | A Billionaire Collection Company",
    description: "Billionaire Funding is the private capital division of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Connecting ultra-high-net-worth individuals with exclusive financing, investment, and capital-raising opportunities through the Billionaire Collection network.",
    keywords: "Billionaire Funding, Billionaire Collection capital, elite funding, private capital, UHNW financing, luxury investment, Billionaire Collection funding division, private equity UHNW, wealth management London",
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
        "name": "Billionaire Funding",
        "item": "https://billionairecollection.com/funding"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Billionaire Funding",
    "description": "Billionaire Funding is the private capital division of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/funding",
    "provider": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "areaServed": "Worldwide",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Funding" title="Capital &" titleAccent="Investment" subtitle="Exclusive access to private equity, venture capital, and bespoke funding solutions for ultra-high-net-worth individuals and family offices." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Speak to an Advisor", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>Where Capital <span style={{ color: GOLD }}>Meets Opportunity</span></h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>Billionaire Funding provides ultra-high-net-worth individuals and family offices with exclusive access to investment opportunities that are simply unavailable through conventional channels. From pre-IPO technology investments to private real estate funds and bespoke structured products, our team of investment advisors curates opportunities aligned with your specific objectives and risk profile.</p>
            <Link href="/card-concierge"><button className="btn-ghost-gold">Speak to an Advisor</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
