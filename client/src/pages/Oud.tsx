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

export default function Oud() {
  useSEO({
    title: "Bespoke Oud & Arabian Fragrances | Billionaire Collection",
    description: "Discover bespoke Arabian oud fragrances of unparalleled rarity through Billionaire Collection. Hand-crafted perfumes and oud oils sourced from the finest distilleries in the Middle East.",
    keywords: "oud fragrance, Arabian perfume, luxury oud, bespoke fragrance, rare perfume",
  });
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
