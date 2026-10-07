import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const PROMPT_STORAGE_KEY = "bc-newsletter-prompt-seen";

export default function NewsletterPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(PROMPT_STORAGE_KEY)) return;
    } catch {
      // If browser storage is unavailable, the prompt still works for this view.
    }

    const timer = window.setTimeout(() => setIsOpen(true), 6_000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsOpen(false);
    try {
      window.sessionStorage.setItem(PROMPT_STORAGE_KEY, "1");
    } catch {
      // Storage is optional; do not interrupt a visitor journey if it is unavailable.
    }
  };

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setError("");
    },
    onError: () => setError("Unable to subscribe at this time. Please try again shortly."),
  });

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      style={{ position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: "center", padding: "1.25rem", background: "rgba(0,0,0,0.76)", backdropFilter: "blur(8px)" }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-prompt-title"
        style={{ width: "min(100%, 560px)", position: "relative", overflow: "hidden", background: "#060606", border: `1px solid rgba(201,168,76,0.42)`, boxShadow: "0 32px 100px rgba(0,0,0,0.6)", padding: "clamp(2rem, 6vw, 4rem)" }}
      >
        <div style={{ position: "absolute", inset: "12px", border: "1px solid rgba(201,168,76,0.13)", pointerEvents: "none" }} />
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close newsletter invitation"
          style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 1, width: "36px", height: "36px", border: "1px solid rgba(201,168,76,0.3)", color: "rgba(255,255,255,0.7)", background: "transparent", fontSize: "1.25rem", cursor: "pointer" }}
        >
          ×
        </button>

        <div style={{ position: "relative", textAlign: "center" }}>
          <span className="bc-badge" style={{ marginBottom: "1.25rem" }}>Private Intelligence</span>
          <h2 id="newsletter-prompt-title" style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", lineHeight: 1.12, margin: "0 0 1rem" }}>
            The Billionaire <span style={{ color: GOLD }}>Daily Brief</span>
          </h2>
          <p style={{ maxWidth: "390px", margin: "0 auto 2rem", fontFamily: FONT_UI, fontWeight: 300, color: "rgba(255,255,255,0.58)", fontSize: "0.9375rem", lineHeight: 1.75 }}>
            A considered edit of wealth, luxury and global opportunity—delivered to your inbox.
          </p>

          {submitted ? (
            <div style={{ border: "1px solid rgba(201,168,76,0.35)", padding: "1.25rem", color: GOLD, fontFamily: FONT_UI, fontSize: "0.875rem", lineHeight: 1.6 }}>
              Thank you. Your subscription is confirmed.
              <div><button type="button" onClick={dismiss} style={{ marginTop: "1rem", border: 0, background: "transparent", color: "rgba(255,255,255,0.65)", textDecoration: "underline", cursor: "pointer", fontFamily: FONT_UI }}>Continue browsing</button></div>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setError("");
                if (email && marketingConsent) {
                  subscribeMutation.mutate({ email, source: "newsletter_modal", marketingConsent: true });
                }
              }}
              style={{ display: "grid", gap: "0.9rem", textAlign: "left" }}
            >
              <label style={{ display: "grid", gap: "0.5rem" }}>
                <span style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.56)" }}>Email address</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.35)", padding: "14px 16px", color: "#fff", fontFamily: FONT_UI, fontSize: "0.9rem", outline: "none" }}
                />
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontFamily: FONT_UI, color: "rgba(255,255,255,0.58)", fontSize: "0.75rem", lineHeight: 1.55, cursor: "pointer" }}>
                <input type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} style={{ marginTop: "3px", accentColor: GOLD }} />
                <span>I agree to receive the Billionaire Daily Brief and related marketing communications. I can unsubscribe at any time. See the <Link href="/privacy"><span style={{ color: GOLD, textDecoration: "underline" }}>Privacy Policy</span></Link>.</span>
              </label>
              {error && <p role="alert" style={{ margin: 0, fontFamily: FONT_UI, fontSize: "0.75rem", color: "#e57373" }}>{error}</p>}
              <button type="submit" className="btn-gold" disabled={!marketingConsent || subscribeMutation.isPending} style={{ marginTop: "0.25rem", width: "100%", opacity: !marketingConsent || subscribeMutation.isPending ? 0.6 : 1 }}>
                {subscribeMutation.isPending ? "Submitting…" : "Subscribe to the Daily Brief"}
              </button>
            </form>
          )}
          {!submitted && <button type="button" onClick={dismiss} style={{ marginTop: "1.25rem", border: 0, background: "transparent", color: "rgba(255,255,255,0.4)", fontFamily: FONT_UI, fontSize: "0.75rem", cursor: "pointer" }}>No, thank you</button>}
        </div>
      </section>
    </div>
  );
}
