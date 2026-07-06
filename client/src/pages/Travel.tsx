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

export default function Travel() {
  useSEO({
    title: "Ultra-Luxury Travel & Private Experiences | Billionaire Travel",
    description: "Design and book ultra-luxury travel experiences through Billionaire Travel. Private island escapes, bespoke itineraries, exclusive villa rentals, and extraordinary destinations worldwide.",
    keywords: "ultra-luxury travel, private island, bespoke travel, luxury holidays, exclusive destinations, private villa, luxury itinerary, UHNW travel",
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Travel" title="The World" titleAccent="Awaits" subtitle="Bespoke travel experiences curated for the world's most discerning travellers — private islands, expedition yachts, and exclusive resort access through Virtuoso and beyond." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-yacht-hFeRjh9nRnBaKqx8rPSF24.webp" cta={{ label: "Plan Your Journey", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>Travel Without <span style={{ color: GOLD }}>Compromise</span></h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>Billionaire Travel, in partnership with Virtuoso and the world's leading luxury travel specialists, creates bespoke journeys that transcend the ordinary. From private island buyouts in the Maldives to Antarctic expedition cruises aboard luxury vessels, from exclusive African safari camps to private villa retreats on the Amalfi Coast — every journey is crafted to your exact specifications.</p>
            <Link href="/card-concierge"><button className="btn-ghost-gold">Plan Your Journey</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
