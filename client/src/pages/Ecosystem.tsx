/* ============================================================
   BILLIONAIRE COLLECTION — The Billionaire Ecosystem (/ecosystem)
   SEO target: "billionaire ecosystem", "billionaire collection brands",
               "ultra high net worth lifestyle ecosystem"
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";
import SphereAnimation from "@/components/SphereAnimation";

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

// ── Ecosystem Orbit Visual ──────────────────────────────────────────────────
const ORBIT_ITEMS_ECO = [
  { label: "Magazine",   icon: "📖", href: "/magazine",    angle: 270.0 },
  { label: "University", icon: "🎓", href: "/university",  angle: 302.7 },
  { label: "Vitality",   icon: "💚", href: "/vitality",    angle: 335.5 },
  { label: "Aviation",   icon: "✈️", href: "/air",         angle: 8.2   },
  { label: "Yachts",     icon: "⚓", href: "/boat",        angle: 40.9  },
  { label: "Estates",    icon: "🏛️", href: "/estates",     angle: 73.6  },
  { label: "Funding",    icon: "💼", href: "/funding",     angle: 106.4 },
  { label: "Card",       icon: "💳", href: "/card",        angle: 139.1 },
  { label: "Store",      icon: "🛍️", href: "/marketplace", angle: 171.8 },
  { label: "Media",      icon: "📺", href: "/media",       angle: 204.5 },
  { label: "Giving",     icon: "🌍", href: "#giving",      angle: 237.3 },
];
const ECO_SVG = 600, ECO_CX = 300, ECO_CY = 300, ECO_RING = 170, ECO_ICON_R = 260;

function EcosystemOrbitVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} style={{ width: "min(560px, 92vw)", margin: "0 auto", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(200px, 33vw)", height: "min(200px, 33vw)", zIndex: 2, pointerEvents: "none" }}>
        <SphereAnimation style={{ width: "100%", height: "100%" }} />
      </div>
      <svg viewBox={`0 0 ${ECO_SVG} ${ECO_SVG}`} style={{ width: "100%", height: "auto", overflow: "visible", position: "relative", zIndex: 1 }} preserveAspectRatio="xMidYMid meet">
        <motion.circle cx={ECO_CX} cy={ECO_CY} r={ECO_RING} fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1" initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} style={{ transformOrigin: `${ECO_CX}px ${ECO_CY}px` }} transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }} />
        <motion.circle cx={ECO_CX} cy={ECO_CY} r={ECO_RING - 12} fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1" initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} style={{ transformOrigin: `${ECO_CX}px ${ECO_CY}px` }} transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }} />
        {ORBIT_ITEMS_ECO.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          return <motion.line key={item.label + "-line"} x1={ECO_CX} y1={ECO_CY} x2={ECO_CX + ECO_ICON_R * Math.cos(rad)} y2={ECO_CY + ECO_ICON_R * Math.sin(rad)} stroke="rgba(201,168,76,0.45)" strokeWidth="1.2" initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}} transition={{ duration: 1, delay: 0.8 }} />;
        })}
        <text x={ECO_CX} y={ECO_CY + 120} textAnchor="middle" fill="rgba(201,168,76,0.8)" fontSize="9" letterSpacing="2" fontFamily="Raleway, sans-serif">BILLIONAIRE COLLECTION</text>
        <text x={ECO_CX} y={ECO_CY + 138} textAnchor="middle" fill="#e8d5a0" fontSize="14" fontFamily="Playfair Display, Georgia, serif">The Ecosystem</text>
        <text x={ECO_CX} y={ECO_CY + 153} textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="7" letterSpacing="3" fontFamily="Raleway, sans-serif">ONE UMBRELLA · EVERY DESIRE</text>
        {ORBIT_ITEMS_ECO.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const cx = ECO_CX + ECO_ICON_R * Math.cos(rad);
          const cy = ECO_CY + ECO_ICON_R * Math.sin(rad);
          return (
            <motion.g key={item.label} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} style={{ transformOrigin: `${cx}px ${cy}px`, cursor: "pointer" }} transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: [0.23, 1, 0.32, 1] }} onClick={() => { window.location.href = item.href; }}>
              <circle cx={cx} cy={cy} r="26" fill="rgba(0,0,0,0.9)" stroke="rgba(201,168,76,0.35)" strokeWidth="1" filter="url(#ecoIconGlow)" />
              <foreignObject x={cx - 19} y={cy - 19} width="38" height="38">
                <div style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", lineHeight: 1 }}>{item.icon}</div>
              </foreignObject>
              <text x={cx} y={cy + 38} textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="11" letterSpacing="1.5" fontFamily="Raleway, sans-serif">{item.label.toUpperCase()}</text>
            </motion.g>
          );
        })}
        <defs>
          <filter id="ecoIconGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
// ───────────────────────────────────────────────────────────────────────────

const PRODUCTS_IMAGES: Record<string, string> = {
  "Billionaire Champagne": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Vodka": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Cigar": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Oud": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Official Store": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=70",
};

const MEDIA_IMAGES: Record<string, string> = {
  "Billionaire Television": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Magazine": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Radio": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire News": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
};

const TECH_IMAGES: Record<string, string> = {
  "Billionaire University": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Vitality": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "TheBillionaire.ai": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=70",
  "Billionaire Digital": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=70",
};

const SERVICES_IMAGES: Record<string, string> = {
  "Billionaire Card": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Funding": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Golf": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Travel": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Counsel": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
};

const BROKERAGE_IMAGES: Record<string, string> = {
  "Billionaire Estates": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Boat": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Air": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Car": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Art": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Chrono": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Billionaire Crypto": "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/eco-tile-crypto-8UXcm66qLZSjLsGEikQGHG.webp",
  "The Off Market Sale": "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/eco-tile-offmarket-ctz7kbS5xoAPit3ZMNT275.webp",
  "OffMarket Hotel": "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/eco-tile-hotel-5kQ465sUvqesef5X5hxLpA.webp",
  "Billionaire University": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
};

const DIVISIONS = [
  {
    name: "Brokerage",
    tagline: "Ultra-Prime Assets",
    desc: "The world's most exclusive brokerage ecosystem — ultra-prime real estate, superyachts, private aviation, rare automobiles, fine art, and digital assets.",
    brands: [
      { label: "Billionaire Estates", href: "/estates", sub: "Ultra-prime real estate" },
      { label: "Billionaire Boat", href: "/boat", sub: "Superyacht brokerage" },
      { label: "Billionaire Air", href: "/air", sub: "Private aviation" },
      { label: "Billionaire Car", href: "/car", sub: "Rare & exotic automobiles" },
      { label: "Billionaire Art", href: "/art", sub: "Fine art & collectibles" },
      { label: "Billionaire Chrono", href: "/chrono", sub: "Ultra-rare timepieces" },
      { label: "Billionaire Crypto", href: "/crypto", sub: "Digital asset management" },
      { label: "The Off Market Sale", href: "/estates", sub: "Off-market property" },
      { label: "OffMarket Hotel", href: "/estates", sub: "Private hospitality assets" },
      { label: "Billionaire University", href: "/university", sub: "Transformational education" },
    ],
  },
  {
    name: "Products",
    tagline: "Curated Luxury Goods",
    desc: "A curated collection of ultra-premium products — from Billionaire Champagne and Billionaire Vodka to bespoke cigars, Arabian ouds, and the Official Store.",
    brands: [
      { label: "Billionaire Champagne", href: "/champagne", sub: "Premier millésimé cuvée" },
      { label: "Billionaire Vodka", href: "/vodka", sub: "Ultra-premium spirits" },
      { label: "Billionaire Cigar", href: "/cigar", sub: "Rare hand-rolled cigars" },
      { label: "Billionaire Oud", href: "/oud", sub: "Bespoke Arabian fragrances" },
      { label: "Official Store", href: "/marketplace", sub: "Exclusive merchandise" },
    ],
  },
  {
    name: "Media",
    tagline: "Content & Insights",
    desc: "The Billionaire media division — television, magazine, and radio content for and about the world's most successful individuals.",
    brands: [
      { label: "Billionaire Television", href: "/television", sub: "Luxury lifestyle TV" },
      { label: "Billionaire Magazine", href: "/magazine", sub: "Premier UHNW publication" },
      { label: "Billionaire Radio", href: "/radio", sub: "Exclusive audio content" },
      { label: "Billionaire News", href: "/news-brand", sub: "UHNW news & insights" },
    ],
  },
  {
    name: "Technology",
    tagline: "Digital Innovation",
    desc: "Cutting-edge technology platforms serving the UHNW community — from AI-powered advisory tools to digital wealth management and vitality platforms.",
    brands: [
      { label: "Billionaire University", href: "/university", sub: "Transformational education" },
      { label: "Billionaire Vitality", href: "/vitality", sub: "Health & longevity" },
      { label: "TheBillionaire.ai", href: "/technology", sub: "AI-powered advisory" },
      { label: "Billionaire Digital", href: "/technology", sub: "Digital ecosystem" },
    ],
  },
  {
    name: "Services",
    tagline: "Bespoke UHNW Services",
    desc: "A comprehensive suite of lifestyle and financial services — from the Billionaire Card and 24/7 concierge to private funding, golf, and travel.",
    brands: [
      { label: "Billionaire Card", href: "/card", sub: "24/7 concierge membership" },
      { label: "Billionaire Funding", href: "/funding", sub: "Investment & private equity" },
      { label: "Billionaire Golf", href: "/golf", sub: "Exclusive golf access" },
      { label: "Billionaire Travel", href: "/travel", sub: "Bespoke travel experiences" },
      { label: "Billionaire Counsel", href: "/counsel", sub: "Legal & advisory" },
    ],
  },
];

export default function Ecosystem() {
  useSEO({
    title: "The Billionaire Ecosystem | Billionaire Collection — 40+ UHNW Brands Under One Umbrella",
    description: "Explore the complete Billionaire Collection ecosystem — 40+ ultra-premium brands spanning brokerage, products, media, technology, and services. The world's most comprehensive UHNW lifestyle and wealth ecosystem, headquartered in London.",
    keywords: "billionaire ecosystem, billionaire collection brands, UHNW lifestyle ecosystem, billionaire brands, ultra high net worth brands, billionaire collection divisions, billionaire magazine, billionaire air, billionaire estates, billionaire boat, billionaire university, billionaire card",
    url: "https://billionairecollection.com/ecosystem",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Billionaire Collection", "item": "https://billionairecollection.com" },
        { "@type": "ListItem", "position": 2, "name": "The Billionaire Ecosystem", "item": "https://billionairecollection.com/ecosystem" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Billionaire Collection — The Billionaire Ecosystem",
      "url": "https://billionairecollection.com/ecosystem",
      "description": "The complete Billionaire Collection ecosystem — 40+ ultra-premium brands spanning brokerage, products, media, technology, and services.",
      "parentOrganization": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://billionairecollection.com"
      }
    }
  ]);

  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="The Ecosystem"
        title="The Complete Billionaire"
        titleAccent="Collection Ecosystem"
        subtitle="40+ ultra-premium brands. Five divisions. One unified vision. Billionaire Collection is the world's most comprehensive UHNW lifestyle and wealth ecosystem — the definitive corporate hub for ultra-high-net-worth individuals, family offices, and visionary leaders across 40+ countries."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp"
        height="85vh"
      />

      {/* Intro */}
      {/* ── Ecosystem Orbit Visual ── */}
      <section style={{ padding: "7rem 0", background: "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, #000 70%)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>The Architecture</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1.25rem" }}>
                One Umbrella. <span style={{ color: GOLD }}>Every Desire Fulfilled.</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.75 }}>
                Eleven divisions. One unified vision. Click any node to explore.
              </p>
            </div>
          </FadeUp>
          <EcosystemOrbitVisual />
          <FadeUp delay={0.4}>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.9375rem", color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: "4rem", letterSpacing: "0.05em" }}>
              Magazine · University · Vitality · Aviation · Yachts · Estates · Funding · Card · Store · Media · Giving
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Our Architecture */}
      <section style={{ padding: "8rem 0", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Our Architecture</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.875rem, 3.5vw, 3rem)", color: "#fff", lineHeight: 1.2, marginBottom: "2rem" }}>
                One Umbrella. <span style={{ color: GOLD }}>Every Desire Fulfilled.</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Billionaire Collection was founded on a singular conviction: that the world's most successful individuals deserve a single, trusted destination for every aspect of the ultra-luxury lifestyle. Not a directory. Not a marketplace. An ecosystem.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>
                As the strategic corporate parent and global umbrella organisation, Billionaire Collection connects clients to bespoke UHNW wealth services, lifestyle management, investment ecosystems, and exclusive brand partnerships designed for generational impact, legacy building, and extraordinary success.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Divisions */}
      {DIVISIONS.map((div, di) => (
        <section key={div.name} style={{ padding: "6rem 0", borderTop: "1px solid rgba(201,168,76,0.1)", background: di % 2 === 1 ? "rgba(201,168,76,0.015)" : "transparent" }}>
          <div className="container">
            <FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "4rem", alignItems: "start" }}>
                <div>
                  <span style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.25em", color: GOLD, display: "block", marginBottom: "0.75rem" }}>◆ {div.tagline}</span>
                  <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                    Billionaire <span style={{ color: GOLD }}>{div.name}</span>
                  </h2>
                  <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{div.desc}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
                  {div.brands.map((brand) => {
                    const img =
                      div.name === "Brokerage" ? BROKERAGE_IMAGES[brand.label] :
                      div.name === "Products" ? PRODUCTS_IMAGES[brand.label] :
                      div.name === "Media" ? MEDIA_IMAGES[brand.label] :
                      div.name === "Technology" ? TECH_IMAGES[brand.label] :
                      div.name === "Services" ? SERVICES_IMAGES[brand.label] :
                      undefined;
                    return (
                      <Link key={brand.label} href={brand.href}>
                        <div
                          className="bc-glass-card"
                          style={{
                            padding: "1.75rem",
                            cursor: "pointer",
                            height: "100%",
                            position: "relative",
                            overflow: "hidden",
                            minHeight: img ? "120px" : undefined,
                          }}
                        >
                          {img && (
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `url(${img})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: 0.22,
                                transition: "opacity 0.3s ease",
                              }}
                            />
                          )}
                          {img && (
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)",
                              }}
                            />
                          )}
                          <div style={{ position: "relative", zIndex: 1 }}>
                            <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.8125rem", color: "#fff", marginBottom: "0.375rem" }}>{brand.label}</div>
                            <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>{brand.sub}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      ))}

      {/* Stats */}
      <section style={{ padding: "7rem 0", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
              {[
                { label: "40+", sub: "Brands in the ecosystem" },
                { label: "5", sub: "Core divisions" },
                { label: "40+", sub: "Countries served" },
                { label: "20+", sub: "Years of expertise" },
                { label: "24/7", sub: "Concierge access" },
              ].map((stat) => (
                <div key={stat.label} className="bc-glass-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "2.75rem", color: GOLD, marginBottom: "0.5rem" }}>{stat.label}</div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)" }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 0", textAlign: "center" }}>
        <div className="container">
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Join the Ecosystem</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.5rem" }}>
              The Place for <span style={{ color: GOLD }}>Everything You Desire</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.45)", maxWidth: "520px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
              Every desire fulfilled. Every aspiration realised. Billionaire Collection is your single, trusted destination for the ultra-luxury lifestyle.
            </p>
            <Link href="/services">
              <button className="btn-gold" style={{ marginRight: "1rem" }}>Explore UHNW Services</button>
            </Link>
            <Link href="/about">
              <button className="btn-ghost-gold">About Billionaire Collection</button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
