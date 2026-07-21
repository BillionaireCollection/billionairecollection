/* ============================================================
   BILLIONAIRE COLLECTION — Marketplace
   The BILLIONAIRE STORE: luxury properties, vehicles, yachts.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";
import { toast } from "sonner";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const MAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";
const ESTATES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-estates-5tXLsMCEXgogpiaShTiVMe.webp";
const YACHT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-yacht-hFeRjh9nRnBaKqx8rPSF24.webp";
const AIR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-aviation-K37Bb2CGs26HxxPg9N8RhR.webp";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

const CATEGORIES = ["All", "Properties", "Vehicles", "Yachts", "Aviation", "Art"];

const ALL_LISTINGS = [
  { cat: "Properties", title: "Mayfair Grand Penthouse", loc: "London, United Kingdom", price: "$57,000,000", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/mayfair-penthouse_486d2a47.webp", tag: "Off-Market", href: "/estates" },
  { cat: "Yachts", title: "M/Y Aurora — 82m Lürssen", loc: "Mediterranean", price: "$105,000,000", img: YACHT_IMG, tag: "For Sale", href: "/boat" },
  { cat: "Aviation", title: "Gulfstream G800", loc: "Ultra-Long Range", price: "POA", img: AIR_IMG, tag: "For Sale", href: "/air" },
  { cat: "Properties", title: "Monaco Clifftop Villa", loc: "Monaco, Monte Carlo", price: "$93,500,000", img: ESTATES_IMG, tag: "Exclusive", href: "/estates" },
  { cat: "Vehicles", title: "Ferrari LaFerrari Aperta", loc: "1 of 210, Rosso Corsa", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/ferrari-laferrari-aperta_644ecf63.webp", tag: "Rare", href: "/car" },
  { cat: "Properties", title: "Malibu Ocean Estate", loc: "California, USA", price: "$120,000,000", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/malibu-ocean-estate_d137b630.jpg", tag: "New", href: "/estates" },
  { cat: "Yachts", title: "M/Y Solaris — 65m Benetti", loc: "Caribbean Charter", price: "$490,000/week", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80", tag: "Charter", href: "/boat" },
  { cat: "Vehicles", title: "Bugatti Chiron Super Sport", loc: "2022, 1,600hp", price: "$4,100,000", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bugatti-chiron-super-sport_1dfd1c9b.jpg", tag: "For Sale", href: "/car" },
  { cat: "Art", title: "Jean-Michel Basquiat", loc: "Untitled, 1982", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/basquiat-artwork_4ca08043.jpg", tag: "Private Sale", href: "/art" },
  { cat: "Aviation", title: "Bombardier Global 7500", loc: "London to Sydney Non-Stop", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bombardier-global-7500_695fc715.png", tag: "Charter", href: "/air" },
  { cat: "Properties", title: "Dubai Palm Penthouse", loc: "Palm Jumeirah, Dubai", price: "$25,900,000", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/dubai-palm-penthouse_e380ec4a.jpg", tag: "Exclusive", href: "/estates" },
  { cat: "Vehicles", title: "Rolls-Royce Phantom Bespoke", loc: "Commission Available", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/rolls-royce-phantom-bespoke_ed6cc70a.webp", tag: "Commission", href: "/car" },
];

export default function Marketplace() {
  useSEO({
    title: "Billionaire Collection Store — Ultra-Prime Assets For Sale",
    description: "The Billionaire Collection Store is the official marketplace of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Browse ultra-prime real estate, superyachts, private jets, rare automobiles, and fine art — all curated and verified by the Billionaire Collection brokerage network.",
    keywords: "Billionaire Collection store, luxury marketplace, ultra-prime assets for sale, luxury real estate for sale, superyacht for sale, private jet for sale, rare car for sale, UHNW marketplace, Billionaire Collection listings",
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
        "name": "Billionaire Store",
        "item": "https://billionairecollection.com/marketplace"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Billionaire Collection Store \u2014 Ultra-Prime Assets",
    "description": "The official marketplace of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/marketplace",
    "numberOfItems": 12,
    "publisher": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? ALL_LISTINGS : ALL_LISTINGS.filter(l => l.cat === activeCategory);

  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="Billionaire Store"
        title="The World's Most"
        titleAccent="Exclusive Marketplace"
        subtitle="Discover an extraordinary collection of ultra-prime properties, superyachts, private aircraft, rare automobiles, and fine art — curated exclusively for the world's most discerning buyers."
        image={MAIN_IMG}
        cta={{ label: "Browse All Listings", href: "#listings" }}
        ctaSecondary={{ label: "Enquire", href: "/card-concierge" }}
      />

      {/* Category filter */}
      <section id="listings" style={{ padding: "5rem 0 3rem" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: FONT_UI,
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "8px 20px",
                    background: activeCategory === cat ? GOLD : "transparent",
                    color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.5)",
                    border: `1px solid ${activeCategory === cat ? GOLD : "rgba(201,168,76,0.25)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Stats bar */}
          <FadeUp delay={0.1}>
            <div style={{ display: "flex", gap: "3rem", marginBottom: "3rem", flexWrap: "wrap" }}>
              {[
                { num: "2,400+", label: "Active Listings" },
                { num: "$60B+", label: "Total Portfolio Value" },
                { num: "40+", label: "Countries" },
                { num: "100%", label: "Verified Assets" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: GOLD }}>{stat.num}</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Listings grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {filtered.map((item, i) => (
              <FadeUp key={item.title + i} delay={i * 0.05}>
                <Link href={item.href}>
                  <div style={{ background: "#000", cursor: "pointer", overflow: "hidden" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#000"; }}
                  >
                    <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10" }}>
                      <img src={item.img} alt={item.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                        <span className="bc-badge" style={{ fontSize: "0.625rem" }}>{item.tag}</span>
                      </div>
                      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                        <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.6)", padding: "4px 8px" }}>
                          {item.cat}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.0625rem", color: "#fff", marginBottom: "0.375rem" }}>{item.title}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>{item.loc}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.9375rem", color: GOLD }}>{item.price}</span>
                        <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>View →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          {/* Load more */}
          <FadeUp delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <button className="btn-ghost-gold" onClick={() => toast("All listings shown", { description: "You've reached the end of our current listings. Contact our advisors for off-market opportunities." })}>Load More Listings</button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "2rem" }}>Private Enquiries</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1rem" }}>
              Can't Find What You're Looking For?
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
              Our advisors have access to thousands of off-market assets not listed publicly. Tell us what you desire, and we will find it.
            </p>
            <Link href="/card-concierge">
              <button className="btn-gold">Make a Private Enquiry</button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
