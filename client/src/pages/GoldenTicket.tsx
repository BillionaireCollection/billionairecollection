/* ============================================================
   BILLIONAIRE COLLECTION — The Golden Ticket
   The symbolic heart of the ecosystem. Not a product — a key.
   Journey: Inspire → Invite → Transform → Create a Legacy
   ============================================================ */

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const GOLD_DIM = "rgba(201,168,76,0.15)";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp";

/* ── Utility components ── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        margin: "2rem auto",
        maxWidth: "200px",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD})`,
        }}
      />
      <span style={{ color: GOLD, fontSize: "0.5rem" }}>◆</span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to left, transparent, ${GOLD})`,
        }}
      />
    </div>
  );
}

/* ── Ecosystem orbit visual ── */
const ORBIT_ITEMS = [
  { label: "Magazine", icon: "📖", href: "/magazine", angle: 0 },
  { label: "University", icon: "🎓", href: "/university", angle: 32.7 },
  { label: "Vitality", icon: "💚", href: "/vitality", angle: 65.5 },
  { label: "Aviation", icon: "✈️", href: "/air", angle: 98.2 },
  { label: "Yachts", icon: "⚓", href: "/boat", angle: 130.9 },
  { label: "Estates", icon: "🏛️", href: "/estates", angle: 163.6 },
  { label: "Funding", icon: "💼", href: "/funding", angle: 196.4 },
  { label: "Card", icon: "💳", href: "/card", angle: 229.1 },
  { label: "Store", icon: "🛍️", href: "/marketplace", angle: 261.8 },
  { label: "Media", icon: "📺", href: "/media", angle: 294.5 },
  { label: "Giving", icon: "🌍", href: "#giving", angle: 327.3 },
];

function EcosystemOrbit() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "min(560px, 90vw)",
        height: "min(560px, 90vw)",
        margin: "0 auto",
      }}
    >
      {/* Orbit ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          border: `1px solid rgba(201,168,76,0.25)`,
          boxShadow: `0 0 60px rgba(201,168,76,0.05), inset 0 0 60px rgba(201,168,76,0.03)`,
        }}
      />
      {/* Second ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "absolute",
          inset: "12%",
          borderRadius: "50%",
          border: `1px solid rgba(201,168,76,0.08)`,
        }}
      />

      {/* Center: Golden Ticket */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {/* Ticket shape */}
        <div
          style={{
            width: "110px",
            height: "70px",
            background: `linear-gradient(135deg, #1a1200 0%, #2d2000 40%, #1a1200 100%)`,
            border: `1px solid rgba(201,168,76,0.6)`,
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 40px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.1)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ticket perforations */}
          <div
            style={{
              position: "absolute",
              left: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#000",
              border: `1px solid rgba(201,168,76,0.3)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#000",
              border: `1px solid rgba(201,168,76,0.3)`,
            }}
          />
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              fontFamily: FONT_HEADING,
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Billionaire Collection
          </motion.div>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontSize: "0.875rem",
              color: GOLD_LIGHT,
              letterSpacing: "0.05em",
            }}
          >
            ✦ Golden Ticket ✦
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_UI,
            fontSize: "0.5625rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(201,168,76,0.5)",
            marginTop: "10px",
          }}
        >
          The Key to Everything
        </div>
      </motion.div>

      {/* Orbit items */}
      {ORBIT_ITEMS.map((item, i) => {
        const rad = (item.angle * Math.PI) / 180;
        const radius = 44; // percent from center
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.6 + i * 0.07,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 3,
            }}
          >
            <Link href={item.href}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.9)",
                    border: `1px solid rgba(201,168,76,0.35)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    boxShadow: `0 0 12px rgba(201,168,76,0.15)`,
                  }}
                >
                  {item.icon}
                </motion.div>
                <span
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: "0.4375rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(201,168,76,0.7)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {/* Connecting lines from center to each orbit item */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {ORBIT_ITEMS.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = 50 + 44 * Math.cos(rad);
          const y = 50 + 44 * Math.sin(rad);
          return (
            <motion.line
              key={item.label}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="rgba(201,168,76,0.12)"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Journey step ── */
function JourneyStep({
  number,
  label,
  title,
  body,
  delay = 0,
}: {
  number: string;
  label: string;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr",
          gap: "2.5rem",
          alignItems: "start",
          padding: "3rem 0",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,0.3)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_HEADING,
              fontSize: "1.25rem",
              color: GOLD,
              margin: "0 auto 0.75rem",
              boxShadow: `0 0 20px rgba(201,168,76,0.1)`,
            }}
          >
            {number}
          </div>
          <div
            style={{
              fontFamily: FONT_UI,
              fontSize: "0.5625rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(201,168,76,0.5)",
            }}
          >
            {label}
          </div>
        </div>
        <div>
          <h3
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              color: "#fff",
              marginBottom: "1.25rem",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: FONT_UI,
              fontWeight: 300,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.85,
              maxWidth: "560px",
            }}
          >
            {body}
          </p>
        </div>
      </div>
    </FadeUp>
  );
}

/* ── Club benefit card ── */
function BenefitCard({
  icon,
  title,
  desc,
  delay = 0,
}: {
  icon: string;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div
        className="bc-glass-card"
        style={{
          padding: "2.5rem 2rem",
          height: "100%",
          borderTop: `2px solid rgba(201,168,76,0.25)`,
        }}
      >
        <div style={{ fontSize: "1.75rem", marginBottom: "1.25rem" }}>
          {icon}
        </div>
        <h4
          style={{
            fontFamily: FONT_UI,
            fontWeight: 600,
            fontSize: "0.8125rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: GOLD,
            marginBottom: "0.875rem",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontFamily: FONT_UI,
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
          }}
        >
          {desc}
        </p>
      </div>
    </FadeUp>
  );
}

/* ── Data ── */
const BENEFITS = [
  {
    icon: "📖",
    title: "Magazine Feature",
    desc: "Every Golden Ticket Club member is featured in the centre section of Billionaire Magazine, spotlighting the specific cause their purchase supports and the impact created.",
  },
  {
    icon: "🌐",
    title: "Global Network",
    desc: "Access an exclusive community of entrepreneurs, investors, and changemakers across six continents — people who believe success and impact are inseparable.",
  },
  {
    icon: "🎭",
    title: "Exclusive Events",
    desc: "Private dinners, summits, and curated experiences reserved for Club members — from intimate boardroom gatherings to landmark global events.",
  },
  {
    icon: "💼",
    title: "Business Opportunities",
    desc: "First access to co-investment opportunities, strategic partnerships, and deal flow shared exclusively within the Golden Ticket Club community.",
  },
  {
    icon: "🎓",
    title: "Billionaire University",
    desc: "Full access to Billionaire University's curriculum — entrepreneurship, wealth building, leadership, and legacy — taught by those who have built it.",
  },
  {
    icon: "🤝",
    title: "Premium Partner Offers",
    desc: "Curated privileges from the world's finest brands across aviation, hospitality, wellness, and finance — reserved exclusively for Club members.",
  },
  {
    icon: "🏆",
    title: "Global Recognition",
    desc: "Be recognised as part of a movement that is redefining what it means to succeed — a community that creates wealth and changes the world simultaneously.",
  },
  {
    icon: "💚",
    title: "Billionaire Giving Access",
    desc: "Direct visibility into the causes your membership supports, with quarterly impact reports showing exactly where your contribution is creating change.",
  },
];

const GIVING_CAUSES = [
  { icon: "🌱", label: "Climate & Clean Energy" },
  { icon: "📚", label: "Education Access" },
  { icon: "💧", label: "Clean Water" },
  { icon: "🏥", label: "Global Health" },
  { icon: "🌾", label: "Food Security" },
  { icon: "⚖️", label: "Economic Equality" },
];

/* ── Main component ── */
export default function GoldenTicket() {
  useSEO({
    title: "The Golden Ticket — Key to the Billionaire Collection Ecosystem",
    description:
      "The Golden Ticket is not a product — it is the key that unlocks the entire Billionaire Collection ecosystem. Join the Golden Ticket Club: a global community of entrepreneurs and changemakers who believe success should create impact.",
    keywords:
      "Golden Ticket Billionaire Collection, Golden Ticket Club, purposeful capitalism, luxury ecosystem membership, billionaire community, entrepreneurs changemakers, Billionaire Giving, UHNW membership",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Billionaire Collection",
          item: "https://billionairecollection.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "The Golden Ticket",
          item: "https://billionairecollection.com/golden-ticket",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "The Golden Ticket — Billionaire Collection Ecosystem Key",
      description:
        "The Golden Ticket is the symbolic heart of the Billionaire Collection ecosystem — unlocking access to every division, the Golden Ticket Club community, and Billionaire Giving.",
      url: "https://billionairecollection.com/golden-ticket",
      serviceType: "Exclusive Ecosystem Membership",
      provider: {
        "@type": "Organization",
        name: "Billionaire Collection",
        url: "https://billionairecollection.com",
      },
    },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    referredBy: "",
  });
  const [formError, setFormError] = useState("");

  const applyMutation = trpc.goldenTicket.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err: { message?: string }) =>
      setFormError(err.message || "Something went wrong. Please try again."),
  });

  return (
    <div style={{ background: "#000", overflowX: "hidden" }}>
      {/* ══════════════════════════════════════════
          HERO — The Key to Everything
      ══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "700px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            background: "linear-gradient(to top, #000 0%, transparent 100%)",
          }}
        />

        {/* Animated gold vertical lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "1px",
              background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
              left: `${10 + i * 20}%`,
              top: "5%",
              bottom: "5%",
            }}
            animate={{ opacity: [0.03, 0.12, 0.03] }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Pulsing gold glow behind center */}
        <motion.div
          animate={{ opacity: [0.04, 0.12, 0.04], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "80px",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "2rem" }}
          >
            <span className="bc-badge">The Golden Ticket</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 400,
              lineHeight: 1.05,
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.25rem",
              }}
            >
              Not a Product.
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                color: "#fff",
              }}
            >
              A Key.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: FONT_UI,
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "580px",
              margin: "0 auto 3rem",
              lineHeight: 1.8,
            }}
          >
            The Golden Ticket unlocks the entire Billionaire Collection
            ecosystem — and more importantly, it opens the door to a global
            community of entrepreneurs and changemakers who believe that success
            should also create impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a href="#apply">
              <button className="btn-gold">Request Your Golden Ticket</button>
            </a>
            <a href="#philosophy">
              <button className="btn-ghost-gold">Discover the Philosophy</button>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
            }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          PHILOSOPHY — Purposeful Capitalism
      ══════════════════════════════════════════ */}
      <section
        id="philosophy"
        style={{ padding: "9rem 0", background: "#000" }}
      >
        <div className="container" style={{ maxWidth: "860px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>
                The Philosophy
              </span>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: "2rem",
                }}
              >
                This isn't just where you buy{" "}
                <span style={{ color: GOLD }}>luxury services.</span>
                <br />
                This is where you become part of{" "}
                <span style={{ color: GOLD }}>something bigger.</span>
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              The Golden Ticket was born from a simple but radical idea: that
              the world's most successful people should also be its most
              impactful. Not through charity — through{" "}
              <em style={{ color: GOLD_LIGHT, fontStyle: "normal" }}>
                purposeful capitalism
              </em>
              . Every purchase across the Billionaire Collection ecosystem
              contributes a portion of proceeds to solving some of the world's
              greatest challenges. Not as a donation. As a natural consequence
              of living extraordinarily.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              The Golden Ticket is the symbol of that commitment. It is the key
              that unlocks every division of the ecosystem — from Estates and
              Aviation to University and Media — and it is the emblem of
              membership in the{" "}
              <em style={{ color: GOLD_LIGHT, fontStyle: "normal" }}>
                Golden Ticket Club
              </em>
              : a curated global community of entrepreneurs, investors, and
              leaders who are building legacies that outlast them.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                textAlign: "center",
              }}
            >
              Two things, clearly distinguished: the{" "}
              <em style={{ color: GOLD_LIGHT, fontStyle: "normal" }}>
                Golden Ticket
              </em>{" "}
              is the iconic symbol — the key itself. The{" "}
              <em style={{ color: GOLD_LIGHT, fontStyle: "normal" }}>
                Golden Ticket Club
              </em>{" "}
              is the community of members it admits you to. One is the door.
              The other is everything on the other side of it.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ECOSYSTEM ORBIT — The Key Unlocks It All
      ══════════════════════════════════════════ */}
      <section
        style={{
          padding: "8rem 0",
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, #000 70%)",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>
                The Ecosystem
              </span>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  color: "#fff",
                  marginBottom: "1.25rem",
                }}
              >
                One Key.{" "}
                <span style={{ color: GOLD }}>Every Door.</span>
              </h2>
              <p
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: "500px",
                  margin: "0 auto",
                  lineHeight: 1.75,
                }}
              >
                The Golden Ticket sits at the centre of everything — unlocking
                every division, every experience, and every opportunity within
                the Billionaire Collection ecosystem.
              </p>
            </div>
          </FadeUp>

          <EcosystemOrbit />

          <FadeUp delay={0.4}>
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "0.9375rem",
                color: "rgba(255,255,255,0.35)",
                textAlign: "center",
                marginTop: "4rem",
                letterSpacing: "0.05em",
              }}
            >
              Magazine · University · Vitality · Aviation · Yachts · Estates ·
              Funding · Card · Store · Media · Giving
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          JOURNEY — Inspire → Invite → Transform → Legacy
      ══════════════════════════════════════════ */}
      <section style={{ padding: "9rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>
                The Journey
              </span>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  color: "#fff",
                }}
              >
                Four Chapters.{" "}
                <span style={{ color: GOLD }}>One Transformation.</span>
              </h2>
            </div>
          </FadeUp>

          <JourneyStep
            number="I"
            label="Inspire"
            title="Discover a Different Way to Live"
            body="Most people collect things. Golden Ticket members collect moments, relationships, and impact. The journey begins when you first encounter the idea that luxury and legacy are not opposites — they are the same thing, pursued at the highest level. You are not just buying access to the world's finest services. You are choosing to live with intention."
            delay={0.1}
          />
          <JourneyStep
            number="II"
            label="Invite"
            title="Join the Golden Ticket Club"
            body="The Golden Ticket is not sold. It is extended. Once you hold it, you are welcomed into the Golden Ticket Club — a community of extraordinary individuals who have chosen to combine their success with their values. The Club is intimate by design: every member is known, every voice matters, and every connection is meaningful."
            delay={0.15}
          />
          <JourneyStep
            number="III"
            label="Transform"
            title="Access Everything. Contribute to Something Greater."
            body="With your Golden Ticket, every corner of the ecosystem opens to you — from private aviation and ultra-prime estates to Billionaire University's education programmes and the Media division's global platforms. And with every transaction, a portion flows into Billionaire Giving — directly funding solutions to the world's most pressing challenges. You are not just living well. You are creating change."
            delay={0.2}
          />
          <JourneyStep
            number="IV"
            label="Create a Legacy"
            title="Be Remembered for More Than Your Wealth"
            body="The greatest entrepreneurs and leaders in history are remembered not for what they accumulated, but for what they built and what they gave. The Golden Ticket Club is your invitation to join that lineage — to be featured in Billionaire Magazine's centre section, recognised globally as part of a movement, and to know that your success is actively making the world better. This is your legacy, written in real time."
            delay={0.25}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GOLDEN TICKET CLUB BENEFITS
      ══════════════════════════════════════════ */}
      <section
        style={{
          padding: "8rem 0",
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>
                Golden Ticket Club
              </span>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  color: "#fff",
                  marginBottom: "1.25rem",
                }}
              >
                What the Club{" "}
                <span style={{ color: GOLD }}>Gives You</span>
              </h2>
              <p
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: "520px",
                  margin: "0 auto",
                  lineHeight: 1.75,
                }}
              >
                Membership in the Golden Ticket Club is not a transaction. It
                is an ongoing relationship with a community, an ecosystem, and
                a mission.
              </p>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1px",
              background: "rgba(201,168,76,0.08)",
            }}
          >
            {BENEFITS.map((b, i) => (
              <BenefitCard
                key={b.title}
                icon={b.icon}
                title={b.title}
                desc={b.desc}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BILLIONAIRE GIVING — Purposeful Capitalism
      ══════════════════════════════════════════ */}
      <section
        id="giving"
        style={{
          padding: "9rem 0",
          background:
            "radial-gradient(ellipse at bottom, rgba(201,168,76,0.06) 0%, #000 65%)",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="container" style={{ maxWidth: "900px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>
                Billionaire Giving
              </span>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: "2rem",
                }}
              >
                Success That{" "}
                <span style={{ color: GOLD }}>Changes the World.</span>
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Billionaire Giving is not a charity arm. It is a structural
              commitment embedded into the economics of the entire Billionaire
              Collection ecosystem. A portion of proceeds from every purchase —
              whether an estate, a yacht charter, a University programme, or a
              bottle of champagne — flows directly into Billionaire Giving,
              funding solutions to the world's most urgent challenges.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                marginBottom: "4rem",
                textAlign: "center",
              }}
            >
              This is purposeful capitalism: the idea that the act of living
              extraordinarily well can simultaneously make the world
              extraordinary for others. Golden Ticket Club members receive
              quarterly impact reports showing exactly which causes their
              membership has contributed to — and the measurable difference it
              has made.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "1px",
                background: "rgba(201,168,76,0.1)",
                marginBottom: "4rem",
              }}
            >
              {GIVING_CAUSES.map((cause) => (
                <div
                  key={cause.label}
                  style={{
                    background: "#000",
                    padding: "2rem 1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }}>
                    {cause.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {cause.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div
              style={{
                border: `1px solid rgba(201,168,76,0.2)`,
                padding: "3rem",
                textAlign: "center",
                background: "rgba(201,168,76,0.03)",
              }}
            >
              <p
                style={{
                  fontFamily: FONT_HEADING,
                  fontStyle: "italic",
                  fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  color: GOLD_LIGHT,
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}
              >
                "The measure of a life is not what you accumulated, but what
                you contributed — and the two need not be in conflict."
              </p>
              <p
                style={{
                  fontFamily: FONT_UI,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "rgba(201,168,76,0.5)",
                }}
              >
                — The Billionaire Collection Philosophy
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPLICATION FORM
      ══════════════════════════════════════════ */}
      <section
        id="apply"
        style={{
          padding: "9rem 0",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="container" style={{ maxWidth: "720px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>
                Request Your Golden Ticket
              </span>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  color: "#fff",
                  marginBottom: "1.25rem",
                }}
              >
                Begin Your{" "}
                <span style={{ color: GOLD }}>Application</span>
              </h2>
              <p
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 300,
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.75,
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                The Golden Ticket is extended by invitation. Submit your
                details and a member of our team will be in touch within 48
                hours to discuss your application.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            {submitted ? (
              <div
                style={{
                  padding: "4rem",
                  border: `1px solid rgba(201,168,76,0.3)`,
                  textAlign: "center",
                  background: "rgba(201,168,76,0.03)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{
                    fontFamily: FONT_HEADING,
                    fontSize: "3rem",
                    color: GOLD,
                    marginBottom: "1.5rem",
                  }}
                >
                  ✦
                </motion.div>
                <h3
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    color: GOLD,
                    marginBottom: "1rem",
                  }}
                >
                  Application Received
                </h3>
                <p
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.75,
                  }}
                >
                  Thank you for your interest in the Golden Ticket. A member of
                  our team will contact you within 48 hours to discuss your
                  application and welcome you to the Club.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormError("");
                  applyMutation.mutate({
                    name: form.name,
                    email: form.email,
                    phone: form.phone || undefined,
                    country: form.country || undefined,
                    message: form.message || undefined,
                    referredBy: form.referredBy || undefined,
                  });
                }}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontFamily: FONT_UI,
                        fontSize: "0.6875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.35)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        padding: "14px 16px",
                        fontFamily: FONT_UI,
                        fontSize: "0.875rem",
                        color: "#fff",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(201,168,76,0.5)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                      }
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: FONT_UI,
                        fontSize: "0.6875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.35)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        padding: "14px 16px",
                        fontFamily: FONT_UI,
                        fontSize: "0.875rem",
                        color: "#fff",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(201,168,76,0.5)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.35)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      padding: "14px 16px",
                      fontFamily: FONT_UI,
                      fontSize: "0.875rem",
                      color: "#fff",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                    }
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.35)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      padding: "14px 16px",
                      fontFamily: FONT_UI,
                      fontSize: "0.875rem",
                      color: "#fff",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                    }
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.35)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Tell Us About Yourself
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Share a brief introduction — your ventures, your values, and what draws you to the Golden Ticket Club..."
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      padding: "14px 16px",
                      fontFamily: FONT_UI,
                      fontSize: "0.875rem",
                      color: "#fff",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                    }
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.35)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Referred By (optional)
                  </label>
                  <input
                    type="text"
                    value={form.referredBy}
                    onChange={(e) =>
                      setForm({ ...form, referredBy: e.target.value })
                    }
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      padding: "14px 16px",
                      fontFamily: FONT_UI,
                      fontSize: "0.875rem",
                      color: "#fff",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                    }
                  />
                </div>

                {formError && (
                  <p
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: "0.8125rem",
                      color: "#e57373",
                    }}
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  disabled={applyMutation.isPending}
                >
                  {applyMutation.isPending
                    ? "Submitting…"
                    : "Submit Your Application"}
                </button>

                <p
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.2)",
                    textAlign: "center",
                    lineHeight: 1.6,
                  }}
                >
                  All applications are reviewed in strict confidence.
                  <br />A member of our team will respond within 48 hours.
                </p>
              </form>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CLOSING CTA — The Movement
      ══════════════════════════════════════════ */}
      <section
        style={{
          padding: "8rem 0",
          background:
            "linear-gradient(180deg, #000 0%, rgba(201,168,76,0.04) 50%, #000 100%)",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "700px" }}>
          <FadeUp>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                color: GOLD,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              ✦ ✦ ✦
            </div>
            <h2
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                color: "#fff",
                lineHeight: 1.25,
                marginBottom: "2rem",
              }}
            >
              The world's most successful people
              <br />
              are also its most{" "}
              <span style={{ color: GOLD }}>impactful.</span>
            </h2>
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 300,
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.85,
                marginBottom: "3rem",
              }}
            >
              The Golden Ticket is your invitation to prove it. Join the Club.
              Unlock the ecosystem. Create a legacy that outlasts you.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.25rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href="#apply">
                <button className="btn-gold">Request Your Golden Ticket</button>
              </a>
              <Link href="/ecosystem">
                <button className="btn-ghost-gold">Explore the Ecosystem</button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

