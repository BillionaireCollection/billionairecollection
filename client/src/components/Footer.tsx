/* ============================================================
   BILLIONAIRE COLLECTION — Footer
   Neo-Deco Maximalism: Gold-tinted dividers, Raleway uppercase
   column headings, BC ecosystem link in copyright bar.
   ============================================================ */

import { Link } from "wouter";

const GOLD = "#C9A84C";
const FONT_UI = "'Raleway', sans-serif";
const FONT_HEADING = "'Playfair Display', Georgia, serif";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://uk.linkedin.com/in/lawrencecolbert" },
  { label: "X / Twitter", href: "https://mobile.twitter.com/billionmagazine" },
  { label: "Instagram", href: "https://www.instagram.com/billionairemagazine" },
  { label: "Facebook", href: "https://m.facebook.com/BillionaireMagazine/" },
  { label: "YouTube", href: "https://www.youtube.com/c/billionairemagazine" },
  { label: "TikTok", href: "https://www.tiktok.com/@billionairemagazine" },
];

const FOOTER_COLS = [
  {
    heading: "Brokerage",
    links: [
      { label: "Estates", href: "/estates" },
      { label: "Superyachts", href: "/boat" },
      { label: "Private Aviation", href: "/air" },
      { label: "Automotive", href: "/car" },
      { label: "Fine Art", href: "/art" },
      { label: "Crypto & Digital Assets", href: "/crypto" },
    ],
  },
  {
    heading: "Divisions",
    links: [
      { label: "Television", href: "/television" },
      { label: "Magazine", href: "/magazine" },
      { label: "Radio & Podcast", href: "/radio" },
      { label: "Billionaire University", href: "/technology" },
      { label: "Billionaire Digital", href: "/technology" },
      { label: "Billionaire Vitality", href: "/technology" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Funding & Investments", href: "/funding" },
      { label: "Golf", href: "/golf" },
      { label: "Travel", href: "/travel" },
      { label: "Billionaire Card", href: "/card" },
      { label: "24/7 Concierge", href: "/card-concierge" },
      { label: "Marketplace", href: "/marketplace" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Champagne", href: "/champagne" },
      { label: "Vodka", href: "/vodka" },
      { label: "Cigars", href: "/cigar" },
      { label: "Oud Fragrances", href: "/oud" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Billionaire News", href: "/news" },
      { label: "The Golden Ticket", href: "/golden-ticket" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: `1px solid rgba(201,168,76,0.15)` }}>
      {/* Newsletter strip */}
      <div style={{ background: "rgba(201,168,76,0.04)", borderBottom: `1px solid rgba(201,168,76,0.12)`, padding: "3rem 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <div>
            <div className="bc-badge" style={{ marginBottom: "0.75rem" }}>Stay Informed</div>
            <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#fff", margin: 0 }}>
              The Billionaire Daily Brief
            </h3>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", marginTop: "0.5rem" }}>
              Curated intelligence for ultra-high-net-worth individuals.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0", maxWidth: "460px", width: "100%" }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: `1px solid rgba(201,168,76,0.25)`,
                borderRight: "none",
                padding: "12px 16px",
                fontFamily: FONT_UI,
                fontSize: "0.875rem",
                color: "#fff",
                outline: "none",
              }}
            />
            <button className="btn-gold" style={{ minWidth: "auto", padding: "12px 20px", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container" style={{ padding: "4rem 1.5rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "3rem" }}>
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.9375rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#fff" }}>
                Billionaire Collection
              </div>
              <div style={{ fontFamily: FONT_UI, fontWeight: 400, fontSize: "0.5rem", textTransform: "uppercase", letterSpacing: "0.15em", color: `rgba(201,168,76,0.5)`, marginTop: "4px" }}>
                A Billionaire Collection Company
              </div>
            </div>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              The world's premier luxury ecosystem for ultra-high-net-worth individuals.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <a href="mailto:info@billionaireplc.com" style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                info@billionaireplc.com
              </a>
              <a href="tel:+442071831700" style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                +44 207 183 1700
              </a>
              <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                128 City Road, London EC1V 2NX
              </span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: GOLD, marginBottom: "1.25rem" }}>
                {col.heading}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((link) => (
                  <Link key={link.href + link.label} href={link.href}>
                    <span style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid rgba(201,168,76,0.1)`, display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid rgba(201,168,76,0.08)`, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Billionaire Collection. All rights reserved.
          </span>
          <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
            Part of the{" "}
            <a href="https://billionairecollection.com" style={{ color: `rgba(201,168,76,0.6)`, textDecoration: "none" }}>
              Billionaire Collection ecosystem
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
