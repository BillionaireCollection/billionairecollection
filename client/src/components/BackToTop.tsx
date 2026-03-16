/* ============================================================
   BILLIONAIRE COLLECTION — BackToTop
   Floating gold back-to-top button, appears after 400px scroll.
   ============================================================ */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#C9A84C";
const FONT_UI = "'Raleway', sans-serif";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 9999,
            width: "44px",
            height: "44px",
            background: "rgba(0,0,0,0.85)",
            border: `1px solid rgba(201,168,76,0.4)`,
            color: GOLD,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_UI,
            fontSize: "1.1rem",
            backdropFilter: "blur(8px)",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = GOLD;
            (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
            (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.85)";
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
