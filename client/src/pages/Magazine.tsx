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

export default function Magazine() {
  useSEO({
    title: "Billionaire Collection Magazine — The Luxury Authority | A Billionaire Collection Publication",
    description: "Billionaire Collection Magazine is the flagship publication of Billionaire Collection, the parent company of the world's premier luxury ecosystem. The definitive magazine for ultra-high-net-worth individuals — covering real estate, yachts, aviation, art, and the global luxury market since 2005.",
    keywords: "Billionaire Collection Magazine, luxury magazine, UHNW publication, billionaire magazine London, luxury lifestyle editorial, Billionaire Collection publication, ultra-luxury magazine, luxury media group",
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
        "name": "Billionaire Collection Magazine",
        "item": "https://billionairecollection.com/magazine"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Periodical",
    "name": "Billionaire Collection Magazine",
    "description": "The flagship publication of Billionaire Collection, the parent company of the world's premier luxury ecosystem. The definitive luxury magazine since 2005.",
    "url": "https://billionairecollection.com/magazine",
    "publisher": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  return (
    <div style={{ background: "#000" }}>
      <PageHero badge="Billionaire Magazine" title="The Definitive" titleAccent="Luxury Publication" subtitle="The world's most prestigious print and digital magazine for ultra-high-net-worth individuals — featuring in-depth profiles, market intelligence, and the finest luxury editorial." image="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp" cta={{ label: "Subscribe", href: "/news" }} />
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>The Magazine</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "2rem" }}>
              Intelligence for the <span style={{ color: GOLD }}>Global Elite</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "2rem" }}>
              Billionaire Magazine is the definitive publication for those who have achieved extraordinary success. Each issue features exclusive interviews with world leaders, billionaires, and cultural icons; in-depth analysis of global wealth trends; and the finest luxury editorial spanning fashion, art, travel, and real estate.
            </p>
            <Link href="/news"><button className="btn-ghost-gold">Read Latest News</button></Link>
          </FadeUp>
        </div>
      </section>

      <section
        id="print-edition"
        style={{
          padding: "0 0 8rem",
          background: "linear-gradient(180deg, #000 0%, #080705 58%, #000 100%)",
        }}
      >
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <FadeUp>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>The Print Edition</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", marginBottom: "1.5rem" }}>
                A Tangible Expression of <span style={{ color: GOLD }}>Exceptional Living</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "590px", margin: 0 }}>
                Crafted for the places where meaningful decisions, journeys and conversations begin, the Billionaire Collection print edition brings our editorial world into the private spaces that define modern luxury. From the salon to the sky and the sea, it is a considered companion to the global lifestyle it documents.
              </p>
            </FadeUp>

            <FadeUp delay={0.12}>
              <figure style={{ margin: 0, position: "relative", overflow: "hidden", border: "1px solid rgba(201,168,76,0.26)", background: "#090909" }}>
                <div style={{ aspectRatio: "3 / 2", overflow: "hidden" }}>
                  <img
                    src="/billionaire-magazine-print-aviation.jpg"
                    alt="An open Billionaire Collection print edition displayed in a private aviation lounge"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                  />
                </div>
                <figcaption style={{ position: "absolute", right: "1rem", bottom: "1rem", left: "1rem", padding: "0.85rem 1rem", background: "rgba(0,0,0,0.72)", borderLeft: `2px solid ${GOLD}`, color: "rgba(255,255,255,0.78)", fontFamily: FONT_UI, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  The journey continues
                </figcaption>
              </figure>
            </FadeUp>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FadeUp delay={0.08}>
              <figure style={{ margin: 0, position: "relative", overflow: "hidden", border: "1px solid rgba(201,168,76,0.18)", background: "#090909" }}>
                <div style={{ aspectRatio: "3 / 2", overflow: "hidden" }}>
                  <img
                    src="/billionaire-magazine-print-residence.jpg"
                    alt="A closed Billionaire Collection print edition on a marble table in a luxury residence"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                  />
                </div>
                <figcaption style={{ padding: "1rem 1.15rem", color: "rgba(255,255,255,0.58)", fontFamily: FONT_UI, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  At home with the extraordinary
                </figcaption>
              </figure>
            </FadeUp>

            <FadeUp delay={0.16}>
              <figure style={{ margin: 0, position: "relative", overflow: "hidden", border: "1px solid rgba(201,168,76,0.18)", background: "#090909" }}>
                <div style={{ aspectRatio: "3 / 2", overflow: "hidden" }}>
                  <img
                    src="/billionaire-magazine-print-yacht.jpg"
                    alt="A Billionaire Collection print edition displayed in a superyacht salon"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                  />
                </div>
                <figcaption style={{ padding: "1rem 1.15rem", color: "rgba(255,255,255,0.58)", fontFamily: FONT_UI, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  On the water, in the moment
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
