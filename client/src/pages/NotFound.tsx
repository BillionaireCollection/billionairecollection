import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";

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

export default function NotFound() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(5rem, 15vw, 12rem)", color: "rgba(201,168,76,0.08)", lineHeight: 1, marginBottom: "2rem" }}>404</div>
        <span className="bc-badge" style={{ marginBottom: "1.5rem" }}>Page Not Found</span>
        <h1 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#fff", marginBottom: "1rem" }}>This Page Does Not Exist</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.45)", marginBottom: "3rem" }}>The page you are looking for may have been moved or does not exist.</p>
        <Link href="/"><button className="btn-gold">Return Home</button></Link>
      </div>
    </div>
  );
}
