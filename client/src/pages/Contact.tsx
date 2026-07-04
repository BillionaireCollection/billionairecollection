import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PageHero from "@/components/PageHero";
import { trpc } from "@/lib/trpc";

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

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(201,168,76,0.2)",
  padding: "14px 16px",
  fontFamily: FONT_UI,
  fontSize: "0.875rem",
  color: "#fff",
  outline: "none",
  width: "100%",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: (err) => setError(err.message || "Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    submitMutation.mutate({ ...form, division: "general" });
  };

  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Contact" title="Get in" titleAccent="Touch" subtitle="Our team is available 24/7 to assist with any enquiry — from brokerage services to concierge requests and general information." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" height="60vh" />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "4rem" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Contact Information</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#fff", marginBottom: "2rem" }}>We Are Here for <span style={{ color: GOLD }}>You</span></h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, marginBottom: "0.5rem" }}>Email</div>
                  <a href="mailto:info@billionaireplc.com" style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>info@billionaireplc.com</a>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, marginBottom: "0.5rem" }}>Telephone</div>
                  <a href="tel:+442071831700" style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>+44 207 183 1700</a>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD, marginBottom: "0.5rem" }}>Address</div>
                  <span style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)" }}>128 City Road, London EC1V 2NX, UK</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Send a Message</span>
              {submitted ? (
                <div style={{ padding: "2rem", border: `1px solid rgba(201,168,76,0.3)`, textAlign: "center" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "1.5rem", color: GOLD, marginBottom: "1rem" }}>Message Received</div>
                  <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Thank you for your enquiry. A member of our team will be in touch within 24 hours.</p>
                  <button className="btn-ghost-gold" style={{ marginTop: "1.5rem" }} onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <input type="text" placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} required />
                  <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} required />
                  <input type="tel" placeholder="Phone Number (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="Subject *" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={inputStyle} required />
                  <textarea placeholder="Your Message *" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} required />
                  {error && <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "#e57373" }}>{error}</p>}
                  <button type="submit" className="btn-gold" style={{ width: "100%" }} disabled={submitMutation.isPending}>
                    {submitMutation.isPending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
