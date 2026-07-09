/* ============================================================
   BILLIONAIRE COLLECTION — Footer
   Neo-Deco Maximalism: Gold-tinted dividers, Raleway uppercase
   column headings, BC ecosystem link in copyright bar.
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState("");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { setSubscribed(true); setEmail(""); setSubError(""); },
    onError: (err) => setSubError(err.message || "Something went wrong. Please try again."),
  });

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
          {subscribed ? (
            <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: GOLD, maxWidth: "460px", width: "100%" }}>
              ✓ You are now subscribed to the Billionaire Daily Brief.
            </p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubError(""); if (email) subscribeMutation.mutate({ email }); }}
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "460px", width: "100%" }}
            >
              <div style={{ display: "flex", gap: "0" }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ minWidth: "auto", padding: "12px 20px", fontSize: "0.75rem", whiteSpace: "nowrap" }}
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending ? "…" : "Subscribe"}
                </button>
              </div>
              {subError && <p style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "#e57373", margin: 0 }}>{subError}</p>}
            </form>
          )}
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

        {/* Ecosystem brands strip */}
        <div style={{ marginTop: "3rem", paddingTop: "2.5rem", borderTop: `1px solid rgba(201,168,76,0.1)` }}>
          <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GOLD, marginBottom: "1.5rem" }}>
            The Ecosystem
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem" }}>
            {[
              { name: "Billionaire University", href: "https://billionaireuniversity.com" },
              { name: "Best Book on Sales", href: "https://bestbookonsales.com" },
              { name: "The Game of Sales", href: "https://thegameofsales.com" },
              { name: "Billionaire Tutor", href: "https://billionairetutor.com" },
              { name: "The Impossible Coach", href: "https://theimpossiblecoach.com" },
              { name: "Ghetto Coach", href: "https://ghettocoach.com" },
              { name: "Ghetto Ghost", href: "https://ghettoghost.com" },
              { name: "Billionaire Counsel", href: "https://billionairecounsel.com" },
              { name: "Billionaire Vitality", href: "https://billionairevitality.com" },
              { name: "Billionaire Peptide", href: "https://billionairepeptide.com" },
              { name: "Cognition Water", href: "https://cognitionwater.com" },
              { name: "Billionaire Vodka", href: "https://billionairevodka.com" },
              { name: "Billionaire Champagne", href: "https://billionairechampagne.com" },
              { name: "Billionaire Oud", href: "https://billionaireoud.com" },
              { name: "Billionaire Cigar", href: "https://billionairecigar.com" },
              { name: "Billionaire Chrono", href: "https://billionairechrono.com" },
              { name: "Billionaire Art", href: "https://billionaireart.com" },
              { name: "Billionaire Air", href: "https://billionaireair.com" },
              { name: "Billionaire Boat", href: "https://billionaireboat.com" },
              { name: "Billionaire Car", href: "https://billionairecar.com" },
              { name: "Billionaire F1", href: "https://billionairef1.com" },
              { name: "Billionaire Golf", href: "https://billionairegolf.com" },
              { name: "Billionaire Estates", href: "https://billionaireestates.com" },
              { name: "OffMarket Hotel", href: "https://offmarkethotel.com" },
              { name: "The Off Market Sale", href: "https://theoffmarketsale.com" },
              { name: "Billionaire Television", href: "https://billionairetelevision.com" },
              { name: "Billionaire Radio", href: "https://billionaireradio.com" },
              { name: "Billionaire Collection Magazine", href: "https://billionairecollectionmagazine.com" },
              { name: "Millionaire Magazine", href: "https://themillionairemagazine.com" },
              { name: "Billionaire Digital", href: "https://billionairedigital.com" },
              { name: "Billionaire Media Group", href: "https://billionairemediagroup.com" },
              { name: "Billionaire Forex", href: "https://billionaireforex.com" },
              { name: "Billionaire Funding", href: "https://billionairefunding.com" },
              { name: "Billionaire Classifieds", href: "https://billionaireclassifieds.com" },
              { name: "Billionaire Store", href: "https://thebillionairestore.com" },
              { name: "Billionaire Giving", href: "https://billionairegiving.com" },
              { name: "Smarter Mama", href: "https://smartmama.com" },
            ].map((brand) => (
              <a
                key={brand.href}
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = GOLD; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
              >
                {brand.name}
              </a>
            ))}
          </div>
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
