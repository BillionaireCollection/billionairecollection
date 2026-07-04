/* ============================================================
   BILLIONAIRE COLLECTION — The Golden Ticket
   The most exclusive membership tier — invitation only.
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { trpc } from "@/lib/trpc";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp";
const MAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

const PRIVILEGES = [
  { icon: "✈️", title: "Unlimited Private Aviation", desc: "Unlimited access to a fleet of ultra-long-range private jets, available 24/7 with 2-hour notice worldwide." },
  { icon: "🏝️", title: "Private Island Access", desc: "Exclusive access to a curated portfolio of private islands and ultra-luxury villas, reserved exclusively for Golden Ticket members." },
  { icon: "🛥️", title: "Superyacht Fleet", desc: "Priority access to a fleet of superyachts ranging from 50 to 100 metres, available for charter at any time." },
  { icon: "🎭", title: "Impossible Experiences", desc: "Access to experiences that money alone cannot buy — private audiences, exclusive events, and once-in-a-lifetime moments." },
  { icon: "💎", title: "Dedicated Family Office", desc: "A dedicated team of financial advisors, legal experts, and lifestyle managers available exclusively to you." },
  { icon: "🏥", title: "Elite Medical Access", desc: "Priority access to the world's leading medical specialists, longevity clinics, and exclusive health retreats." },
  { icon: "🎨", title: "Art & Collectibles", desc: "First access to the most significant works of art before they reach the open market, with expert advisory." },
  { icon: "🌐", title: "Global Network", desc: "Access to an exclusive network of the world's most influential individuals — entrepreneurs, investors, and leaders." },
];

const TIERS = [
  {
    name: "Billionaire Card",
    price: "By Application",
    features: ["24/7 Concierge Service", "Priority Hotel Access", "Fine Dining Reservations", "Event Access", "Personal Shopping"],
    cta: "Apply Now",
    href: "/card",
    featured: false,
  },
  {
    name: "Golden Ticket",
    price: "Invitation Only",
    features: ["All Billionaire Card Benefits", "Unlimited Private Aviation", "Superyacht Fleet Access", "Private Island Portfolio", "Dedicated Family Office", "Elite Medical Access", "Impossible Experiences", "Global Elite Network"],
    cta: "Request an Invitation",
    href: "#invitation",
    featured: true,
  },
];

export default function GoldenTicket() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "", referredBy: "" });
  const [formError, setFormError] = useState("");

  const applyMutation = trpc.goldenTicket.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err: { message?: string }) => setFormError(err.message || "Something went wrong. Please try again."),
  });

  return (
    <div style={{ background: "#000" }}>
      {/* Custom hero with golden shimmer */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${LIFESTYLE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", transform: "scale(1.05)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

        {/* Animated gold particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "1px",
              background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
              opacity: 0.15,
              left: `${15 + i * 15}%`,
              top: "10%",
              bottom: "10%",
            }}
            animate={{ opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "80px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: "2rem" }}>
            <span className="bc-badge">The Golden Ticket</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            style={{ marginBottom: "2rem" }}
          >
            <div style={{
              fontFamily: FONT_HEADING,
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 1,
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.5rem",
            }}>
              Golden
            </div>
            <div style={{
              fontFamily: FONT_HEADING,
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 1,
              color: "#fff",
            }}>
              Ticket
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto 3rem", lineHeight: 1.7 }}
          >
            The world's most exclusive membership. By invitation only. For those who have achieved the extraordinary.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <a href="#invitation">
              <button className="btn-gold">Request an Invitation</button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Privileges */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Golden Ticket Privileges</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Beyond the <span style={{ color: GOLD }}>Extraordinary</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "500px", margin: "1.5rem auto 0", lineHeight: 1.7 }}>
                The Golden Ticket grants access to a world that exists beyond the reach of conventional wealth — where the impossible becomes possible.
              </p>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {PRIVILEGES.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.07}>
                <div className="bc-glass-card" style={{ padding: "3rem 2.5rem", height: "100%" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{p.icon}</div>
                  <h3 style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD, marginBottom: "1rem" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers comparison */}
      <section style={{ padding: "6rem 0 8rem", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Membership Tiers</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff" }}>
                Choose Your <span style={{ color: GOLD }}>Level</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)", maxWidth: "800px", margin: "0 auto" }}>
            {TIERS.map((tier, i) => (
              <FadeUp key={tier.name} delay={i * 0.1}>
                <div style={{
                  background: tier.featured ? "rgba(201,168,76,0.06)" : "#000",
                  padding: "3rem 2.5rem",
                  border: tier.featured ? `1px solid rgba(201,168,76,0.4)` : "none",
                  position: "relative",
                  height: "100%",
                }}>
                  {tier.featured && (
                    <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)" }}>
                      <span className="bc-badge" style={{ fontSize: "0.5625rem" }}>Most Exclusive</span>
                    </div>
                  )}
                  <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.5rem", color: tier.featured ? GOLD : "#fff", marginBottom: "0.5rem" }}>
                    {tier.name}
                  </div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>
                    {tier.price}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
                    {tier.features.map(f => (
                      <div key={f} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ color: GOLD, fontSize: "0.625rem", marginTop: "5px", flexShrink: 0 }}>◆</span>
                        <span style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={tier.href}>
                    <button className={tier.featured ? "btn-gold" : "btn-ghost-gold"} style={{ width: "100%" }}>
                      {tier.cta}
                    </button>
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation form */}
      <section id="invitation" style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Request an Invitation</span>
                <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1rem" }}>
                  Begin Your <span style={{ color: GOLD }}>Application</span>
                </h2>
                <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  The Golden Ticket is extended by invitation only. Submit your details and a member of our team will be in touch within 48 hours.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              {submitted ? (
                <div style={{ padding: "4rem", border: `1px solid rgba(201,168,76,0.3)`, textAlign: "center" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "3rem", color: GOLD, marginBottom: "1.5rem" }}>✓</div>
                  <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.5rem", color: GOLD, marginBottom: "1rem" }}>Application Received</h3>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                    Thank you for your interest in the Golden Ticket. A member of our team will contact you within 48 hours to discuss your application.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormError(""); applyMutation.mutate({ name: form.name, email: form.email, phone: form.phone || undefined, country: form.country || undefined, message: form.message || undefined, referredBy: form.referredBy || undefined }); }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Full Name</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Phone</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Email Address</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>Tell Us About Yourself</label>
                    <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Please share a brief introduction and why you are interested in the Golden Ticket..."
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none", resize: "vertical" }} />
                  </div>
                  {formError && <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "#e57373" }}>{formError}</p>}
                  <button type="submit" className="btn-gold" style={{ width: "100%", marginTop: "0.5rem" }} disabled={applyMutation.isPending}>
                    {applyMutation.isPending ? "Submitting…" : "Submit Application"}
                  </button>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
                    All applications are reviewed in strict confidence. Response within 48 hours.
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
