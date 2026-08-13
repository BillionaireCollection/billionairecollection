/* ============================================================
   BILLIONAIRE COLLECTION — Navbar
   Neo-Deco Maximalism: Thin gold thread at top, mega-menu with
   staggered reveals, Raleway uppercase navigation.
   Mobile: hamburger toggle via JS (Tailwind responsive classes
   are NOT used here — Tailwind 4 does not generate them unless
   explicitly safelisted; we use useIsDesktop instead).
   ============================================================ */

import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#C9A84C";
const FONT_UI = "'Raleway', sans-serif";
const DESKTOP_BREAKPOINT = 1024;

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Divisions",
    children: [
      { label: "Media", href: "/media", description: "Television, Magazine, Radio & News" },
      { label: "News", href: "/news-brand", description: "UHNW intelligence & market insights" },
      { label: "Technology", href: "/university", description: "University, Digital & Vitality" },
      { label: "Vitality", href: "/vitality", description: "Wellness, longevity & biohacking" },
      { label: "Services", href: "/services", description: "Funding, Golf, Travel & Card" },
      { label: "Counsel", href: "/counsel", description: "Ultra-premium legal advisory" },
      { label: "Billionaire Tutor", href: "/billionaire-tutor", description: "Elite self-made wealth coaches" },
      { label: "Founder & CEO", href: "/founder", description: "Lawrence Colbert — vision & legacy" },
    ],
  },
  {
    label: "Brokerage",
    children: [
      { label: "Estates", href: "/estates", description: "Ultra-prime real estate worldwide" },
      { label: "Yacht", href: "/boat", description: "Superyachts & private vessels" },
      { label: "Aviation", href: "/air", description: "Private jets & charter" },
      { label: "Automotive", href: "/car", description: "Rare & exotic automobiles" },
      { label: "Art", href: "/art", description: "Fine art & collectibles" },
      { label: "Chrono", href: "/chrono", description: "Ultra-rare timepieces $1M+" },
    ],
  },
  {
    label: "Products",
    children: [
      { label: "Champagne", href: "/champagne", description: "Ultra-premium cuvées" },
      { label: "Vodka", href: "/vodka", description: "Limited-edition spirits" },
      { label: "Cigars", href: "/cigar", description: "Rare hand-rolled cigars" },
      { label: "Oud", href: "/oud", description: "Bespoke Arabian fragrances" },
    ],
  },
  { label: "Store", href: "/marketplace" },
  { label: "News", href: "/news" },
  { label: "Concierge", href: "/card-concierge" },
  { label: "Free Insights", href: "/billionaire-wisdom" },
  { label: "✦ Golden Ticket", href: "/golden-ticket" },
  { label: "✦ Membership", href: "/membership/apply" },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  );
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [location] = useLocation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  // Live date — computed once per mount
  const todayLabel = useMemo(() => new Date().toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  }), []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(0,0,0,0.96)" : "transparent",
          borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Date bar */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "4px 0",
          borderBottom: `1px solid rgba(201,168,76,0.07)`,
          background: scrolled ? "rgba(0,0,0,0.96)" : "rgba(0,0,0,0.35)",
        }}>
          <div className="container" style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{
              fontFamily: FONT_UI,
              fontSize: "0.5rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: GOLD,
              opacity: 0.9,
            }}>
              {todayLabel}
            </span>
          </div>
        </div>

        {/* Top gold accent line */}
        <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: 0.6 }} />

        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Wordmark */}
          <Link href="/" style={{ marginRight: "1.5rem", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: "0.45em", cursor: "pointer" }}>
              <span style={{
                fontFamily: FONT_UI,
                fontWeight: 600,
                fontSize: "0.9375rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#fff",
                whiteSpace: "nowrap",
              }}>
                Billionaire
              </span>
              <span style={{
                fontFamily: FONT_UI,
                fontWeight: 600,
                fontSize: "0.9375rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: GOLD,
                whiteSpace: "nowrap",
              }}>
                Collection
              </span>
            </div>
          </Link>

          {/* Desktop Nav — only rendered on large screens */}
          {isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => item.children ? setActiveMenu(item.label) : setActiveMenu(null)}
                >
                  {item.href ? (
                    <Link href={item.href}>
                      <span style={{
                        fontFamily: FONT_UI,
                        fontWeight: item.href?.includes('golden') ? 600 : 400,
                        fontSize: "0.875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: item.href?.includes('golden') ? GOLD : (location === item.href ? GOLD : "rgba(255,255,255,0.7)"),
                        cursor: "pointer",
                        transition: "color 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                        onMouseEnter={(e) => { if (!item.href?.includes('golden') && location !== item.href) (e.target as HTMLElement).style.color = "#fff"; }}
                        onMouseLeave={(e) => { if (!item.href?.includes('golden') && location !== item.href) (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <span style={{
                      fontFamily: FONT_UI,
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: activeMenu === item.label ? GOLD : "rgba(255,255,255,0.7)",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                      {item.label}
                      <ChevronDown size={12} style={{ transition: "transform 0.2s", transform: activeMenu === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </span>
                  )}
                </div>
              ))}
              <Link href="/card-concierge">
                <button className="btn-gold" style={{ minWidth: "auto", padding: "10px 20px", fontSize: "0.75rem" }}>
                  Billionaire Card
                </button>
              </Link>
              <Link href="/membership/apply">
                <button style={{ minWidth: "auto", padding: "10px 20px", fontSize: "0.75rem", fontFamily: "'Raleway', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", background: "transparent", border: `1px solid rgba(201,168,76,0.5)`, color: "#C9A84C", cursor: "pointer", transition: "all 0.2s" }}>
                  Private Membership
                </button>
              </Link>
            </div>
          )}

          {/* Mobile: Store shortcut + hamburger */}
          {!isDesktop && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: GOLD, background: "none", border: "none", padding: "8px", cursor: "pointer" }}
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <AnimatePresence>
          {isDesktop && activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "rgba(0,0,0,0.97)",
                borderBottom: `1px solid rgba(201,168,76,0.2)`,
                backdropFilter: "blur(20px)",
              }}
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                  {NAV_ITEMS.find(i => i.label === activeMenu)?.children?.map((child, idx) => (
                    <motion.div
                      key={child.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                    >
                      <Link href={child.href}>
                        <div style={{ cursor: "pointer", padding: "12px 0", borderBottom: "1px solid rgba(201,168,76,0.08)", transition: "border-color 0.2s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.08)"; }}
                        >
                          <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", marginBottom: "4px" }}>
                            {child.label}
                          </div>
                          {child.description && (
                            <div style={{ fontFamily: FONT_UI, fontWeight: 400, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                              {child.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {!isDesktop && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(300px, 100vw)",
              background: "#000",
              zIndex: 1100,
              borderLeft: `1px solid rgba(201,168,76,0.18)`,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 1.5rem 1rem", borderBottom: `1px solid rgba(201,168,76,0.12)`, flexShrink: 0 }}>
              <span style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", color: GOLD }}>Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>

              {/* Brokerage — first, most premium */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.22em", color: GOLD, marginBottom: "0.75rem", opacity: 0.9 }}>Brokerage</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                  {NAV_ITEMS.find(i => i.label === "Brokerage")?.children?.map((child) => (
                    <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}>
                      <div style={{ fontFamily: FONT_UI, fontWeight: 500, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", padding: "9px 10px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.08)", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.04)"}
                      >
                        {child.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Thin divider */}
              <div style={{ height: "1px", background: "rgba(201,168,76,0.1)", marginBottom: "1.5rem" }} />

              {/* Divisions */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.22em", color: GOLD, marginBottom: "0.75rem", opacity: 0.9 }}>Divisions</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  {NAV_ITEMS.find(i => i.label === "Divisions")?.children?.map((child) => (
                    <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}>
                      <div style={{ fontFamily: FONT_UI, fontWeight: 500, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", padding: "9px 0", borderBottom: "1px solid rgba(201,168,76,0.06)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"}
                      >
                        {child.label}
                        <span style={{ color: GOLD, opacity: 0.5, fontSize: "0.6rem" }}>›</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Thin divider */}
              <div style={{ height: "1px", background: "rgba(201,168,76,0.1)", marginBottom: "1.5rem" }} />

              {/* Products */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.22em", color: GOLD, marginBottom: "0.75rem", opacity: 0.9 }}>Products</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                  {NAV_ITEMS.find(i => i.label === "Products")?.children?.map((child) => (
                    <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}>
                      <div style={{ fontFamily: FONT_UI, fontWeight: 500, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", padding: "9px 10px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.08)", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.04)"}
                      >
                        {child.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Thin divider */}
              <div style={{ height: "1px", background: "rgba(201,168,76,0.1)", marginBottom: "1.5rem" }} />

              {/* Standalone links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginBottom: "1.5rem" }}>
                {[{ label: "News", href: "/news" }, { label: "Free Insights", href: "/billionaire-wisdom" }].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    <div style={{ fontFamily: FONT_UI, fontWeight: 500, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", padding: "9px 0", borderBottom: "1px solid rgba(201,168,76,0.06)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"}
                    >
                      {item.label}
                      <span style={{ color: GOLD, opacity: 0.5, fontSize: "0.6rem" }}>›</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer CTAs — fixed at bottom */}
            <div style={{ padding: "1rem 1.5rem 1.5rem", borderTop: `1px solid rgba(201,168,76,0.12)`, display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
              <Link href="/golden-ticket" onClick={() => setMobileOpen(false)}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GOLD, padding: "11px 16px", border: `1px solid rgba(201,168,76,0.4)`, textAlign: "center", cursor: "pointer" }}>✦ Golden Ticket</div>
              </Link>
              <Link href="/marketplace" onClick={() => setMobileOpen(false)}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GOLD, padding: "11px 16px", border: `1px solid rgba(201,168,76,0.4)`, textAlign: "center", cursor: "pointer" }}>✦ Official Store</div>
              </Link>
              <Link href="/membership/apply" onClick={() => setMobileOpen(false)}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#0a0e1a", background: GOLD, padding: "11px 16px", textAlign: "center", cursor: "pointer" }}>✦ Private Membership</div>
              </Link>
              <Link href="/card-concierge" onClick={() => setMobileOpen(false)}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "6px", cursor: "pointer" }}>Billionaire Card & Concierge</div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
