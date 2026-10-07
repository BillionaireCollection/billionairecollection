import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(201,168,76,0.24)",
  padding: "14px 16px",
  color: "#fff",
  fontFamily: FONT_UI,
  fontSize: "0.9375rem",
  outline: "none",
};

export default function Subscribe() {
  useSEO({
    title: "Private Listings Subscription — Billionaire Collection",
    description: "Subscribe for private listing access through Billionaire Collection. Begin the private membership application and secure checkout process for off-market UHNW opportunities.",
    url: "https://billionairecollection.com/subscribe",
  });

  const interest = useMemo(() => {
    const raw = new URLSearchParams(window.location.search).get("interest")?.trim();
    return raw || "Billionaire Collection";
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [paymentState, setPaymentState] = useState<"idle" | "success" | "cancelled">("idle");

  const checkoutMutation = trpc.membership.submitApplication.useMutation({
    onSuccess: ({ checkoutUrl }) => {
      window.location.assign(checkoutUrl);
    },
    onError: (checkoutError) => {
      setError(checkoutError.message || "Secure checkout could not be started. Please try again.");
    },
  });

  useEffect(() => {
    const payment = new URLSearchParams(window.location.search).get("payment");
    if (payment === "success") setPaymentState("success");
    if (payment === "cancelled") setPaymentState("cancelled");
  }, []);

  const beginCheckout = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const names = name.trim().split(/\s+/).filter(Boolean);
    if (names.length < 2 || !email.trim()) {
      setError("Please enter your full name and email address to continue.");
      return;
    }

    checkoutMutation.mutate({
      firstName: names[0],
      lastName: names.slice(1).join(" "),
      email: email.trim(),
      phone: phone.trim() || undefined,
      ecosystemInterests: JSON.stringify([interest]),
      personalIntro: `Private listings subscription requested for ${interest}.`,
      origin: window.location.origin,
      successPath: "/subscribe",
    });
  };

  if (paymentState === "success") {
    return (
      <section style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "10rem 1.5rem", background: "#000" }}>
        <div style={{ maxWidth: "620px", textAlign: "center", border: "1px solid rgba(201,168,76,0.32)", padding: "clamp(2rem, 6vw, 4rem)", background: "linear-gradient(145deg, rgba(201,168,76,0.09), rgba(0,0,0,0.92) 58%)" }}>
          <div style={{ color: GOLD, fontFamily: FONT_UI, fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Private Listing Access</div>
          <h1 style={{ fontFamily: FONT_HEADING, fontWeight: 400, color: "#fff", fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1, margin: "0 0 1.5rem" }}>Your application is received</h1>
          <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.66)", lineHeight: 1.85, margin: "0 0 2rem" }}>Your secure application fee has been received. The Billionaire Collection team will review your details in confidence and contact you regarding private listing access.</p>
          <Link href="/"><button className="btn-gold">Return to Billionaire Collection</button></Link>
        </div>
      </section>
    );
  }

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(9rem, 18vw, 13rem) 0 clamp(5rem, 10vw, 8rem)", borderBottom: "1px solid rgba(201,168,76,0.16)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(100deg, rgba(0,0,0,0.94) 18%, rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1120px" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="bc-badge">Private Listing Access</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }} style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2.6rem, 7vw, 5.6rem)", lineHeight: 1.04, maxWidth: "820px", margin: "1.6rem 0" }}>
            Subscribe to a more <span style={{ color: GOLD }}>private market</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18 }} style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.68)", maxWidth: "640px", fontSize: "1.05rem", lineHeight: 1.85, margin: 0 }}>
            Begin your confidential application for curated off-market opportunities in {interest}. Your application is reviewed before private listings and introductions are made available.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: "clamp(4rem, 9vw, 8rem) 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "clamp(2rem, 7vw, 6rem)", maxWidth: "1120px" }}>
          <div>
            <div style={{ fontFamily: FONT_UI, color: GOLD, fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>The Subscription</div>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.1, margin: "0 0 1.4rem" }}>Private access begins with considered qualification</h2>
            <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.56)", lineHeight: 1.85 }}>This is not an online catalogue. It is a private access application for individuals seeking to acquire, sell, charter or invest through the Billionaire Collection ecosystem.</p>
            <div style={{ marginTop: "2rem", padding: "1.75rem", borderLeft: `2px solid ${GOLD}`, background: "rgba(201,168,76,0.05)" }}>
              <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>Private membership application fee</div>
              <div style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", color: GOLD }}>$25,000 <span style={{ fontFamily: FONT_UI, fontSize: "0.78rem", letterSpacing: "0.12em" }}>USD</span></div>
            </div>
            <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.4)", fontSize: "0.84rem", lineHeight: 1.75, marginTop: "1.5rem" }}>The fee covers dedicated review, verification and interview access. Payment does not guarantee membership or a transaction.</p>
          </div>

          <form onSubmit={beginCheckout} style={{ padding: "clamp(1.5rem, 4vw, 2.75rem)", border: "1px solid rgba(201,168,76,0.28)", background: "rgba(255,255,255,0.018)", alignSelf: "start" }}>
            <div style={{ fontFamily: FONT_HEADING, color: "#fff", fontWeight: 400, fontSize: "1.8rem", marginBottom: "0.7rem" }}>Begin securely</div>
            <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7, margin: "0 0 1.8rem" }}>You will be taken to Stripe’s secure checkout after providing your contact details.</p>
            <div style={{ display: "grid", gap: "1rem" }}>
              <input aria-label="Full name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name *" style={fieldStyle} />
              <input aria-label="Email address" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address *" style={fieldStyle} />
              <input aria-label="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Telephone (optional)" style={fieldStyle} />
              {paymentState === "cancelled" && <p style={{ margin: 0, color: "#dfb56a", fontFamily: FONT_UI, fontSize: "0.84rem" }}>Checkout was cancelled. Your application details have not been submitted; you may try again when ready.</p>}
              {error && <p style={{ margin: 0, color: "#ee9a9a", fontFamily: FONT_UI, fontSize: "0.84rem" }}>{error}</p>}
              <button type="submit" className="btn-gold" disabled={checkoutMutation.isPending} style={{ width: "100%", marginTop: "0.35rem" }}>{checkoutMutation.isPending ? "Opening secure checkout…" : "Continue to Secure Checkout"}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
