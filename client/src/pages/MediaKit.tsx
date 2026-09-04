import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const MEDIA_KIT_URL = "/manus-storage/billionaire-media-kit_bca047b3.zip";
const RATE_CARD_URL = "/manus-storage/billionaire-usd-rate-card_604d9edf.md";

const formats = [
  ["Native Story", "$12,000 – $18,000", "$6,000 – $9,000"],
  ["Showreel / Branded Film", "$25,000 – $45,000", "$12,500 – $22,500"],
  ["Audio Underwrite", "$6,000 – $12,000", "$3,000 – $6,000"],
  ["Newsletter", "$4,000 – $8,000", "$2,000 – $4,000"],
  ["Social Post", "$2,500 – $5,000", "$1,250 – $2,500"],
  ["Event / Salon", "$15,000 – $40,000", "$7,500 – $20,000"],
];

const packages = [
  ["Empire Intro", "$11,000", "One Native Story, one social placement and a radio mention."],
  ["Screen & Page", "$27,500", "A Native Story, branded-film cutdown and television adjacency."],
  ["Full Collection", "$75,000", "Campaign magazine, television, radio and vertical placement."],
];

function DownloadButton({ href, children, gold = false }: { href: string; children: React.ReactNode; gold?: boolean }) {
  return (
    <a
      href={href}
      download
      className={gold ? "btn-gold" : "btn-ghost-gold"}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", textDecoration: "none" }}
    >
      <Download size={16} strokeWidth={1.8} />
      {children}
    </a>
  );
}

export default function MediaKit() {
  useSEO({
    title: "Media Kit & Rate Card | Billionaire Collection",
    description: "Download the Billionaire Collection media kit and USD Charter Partner rate card. Discover premium editorial, film, audio, social and event partnership opportunities.",
    keywords: "Billionaire Collection media kit, luxury media rate card, Charter Partner, UHNW advertising, luxury brand partnerships",
    url: "https://billionairecollection.com/media-kit",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Billionaire Collection Media Kit & Rate Card",
      url: "https://billionairecollection.com/media-kit",
      description: "Media partnership information and USD rate card for Billionaire Collection.",
      isPartOf: { "@type": "WebSite", name: "Billionaire Collection", url: "https://billionairecollection.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Billionaire Collection Charter Partner",
      url: "https://billionairecollection.com/media-kit",
      itemListElement: packages.map(([name, price]) => ({
        "@type": "Offer",
        name,
        price: price.replace(/[$,]/g, ""),
        priceCurrency: "USD",
        availability: "https://schema.org/LimitedAvailability",
      })),
    },
  ]);

  return (
    <div style={{ background: "#000", color: "#fff", overflow: "hidden" }}>
      <section style={{ minHeight: "min(780px, 92vh)", position: "relative", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 22%, rgba(201,168,76,0.16), transparent 29%), radial-gradient(circle at 14% 82%, rgba(201,168,76,0.08), transparent 27%)" }} />
        <div style={{ position: "absolute", inset: "1.25rem", border: "1px solid rgba(201,168,76,0.16)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "9rem", paddingBottom: "6rem" }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: "55rem" }}>
            <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.75rem" }}>Billionaire Media</span>
            <p style={{ fontFamily: FONT_UI, color: GOLD, textTransform: "uppercase", letterSpacing: "0.16em", fontSize: "0.73rem", margin: "0 0 1.3rem" }}>Brand Partnership Portfolio</p>
            <h1 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2.7rem, 6.3vw, 5.9rem)", lineHeight: 0.98, letterSpacing: "normal", margin: 0 }}>
              Speak to the world&apos;s most <span style={{ color: GOLD }}>discerning audience.</span>
            </h1>
            <p style={{ maxWidth: "42rem", margin: "2rem 0 0", fontFamily: FONT_UI, fontSize: "clamp(1rem, 1.55vw, 1.18rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.66)" }}>
              Explore integrated editorial, film, audio, social and experiential opportunities across the Billionaire Collection ecosystem. The Charter Partner offer provides a limited-time introduction to our partnership platform.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.5rem" }}>
              <DownloadButton href={MEDIA_KIT_URL} gold>Download Media Kit</DownloadButton>
              <DownloadButton href={RATE_CARD_URL}>Download USD Rate Card</DownloadButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "6.5rem 0 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.82fr)", gap: "clamp(2.5rem, 7vw, 8rem)", alignItems: "start" }}>
            <div>
              <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.25rem" }}>Charter Partner</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 1.08, margin: 0 }}>
                A private introduction to <span style={{ color: GOLD }}>our audience.</span>
              </h2>
            </div>
            <div style={{ borderLeft: "1px solid rgba(201,168,76,0.35)", paddingLeft: "1.7rem", fontFamily: FONT_UI, color: "rgba(255,255,255,0.64)", lineHeight: 1.8 }}>
              <p style={{ marginTop: 0 }}>For a limited period, Charter Partners receive <strong style={{ color: "#fff", fontWeight: 500 }}>50% off open rates</strong> across selected media and activation formats.</p>
              <p style={{ marginBottom: 0 }}>This rate structure is available through <strong style={{ color: GOLD, fontWeight: 500 }}>31 October 2026</strong>, subject to partnership scope and availability.</p>
            </div>
          </div>

          <div style={{ overflowX: "auto", marginTop: "4rem", borderTop: "1px solid rgba(201,168,76,0.28)", borderBottom: "1px solid rgba(201,168,76,0.28)" }}>
            <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse", fontFamily: FONT_UI }}>
              <thead>
                <tr style={{ textAlign: "left", color: GOLD, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  <th style={{ padding: "1.25rem 1rem", fontWeight: 600 }}>Format</th>
                  <th style={{ padding: "1.25rem 1rem", fontWeight: 600 }}>Open rate</th>
                  <th style={{ padding: "1.25rem 1rem", fontWeight: 600 }}>Charter Partner rate</th>
                </tr>
              </thead>
              <tbody>
                {formats.map(([format, openRate, partnerRate]) => (
                  <tr key={format} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <td style={{ padding: "1.2rem 1rem", color: "#fff", fontWeight: 500 }}>{format}</td>
                    <td style={{ padding: "1.2rem 1rem", color: "rgba(255,255,255,0.48)" }}>{openRate}</td>
                    <td style={{ padding: "1.2rem 1rem", color: GOLD }}>{partnerRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: "7rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "2rem", flexWrap: "wrap", marginBottom: "2.25rem" }}>
            <div>
              <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.25rem" }}>Starter Packages</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.4rem)", margin: 0 }}>Start with a <span style={{ color: GOLD }}>signature placement.</span></h2>
            </div>
            <a href="mailto:info@billionaireplc.com?subject=Charter%20Partner%20enquiry" style={{ color: GOLD, textDecoration: "none", fontFamily: FONT_UI, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              Discuss your partnership <ExternalLink size={15} />
            </a>
          </div>
          <div className="media-kit-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: "rgba(201,168,76,0.2)" }}>
            {packages.map(([name, price, details]) => (
              <article key={name} style={{ background: "#050505", padding: "clamp(1.65rem, 3.4vw, 3rem)", minHeight: "250px", display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.48)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Charter Partner</p>
                <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, color: "#fff", fontSize: "2rem", margin: "1rem 0 0" }}>{name}</h3>
                <p style={{ fontFamily: FONT_UI, fontSize: "1.35rem", color: GOLD, margin: "0.75rem 0 1.25rem" }}>{price}</p>
                <p style={{ margin: "auto 0 0", fontFamily: FONT_UI, color: "rgba(255,255,255,0.58)", lineHeight: 1.7, fontSize: "0.9rem" }}>{details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(201,168,76,0.18)", padding: "5.5rem 0", textAlign: "center", background: "linear-gradient(180deg, #000 0%, #090806 100%)" }}>
        <div className="container" style={{ maxWidth: "51rem" }}>
          <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.3rem" }}>Private Enquiries</span>
          <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.5rem)", margin: 0 }}>Build a presence with <span style={{ color: GOLD }}>purpose.</span></h2>
          <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "1.5rem auto 2.25rem", maxWidth: "40rem" }}>For bespoke campaigns, editorial concepts and partnership availability, contact the Billionaire Collection team directly.</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.4rem 2.25rem", fontFamily: FONT_UI, fontSize: "0.9rem" }}>
            <a href="mailto:info@billionaireplc.com" style={{ color: GOLD, textDecoration: "none" }}>info@billionaireplc.com</a>
            <a href="tel:+442071831700" style={{ color: "rgba(255,255,255,0.72)", textDecoration: "none" }}>+44 20 7183 1700</a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .media-kit-packages { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .media-kit-packages + * { min-width: 0; }
        }
        @media (max-width: 820px) {
          .container > div[style*="minmax(280px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
