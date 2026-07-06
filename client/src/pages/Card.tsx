import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { trpc } from "@/lib/trpc";
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

export default function Card() {
  useSEO({
    title: "Billionaire Card — The World's Most Exclusive Membership",
    description: "Apply for the Billionaire Card — 24/7 global concierge, private aviation access, elite hotel upgrades, and bespoke experiences reserved for the world's most discerning individuals.",
    keywords: "Billionaire Card, exclusive membership card, luxury concierge, black card, elite membership, VIP card, 24/7 concierge, private jet access",
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Card",
    "description": "The world's most exclusive membership card — 24/7 global concierge, private aviation access, elite hotel upgrades, and bespoke experiences for ultra-high-net-worth individuals.",
    "url": "https://billionairecollection.com/card",
    "serviceType": "Luxury Concierge Membership",
    "provider": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://billionairecollection.com/card#apply",
      "servicePhone": "+44-207-183-1700",
      "availableLanguage": "English"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Billionaire Card Benefits",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Global Concierge" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Private Aviation Access" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elite Hotel Upgrades" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Michelin-Star Dining Reservations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exclusive Event Access" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elite Partner Recognition" } }
      ]
    }
  });
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
      <PageHero badge="Billionaire Card" title="The World's Most" titleAccent="Exclusive Card" subtitle="The Billionaire Card is not merely a payment instrument — it is a passport to a world of extraordinary privileges, bespoke services, and elite experiences." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Apply Now", href: "#apply" }} />
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
              <a href="#apply"><button className="btn-gold">Apply for the Billionaire Card</button></a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" style={{ padding: "8rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Apply Now</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Begin Your <span style={{ color: GOLD }}>Application</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "560px", margin: "1.5rem auto 0", lineHeight: 1.7 }}>
                Membership is by application only. Complete the form below and our team will review your application within 48 hours.
              </p>
            </div>
          </FadeUp>
          <CardApplicationForm />
        </div>
      </section>
    </div>
  );
}

function CardApplicationForm() {
  const FONT_UI = "'Raleway', sans-serif";
  const GOLD = "#C9A84C";
  const [form, setForm] = useState<{ firstName: string; lastName: string; email: string; phone: string; country: string; occupation: string; netWorth: string; cardTier: "black" | "platinum" | "gold" | "golden_ticket"; referralCode: string }>({ firstName: "", lastName: "", email: "", phone: "", country: "", occupation: "", netWorth: "", cardTier: "black", referralCode: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const applyMutation = trpc.card.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err: { message?: string }) => setError(err.message || "Something went wrong. Please try again."),
  });

  const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none" };
  const labelStyle: React.CSSProperties = { fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" };

  if (submitted) return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "4rem", border: "1px solid rgba(201,168,76,0.3)", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "1.5rem", color: GOLD, marginBottom: "1rem" }}>Application Received</h3>
      <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>Thank you for applying for the Billionaire Card. Our membership team will review your application and contact you within 48 hours.</p>
    </div>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); setError(""); applyMutation.mutate({ ...form }); }} style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div><label style={labelStyle}>First Name *</label><input type="text" required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} style={inputStyle} /></div>
        <div><label style={labelStyle}>Last Name *</label><input type="text" required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} style={inputStyle} /></div>
      </div>
      <div><label style={labelStyle}>Email Address *</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} /></div>
      <div><label style={labelStyle}>Phone Number</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle} /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div><label style={labelStyle}>Country of Residence</label><input type="text" value={form.country} onChange={e => setForm({...form, country: e.target.value})} style={inputStyle} /></div>
        <div><label style={labelStyle}>Occupation</label><input type="text" value={form.occupation} onChange={e => setForm({...form, occupation: e.target.value})} style={inputStyle} /></div>
      </div>
      <div><label style={labelStyle}>Estimated Net Worth</label>
        <select value={form.netWorth} onChange={e => setForm({...form, netWorth: e.target.value})} style={{ ...inputStyle, background: "#0a0a0a" }}>
          <option value="">Prefer not to say</option>
          <option>$1M – $10M</option><option>$10M – $50M</option><option>$50M – $100M</option><option>$100M – $500M</option><option>$500M+</option>
        </select>
      </div>
      <div><label style={labelStyle}>Card Tier</label>
        <select value={form.cardTier} onChange={e => setForm({...form, cardTier: e.target.value as "black" | "platinum" | "gold" | "golden_ticket"})} style={{ ...inputStyle, background: "#0a0a0a" }}>
          <option value="black">Billionaire Black</option>
          <option value="platinum">Billionaire Platinum</option>
          <option value="gold">Billionaire Gold</option>
          <option value="golden_ticket">The Golden Ticket</option>
        </select>
      </div>
      <div><label style={labelStyle}>Referral Code (optional)</label><input type="text" value={form.referralCode} onChange={e => setForm({...form, referralCode: e.target.value})} style={inputStyle} /></div>
      {error && <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "#e57373" }}>{error}</p>}
      <button type="submit" className="btn-gold" style={{ width: "100%", marginTop: "0.5rem" }} disabled={applyMutation.isPending}>
        {applyMutation.isPending ? "Submitting…" : "Submit Application"}
      </button>
      <p style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>All information is treated with the utmost confidentiality.</p>
    </form>
  );
}
