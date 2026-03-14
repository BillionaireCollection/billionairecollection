import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";

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

export default function Card() {
  const benefits = [
    { icon: "🌐", title: "Global Concierge", desc: "24/7 dedicated concierge team available anywhere in the world" },
    { icon: "✈️", title: "Private Aviation", desc: "Priority access to private jets and helicopter transfers" },
    { icon: "🏨", title: "Hotel Access", desc: "Exclusive rates and upgrades at the world's finest hotels" },
    { icon: "🍽️", title: "Dining", desc: "Priority reservations at Michelin-starred restaurants worldwide" },
    { icon: "🎭", title: "Events", desc: "Access to sold-out events, galas, and private experiences" },
    { icon: "💎", title: "Elite Status", desc: "Recognition and privileges at every Billionaire Collection partner" },
  ];
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Card" title="The World's Most" titleAccent="Exclusive Card" subtitle="The Billionaire Card is not merely a payment instrument — it is a passport to a world of extraordinary privileges, bespoke services, and elite experiences." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Apply Now", href: "/card-concierge" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Card Benefits</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>A World of <span style={{ color: GOLD }}>Privilege</span></h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {benefits.map((b, i) => (
              <FadeUp key={b.title} delay={i * 0.07}>
                <div className="bc-glass-card" style={{ padding: "2.5rem 2rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{b.icon}</div>
                  <h3 style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#C9A84C", marginBottom: "0.75rem" }}>{b.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.4}>
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <Link href="/card-concierge"><button className="btn-gold">Apply for the Billionaire Card</button></Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
