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

export default function Television() {
  useSEO({
    title: "Billionaire Television | Billionaire Collection",
    description: "Watch Billionaire Television — the premium channel dedicated to ultra-luxury lifestyle, wealth creation, and the world of ultra-high-net-worth individuals.",
    keywords: "Billionaire Television, luxury TV, wealth TV, UHNW television, premium channel",
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Television" title="Luxury" titleAccent="Television" subtitle="Exclusive programming for the world's most discerning viewers — documentary series, lifestyle content, and live events from the pinnacle of luxury culture." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" cta={{ label: "Watch Now", href: "/media" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Programming</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>
              Where Luxury <span style={{ color: GOLD }}>Meets Cinema</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>
              Billionaire Television delivers world-class content exclusively for ultra-high-net-worth audiences. From intimate profiles of the world's most successful entrepreneurs to immersive documentaries on the finest estates, yachts, and private jets, our programming sets the standard for luxury media.
            </p>
            <Link href="/media"><button className="btn-ghost-gold">Back to Media</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
