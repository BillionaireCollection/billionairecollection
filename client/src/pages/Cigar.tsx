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

export default function Cigar() {
  useSEO({
    title: "Rare Cigars | Billionaire Collection",
    description: "Source rare hand-rolled cigars from the world's finest tobacco estates through Billionaire Collection. Limited editions and bespoke blends for the most discerning connoisseurs.",
    keywords: "rare cigars, luxury cigars, hand-rolled cigars, premium tobacco, cigar collection",
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Cigars" title="Rare" titleAccent="Hand-Rolled Cigars" subtitle="The world's finest hand-rolled cigars — from aged Cuban Cohibas to rare Nicaraguan limited editions — presented in bespoke humidors of exceptional craftsmanship." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Enquire", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>The Finest <span style={{ color: GOLD }}>Tobacco</span></h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>Billionaire Cigars presents an unparalleled selection of the world's most coveted hand-rolled cigars. From aged Cuban Cohiba Behike to rare Nicaraguan Padrón 1964 Anniversary Series, each cigar in our collection is sourced from the finest tobacco estates and presented in bespoke humidors crafted from the rarest woods and precious metals.</p>
            <Link href="/card-concierge"><button className="btn-ghost-gold">Request a Selection</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
