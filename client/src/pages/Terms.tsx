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

export default function Terms() {
  useSEO({
    title: "Terms & Conditions | Billionaire Collection",
    description: "Read the Billionaire Collection terms and conditions governing your use of our website, services, brokerage, and membership products. Please read carefully before using our services.",
    keywords: "terms and conditions, legal terms, website terms, Billionaire Collection legal, service terms, membership terms",
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms & Conditions — Billionaire Collection",
    "description": "Terms and conditions governing use of the Billionaire Collection website, services, brokerage, and membership products.",
    "url": "https://billionairecollection.com/terms",
    "publisher": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  });
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Legal" title="Terms of" titleAccent="Service" subtitle="The terms and conditions governing your use of Billionaire Collection services." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp" height="50vh" />
      <section style={{ padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <FadeUp>
            <div style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "1.5rem" }}>Terms of Service</h2>
              <p style={{ marginBottom: "1.5rem" }}>Last updated: March 2026</p>
              <p style={{ marginBottom: "1.5rem" }}>By accessing or using the Billionaire Collection website and services, you agree to be bound by these Terms of Service. Please read them carefully before using our services.</p>
              <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", margin: "2rem 0 1rem" }}>Use of Services</h3>
              <p style={{ marginBottom: "1.5rem" }}>You may use our services only as permitted by law and these terms. You may not use our services to engage in any illegal activity or to violate the rights of others.</p>
              <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", margin: "2rem 0 1rem" }}>Intellectual Property</h3>
              <p style={{ marginBottom: "1.5rem" }}>The Billionaire Collection website and its original content, features, and functionality are owned by Billionaire Collection and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
              <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", margin: "2rem 0 1rem" }}>Contact Us</h3>
              <p>If you have questions about these Terms, please contact us at info@billionaireplc.com or +44 207 183 1700.</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
