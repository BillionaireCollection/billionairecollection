import { useEffect, useState } from "react";
import { Link } from "wouter";

const GOLD = "#C9A84C";
const FONT_UI = "'Raleway', sans-serif";
const CONSENT_STORAGE_KEY = "bc-cookie-consent";

type ConsentChoice = "accepted" | "necessary";

function loadAnalyticsAfterConsent() {
  if (document.querySelector("script[data-bc-analytics]")) return;

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.replace(/\/$/, "");
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !websiteId) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint}/umami`;
  script.dataset.websiteId = websiteId;
  script.dataset.bcAnalytics = "true";
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
      if (consent === "accepted") {
        loadAnalyticsAfterConsent();
      } else if (consent !== "necessary") {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }

    const openPreferences = () => setIsVisible(true);
    window.addEventListener("bc:open-cookie-settings", openPreferences);
    return () => window.removeEventListener("bc:open-cookie-settings", openPreferences);
  }, []);

  const saveChoice = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // The preference remains active for this browser view when storage is unavailable.
    }
    if (choice === "accepted") loadAnalyticsAfterConsent();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie preferences"
      role="dialog"
      aria-live="polite"
      style={{ position: "fixed", zIndex: 99, left: "max(1rem, env(safe-area-inset-left))", right: "max(1rem, env(safe-area-inset-right))", bottom: "max(1rem, env(safe-area-inset-bottom))", maxWidth: "720px", margin: "0 auto", padding: "1.25rem", background: "#090909", border: "1px solid rgba(201,168,76,0.36)", boxShadow: "0 18px 55px rgba(0,0,0,0.48)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1.25rem", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: "0 0 0.45rem", fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.14em", color: GOLD }}>Your privacy choices</h2>
          <p style={{ margin: 0, fontFamily: FONT_UI, color: "rgba(255,255,255,0.62)", fontSize: "0.8125rem", lineHeight: 1.65 }}>
            We use essential browser storage to remember this choice. Optional analytics load only if you accept. Read our <Link href="/privacy"><span style={{ color: GOLD, textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span></Link>.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: "0.6rem" }}>
          <button type="button" onClick={() => saveChoice("necessary")} className="btn-ghost-gold" style={{ minWidth: "auto", padding: "0.75rem 0.9rem", fontSize: "0.65rem" }}>Essential only</button>
          <button type="button" onClick={() => saveChoice("accepted")} className="btn-gold" style={{ minWidth: "auto", padding: "0.75rem 0.9rem", fontSize: "0.65rem" }}>Accept analytics</button>
        </div>
      </div>
    </aside>
  );
}
