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

export default function Golf() {
  useSEO({
    title: "Private Golf | Billionaire Collection",
    description: "Access the world's most exclusive private golf clubs and bespoke golf experiences through Billionaire Collection. Tee times at Augusta, St Andrews, and the finest courses worldwide.",
    keywords: "private golf clubs, luxury golf, exclusive golf, Augusta, St Andrews, golf membership",
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Golf" title="The World's Most" titleAccent="Exclusive Courses" subtitle="Private access to Augusta-calibre courses, elite tournaments, and bespoke golf travel experiences — curated for the world's most discerning players." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" cta={{ label: "Book a Round", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>Golf at the <span style={{ color: GOLD }}>Highest Level</span></h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>Billionaire Golf provides exclusive access to the world's most prestigious private golf clubs and courses — from Augusta National-calibre venues in the United States to championship links in Scotland, elite resort courses in the UAE, and private island retreats in the Caribbean. Our concierge team arranges every detail, from tee times and private instruction to helicopter transfers and post-round dining.</p>
            <Link href="/card-concierge"><button className="btn-ghost-gold">Arrange a Round</button></Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
