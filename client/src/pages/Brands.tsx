/* ============================================================
   BILLIONAIRE COLLECTION — Our Brands (/brands)
   SEO target: "billionaire collection brands", "billionaire magazine",
               "billionaire brands list", "UHNW brands"
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

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

const ALL_BRANDS = [
  // Brokerage
  { label: "Billionaire Estates", sub: "Ultra-prime real estate", href: "/estates", division: "Brokerage" },
  { label: "Billionaire Boat", sub: "Superyacht brokerage", href: "/boat", division: "Brokerage" },
  { label: "Billionaire Air", sub: "Private aviation", href: "/air", division: "Brokerage" },
  { label: "Billionaire Car", sub: "Rare & exotic automobiles", href: "/car", division: "Brokerage" },
  { label: "Billionaire Art", sub: "Fine art & collectibles", href: "/art", division: "Brokerage" },
  { label: "Billionaire Crypto", sub: "Digital asset management", href: "/crypto", division: "Brokerage" },
  { label: "The Off Market Sale", sub: "Off-market property", href: "/estates", division: "Brokerage" },
  { label: "OffMarket Hotel", sub: "Private hospitality assets", href: "/estates", division: "Brokerage" },
  // Products
  { label: "Billionaire Champagne", sub: "Premier millésimé cuvée", href: "/champagne", division: "Products" },
  { label: "Billionaire Vodka", sub: "Ultra-premium spirits", href: "/vodka", division: "Products" },
  { label: "Billionaire Cigar", sub: "Rare hand-rolled cigars", href: "/cigar", division: "Products" },
  { label: "Billionaire Oud", sub: "Bespoke Arabian fragrances", href: "/oud", division: "Products" },
  { label: "Official Store", sub: "Exclusive merchandise", href: "/marketplace", division: "Products" },
  // Media
  { label: "Billionaire Television", sub: "Luxury lifestyle TV", href: "/television", division: "Media" },
  { label: "Billionaire Magazine", sub: "Premier UHNW publication", href: "/magazine", division: "Media" },
  { label: "Billionaire Radio", sub: "Exclusive audio content", href: "/radio", division: "Media" },
  { label: "Billionaire News", sub: "UHNW news & insights", href: "/news", division: "Media" },
  // Technology
  { label: "Billionaire University", sub: "Transformational education", href: "/technology", division: "Technology" },
  { label: "Billionaire Vitality", sub: "Health & longevity", href: "/technology", division: "Technology" },
  { label: "TheBillionaire.ai", sub: "AI-powered advisory", href: "/technology", division: "Technology" },
  { label: "Billionaire Digital", sub: "Digital ecosystem", href: "/technology", division: "Technology" },
  { label: "Billionaire Tutor", sub: "Elite mentorship", href: "/billionaire-tutor", division: "Technology" },
  // Services
  { label: "Billionaire Card", sub: "24/7 concierge membership", href: "/card", division: "Services" },
  { label: "Billionaire Funding", sub: "Investment & private equity", href: "/funding", division: "Services" },
  { label: "Billionaire Golf", sub: "Exclusive golf access", href: "/golf", division: "Services" },
  { label: "Billionaire Travel", sub: "Bespoke travel experiences", href: "/travel", division: "Services" },
  { label: "Billionaire Counsel", sub: "Legal & advisory", href: "/services", division: "Services" },
  { label: "The Golden Ticket", sub: "Ultra-exclusive access", href: "/golden-ticket", division: "Services" },
];

const DIVISIONS = ["All", "Brokerage", "Products", "Media", "Technology", "Services"];

export default function Brands() {
  useSEO({
    title: "Our Brands | Billionaire Collection — The Complete UHNW Brand Portfolio",
    description: "Explore the complete Billionaire Collection brand portfolio — 28+ ultra-premium brands including Billionaire Magazine, Billionaire Air, Billionaire Estates, Billionaire University, and more. The world's most comprehensive UHNW brand ecosystem.",
    keywords: "billionaire collection brands, billionaire magazine, billionaire air, billionaire estates, billionaire university, billionaire card, billionaire boat, billionaire television, UHNW brands, ultra high net worth brands, billionaire brand portfolio",
    url: "https://billionairecollection.com/brands",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Billionaire Collection", "item": "https://billionairecollection.com" },
        { "@type": "ListItem", "position": 2, "name": "Our Brands", "item": "https://billionairecollection.com/brands" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Billionaire Collection Brand Portfolio",
      "description": "The complete portfolio of ultra-premium brands under the Billionaire Collection umbrella.",
      "itemListElement": ALL_BRANDS.map((brand, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": brand.label,
        "description": brand.sub,
        "url": `https://billionairecollection.com${brand.href}`,
      }))
    }
  ]);

  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="Our Brands"
        title="The Complete Billionaire"
        titleAccent="Brand Portfolio"
        subtitle="28+ ultra-premium brands. One parent company. Billionaire Collection is the world's most comprehensive UHNW brand ecosystem — from Billionaire Magazine and Billionaire Air to Billionaire University and the Billionaire Card."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp"
        height="80vh"
      />

      {/* Intro */}
      <section style={{ padding: "7rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>The Portfolio</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", lineHeight: 1.2, marginBottom: "2rem" }}>
                Every Brand. <span style={{ color: GOLD }}>One Vision.</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>
                Billionaire Collection is the strategic corporate parent and global umbrella for an expanding portfolio of premier brands. Each brand operates independently within its category while sharing the same foundational commitment: to deliver unparalleled services, opportunities, and experiences for ultra-high-net-worth individuals and visionary leaders worldwide.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Brand Grid by Division */}
      {["Brokerage", "Products", "Media", "Technology", "Services"].map((division, di) => {
        const brands = ALL_BRANDS.filter(b => b.division === division);
        return (
          <section key={division} style={{ padding: "5rem 0", borderTop: "1px solid rgba(201,168,76,0.1)", background: di % 2 === 1 ? "rgba(201,168,76,0.015)" : "transparent" }}>
            <div className="container">
              <FadeUp>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
                  <span style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.25em", color: GOLD }}>◆ {division}</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.15)" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
                  {brands.map((brand, bi) => (
                    <Link key={brand.label} href={brand.href}>
                      <motion.div
                        className="bc-glass-card"
                        style={{ padding: "2rem 1.75rem", cursor: "pointer", height: "100%" }}
                        whileHover={{ backgroundColor: "rgba(201,168,76,0.06)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.875rem", color: "#fff", marginBottom: "0.5rem" }}>{brand.label}</div>
                        <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>{brand.sub}</div>
                        <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>Explore →</div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>
        );
      })}

      {/* Differentiation note */}
      <section style={{ padding: "7rem 0", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "4rem", alignItems: "center" }}>
              <div>
                <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Important Distinction</span>
                <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", lineHeight: 1.2, marginBottom: "2rem" }}>
                  Billionaire Collection vs. <span style={{ color: GOLD }}>Billionaire Collection Magazine</span>
                </h2>
                <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  <strong style={{ color: "#fff" }}>Billionaire Collection</strong> (billionairecollection.com) is the strategic corporate parent — the global umbrella organisation connecting clients to bespoke UHNW services, lifestyle management, and the complete brand ecosystem.
                </p>
                <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  <strong style={{ color: "#fff" }}>Billionaire Collection Magazine</strong> (billionairecollectionmagazine.com) is our flagship editorial publication — focused on content, storytelling, and insights for the billionaire community. Two distinct entities. One unified vision.
                </p>
                <Link href="/about">
                  <button className="btn-ghost-gold">About the Company</button>
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
                {[
                  { label: "billionairecollection.com", sub: "Corporate parent hub", gold: true },
                  { label: "billionairecollectionmagazine.com", sub: "Flagship publication", gold: false },
                  { label: "28+ Brands", sub: "Under the umbrella", gold: true },
                  { label: "5 Divisions", sub: "Brokerage, Products, Media, Tech, Services", gold: false },
                ].map((item) => (
                  <div key={item.label} className="bc-glass-card" style={{ padding: "2rem", textAlign: "center" }}>
                    <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", color: item.gold ? GOLD : "#fff", marginBottom: "0.5rem", wordBreak: "break-all" }}>{item.label}</div>
                    <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 0", textAlign: "center" }}>
        <div className="container">
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Access the Ecosystem</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.5rem" }}>
              One Destination. <span style={{ color: GOLD }}>Every Desire.</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.45)", maxWidth: "520px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
              Explore the full Billionaire Collection ecosystem and discover the brands, services, and experiences designed exclusively for ultra-high-net-worth individuals.
            </p>
            <Link href="/ecosystem">
              <button className="btn-gold" style={{ marginRight: "1rem" }}>The Full Ecosystem</button>
            </Link>
            <Link href="/services">
              <button className="btn-ghost-gold">UHNW Services</button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
