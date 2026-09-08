import { motion } from "framer-motion";
import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";
import { trpc } from "@/lib/trpc";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";
const MEDIA_KIT_URL = "/billionaire-collection-media-kit.pdf";
const RATE_CARD_URL = "/billionaire-collection-usd-rate-card.pdf";
const SHOWREEL_URL = "https://billionairecollection.github.io/billionairecollection/billionaire-collection-showreel.mp4";

const formats = [
  ["Native Story", "$12,000 – $18,000", "$6,000 – $9,000"],
  ["Showreel / Branded Film", "$25,000 – $45,000", "$12,500 – $22,500"],
  ["Audio Underwrite", "$6,000 – $12,000", "$3,000 – $6,000"],
  ["Newsletter", "$4,000 – $8,000", "$2,000 – $4,000"],
  ["Social Post", "$2,500 – $5,000", "$1,250 – $2,500"],
  ["Event / Salon", "$15,000 – $40,000", "$7,500 – $20,000"],
];

const packages = [
  ["Empire Intro", "$11,000", "One Native Story, one social placement and a radio mention."],
  ["Screen & Page", "$27,500", "A Native Story, branded-film cutdown and television adjacency."],
  ["Full Collection", "$75,000", "Campaign magazine, television, radio and vertical placement."],
];

function DownloadButton({ href, children, gold = false, onTrack }: { href: string; children: React.ReactNode; gold?: boolean; onTrack: () => void }) {
  return (
    <a
      href={href}
      download
      onClick={onTrack}
      className={gold ? "btn-gold" : "btn-ghost-gold"}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", textDecoration: "none" }}
    >
      <Download size={16} strokeWidth={1.8} />
      {children}
    </a>
  );
}

export default function MediaKit() {
  const [proposal, setProposal] = useState({ name: "", email: "", phone: "", company: "", focus: "", message: "" });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [proposalError, setProposalError] = useState("");
  const trackDownload = trpc.mediaKit.trackDownload.useMutation();
  const submitProposal = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setProposalSubmitted(true);
      setProposal({ name: "", email: "", phone: "", company: "", focus: "", message: "" });
    },
    onError: (error) => setProposalError(error.message || "We could not submit your request. Please try again."),
  });

  const trackAssetDownload = (asset: "media_kit" | "rate_card") => {
    trackDownload.mutate({ asset });
  };

  const handleProposalSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setProposalError("");
    if (!proposal.name || !proposal.email || !proposal.company || !proposal.focus || !proposal.message) {
      setProposalError("Please complete the required fields so we can shape a relevant proposal.");
      return;
    }
    submitProposal.mutate({
      name: proposal.name,
      email: proposal.email,
      phone: proposal.phone || undefined,
      subject: "Media Kit Custom Proposal Request",
      division: "Billionaire Media — Media Kit",
      message: `Company: ${proposal.company}\nPartnership focus: ${proposal.focus}\n\nProposal brief:\n${proposal.message}`,
    });
  };

  useSEO({
    title: "Media Kit & Rate Card | Billionaire Collection",
    description: "Download the Billionaire Collection media kit and USD Charter Partner rate card. Discover premium editorial, film, audio, social and event partnership opportunities.",
    keywords: "Billionaire Collection media kit, luxury media rate card, Charter Partner, UHNW advertising, luxury brand partnerships",
    url: "https://billionairecollection.com/media-kit",
  });

  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Billionaire Collection Media Kit & Rate Card",
      url: "https://billionairecollection.com/media-kit",
      description: "Media partnership information and USD rate card for Billionaire Collection.",
      isPartOf: { "@type": "WebSite", name: "Billionaire Collection", url: "https://billionairecollection.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Billionaire Collection Charter Partner",
      url: "https://billionairecollection.com/media-kit",
      itemListElement: packages.map(([name, price]) => ({
        "@type": "Offer",
        name,
        price: price.replace(/[$,]/g, ""),
        priceCurrency: "USD",
        availability: "https://schema.org/LimitedAvailability",
      })),
    },
  ]);

  return (
    <div style={{ background: "#000", color: "#fff", overflow: "hidden" }}>
      <section style={{ minHeight: "min(780px, 92vh)", position: "relative", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 22%, rgba(201,168,76,0.16), transparent 29%), radial-gradient(circle at 14% 82%, rgba(201,168,76,0.08), transparent 27%)" }} />
        <div style={{ position: "absolute", inset: "1.25rem", border: "1px solid rgba(201,168,76,0.16)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "9rem", paddingBottom: "6rem" }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: "55rem" }}>
            <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.75rem" }}>Billionaire Media</span>
            <p style={{ fontFamily: FONT_UI, color: GOLD, textTransform: "uppercase", letterSpacing: "0.16em", fontSize: "0.73rem", margin: "0 0 1.3rem" }}>Brand Partnership Portfolio</p>
            <h1 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2.7rem, 6.3vw, 5.9rem)", lineHeight: 0.98, letterSpacing: "normal", margin: 0 }}>
              Speak to the world&apos;s most <span style={{ color: GOLD }}>discerning audience.</span>
            </h1>
            <p style={{ maxWidth: "42rem", margin: "2rem 0 0", fontFamily: FONT_UI, fontSize: "clamp(1rem, 1.55vw, 1.18rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.66)" }}>
              Explore integrated editorial, film, audio, social and experiential opportunities across the Billionaire Collection ecosystem. The Charter Partner offer provides a limited-time introduction to our partnership platform.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.5rem" }}>
              <DownloadButton href={MEDIA_KIT_URL} gold onTrack={() => trackAssetDownload("media_kit")}>Download Media Kit</DownloadButton>
              <DownloadButton href={RATE_CARD_URL} onTrack={() => trackAssetDownload("rate_card")}>Download USD Rate Card</DownloadButton>
            </div>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.72rem", lineHeight: 1.6, color: "rgba(255,255,255,0.36)", margin: "1rem 0 0" }}>Download interest is recorded in aggregate to help our team understand partner demand. No visitor identity is collected by these download events.</p>
          </motion.div>
        </div>
      </section>

      <section aria-label="Custom partnership proposal" style={{ padding: "6.5rem 0 0" }}>
        <div className="container">
          <div className="media-kit-proposal" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)", gap: "clamp(2.5rem, 7vw, 7rem)", padding: "clamp(1.5rem, 4vw, 4rem)", border: "1px solid rgba(201,168,76,0.27)", background: "linear-gradient(135deg, rgba(201,168,76,0.09), rgba(255,255,255,0.02) 42%, rgba(0,0,0,0.1))" }}>
            <div>
              <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.25rem" }}>Custom Proposal</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 1.05, margin: 0 }}>Shape a partnership <span style={{ color: GOLD }}>around your ambition.</span></h2>
              <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "1.5rem 0 0" }}>Tell us what you would like to achieve. The Billionaire Collection team will respond with a proposal appropriate to your category, timing and preferred platform mix.</p>
              <p style={{ fontFamily: FONT_UI, color: GOLD, fontSize: "0.82rem", lineHeight: 1.7, margin: "2rem 0 0" }}>Private enquiries are handled by the Billionaire Collection team.</p>
            </div>
            <div>
              {proposalSubmitted ? (
                <div style={{ border: "1px solid rgba(201,168,76,0.32)", padding: "2rem", minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span className="bc-badge" style={{ alignSelf: "flex-start", marginBottom: "1.25rem" }}>Proposal Requested</span>
                  <h3 style={{ fontFamily: FONT_HEADING, color: "#fff", fontWeight: 400, fontSize: "2rem", margin: 0 }}>Thank you.</h3>
                  <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.63)", lineHeight: 1.8, margin: "1rem 0 1.5rem" }}>Your request has been received. A member of the team will review your brief and return with an appropriate next step.</p>
                  <button type="button" className="btn-ghost-gold" onClick={() => setProposalSubmitted(false)}>Submit another request</button>
                </div>
              ) : (
                <form onSubmit={handleProposalSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
                  <input aria-label="Your name" required placeholder="Your name *" value={proposal.name} onChange={(event) => setProposal({ ...proposal, name: event.target.value })} style={formInputStyle} />
                  <input aria-label="Business email" required type="email" placeholder="Business email *" value={proposal.email} onChange={(event) => setProposal({ ...proposal, email: event.target.value })} style={formInputStyle} />
                  <input aria-label="Company" required placeholder="Company *" value={proposal.company} onChange={(event) => setProposal({ ...proposal, company: event.target.value })} style={formInputStyle} />
                  <input aria-label="Telephone" type="tel" placeholder="Telephone (optional)" value={proposal.phone} onChange={(event) => setProposal({ ...proposal, phone: event.target.value })} style={formInputStyle} />
                  <select aria-label="Partnership focus" required value={proposal.focus} onChange={(event) => setProposal({ ...proposal, focus: event.target.value })} style={{ ...formInputStyle, gridColumn: "1 / -1" }}>
                    <option value="" disabled>Partnership focus *</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Film / Showreel">Film / Showreel</option>
                    <option value="Audio / Radio">Audio / Radio</option>
                    <option value="Social">Social</option>
                    <option value="Event / Salon">Event / Salon</option>
                    <option value="Integrated campaign">Integrated campaign</option>
                  </select>
                  <textarea aria-label="Proposal brief" required placeholder="Tell us about your objective, timing and the audience you want to reach. *" rows={6} value={proposal.message} onChange={(event) => setProposal({ ...proposal, message: event.target.value })} style={{ ...formInputStyle, gridColumn: "1 / -1", resize: "vertical" }} />
                  {proposalError && <p role="alert" style={{ gridColumn: "1 / -1", margin: 0, fontFamily: FONT_UI, color: "#e79090", fontSize: "0.82rem" }}>{proposalError}</p>}
                  <button type="submit" className="btn-gold" disabled={submitProposal.isPending} style={{ gridColumn: "1 / -1", width: "100%", opacity: submitProposal.isPending ? 0.7 : 1 }}>
                    {submitProposal.isPending ? "Requesting proposal…" : "Request a Custom Proposal"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Document previews" style={{ padding: "6.5rem 0 0" }}>
        <div className="container">
          <div style={{ maxWidth: "48rem", marginBottom: "2.5rem" }}>
            <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.25rem" }}>Preview the Documents</span>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 1.08, margin: 0 }}>Read the detail <span style={{ color: GOLD }}>before you download.</span></h2>
            <p style={{ fontFamily: FONT_UI, lineHeight: 1.8, color: "rgba(255,255,255,0.62)", margin: "1.3rem 0 0" }}>Review the partnership platform and full rate structure directly on this page, then download the professional PDFs for internal circulation.</p>
          </div>
          <div className="media-kit-previews" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Media Kit", description: "Platform, formats, Charter Partner terms and starter packages.", url: MEDIA_KIT_URL, asset: "media_kit" as const },
              { title: "USD Rate Card", description: "Open rates, Charter Partner pricing and campaign guidance.", url: RATE_CARD_URL, asset: "rate_card" as const },
            ].map((document) => (
              <article key={document.title} style={{ border: "1px solid rgba(201,168,76,0.24)", background: "#030303", overflow: "hidden" }}>
                <div style={{ padding: "1.5rem 1.5rem 1.25rem", borderBottom: "1px solid rgba(201,168,76,0.18)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                  <div>
                    <span style={{ fontFamily: FONT_UI, fontSize: "0.67rem", color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase" }}>Professional PDF</span>
                    <h3 style={{ margin: "0.4rem 0 0", color: "#fff", fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.6rem" }}>{document.title}</h3>
                    <p style={{ margin: "0.5rem 0 0", color: "rgba(255,255,255,0.55)", fontFamily: FONT_UI, fontSize: "0.82rem", lineHeight: 1.6 }}>{document.description}</p>
                  </div>
                  <DownloadButton href={document.url} onTrack={() => trackAssetDownload(document.asset)}>Download</DownloadButton>
                </div>
                <iframe title={`Preview: ${document.title}`} src={`${document.url}#view=FitH`} loading="lazy" style={{ display: "block", width: "100%", height: "33rem", border: 0, background: "#151515" }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "6.5rem 0 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.82fr)", gap: "clamp(2.5rem, 7vw, 8rem)", alignItems: "start" }}>
            <div>
              <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.25rem" }}>Charter Partner</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 1.08, margin: 0 }}>
                A private introduction to <span style={{ color: GOLD }}>our audience.</span>
              </h2>
            </div>
            <div style={{ borderLeft: "1px solid rgba(201,168,76,0.35)", paddingLeft: "1.7rem", fontFamily: FONT_UI, color: "rgba(255,255,255,0.64)", lineHeight: 1.8 }}>
              <p style={{ marginTop: 0 }}>For a limited period, Charter Partners receive <strong style={{ color: "#fff", fontWeight: 500 }}>50% off open rates</strong> across selected media and activation formats.</p>
              <p style={{ marginBottom: 0 }}>This rate structure is available through <strong style={{ color: GOLD, fontWeight: 500 }}>31 October 2026</strong>, subject to partnership scope and availability.</p>
            </div>
          </div>

          <div style={{ overflowX: "auto", marginTop: "4rem", borderTop: "1px solid rgba(201,168,76,0.28)", borderBottom: "1px solid rgba(201,168,76,0.28)" }}>
            <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse", fontFamily: FONT_UI }}>
              <thead>
                <tr style={{ textAlign: "left", color: GOLD, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  <th style={{ padding: "1.25rem 1rem", fontWeight: 600 }}>Format</th>
                  <th style={{ padding: "1.25rem 1rem", fontWeight: 600 }}>Open rate</th>
                  <th style={{ padding: "1.25rem 1rem", fontWeight: 600 }}>Charter Partner rate</th>
                </tr>
              </thead>
              <tbody>
                {formats.map(([format, openRate, partnerRate]) => (
                  <tr key={format} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <td style={{ padding: "1.2rem 1rem", color: "#fff", fontWeight: 500 }}>{format}</td>
                    <td style={{ padding: "1.2rem 1rem", color: "rgba(255,255,255,0.48)" }}>{openRate}</td>
                    <td style={{ padding: "1.2rem 1rem", color: GOLD }}>{partnerRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-label="Billionaire Collection showreel" style={{ padding: "4.5rem 0 0" }}>
        <div className="container">
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.28)", paddingTop: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontFamily: FONT_UI, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD }}>Billionaire Collection Showreel</span>
            <span style={{ width: "3.25rem", height: "1px", background: GOLD, opacity: 0.72 }} />
          </div>
          <div style={{ background: "#030303", border: "1px solid rgba(201,168,76,0.24)", padding: "clamp(0.4rem, 1vw, 0.7rem)", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }}>
            <video
              controls
              playsInline
              preload="metadata"
              aria-label="Billionaire Collection Showreel"
              style={{ display: "block", width: "100%", aspectRatio: "16 / 9", background: "#000" }}
            >
              <source src={SHOWREEL_URL} type="video/mp4" />
              Your browser does not support the Billionaire Collection showreel.
            </video>
          </div>
        </div>
      </section>

      <section style={{ padding: "7rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "2rem", flexWrap: "wrap", marginBottom: "2.25rem" }}>
            <div>
              <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.25rem" }}>Starter Packages</span>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.4rem)", margin: 0 }}>Start with a <span style={{ color: GOLD }}>signature placement.</span></h2>
            </div>
            <a href="mailto:info@billionaireplc.com?subject=Charter%20Partner%20enquiry" style={{ color: GOLD, textDecoration: "none", fontFamily: FONT_UI, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              Discuss your partnership <ExternalLink size={15} />
            </a>
          </div>
          <div className="media-kit-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: "rgba(201,168,76,0.2)" }}>
            {packages.map(([name, price, details]) => (
              <article key={name} style={{ background: "#050505", padding: "clamp(1.65rem, 3.4vw, 3rem)", minHeight: "250px", display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.48)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Charter Partner</p>
                <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, color: "#fff", fontSize: "2rem", margin: "1rem 0 0" }}>{name}</h3>
                <p style={{ fontFamily: FONT_UI, fontSize: "1.35rem", color: GOLD, margin: "0.75rem 0 1.25rem" }}>{price}</p>
                <p style={{ margin: "auto 0 0", fontFamily: FONT_UI, color: "rgba(255,255,255,0.58)", lineHeight: 1.7, fontSize: "0.9rem" }}>{details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(201,168,76,0.18)", padding: "5.5rem 0", textAlign: "center", background: "linear-gradient(180deg, #000 0%, #090806 100%)" }}>
        <div className="container" style={{ maxWidth: "51rem" }}>
          <span className="bc-badge" style={{ display: "inline-block", marginBottom: "1.3rem" }}>Private Enquiries</span>
          <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.5rem)", margin: 0 }}>Build a presence with <span style={{ color: GOLD }}>purpose.</span></h2>
          <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "1.5rem auto 2.25rem", maxWidth: "40rem" }}>For bespoke campaigns, editorial concepts and partnership availability, contact the Billionaire Collection team directly.</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.4rem 2.25rem", fontFamily: FONT_UI, fontSize: "0.9rem" }}>
            <a href="mailto:info@billionaireplc.com" style={{ color: GOLD, textDecoration: "none" }}>info@billionaireplc.com</a>
            <a href="tel:+442071831700" style={{ color: "rgba(255,255,255,0.72)", textDecoration: "none" }}>+44 20 7183 1700</a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .media-kit-packages { grid-template-columns: 1fr !important; }
          .media-kit-previews, .media-kit-proposal { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .media-kit-packages + * { min-width: 0; }
        }
        @media (max-width: 820px) {
          .container > div[style*="minmax(280px"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          video[aria-label="Billionaire Collection Showreel"] { aspect-ratio: 16 / 9; }
        }
      `}</style>
    </div>
  );
}

const formInputStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  color: "#fff",
  background: "rgba(0,0,0,0.58)",
  border: "1px solid rgba(201,168,76,0.28)",
  padding: "0.9rem 1rem",
  fontFamily: FONT_UI,
  fontSize: "0.88rem",
  outline: "none",
};
