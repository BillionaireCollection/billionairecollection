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
      { label: "Media", href: "/media", description: "Television, Magazine & Radio" },
      { label: "Technology", href: "/technology", description: "University, Digital & Vitality" },
      { label: "Services", href: "/services", description: "Funding, Golf, Travel & Card" },
      { label: "Billionaire Tutor", href: "/billionaire-tutor", description: "Elite self-made wealth coaches" },
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
      { label: "Crypto", href: "/crypto", description: "Digital asset investments" },
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
            </div>
          )}

          {/* Mobile: Store shortcut + hamburger */}
          {!isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/marketplace">
                <span style={{
                  fontFamily: FONT_UI,
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: GOLD,
                  border: `1px solid ${GOLD}`,
                  padding: "5px 10px",
                  whiteSpace: "nowrap",
                }}>
                  Store
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: GOLD, background: "none", border: "none", padding: "8px", cursor: "pointer" }}
                aria-label="Open menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
              width: "min(320px, 100vw)",
              background: "#000",
              zIndex: 1100,
              borderLeft: `1px solid rgba(201,168,76,0.2)`,
              overflowY: "auto",
              padding: "5rem 2rem 2rem",
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", color: GOLD, background: "none", border: "none", cursor: "pointer" }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Prominent Store CTA at top of mobile menu */}
            <Link href="/marketplace" onClick={() => setMobileOpen(false)}>
              <div style={{
                background: GOLD,
                color: "#0a0e1a",
                fontFamily: FONT_UI,
                fontWeight: 700,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                padding: "14px 20px",
                textAlign: "center",
                marginBottom: "20px",
                cursor: "pointer",
              }}>
                ✦ Official Store
              </div>
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {NAV_ITEMS.filter(i => i.label !== "Store").map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link href={item.href} onClick={() => setMobileOpen(false)}>
                      <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", padding: "14px 0", borderBottom: "1px solid rgba(201,168,76,0.1)", cursor: "pointer" }}>
                        {item.label}
                      </div>
                    </Link>
                  ) : (
                    <>
                      <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD, padding: "14px 0", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                        {item.label}
                      </div>
                      {item.children?.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}>
                          <div style={{ fontFamily: FONT_UI, fontWeight: 400, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.6)", padding: "10px 0 10px 1rem", borderBottom: "1px solid rgba(201,168,76,0.05)", cursor: "pointer" }}>
                            {child.label}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              ))}
              <div style={{ marginTop: "2rem" }}>
                <Link href="/card-concierge" onClick={() => setMobileOpen(false)}>
                  <button className="btn-gold" style={{ width: "100%" }}>Billionaire Card</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
