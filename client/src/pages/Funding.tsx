/* ============================================================
   BILLIONAIRE FUNDING — Brand Page (/funding)
   Services Division — Private capital, PE, venture & structured finance
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

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SERVICES = [
  { icon: "◆", title: "Private Equity Access", desc: "Exclusive co-investment rights alongside top-tier PE firms — Carlyle, KKR, Blackstone — in deals typically reserved for institutional LPs with $100M+ commitments." },
  { icon: "◆", title: "Pre-IPO Opportunities", desc: "Early-stage access to high-growth technology and consumer companies before public listing, sourced through our proprietary network of founders, VCs, and investment banks." },
  { icon: "◆", title: "Real Estate Funds", desc: "Institutional-grade private real estate vehicles — core, core-plus, value-add, and opportunistic — spanning trophy commercial, residential, and hospitality assets globally." },
  { icon: "◆", title: "Structured Products", desc: "Bespoke capital-protected and yield-enhanced structured notes engineered by our in-house quantitative team, tailored to your specific risk-return profile and liquidity requirements." },
  { icon: "◆", title: "Venture Capital", desc: "Access to curated early-stage investment rounds in deep-tech, longevity science, AI, and luxury consumer brands — sectors where UHNW insight creates asymmetric advantage." },
  { icon: "◆", title: "Family Office Solutions", desc: "Comprehensive investment infrastructure for single and multi-family offices — from asset allocation strategy and manager selection to consolidated reporting and tax-efficient structuring." },
];

const PROGRAMMES = [
  {
    name: "Billionaire Capital Access",
    tier: "Entry — $5M+",
    desc: "Quarterly co-investment opportunities across private equity, real estate, and structured products. Includes dedicated relationship manager, quarterly performance reporting, and access to the Billionaire Funding deal flow portal.",
    features: ["Quarterly deal flow", "Dedicated relationship manager", "Consolidated reporting", "Minimum $5M commitment"],
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/WfjOWXUhiXZMuplX.jpg",
  },
  {
    name: "Billionaire Capital Elite",
    tier: "Elite — $25M+",
    desc: "Priority access to all deal flow including pre-IPO rounds and exclusive PE co-investments. Includes monthly advisory sessions, bespoke portfolio construction, and direct introductions to fund managers.",
    features: ["Priority deal access", "Monthly advisory sessions", "Bespoke portfolio construction", "Fund manager introductions"],
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/WfjOWXUhiXZMuplX.jpg",
  },
  {
    name: "Billionaire Capital Sovereign",
    tier: "Sovereign — $100M+",
    desc: "White-glove family office service with dedicated investment committee, proprietary deal origination, and access to sovereign wealth fund co-investments. The highest tier of private capital access available.",
    features: ["Dedicated investment committee", "Proprietary deal origination", "Sovereign co-investments", "Full family office infrastructure"],
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/WfjOWXUhiXZMuplX.jpg",
  },
];

const STATS = [
  { value: "$12B+", label: "Capital deployed" },
  { value: "340+", label: "Deals completed" },
  { value: "40+", label: "Countries served" },
  { value: "18%", label: "Avg. net IRR" },
];

export default function Funding() {
  useSEO({
    title: "Billionaire Funding — Elite Capital & Private Finance | A Billionaire Collection Company",
    description: "Billionaire Funding is the private capital division of Billionaire Collection. Exclusive access to private equity, pre-IPO, real estate funds, and bespoke structured products for ultra-high-net-worth individuals and family offices.",
    keywords: "Billionaire Funding, Billionaire Collection capital, elite funding, private capital, UHNW financing, luxury investment, private equity UHNW, pre-IPO access, family office investment, wealth management London",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Billionaire Collection", "item": "https://billionairecollection.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://billionairecollection.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Billionaire Funding", "item": "https://billionairecollection.com/funding" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Billionaire Funding",
      "description": "The private capital division of Billionaire Collection — exclusive access to private equity, pre-IPO, real estate funds, and bespoke structured products for UHNW individuals.",
      "url": "https://billionairecollection.com/funding",
      "areaServed": "Worldwide",
      "parentOrganization": { "@type": "Organization", "name": "Billionaire Collection", "url": "https://billionairecollection.com" },
    },
  ]);

  return (
    <div style={{ background: "#000" }}>
      {/* ── Hero ── */}
      <PageHero
        badge="Billionaire Funding"
        title="Capital That Moves"
        titleAccent="At Your Scale"
        subtitle="The private capital division of Billionaire Collection — providing ultra-high-net-worth individuals and family offices with exclusive access to investment opportunities unavailable through conventional channels."
        image="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/WfjOWXUhiXZMuplX.jpg"
        cta={{ label: "Speak to an Advisor", href: "/card-concierge" }}
      />

      {/* ── About ── */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>About Billionaire Funding</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.25 }}>
                Where Capital <span style={{ color: GOLD }}>Meets Opportunity</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Billionaire Funding was established to solve a fundamental problem: the world's most lucrative investment opportunities are systematically inaccessible to all but the largest institutional investors. Our mission is to change that for ultra-high-net-worth individuals.
              </p>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "2rem" }}>
                Through our proprietary network spanning 40+ countries — including relationships with Tier 1 private equity firms, sovereign wealth funds, and the world's most sought-after pre-IPO companies — we deliver institutional-grade deal flow directly to qualified members of the Billionaire Collection.
              </p>
              <Link href="/card-concierge"><button className="btn-ghost-gold">Speak to an Advisor</button></Link>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(201,168,76,0.12)" }}>
                {STATS.map((s) => (
                  <div key={s.label} className="bc-glass-card" style={{ padding: "2.5rem", textAlign: "center" }}>
                    <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "2.25rem", color: GOLD, marginBottom: "0.5rem" }}>{s.value}</div>
                    <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: "6rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>Capital Services</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Six Pillars of <span style={{ color: GOLD }}>Private Capital</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.05}>
                <div className="bc-glass-card" style={{ padding: "2.5rem", height: "100%" }}>
                  <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: GOLD, display: "block", marginBottom: "1rem" }}>{svc.icon} Service</span>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.2rem", color: "#fff", marginBottom: "0.875rem" }}>{svc.title}</h3>
                  <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{svc.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmes ── */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>Membership Tiers</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Three Tiers of <span style={{ color: GOLD }}>Capital Access</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: "2rem" }}>
            {PROGRAMMES.map((prog, i) => (
              <FadeUp key={prog.name} delay={i * 0.1}>
                <div className="bc-glass-card" style={{ overflow: "hidden", height: "100%" }}>
                  <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                    <img src={prog.img} alt={prog.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
                    <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem" }}>
                      <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GOLD, background: "rgba(0,0,0,0.7)", padding: "0.35rem 0.75rem", border: `1px solid ${GOLD}` }}>{prog.tier}</span>
                    </div>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", marginBottom: "0.75rem" }}>{prog.name}</h3>
                    <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "1.5rem" }}>{prog.desc}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0" }}>
                      {prog.features.map((f) => (
                        <li key={f} style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", padding: "0.3rem 0", borderBottom: "1px solid rgba(201,168,76,0.08)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ color: GOLD, fontSize: "0.5rem" }}>◆</span>{f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/card-concierge"><button className="btn-ghost-gold" style={{ width: "100%", textAlign: "center" }}>Enquire Now</button></Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.03)", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Private Consultation</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                Capital Reserved for <span style={{ color: GOLD }}>Qualified Members</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Access to Billionaire Funding programmes is by invitation and qualification only. To begin the process, speak with a Billionaire Collection advisor through our private concierge service.
              </p>
              <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/card-concierge"><button className="btn-gold">Speak to an Advisor</button></Link>
                <Link href="/card"><button className="btn-ghost-gold">Apply for Billionaire Card</button></Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
