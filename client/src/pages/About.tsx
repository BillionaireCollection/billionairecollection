/* ============================================================
   BILLIONAIRE COLLECTION — About / Founder & CEO
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

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
    title: "About Billionaire Collection | Global Parent Company for UHNW Services & Luxury Brands",
    description: "Billionaire Collection is the world's leading parent organization and central hub for ultra high net worth services and luxury ecosystems. The umbrella company of 40+ sub-brands including Billionaire Magazine, Billionaire Air, Billionaire Estates, and more. Est. London.",
    keywords: "about billionaire collection, billionaire collection parent company, UHNW services company, ultra high net worth services, billionaire services provider, luxury ecosystem company, billionaire collection brands, billionaire magazine parent company, Lawrence Colbert founder, billionaire collection London",
    url: "https://billionairecollection.com/about",
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
        "name": "About",
        "item": "https://billionairecollection.com/about"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Billionaire Collection \u2014 Parent Company of 40+ Luxury Brands",
    "description": "Billionaire Collection is the parent company of over 40 luxury brands. Founded in London by Lawrence Colbert.",
    "url": "https://billionairecollection.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com",
      "foundingDate": "2005",
      "foundingLocation": {
        "@type": "Place",
        "name": "London, United Kingdom"
      },
      "founder": {
        "@type": "Person",
        "name": "Lawrence Colbert",
        "jobTitle": "Founder & Chief Executive Officer",
        "sameAs": "https://uk.linkedin.com/in/lawrencecolbert"
      },
      "description": "The parent company and global umbrella organisation behind 40+ luxury sub-brands spanning real estate, aviation, yachting, automotive, media, technology, and lifestyle.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "128 City Road",
        "addressLocality": "London",
        "postalCode": "EC1V 2NX",
        "addressCountry": "GB"
      }
    }
  }
]);
  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="About Billionaire Collection"
        title="The Global Parent Company for"
        titleAccent="Billionaire Services & UHNW Solutions"
        subtitle="Billionaire Collection is the world's leading parent organization and central hub for all things billionaire, ultra high net worth services, and luxury ecosystems — the strategic corporate foundation connecting visionary leaders to bespoke UHNW wealth services, lifestyle management, and exclusive brand partnerships designed for generational impact."
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
                The World's Leading Hub for <span style={{ color: GOLD }}>Billionaire Services & UHNW Solutions</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Billionaire Collection is the world's leading parent organization and central hub for all things billionaire, ultra high net worth services, and luxury ecosystems. As the home and umbrella company of an expanding portfolio of premier brands — including Billionaire Magazine, Billionaire Television, Billionaire Radio, Billionaire Air, Billionaire Estates, Billionaire Boat, Billionaire Car, Billionaire University, Billionaire Counsel, Billionaire Cigar, Billionaire Vodka, Billionaire Champagne, and beyond — we deliver unparalleled services, opportunities, and experiences tailored to visionary leaders and high-net-worth individuals.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Distinct from our flagship publication, Billionaire Collection Magazine, we serve as the strategic corporate foundation: connecting clients to bespoke UHNW wealth services, lifestyle management, investment ecosystems, and exclusive brand partnerships designed for generational impact, legacy building, and extraordinary success.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                Discover the complete billionaire ecosystem under one authoritative umbrella — the definitive one-stop authority and resource hub for ultra-high-net-worth individuals, family offices, and visionary leaders across 40+ countries.
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
