/* ============================================================
   BILLIONAIRE COLLECTION — About / Founder & CEO
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const MAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

const MILESTONES = [
  { year: "2005", event: "Billionaire Magazine founded in London, establishing the voice of the global elite." },
  { year: "2010", event: "Expansion into digital media with the launch of Billionaire.com and online editorial." },
  { year: "2015", event: "Launch of Billionaire Television and the Billionaire Radio podcast network." },
  { year: "2018", event: "Billionaire Estates and Billionaire Boat brokerage divisions established." },
  { year: "2020", event: "Billionaire Air and Billionaire Car divisions launched, completing the brokerage ecosystem." },
  { year: "2022", event: "Launch of the Billionaire Card — the world's most exclusive concierge membership." },
  { year: "2024", event: "Billionaire Collection rebranded as the definitive luxury ecosystem for UHNWIs worldwide." },
  { year: "2026", event: "New flagship website launch — the most technologically advanced luxury platform ever built." },
];

const VALUES = [
  { icon: "◆", title: "Absolute Excellence", desc: "Every offering, every interaction, every detail is held to the highest possible standard. We accept nothing less than perfection." },
  { icon: "◆", title: "Unrivalled Access", desc: "Our global network provides access to assets, experiences, and opportunities that are simply unavailable through any other channel." },
  { icon: "◆", title: "Complete Discretion", desc: "The privacy and confidentiality of our clients is paramount. Every engagement is conducted with absolute discretion." },
  { icon: "◆", title: "Personalised Service", desc: "No two clients are the same. Every service we provide is tailored to the exact specifications and preferences of the individual." },
];

export default function About() {
  useSEO({
    title: "About Billionaire Collection",
    description: "Discover the story behind Billionaire Collection — the world's premier luxury ecosystem curating ultra-prime real estate, superyachts, private aviation, and bespoke experiences for ultra-high-net-worth individuals.",
    keywords: "Billionaire Collection, luxury brand, ultra-high-net-worth, premium lifestyle, London luxury",
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="About Billionaire Collection"
        title="The World's Premier"
        titleAccent="Luxury Ecosystem"
        subtitle="Founded in London, Billionaire Collection is the definitive destination for ultra-high-net-worth individuals — a curated ecosystem of the world's finest assets, services, and experiences."
        image={MAIN_IMG}
        height="85vh"
      />

      {/* Mission */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Our Mission</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", lineHeight: 1.2, marginBottom: "2rem" }}>
                The Place for <span style={{ color: GOLD }}>Everything You Desire</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Billionaire Collection was founded on a singular conviction: that the world's most successful individuals deserve a single, trusted destination for every aspect of the luxury lifestyle. Not a directory. Not a marketplace. An ecosystem.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                From ultra-prime real estate and superyachts to private aviation and bespoke fragrances, from curated media content to 24/7 concierge services — every division of Billionaire Collection exists to serve one purpose: to fulfil the desires of those who have achieved extraordinary success.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                Our global network of elite partners — spanning Christie's, Sotheby's International Realty, Virtuoso, Ferretti Group, and the world's most prestigious brands — ensures that our clients have access to assets and experiences that are simply unavailable anywhere else.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div style={{ position: "relative" }}>
                <img src={LIFESTYLE_IMG} alt="Billionaire Collection" loading="lazy" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(201,168,76,0.2)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "-8px", left: "-8px", width: "24px", height: "24px", borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` }} />
                <div style={{ position: "absolute", bottom: "-8px", right: "-8px", width: "24px", height: "24px", borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: "6rem 0 8rem", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Founder & CEO</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Lawrence <span style={{ color: GOLD }}>Colbert</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "4rem", alignItems: "start" }}>
            <FadeUp>
              <div style={{ position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Lawrence Colbert — Founder & CEO"
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top" }}
                />
                <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(201,168,76,0.2)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "-6px", left: "-6px", width: "20px", height: "20px", borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` }} />
                <div style={{ position: "absolute", bottom: "-6px", right: "-6px", width: "20px", height: "20px", borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff" }}>Lawrence Colbert</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, marginTop: "4px" }}>Founder & Chief Executive Officer</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Billionaire Collection, London</div>
                  <div style={{ marginTop: "1rem" }}>
                    <a href="https://uk.linkedin.com/in/lawrencecolbert" target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD, textDecoration: "none" }}>
                      LinkedIn Profile →
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div>
                <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.9, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  "I founded Billionaire Collection with one vision: to create the world's most comprehensive and trusted luxury ecosystem — a single destination where the world's most successful individuals can access everything they desire, curated to the absolute highest standard."
                </p>
                <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  Lawrence Colbert is the Founder and Chief Executive Officer of Billionaire Collection, the world's premier luxury ecosystem for ultra-high-net-worth individuals. Based in London, Lawrence has spent two decades at the intersection of luxury media, brokerage, and lifestyle services.
                </p>
                <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  He founded Billionaire Magazine in 2005, establishing it as the definitive publication for the global elite. Under his leadership, the brand has expanded from print media into a comprehensive ecosystem spanning television, radio, brokerage, concierge services, and exclusive products.
                </p>
                <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                  Lawrence's vision for Billionaire Collection is to create a seamlessly integrated platform that serves every aspect of the ultra-high-net-worth lifestyle — from the acquisition of the world's finest assets to the curation of extraordinary experiences, all delivered with absolute discretion and unrivalled personal service.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Our Values</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                The Principles That <span style={{ color: GOLD }}>Define Us</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08}>
                <div className="bc-glass-card" style={{ padding: "3rem 2.5rem" }}>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GOLD, marginBottom: "1.5rem" }}>
                    {v.icon} {v.title}
                  </div>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "6rem 0 8rem", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>History</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Two Decades of <span style={{ color: GOLD }}>Excellence</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {MILESTONES.map((m, i) => (
              <FadeUp key={m.year} delay={i * 0.06}>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "2rem", marginBottom: "0", padding: "2rem 0", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: GOLD, paddingTop: "2px" }}>{m.year}</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{m.event}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "2rem" }}>Join the Collection</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1rem" }}>
              Begin Your <span style={{ color: GOLD }}>Journey</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
              Apply for the Billionaire Card and unlock a world of extraordinary privileges, bespoke services, and elite experiences.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/card">
                <button className="btn-gold">Apply for the Billionaire Card</button>
              </Link>
              <Link href="/contact">
                <button className="btn-ghost-gold">Contact Us</button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
