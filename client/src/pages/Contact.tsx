import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";

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

export default function Contact() {
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Contact" title="Get in" titleAccent="Touch" subtitle="Our team is available 24/7 to assist with any enquiry — from brokerage services to concierge requests and general information." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" height="60vh" />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "4rem" }}>
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Contact Information</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#fff", marginBottom: "2rem" }}>We Are Here for <span style={{ color: "#C9A84C" }}>You</span></h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#C9A84C", marginBottom: "0.5rem" }}>Email</div>
                  <a href="mailto:info@billionaireplc.com" style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>info@billionaireplc.com</a>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#C9A84C", marginBottom: "0.5rem" }}>Telephone</div>
                  <a href="tel:+442071831700" style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>+44 207 183 1700</a>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#C9A84C", marginBottom: "0.5rem" }}>Address</div>
                  <span style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.7)" }}>128 City Road, London EC1V 2NX, UK</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Send a Message</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input type="text" placeholder="Your Name" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none", width: "100%" }} />
                <input type="email" placeholder="Email Address" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none", width: "100%" }} />
                <textarea placeholder="Your Message" rows={5} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.875rem", color: "#fff", outline: "none", width: "100%", resize: "vertical" }} />
                <button className="btn-gold" style={{ width: "100%" }}>Send Message</button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
