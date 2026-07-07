/* ============================================================
   BILLIONAIRE COLLECTION — Card Concierge
   24/7 elite concierge service request page.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PageHero from "@/components/PageHero";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
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

const SERVICES = [
  { icon: "✈️", title: "Private Aviation", desc: "Arrange private jets, helicopter transfers, and bespoke flight experiences worldwide." },
  { icon: "🏨", title: "Hotel & Accommodation", desc: "Secure suites at the world's finest hotels, private villas, and exclusive resort access." },
  { icon: "🍽️", title: "Fine Dining", desc: "Priority reservations at Michelin-starred restaurants and exclusive private dining experiences." },
  { icon: "🎭", title: "Events & Entertainment", desc: "Access to sold-out events, private concerts, galas, and exclusive cultural experiences." },
  { icon: "⛵", title: "Yacht Charter", desc: "Arrange superyacht charters, sailing experiences, and private island retreats." },
  { icon: "🛍️", title: "Personal Shopping", desc: "Bespoke personal shopping services from the world's most prestigious luxury houses." },
  { icon: "🏥", title: "Medical & Wellness", desc: "Access to elite medical specialists, longevity clinics, and exclusive wellness retreats." },
  { icon: "🔒", title: "Security & Privacy", desc: "Discreet personal security arrangements and privacy protection services." },
];

const REQUEST_TYPES = [
  "Private Aviation", "Hotel & Accommodation", "Fine Dining Reservation",
  "Event Access", "Yacht Charter", "Personal Shopping",
  "Property Enquiry", "Vehicle Acquisition", "Other",
];

export default function CardConcierge() {
  useSEO({
    title: "Billionaire Collection 24/7 Concierge — Bespoke Requests Worldwide",
    description: "Submit a bespoke concierge request to Billionaire Collection, the parent company behind the world's premier luxury ecosystem. Our 24/7 global team handles private jet bookings, Michelin-star reservations, yacht charters, VIP event access, and any request — no matter how extraordinary.",
    keywords: "Billionaire Collection concierge, 24/7 luxury concierge, bespoke concierge service, private jet booking concierge, Michelin star reservation, VIP event access, UHNW concierge, Billionaire Collection request, luxury lifestyle service",
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
        "name": "Concierge Request",
        "item": "https://billionairecollection.com/card-concierge"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Collection 24/7 Concierge",
    "description": "24/7 luxury concierge service operated by Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/card-concierge",
    "serviceType": "Luxury Concierge Service",
    "provider": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "areaServed": "Worldwide",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "", budget: "" });
  const [formError, setFormError] = useState("");

  const submitMutation = trpc.concierge.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => setFormError(err.message || "Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.type) { setFormError("Please select a request type."); return; }
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      requestType: form.type,
      description: form.message,
      budget: form.budget || undefined,
    });
  };

  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="24/7 Concierge"
        title="Your Every Desire,"
        titleAccent="Fulfilled"
        subtitle="The Billionaire Card Concierge is available around the clock to fulfil any request — no matter how extraordinary. Your dedicated team awaits."
        image={LIFESTYLE_IMG}
        height="85vh"
      />

      {/* Services grid */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Concierge Services</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                No Request Too <span style={{ color: GOLD }}>Extraordinary</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.06}>
                <div className="bc-glass-card" style={{ padding: "2.5rem 2rem", height: "100%" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
                  <h3 style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD, marginBottom: "0.75rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section style={{ padding: "4rem 0 10rem", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "6rem", alignItems: "start" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Make a Request</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#fff", marginBottom: "1.5rem" }}>
                Your Dedicated <span style={{ color: GOLD }}>Team Awaits</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Submit your request and a dedicated Billionaire Card concierge specialist will respond within 15 minutes — 24 hours a day, 7 days a week, 365 days a year.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, marginBottom: "0.5rem" }}>Phone</div>
                  <a href="tel:+442071831700" style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>+44 207 183 1700</a>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, marginBottom: "0.5rem" }}>Email</div>
                  <a href="mailto:concierge@billionaireplc.com" style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>concierge@billionaireplc.com</a>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, marginBottom: "0.5rem" }}>Response Time</div>
                  <span style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)" }}>Within 15 minutes</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              {submitted ? (
                <div style={{ padding: "4rem", border: `1px solid rgba(201,168,76,0.3)`, textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✓</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.5rem", color: GOLD, marginBottom: "1rem" }}>Request Received</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                    Your dedicated concierge specialist will contact you within 15 minutes. Thank you for choosing Billionaire Collection.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Full Name</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Phone</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Email Address</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Request Type</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                      style={{ width: "100%", background: "#0a0a0a", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: form.type ? "#fff" : "rgba(255,255,255,0.4)", outline: "none" }}>
                      <option value="" disabled>Select a service...</option>
                      {REQUEST_TYPES.map(t => <option key={t} value={t} style={{ background: "#0a0a0a" }}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Your Request</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      placeholder="Please describe your request in detail..."
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none", resize: "vertical" }} />
                  </div>
                  {formError && <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "#e57373" }}>{formError}</p>}
                  <button type="submit" className="btn-gold" style={{ width: "100%", marginTop: "0.5rem" }} disabled={submitMutation.isPending}>
                    {submitMutation.isPending ? "Submitting…" : "Submit Request"}
                  </button>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
                    Your information is kept strictly confidential. Response within 15 minutes.
                  </p>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
