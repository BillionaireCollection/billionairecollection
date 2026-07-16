/* ============================================================
   BILLIONAIRE COLLECTION — Home Page
   Neo-Deco Maximalism: Full-viewport hero, ecosystem grid,
   featured brokerage, products, news teaser, concierge CTA.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SphereAnimation from "@/components/SphereAnimation";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";
import { trpc } from "@/lib/trpc";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";
const ESTATES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-estates-5tXLsMCEXgogpiaShTiVMe.webp";
const YACHT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-yacht-hFeRjh9nRnBaKqx8rPSF24.webp";
const AIR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-aviation-K37Bb2CGs26HxxPg9N8RhR.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ECOSYSTEM_ITEMS = [
  { label: "Estates", sub: "Ultra-prime real estate", href: "/estates", img: ESTATES_IMG },
  { label: "Superyachts", sub: "Bespoke vessels worldwide", href: "/boat", img: YACHT_IMG },
  { label: "Private Aviation", sub: "Charter & acquisition", href: "/air", img: AIR_IMG },
  { label: "Automotive", sub: "Rare & exotic automobiles", href: "/car", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80" },
  { label: "Fine Art", sub: "Curated collectibles", href: "/art", img: "/manus-storage/basquiat-artwork_4ca08043.jpg" },
  { label: "Crypto Assets", sub: "Digital wealth management", href: "/crypto", img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80" },
];

const PRODUCTS = [
  { label: "Champagne", desc: "Ultra-premium cuvées from the world's most exclusive houses.", href: "/champagne", img: "/manus-storage/billionaire-champagne-bottle_9021fd5a.png" },
  { label: "Vodka", desc: "Limited-edition spirits crafted for the discerning palate.", href: "/vodka", img: "/manus-storage/billionaire-vodka-bottle_cb8d04b6.png" },
  { label: "Cigars", desc: "Rare hand-rolled cigars from the world's finest tobacco estates.", href: "/cigar", img: "/manus-storage/billionaire-cigar_d9dd8444.webp" },
  { label: "Oud", desc: "Bespoke Arabian fragrances of unparalleled rarity.", href: "/oud", img: "/manus-storage/billionaire-oud-bottle_46db77de.png" },
];

const DIVISIONS = [
  { label: "Media", desc: "Television, Magazine & Radio", href: "/media", img: "/manus-storage/bc-division-media-v2_267f27ae.png" },
  { label: "Technology", desc: "University, Digital & Vitality", href: "/technology", img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-division-technology-nWtUGuzYcwAKr9AmPRXHQt.webp" },
  { label: "Services", desc: "Funding, Golf, Travel & Card", href: "/services", img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-division-services-em9tFW6VuRLTSTwzJ4RNkf.webp" },
];

const BRANDS = [
  "Louis Vuitton", "Hermès", "Chanel", "Gucci", "Cartier", "Dior",
  "Rolex", "Tiffany & Co.", "Bugatti", "Porsche", "Lamborghini",
  "Sotheby's", "Loro Piana", "Lomond Yachts", "Lürssen", "Graff",
];

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let startTs: number | null = null;
    const duration = 2000;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

function HomepageNewsTeaser() {
  const { data } = trpc.news.list.useQuery({ limit: 4 });
  const articles = data ?? [];

  // Fallback while loading
  const fallback = [
    { category: "Superyachts", title: "The World's 10 Largest Superyachts Delivered in 2026", source: "Robb Report", publishedAt: new Date() },
    { category: "Real Estate", title: "Ultra-Prime London Properties Break Record at £200M", source: "Financial Times", publishedAt: new Date() },
    { category: "Private Aviation", title: "Gulfstream G800 Sets New Transatlantic Speed Record", source: "Forbes", publishedAt: new Date() },
    { category: "Wealth", title: "Global UHNW Population Surges to 395,000 Individuals", source: "Barron's", publishedAt: new Date() },
  ];

  const items = articles.length > 0 ? articles : fallback;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
      {items.slice(0, 4).map((article, i) => (
        <FadeUp key={article.title} delay={i * 0.07}>
          <Link href="/news">
            <div className="bc-glass-card" style={{ padding: "2rem", cursor: "pointer", height: "100%" }}>
              <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GOLD, marginBottom: "1rem" }}>
                {article.category}
              </div>
              <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.0625rem", color: "#fff", lineHeight: 1.4, marginBottom: "1.5rem" }}>
                {article.title}
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>{article.source}</span>
                <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                  {new Date(article.publishedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          </Link>
        </FadeUp>
      ))}
    </div>
  );
}

export default function Home() {
  useSEO({
    title: "Billionaire Collection | UHNW Services & Luxury Ecosystem",
    description: "Billionaire Collection is the global parent company and premier hub for ultra high net worth services, luxury lifestyle brands, and billionaire ecosystem companies. Access exclusive services across aviation, real estate, media, education, and more.",
    keywords: "billionaire collection, billionaire services, ultra high net worth services, UHNW services, billionaire magazine, billionaire ecosystem, luxury ecosystem, billionaire estates, billionaire air, billionaire university, wealth management for billionaires, UHNW lifestyle solutions, billionaire concierge services, exclusive billionaire brands, UHNW aviation services, billionaire collection parent company",
    url: "https://billionairecollection.com",
  });
  useJsonLd({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Billionaire Collection",
      "alternateName": "Billionaire Collection \u2014 The World's Premier Luxury Ecosystem",
      "url": "https://billionairecollection.com",
      "description": "Billionaire Collection is the parent company of 40+ luxury sub-brands \u2014 the world's premier luxury ecosystem for ultra-high-net-worth individuals.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://billionairecollection.com/marketplace?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://billionairecollection.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://billionairecollection.com/favicon.svg"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Billionaire Collection",
          "item": "https://billionairecollection.com"
        }
      ]
    }
  ]
});

  return (
    <div style={{ background: "#000" }}>
      {/* ── HERO — Cinematic Minimalist ── */}
      <section
        aria-label="Billionaire Collection — The Curated Umbrella for Bespoke UHNW Experiences"
        style={{ position: "relative", height: "100vh", minHeight: "680px", overflow: "hidden", display: "flex", alignItems: "flex-end" }}
      >
        {/* Cinematic background with deep vignette */}
        <img
          src={HERO_IMG}
          alt="Ultra-luxury coastal estate — Billionaire Collection, London"
          loading="eager"
          fetchPriority="high"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", filter: "brightness(0.55) contrast(1.08) saturate(0.9)" }}
        />
        {/* Radial vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, transparent 20%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.88) 100%)" }} />
        {/* Bottom fade to black */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 40%, transparent 100%)" }} />
        {/* Left fade for text legibility */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />

        {/* Content — bottom-anchored editorial layout */}
        <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: "clamp(4rem, 8vh, 7rem)", width: "100%" }}>

          {/* Eyebrow — thin gold rule + label */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}
          >
            <div style={{ width: "32px", height: "1px", background: GOLD, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT_UI, fontWeight: 400, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.28em", color: GOLD }}>Est. London &nbsp;·&nbsp; Bespoke UHNW Experiences</span>
          </motion.div>

          {/* H1 — concise, editorial */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)", lineHeight: 1.08, color: "#fff", maxWidth: "680px", marginBottom: "1.75rem", letterSpacing: "-0.01em" }}
          >
            The Curated Umbrella<br />
            <span style={{ color: GOLD, fontStyle: "italic" }}>for Bespoke UHNW</span><br />
            <span style={{ color: GOLD, fontStyle: "italic" }}>Experiences</span>
          </motion.h1>

          {/* Sub-description — single refined sentence */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)", color: "rgba(255,255,255,0.5)", maxWidth: "440px", lineHeight: 1.8, marginBottom: "3rem", letterSpacing: "0.01em" }}
          >
            An exclusive ecosystem of distinguished brands — curating ultra-prime real estate, superyachts, private aviation, and bespoke services for visionary leaders and legacy builders worldwide.
          </motion.p>

          {/* Single refined CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}
          >
            <Link href="/ecosystem">
              <button
                className="btn-gold"
                style={{ letterSpacing: "0.18em", fontSize: "0.6875rem", padding: "1rem 2.25rem" }}
              >
                Discover Private Access
              </button>
            </Link>
            <Link href="/card-concierge">
              <span style={{ fontFamily: FONT_UI, fontWeight: 400, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", cursor: "pointer", borderBottom: `1px solid rgba(201,168,76,0.3)`, paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = GOLD; (e.target as HTMLElement).style.borderColor = GOLD; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)"; }}
              >Concierge</span>
            </Link>
          </motion.div>
        </div>

        {/* Sphere — desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            right: "-4%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(300px, 42vw, 620px)",
            height: "clamp(300px, 42vw, 620px)",
            pointerEvents: "none",
            zIndex: 2,
            borderRadius: "50%",
            overflow: "hidden",
            display: "none",
          }}
          id="hero-sphere"
        >
          <SphereAnimation style={{ width: "100%", height: "100%" }} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }}
          />
        </motion.div>

        {/* Desktop sphere show via CSS */}
        <style>{`@media (min-width: 1024px) { #hero-sphere { display: block !important; } }`}</style>
      </section>

      {/* ── STATS COUNTER ── */}
      <section style={{ padding: "4rem 0", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)", background: "rgba(201,168,76,0.02)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {[
              { value: 40, suffix: "+", label: "Countries" },
              { value: 395000, suffix: "+", label: "UHNW Members" },
              { value: 12, suffix: "B+", prefix: "$", label: "Assets Managed" },
              { value: 24, suffix: "/7", label: "Concierge" },
              { value: 500, suffix: "+", label: "Elite Partners" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08}>
                <div>
                  <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: GOLD, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: "8rem 0 6rem", position: "relative" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>The Ecosystem</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                A Curated World of{" "}
                <span style={{ color: GOLD }}>Unrivalled Luxury</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1rem" }}>
                Billionaire Collection is not merely a marketplace — it is a complete lifestyle ecosystem engineered for those who demand the absolute finest. From ultra-prime real estate to bespoke superyachts, from private aviation to rare spirits, every offering is curated to the highest standard.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Our global network of elite partners — spanning Christie's, Sotheby's International Realty, Virtuoso, Ferretti Group, and the world's most prestigious fashion houses — ensures access to assets and experiences unavailable anywhere else.
              </p>
              <Link href="/marketplace">
                <button className="btn-ghost-gold">Discover the Collection</button>
              </Link>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div style={{ position: "relative" }}>
                <img src={LIFESTYLE_IMG} alt="Billionaire Collection lifestyle" loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, border: `1px solid rgba(201,168,76,0.2)`, pointerEvents: "none" }} />
                {/* Corner brackets */}
                <div style={{ position: "absolute", top: "-8px", left: "-8px", width: "24px", height: "24px", borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` }} />
                <div style={{ position: "absolute", bottom: "-8px", right: "-8px", width: "24px", height: "24px", borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── BROKERAGE GRID ── */}
      <section style={{ padding: "6rem 0", background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Brokerage</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                The World's Finest <span style={{ color: GOLD }}>Assets</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5px", background: "rgba(201,168,76,0.1)" }}>
            {ECOSYSTEM_ITEMS.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.08}>
                <Link href={item.href}>
                  <div
                    style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", background: "#000" }}
                    className="group"
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.06)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GOLD, marginBottom: "0.5rem" }}>
                        Billionaire {item.label}
                      </div>
                      <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.375rem", color: "#fff" }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                        {item.sub}
                      </div>
                    </div>
                    {/* Hover border */}
                    <div style={{ position: "absolute", inset: 0, border: `1px solid rgba(201,168,76,0)`, transition: "border-color 0.3s", pointerEvents: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0)"; }}
                    />
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/marketplace">
                <button className="btn-ghost-gold">View All Listings</button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── DIVISIONS ── */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Divisions</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Billionaire <span style={{ color: GOLD }}>Ecosystem</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.12)" }}>
            {DIVISIONS.map((div, i) => (
              <FadeUp key={div.label} delay={i * 0.1}>
                <Link href={div.href}>
                  <div className="bc-glass-card" style={{ padding: "0", cursor: "pointer", height: "100%", transition: "all 0.3s", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "3/2", overflow: "hidden" }}>
                      <img src={div.img} alt={div.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                    </div>
                    <div style={{ padding: "2rem 2.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.5rem", color: "#fff", marginBottom: "0.75rem" }}>
                      {div.label}
                    </div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                      {div.desc}
                    </div>
                    <div style={{ marginTop: "2rem", fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>
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

      {/* ── PRODUCTS ── */}
      <section style={{ padding: "6rem 0", background: "rgba(201,168,76,0.02)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Exclusive Products</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Ultra-Premium <span style={{ color: GOLD }}>Indulgences</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {PRODUCTS.map((p, i) => (
              <FadeUp key={p.label} delay={i * 0.08}>
                <Link href={p.href}>
                  <div style={{ background: "#000", cursor: "pointer", overflow: "hidden" }}>
                    <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
                      <img src={p.img} alt={p.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.5s ease", background: "#0a0a0a" }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", marginBottom: "0.5rem" }}>{p.label}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{p.desc}</div>
                      <div style={{ marginTop: "1rem", fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>
                        Discover →
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCIERGE CTA ── */}
      <section style={{ position: "relative", padding: "10rem 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${LIFESTYLE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, #000 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "2rem" }}>24/7 Concierge</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", marginBottom: "1.5rem", maxWidth: "700px", margin: "0 auto 1.5rem" }}>
              Your Every Desire,{" "}
              <span style={{ color: GOLD }}>Fulfilled</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", maxWidth: "560px", margin: "0 auto 3rem", lineHeight: 1.8 }}>
              The Billionaire Card grants you access to a dedicated 24/7 concierge team — securing private jets, Michelin-starred reservations, exclusive event access, and bespoke experiences tailored to your exact specifications.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/card-concierge">
                <button className="btn-gold">Request Concierge</button>
              </Link>
              <Link href="/card">
                <button className="btn-ghost-gold">Billionaire Card</button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── BRAND PARTNERS ── */}
      <section style={{ padding: "5rem 0", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
                Curated Partners & Brands
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem 3rem" }}>
              {BRANDS.map((brand) => (
                <span key={brand} style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", transition: "color 0.2s", cursor: "default" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(201,168,76,0.7)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── NEWS TEASER ── */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="bc-badge" style={{ marginBottom: "1rem" }}>Billionaire News</span>
                <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff" }}>
                  Intelligence for the <span style={{ color: GOLD }}>Elite</span>
                </h2>
              </div>
              <Link href="/news">
                <button className="btn-ghost-gold" style={{ minWidth: "auto" }}>All News →</button>
              </Link>
            </div>
          </FadeUp>

          <HomepageNewsTeaser />
        </div>
      </section>

      {/* ── ECOSYSTEM HUB ── */}
      <section style={{ padding: "7rem 0 6rem", background: "#000", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>The Full Ecosystem</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                One Collection. Every Desire.
              </h2>
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                Billionaire Collection is the central hub connecting the world’s most exclusive luxury brands, services, and experiences.
              </p>
            </div>
          </FadeUp>

          {[
            {
              category: "Education & Transformation",
              brands: [
                { name: "Billionaire University", domain: "billionaireuniversity.com" },
                { name: "Best Book on Sales", domain: "bestbookonsales.com" },
                { name: "The Game of Sales", domain: "thegameofsales.com" },
                { name: "Billionaire Tutor", domain: "billionairetutor.com" },
                { name: "The Impossible Coach", domain: "theimpossiblecoach.com" },
                { name: "Ghetto Coach", domain: "ghettocoach.com" },
                { name: "Ghetto Ghost", domain: "ghettoghost.com" },
                { name: "Billionaire Counsel", domain: "billionairecounsel.com" },
              ],
            },
            {
              category: "Health & Peak Performance",
              brands: [
                { name: "Billionaire Vitality", domain: "billionairevitality.com" },
                { name: "Billionaire Peptide", domain: "billionairepeptide.com" },
                { name: "Cognition Water", domain: "cognitionwater.com" },
              ],
            },
            {
              category: "Luxury Products & Indulgences",
              brands: [
                { name: "Billionaire Vodka", domain: "billionairevodka.com" },
                { name: "Billionaire Champagne", domain: "billionairechampagne.com" },
                { name: "Billionaire Oud", domain: "billionaireoud.com" },
                { name: "Billionaire Cigar", domain: "billionairecigar.com" },
                { name: "Billionaire Chrono", domain: "billionairechrono.com" },
                { name: "Billionaire Art", domain: "billionaireart.com" },
              ],
            },
            {
              category: "Lifestyle Assets & Experiences",
              brands: [
                { name: "Billionaire Air", domain: "billionaireair.com" },
                { name: "Billionaire Boat", domain: "billionaireboat.com" },
                { name: "Billionaire Car", domain: "billionairecar.com" },
                { name: "Billionaire F1", domain: "billionairef1.com" },
                { name: "Billionaire Golf", domain: "billionairegolf.com" },
                { name: "Billionaire Estates", domain: "billionaireestates.com" },
                { name: "OffMarket Hotel", domain: "offmarkethotel.com" },
                { name: "The Off Market Sale", domain: "theoffmarketsale.com" },
              ],
            },
            {
              category: "Media & Entertainment",
              brands: [
                { name: "Billionaire Television", domain: "billionairetelevision.com" },
                { name: "Billionaire Radio", domain: "billionaireradio.com" },
                { name: "Billionaire Collection Magazine", domain: "billionairecollectionmagazine.com" },
                { name: "Millionaire Magazine", domain: "themillionairemagazine.com" },
                { name: "Billionaire Digital", domain: "billionairedigital.com" },
                { name: "Billionaire Media Group", domain: "billionairemediagroup.com" },
              ],
            },
            {
              category: "Wealth Creation & Business",
              brands: [
                { name: "Billionaire Forex", domain: "billionaireforex.com" },
                { name: "Billionaire Funding", domain: "billionairefunding.com" },
                { name: "Billionaire Classifieds", domain: "billionaireclassifieds.com" },
                { name: "Billionaire Store", domain: "thebillionairestore.com" },
              ],
            },
            {
              category: "Legacy & Special",
              brands: [
                { name: "Billionaire Giving", domain: "billionairegiving.com" },
                { name: "Smarter Mama", domain: "smartermama.com" },
              ],
            },
          ].map((group, gi) => (
            <FadeUp key={group.category} delay={gi * 0.05}>
              <div style={{ marginBottom: "3rem" }}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: "24px", height: "1px", background: GOLD }} />
                  <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: GOLD }}>
                    {group.category}
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.12)" }} />
                </div>
                {/* Brand grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
                  {group.brands.map((brand) => (
                    <a
                      key={brand.domain}
                      href={`https://${brand.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem 1.25rem",
                        border: "1px solid rgba(201,168,76,0.12)",
                        background: "rgba(201,168,76,0.02)",
                        textDecoration: "none",
                        transition: "border-color 0.2s, background 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.45)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.02)";
                      }}
                    >
                      <span style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", marginBottom: "0.25rem" }}>
                        {brand.name}
                      </span>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(201,168,76,0.55)", letterSpacing: "0.04em" }}>
                        {brand.domain}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── UHNW SERVICES ── */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>UHNW Services</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1rem" }}>
                Ultra High Net Worth <span style={{ color: GOLD }}>Services</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
                Billionaire Collection delivers a comprehensive suite of bespoke services designed exclusively for ultra-high-net-worth individuals, family offices, and visionary leaders seeking unparalleled access and expertise.
              </p>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {[
              { icon: "✦", title: "Wealth Preservation", desc: "Strategic asset allocation, family office structuring, and generational wealth planning through our global network of elite advisors." },
              { icon: "✦", title: "Lifestyle Management", desc: "24/7 concierge services managing every facet of your life — travel, residences, events, and bespoke experiences worldwide." },
              { icon: "✦", title: "Private Aviation", desc: "Charter, acquisition, and management of private jets and helicopters through Billionaire Air, our dedicated aviation division." },
              { icon: "✦", title: "Ultra-Prime Real Estate", desc: "Off-market acquisition and disposition of the world's most exclusive residential and commercial properties via Billionaire Estates." },
              { icon: "✦", title: "Superyacht Services", desc: "Charter, purchase, and management of superyachts and mega-yachts through Billionaire Boat, our maritime division." },
              { icon: "✦", title: "Education & Legacy", desc: "Billionaire University and Billionaire Counsel provide transformational education and legal counsel for the next generation of leaders." },
            ].map((service, i) => (
              <FadeUp key={service.title} delay={i * 0.07}>
                <div className="bc-glass-card" style={{ padding: "2.5rem", height: "100%" }}>
                  <div style={{ fontFamily: FONT_UI, fontSize: "1.25rem", color: GOLD, marginBottom: "1rem" }}>{service.icon}</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", marginBottom: "0.75rem" }}>{service.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{service.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/services">
                <button className="btn-ghost-gold">Explore All UHNW Services</button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ (AI Overview / Featured Snippet target) ── */}
      <section style={{ padding: "8rem 0", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ marginBottom: "3rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>FAQ</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff" }}>
                Frequently Asked <span style={{ color: GOLD }}>Questions</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {[
              {
                q: "What is Billionaire Collection?",
                a: "Billionaire Collection is the world's leading parent organization and central hub for all things billionaire, ultra high net worth services, and luxury ecosystems. It serves as the umbrella company for 40+ sub-brands spanning aviation, real estate, superyachts, automotive, media, education, and luxury products."
              },
              {
                q: "What UHNW services does Billionaire Collection offer?",
                a: "Billionaire Collection offers a comprehensive suite of ultra high net worth services including private aviation through Billionaire Air, ultra-prime real estate through Billionaire Estates, superyacht services through Billionaire Boat, lifestyle management through the Billionaire Card concierge, wealth education through Billionaire University, and legal counsel through Billionaire Counsel."
              },
              {
                q: "How is Billionaire Collection different from Billionaire Collection Magazine?",
                a: "Billionaire Collection (billionairecollection.com) is the corporate parent hub — the strategic foundation connecting clients to bespoke UHNW wealth services, lifestyle management, and exclusive brand partnerships. Billionaire Collection Magazine (billionairecollectionmagazine.com) is the flagship publication focused on content, storytelling, and insights for the billionaire community."
              },
              {
                q: "Who is Billionaire Collection for?",
                a: "Billionaire Collection is designed for ultra-high-net-worth individuals, family offices, visionary entrepreneurs, and leaders who demand access to the world's most exclusive services, assets, and experiences. Our ecosystem serves clients across 40+ countries with assets and opportunities unavailable anywhere else."
              },
              {
                q: "What is the Billionaire Card?",
                a: "The Billionaire Card is the gateway to Billionaire Collection's 24/7 concierge service. Cardholders receive dedicated personal concierge support for private jet bookings, Michelin-starred reservations, exclusive event access, off-market property acquisition, and bespoke experiences tailored to their exact specifications."
              },
              {
                q: "Where is Billionaire Collection based?",
                a: "Billionaire Collection is established in London, United Kingdom, and operates globally across 40+ countries through its network of elite partners, sub-brands, and affiliate companies."
              },
            ].map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.06}>
                <div className="bc-glass-card" style={{ padding: "2rem 2.5rem" }}>
                  <h3 style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.9375rem", color: GOLD, marginBottom: "0.75rem", lineHeight: 1.4 }}>{faq.q}</h3>
                  <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
