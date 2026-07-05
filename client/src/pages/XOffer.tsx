/* ============================================================
   BILLIONAIRE COLLECTION — X (Twitter) Offer Page
   48-hour countdown timer (persisted via localStorage),
   promo code display, and struck-through original price.
   ============================================================ */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

const PROMO_CODE = "XFOLLOW20";
const ORIGINAL_PRICE = "£2,500";
const DISCOUNTED_PRICE = "£2,000";
const DISCOUNT_LABEL = "20% OFF — Exclusive X Follower Offer";
const OFFER_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

const STORAGE_KEY = "bc_x_offer_deadline";

function getOrCreateDeadline(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const deadline = parseInt(stored, 10);
      if (!isNaN(deadline) && deadline > Date.now()) {
        return deadline;
      }
    }
    const newDeadline = Date.now() + OFFER_DURATION_MS;
    localStorage.setItem(STORAGE_KEY, String(newDeadline));
    return newDeadline;
  } catch {
    return Date.now() + OFFER_DURATION_MS;
  }
}

function useCountdown() {
  const [deadline] = useState(() => getOrCreateDeadline());
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, deadline - Date.now()));

  useEffect(() => {
    const tick = () => setTimeLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const expired = timeLeft === 0;

  return { hours, minutes, seconds, expired };
}

function TimerBlock({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "80px" }}>
      <div style={{
        fontFamily: FONT_HEADING,
        fontSize: "clamp(2.5rem, 6vw, 4rem)",
        fontWeight: 400,
        color: GOLD,
        lineHeight: 1,
        background: "rgba(201,168,76,0.06)",
        border: "1px solid rgba(201,168,76,0.25)",
        padding: "0.75rem 1.25rem",
        minWidth: "90px",
        textAlign: "center",
      }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{
        fontFamily: FONT_UI,
        fontSize: "0.6875rem",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.4)",
        marginTop: "0.5rem",
      }}>
        {label}
      </div>
    </div>
  );
}

function PromoCodeBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "1rem",
        background: "rgba(201,168,76,0.06)",
        border: "1px dashed rgba(201,168,76,0.5)",
        padding: "1rem 2rem",
        cursor: "pointer",
        transition: "background 0.2s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.06)"; }}
    >
      <span style={{
        fontFamily: FONT_UI,
        fontWeight: 700,
        fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
        letterSpacing: "0.25em",
        color: GOLD,
        textTransform: "uppercase",
      }}>
        {PROMO_CODE}
      </span>
      <span style={{
        fontFamily: FONT_UI,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: copied ? "#4caf50" : "rgba(255,255,255,0.4)",
        transition: "color 0.2s",
      }}>
        {copied ? "Copied!" : "Tap to copy"}
      </span>
    </div>
  );
}

export default function XOffer() {
  useSEO({
    title: "Exclusive X Follower Offer — 20% Off",
    description: "Exclusive offer for Billionaire Collection X followers. Use code XFOLLOW20 for 20% off. Limited time — 48-hour countdown timer.",
    keywords: "Billionaire Collection offer, XFOLLOW20, exclusive discount, X follower offer, promo code",
  });

  const { hours, minutes, seconds, expired } = useCountdown();

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem 4rem" }}>
      {/* Gold accent line at top */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, zIndex: 100 }} />

      {/* Logo wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "3rem", textAlign: "center" }}
      >
        <Link href="/">
          <span style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.9375rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#fff", cursor: "pointer" }}>
            Billionaire{" "}
          </span>
          <span style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "0.9375rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GOLD, cursor: "pointer" }}>
            Collection
          </span>
        </Link>
      </motion.div>

      <div style={{ maxWidth: "720px", width: "100%", textAlign: "center" }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="bc-badge" style={{ marginBottom: "2rem", display: "inline-block" }}>
            Exclusive X Follower Offer
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 400,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: "1.5rem",
          }}
        >
          {DISCOUNT_LABEL.split("—")[0].trim()}
          <br />
          <span style={{ color: GOLD }}>{DISCOUNT_LABEL.split("—")[1]?.trim()}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: FONT_UI,
            fontWeight: 300,
            fontSize: "1rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            marginBottom: "3rem",
            maxWidth: "520px",
            margin: "0 auto 3rem",
          }}
        >
          As a valued follower of Billionaire Collection on X, you have been granted exclusive early access to the Billionaire Card at a special introductory rate. This offer expires when the timer reaches zero.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginBottom: "3rem" }}
        >
          {expired ? (
            <div style={{
              fontFamily: FONT_UI,
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.5)",
              padding: "1.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              This offer has expired.
            </div>
          ) : (
            <>
              <div style={{
                fontFamily: FONT_UI,
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "1.25rem",
              }}>
                Offer expires in
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <TimerBlock value={hours} label="Hours" />
                <div style={{ fontFamily: FONT_HEADING, fontSize: "3rem", color: GOLD, alignSelf: "flex-start", paddingTop: "0.5rem" }}>:</div>
                <TimerBlock value={minutes} label="Minutes" />
                <div style={{ fontFamily: FONT_HEADING, fontSize: "3rem", color: GOLD, alignSelf: "flex-start", paddingTop: "0.5rem" }}>:</div>
                <TimerBlock value={seconds} label="Seconds" />
              </div>
            </>
          )}
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span style={{
            fontFamily: FONT_UI,
            fontSize: "1.5rem",
            color: "rgba(255,255,255,0.3)",
            textDecoration: "line-through",
            textDecorationColor: "rgba(255,255,255,0.3)",
          }}>
            {ORIGINAL_PRICE}
          </span>
          <span style={{
            fontFamily: FONT_HEADING,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: GOLD,
            fontWeight: 400,
          }}>
            {DISCOUNTED_PRICE}
          </span>
          <span style={{
            fontFamily: FONT_UI,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#4caf50",
            background: "rgba(76,175,80,0.1)",
            border: "1px solid rgba(76,175,80,0.3)",
            padding: "4px 12px",
          }}>
            Save 20%
          </span>
        </motion.div>

        {/* Promo Code */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ marginBottom: "1rem" }}
        >
          <div style={{
            fontFamily: FONT_UI,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "1rem",
          }}>
            Use promo code at checkout
          </div>
          <PromoCodeBox />
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: FONT_UI,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.25)",
            lineHeight: 1.6,
            marginBottom: "3rem",
            marginTop: "1.5rem",
          }}
        >
          Offer valid for new Billionaire Card applications only. Cannot be combined with other offers. One use per applicant.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
        >
          {!expired && (
            <a href={`/card#apply`}>
              <button className="btn-gold" style={{ fontSize: "0.875rem", padding: "16px 40px", letterSpacing: "0.1em" }}>
                Apply Now — Use Code {PROMO_CODE}
              </button>
            </a>
          )}
          <Link href="/">
            <span style={{
              fontFamily: FONT_UI,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.3)",
              cursor: "pointer",
              textDecoration: "underline",
              textDecorationColor: "rgba(255,255,255,0.15)",
            }}>
              Return to Billionaire Collection
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
