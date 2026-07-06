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

export default function Privacy() {
  useSEO({
    title: "Privacy Policy | Billionaire Collection",
    description: "Read the Billionaire Collection privacy policy. We are committed to protecting your personal data in accordance with GDPR and the highest standards of information security.",
    keywords: "privacy policy, data protection, GDPR, personal data, Billionaire Collection privacy, information security",
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy — Billionaire Collection",
    "description": "Billionaire Collection privacy policy — data protection, GDPR compliance, and information security standards.",
    "url": "https://billionairecollection.com/privacy",
    "publisher": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Legal" title="Privacy" titleAccent="Policy" subtitle="How Billionaire Collection collects, uses, and protects your personal information." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" height="50vh" />
      <section style={{ padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <FadeUp>
            <div style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "1.5rem" }}>Privacy Policy</h2>
              <p style={{ marginBottom: "1.5rem" }}>Last updated: March 2026</p>
              <p style={{ marginBottom: "1.5rem" }}>Billionaire Collection ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
              <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", margin: "2rem 0 1rem" }}>Information We Collect</h3>
              <p style={{ marginBottom: "1.5rem" }}>We collect information you provide directly to us, such as when you create an account, submit a form, or contact us. This may include your name, email address, phone number, and any other information you choose to provide.</p>
              <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", margin: "2rem 0 1rem" }}>How We Use Your Information</h3>
              <p style={{ marginBottom: "1.5rem" }}>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.</p>
              <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", margin: "2rem 0 1rem" }}>Contact Us</h3>
              <p>If you have questions about this Privacy Policy, please contact us at info@billionaireplc.com or +44 207 183 1700.</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
