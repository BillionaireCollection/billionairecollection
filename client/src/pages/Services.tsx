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

const SERVICES_FULL = [
  {
    category: "Wealth & Finance",
    icon: "◆",
    items: [
      { title: "Family Office Structuring", desc: "Comprehensive family office setup and management, including governance frameworks, investment policy statements, and multi-generational wealth transfer strategies tailored for UHNW families." },
      { title: "Wealth Preservation", desc: "Strategic asset allocation across alternative investments, private equity, real assets, and global markets. Our advisors specialise in preserving and growing capital across generations." },
      { title: "Billionaire Funding", desc: "Access to exclusive investment opportunities, private equity, and funding solutions for ultra-high-net-worth individuals and family offices through Billionaire Funding." },
    ],
  },
  {
    category: "Lifestyle Management",
    icon: "◆",
    items: [
      { title: "24/7 Billionaire Card Concierge", desc: "The Billionaire Card provides round-the-clock access to a dedicated personal concierge team managing every aspect of your life — from Michelin-starred reservations to last-minute private jet arrangements." },
      { title: "Bespoke Travel", desc: "Private island buyouts, expedition yachts, exclusive resort access, and curated itineraries through Billionaire Travel — designed for the world's most discerning travellers." },
      { title: "Golf & Sport Access", desc: "Private access to the world's most exclusive golf courses, tournaments, and bespoke golf travel experiences through Billionaire Golf." },
    ],
  },
  {
    category: "Private Aviation",
    icon: "◆",
    items: [
      { title: "Charter & On-Demand Flights", desc: "Immediate access to a global fleet of light jets, midsize jets, heavy jets, and ultra-long-range aircraft through Billionaire Air. Available 24/7 with as little as 4 hours' notice." },
      { title: "Aircraft Acquisition & Sales", desc: "Expert guidance on the acquisition, sale, and trade of private aircraft. Our aviation specialists negotiate on your behalf to secure the finest aircraft at optimal terms." },
      { title: "Aircraft Management", desc: "Full aircraft management services including crew recruitment, maintenance scheduling, regulatory compliance, and charter revenue generation when not in personal use." },
    ],
  },
  {
    category: "Ultra-Prime Real Estate",
    icon: "◆",
    items: [
      { title: "Off-Market Acquisitions", desc: "Exclusive access to off-market properties in London, Monaco, New York, Dubai, Malibu, and the world's most sought-after locations through Billionaire Estates and The Off Market Sale." },
      { title: "Portfolio Management", desc: "Strategic real estate portfolio construction, management, and disposition services for UHNW investors seeking capital preservation and appreciation through prime property." },
      { title: "OffMarket Hotel Access", desc: "Exclusive access to private hotel buyouts, off-market hospitality assets, and bespoke accommodation arrangements through OffMarket Hotel." },
    ],
  },
  {
    category: "Superyacht Services",
    icon: "◆",
    items: [
      { title: "Charter Brokerage", desc: "Access to the world's finest superyachts and mega-yachts for charter through Billionaire Boat — from Mediterranean summer seasons to Caribbean winter itineraries." },
      { title: "Yacht Acquisition & Sales", desc: "Expert brokerage for the purchase and sale of superyachts, including new build project management, sea trials, and flag state registration." },
      { title: "Yacht Management", desc: "Comprehensive yacht management including crew placement, maintenance, provisioning, insurance, and regulatory compliance for privately owned vessels." },
    ],
  },
  {
    category: "Education & Legacy",
    icon: "◆",
    items: [
      { title: "Billionaire University", desc: "Transformational education programmes for entrepreneurs, executives, and next-generation leaders — covering wealth creation, business strategy, and personal mastery." },
      { title: "Billionaire Counsel", desc: "Elite legal and advisory services for UHNW individuals and family offices, covering corporate structuring, wealth planning, dispute resolution, and succession planning." },
      { title: "Mentorship & Coaching", desc: "Access to world-class mentors and coaches through The Impossible Coach and Billionaire Tutor — personalised guidance for extraordinary achievement." },
    ],
  },
];

export default function Services() {
  useSEO({
    title: "UHNW Services | Billionaire Services for Ultra High Net Worth Individuals",
    description: "Billionaire Collection delivers the world's most comprehensive suite of ultra high net worth services — private aviation, ultra-prime real estate, superyacht brokerage, family office structuring, 24/7 concierge, and wealth preservation for UHNW individuals and family offices.",
    keywords: "UHNW services, ultra high net worth services, billionaire services, billionaire concierge services, private aviation UHNW, ultra prime real estate, superyacht charter, family office services, wealth preservation, billionaire collection services, billionaire card, billionaire funding, billionaire golf, billionaire travel",
    url: "https://billionairecollection.com/services",
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
        "name": "Billionaire Services",
        "item": "https://billionairecollection.com/services"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Billionaire Services",
    "description": "Billionaire Services is the lifestyle services division of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/services",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  return (
    <div style={{ background: "#000" }}>
      <PageHero
        badge="UHNW Services"
        title="Billionaire Services for"
        titleAccent="Ultra High Net Worth Individuals"
        subtitle="Billionaire Collection delivers the world's most comprehensive suite of ultra high net worth services — from private aviation and ultra-prime real estate to family office structuring and 24/7 concierge. Every service is bespoke, every interaction is discreet."
        image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
        cta={{ label: "Billionaire Card", href: "/card" }}
        ctaSecondary={{ label: "Concierge", href: "/card-concierge" }}
      />

      {/* Full Services Grid */}
      <section style={{ padding: "8rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>Our Services</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1rem" }}>
                The Complete <span style={{ color: GOLD }}>UHNW Service Suite</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
                Every service we offer is designed exclusively for ultra-high-net-worth individuals, family offices, and visionary leaders who demand the absolute best — with complete discretion and unrivalled personal attention.
              </p>
            </div>
          </FadeUp>

          {SERVICES_FULL.map((group, gi) => (
            <FadeUp key={group.category} delay={gi * 0.05}>
              <div style={{ marginBottom: "5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                  <span style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: GOLD }}>{group.icon} {group.category}</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.15)" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
                  {group.items.map((item) => (
                    <div key={item.title} className="bc-glass-card" style={{ padding: "2.5rem" }}>
                      <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.25rem", color: "#fff", marginBottom: "0.875rem" }}>{item.title}</h3>
                      <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "6rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(201,168,76,0.1)" }}>
            {[
              { label: "40+", sub: "Sub-brands in the ecosystem" },
              { label: "40+", sub: "Countries served globally" },
              { label: "20+", sub: "Years of luxury expertise" },
              { label: "24/7", sub: "Concierge availability" },
            ].map((stat) => (
              <div key={stat.label} className="bc-glass-card" style={{ padding: "3rem", textAlign: "center" }}>
                <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "3rem", color: GOLD, marginBottom: "0.5rem" }}>{stat.label}</div>
                <div style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 0", textAlign: "center" }}>
        <div className="container">
          <FadeUp>
            <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Begin Your Journey</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.5rem" }}>
              Access the World's Most <span style={{ color: GOLD }}>Exclusive Services</span>
            </h2>
            <p style={{ fontFamily: FONT_UI, fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.45)", maxWidth: "520px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
              Every engagement begins with a private consultation. Our team will design a bespoke service programme tailored to your exact requirements and aspirations.
            </p>
            <Link href="/concierge">
              <button className="btn-gold" style={{ marginRight: "1rem" }}>Request a Consultation</button>
            </Link>
            <Link href="/ecosystem">
              <button className="btn-ghost-gold">Explore the Ecosystem</button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
