/* ============================================================
   BILLIONAIRE COLLECTION — DivisionPage Template
   Reusable layout for all division/brokerage/product pages.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "./PageHero";

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

export interface Feature { icon?: string; title: string; desc: string; }
export interface Listing { title: string; sub: string; price?: string; img: string; tag?: string; }
export interface DivisionPageProps {
  badge: string;
  heroTitle: string;
  heroAccent?: string;
  heroSubtitle: string;
  heroImage: string;
  heroCta?: { label: string; href: string };
  heroCtaSecondary?: { label: string; href: string };
  aboutTitle: string;
  aboutBody: string[];
  features: Feature[];
  listings?: Listing[];
  listingsTitle?: string;
  ctaBanner?: { title: string; sub: string; btnLabel: string; btnHref: string };
  partnerLogos?: string[];
}

export default function DivisionPage({
  badge, heroTitle, heroAccent, heroSubtitle, heroImage,
  heroCta, heroCtaSecondary,
  aboutTitle, aboutBody, features,
  listings, listingsTitle,
  ctaBanner, partnerLogos,
}: DivisionPageProps) {
  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge={badge}
        title={heroTitle}
        titleAccent={heroAccent}
        subtitle={heroSubtitle}
        image={heroImage}
        cta={heroCta}
        ctaSecondary={heroCtaSecondary}
      />

      {/* About section */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }} className="lg:grid-cols-2 grid-cols-1">
            <FadeUp>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", lineHeight: 1.2, marginBottom: "2rem" }}>
                {aboutTitle}
              </h2>
              {aboutBody.map((para, i) => (
                <p key={i} style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  {para}
                </p>
              ))}
              {heroCta && (
                <div style={{ marginTop: "2rem" }}>
                  <a href={heroCta.href}>
                    <button className="btn-ghost-gold">{heroCta.label}</button>
                  </a>
                </div>
              )}
            </FadeUp>

            <FadeUp delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(201,168,76,0.12)" }}>
                {features.map((f, i) => (
                  <div key={i} className="bc-glass-card" style={{ padding: "2rem 1.5rem" }}>
                    {f.icon && <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{f.icon}</div>}
                    <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD, marginBottom: "0.5rem" }}>
                      {f.title}
                    </div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                      {f.desc}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Listings */}
      {listings && listings.length > 0 && (
        <section style={{ padding: "4rem 0 8rem", background: "rgba(255,255,255,0.01)" }}>
          <div className="container">
            <FadeUp>
              <div style={{ marginBottom: "3rem" }}>
                <span className="bc-badge" style={{ marginBottom: "1rem" }}>{listingsTitle || "Featured Listings"}</span>
                <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#fff" }}>
                  Exclusive <span style={{ color: GOLD }}>Offerings</span>
                </h2>
              </div>
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
              {listings.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.07}>
                  <div style={{ background: "#000", overflow: "hidden", cursor: "pointer" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#000"; }}
                  >
                    <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                      />
                      {item.tag && (
                        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                          <span className="bc-badge" style={{ fontSize: "0.625rem" }}>{item.tag}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.0625rem", color: "#fff", marginBottom: "0.5rem" }}>{item.title}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>{item.sub}</div>
                      {item.price && (
                        <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.875rem", color: GOLD }}>{item.price}</div>
                      )}
                    </div>
                  </div>
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
      )}

      {/* Partner logos */}
      {partnerLogos && partnerLogos.length > 0 && (
        <section style={{ padding: "4rem 0", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="container">
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>
                  Trusted Partners
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem 3rem" }}>
                {partnerLogos.map((p) => (
                  <span key={p} style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)" }}>
                    {p}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      {ctaBanner && (
        <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.03)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <FadeUp>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1rem" }}>
                {ctaBanner.title}
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
                {ctaBanner.sub}
              </p>
              <a href={ctaBanner.btnHref}>
                <button className="btn-gold">{ctaBanner.btnLabel}</button>
              </a>
            </FadeUp>
          </div>
        </section>
      )}
    </div>
  );
}
