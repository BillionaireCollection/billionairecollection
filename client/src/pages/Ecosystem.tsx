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
      { label: "Billionaire Crypto", href: "/crypto", sub: "Digital asset management" },
      { label: "The Off Market Sale", href: "/estates", sub: "Off-market property" },
      { label: "OffMarket Hotel", href: "/estates", sub: "Private hospitality assets" },
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
      { label: "Billionaire News", href: "/news", sub: "UHNW news & insights" },
    ],
  },
  {
    name: "Technology",
    tagline: "Digital Innovation",
    desc: "Cutting-edge technology platforms serving the UHNW community — from AI-powered advisory tools to digital wealth management and vitality platforms.",
    brands: [
      { label: "Billionaire University", href: "/technology", sub: "Transformational education" },
      { label: "Billionaire Vitality", href: "/technology", sub: "Health & longevity" },
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
      { label: "Billionaire Counsel", href: "/services", sub: "Legal & advisory" },
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
      <section style={{ padding: "8rem 0" }}>
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
                  {div.brands.map((brand) => (
                    <Link key={brand.label} href={brand.href}>
                      <div className="bc-glass-card" style={{ padding: "1.75rem", cursor: "pointer", height: "100%" }}>
                        <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.8125rem", color: "#fff", marginBottom: "0.375rem" }}>{brand.label}</div>
                        <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>{brand.sub}</div>
                      </div>
                    </Link>
                  ))}
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
