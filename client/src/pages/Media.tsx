import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const MAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

const CHANNELS = [
  { label: "Television", href: "/television", icon: "📺", desc: "Exclusive programming for the world's most discerning viewers — documentary series, lifestyle content, and live events from the pinnacle of luxury culture.", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80" },
  { label: "Magazine", href: "/magazine", icon: "📖", desc: "The definitive print and digital publication for ultra-high-net-worth individuals — featuring in-depth profiles, market intelligence, and the finest luxury editorial.", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80" },
  { label: "Radio & Podcast", href: "/radio", icon: "🎙", desc: "Curated audio content for the global elite — expert conversations on wealth, investment, lifestyle, and the forces shaping the world of ultra-high-net-worth individuals.", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80" },
];

export default function Media() {
  useSEO({
    title: "Billionaire Media Group — Television, Magazine & Radio",
    description: "Billionaire Media Group operates Billionaire Television, Billionaire Collection Magazine, and Billionaire Radio — the world's premier luxury media platforms for ultra-high-net-worth audiences.",
    keywords: "Billionaire Media Group, luxury television, luxury magazine, luxury radio, UHNW media, billionaire TV, luxury content",
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="Billionaire Media"
        title="The Voice of"
        titleAccent="Luxury"
        subtitle="Billionaire Media is the definitive content platform for ultra-high-net-worth individuals — spanning television, print, digital, and audio across every major global market."
        image={MAIN_IMG}
        cta={{ label: "Watch Television", href: "/television" }}
        ctaSecondary={{ label: "Read Magazine", href: "/magazine" }}
      />

      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Our Channels</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Three Pillars of <span style={{ color: GOLD }}>Elite Media</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {CHANNELS.map((ch, i) => (
              <FadeUp key={ch.label} delay={i * 0.1}>
                <Link href={ch.href}>
                  <div style={{ background: "#000", cursor: "pointer", overflow: "hidden" }}>
                    <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                      <img src={ch.img} alt={ch.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                        <span style={{ fontSize: "2rem" }}>{ch.icon}</span>
                      </div>
                    </div>
                    <div style={{ padding: "2rem" }}>
                      <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>{ch.label}</h3>
                      <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{ch.desc}</p>
                      <div style={{ marginTop: "1.5rem", fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>
                        Explore →
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
