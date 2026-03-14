/* ============================================================
   BILLIONAIRE COLLECTION — PageHero
   Full-viewport hero with parallax image, gold overlay,
   animated badge + headline reveal.
   ============================================================ */

import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  image: string;
  height?: string;
  cta?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  overlay?: string;
}

const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const GOLD = "#C9A84C";

export default function PageHero({
  badge,
  title,
  titleAccent,
  subtitle,
  image,
  height = "100vh",
  cta,
  ctaSecondary,
  overlay = "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
}: PageHeroProps) {
  return (
    <section style={{
      position: "relative",
      height,
      minHeight: "600px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: "scale(1.05)",
        transition: "transform 0.1s linear",
      }} />

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: overlay }} />

      {/* Bottom fade to black */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "80px" }}>
        <div style={{ maxWidth: "720px" }}>
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ marginBottom: "1.5rem" }}
            >
              <span className="bc-badge">{badge}</span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 400,
              fontSize: "clamp(2rem, 5.5vw, 4rem)",
              lineHeight: 1.15,
              letterSpacing: "normal",
              color: "#fff",
              marginBottom: "1.5rem",
              wordBreak: "break-word",
            }}
          >
            {title}{" "}
            {titleAccent && <span style={{ color: GOLD }}>{titleAccent}</span>}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: "560px",
              }}
            >
              {subtitle}
            </motion.p>
          )}

          {(cta || ctaSecondary) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              {cta && (
                <a href={cta.href}>
                  <button className="btn-gold">{cta.label}</button>
                </a>
              )}
              {ctaSecondary && (
                <a href={ctaSecondary.href}>
                  <button className="btn-ghost-gold">{ctaSecondary.label}</button>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative gold vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          right: "8%",
          top: "20%",
          bottom: "20%",
          width: "1px",
          background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
          opacity: 0.3,
          transformOrigin: "top",
        }}
        className="hidden lg:block"
      />
    </section>
  );
}
