/* ============================================================
   BILLIONAIRE COLLECTION — Private Membership Application
   $25,000 Application Fee · The Billionaire Standard
   Neo-Deco Maximalism: black, gold, editorial, cinematic.
   ============================================================ */

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#D4B96A";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function GoldLine() {
  return <div style={{ width: "48px", height: "1px", background: GOLD, margin: "0 auto 2rem" }} />;
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
      <div style={{ width: "28px", height: "1px", background: GOLD }} />
      <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: GOLD }}>{children}</span>
      <div style={{ width: "28px", height: "1px", background: GOLD }} />
    </div>
  );
}

const PILLARS = [
  {
    letter: "C",
    name: "Character",
    text: "Membership begins with integrity. We assess how you conduct yourself in business, in adversity, and in private. Reputation is not merely a credential here — it is the foundation upon which all else rests.",
  },
  {
    letter: "A",
    name: "Achievement",
    text: "You have built something of consequence. Whether through enterprise, investment, creative endeavour or institutional leadership, your record speaks with clarity. We are not interested in potential — we are interested in what you have already done.",
  },
  {
    letter: "C",
    name: "Capital",
    text: "Financial capacity is a necessary condition, not a sufficient one. We require that applicants hold significant investable assets or verifiable net worth. The threshold exists not to exclude, but to ensure that membership creates genuine value for all parties.",
  },
  {
    letter: "C",
    name: "Contribution",
    text: "The most valuable members bring more than their presence. They bring perspective, relationships, expertise and generosity of knowledge. What you contribute to this ecosystem determines the quality of what you receive from it.",
  },
  {
    letter: "C",
    name: "Curiosity",
    text: "Complacency is the enemy of exceptional outcomes. We look for individuals who remain genuinely curious — about markets, ideas, people and the world. The members who benefit most are those who continue to learn.",
  },
  {
    letter: "C",
    name: "Connection",
    text: "You understand the value of the right room. You approach relationships with discretion, reciprocity and long-term thinking. You are not here to collect contacts — you are here to build something enduring with people of equivalent standing.",
  },
];

const WHO_ITEMS = [
  { title: "Founders & Entrepreneurs", desc: "Those who have built businesses of substance and seek a peer environment that matches their ambition." },
  { title: "Investors & Family Offices", desc: "Capital allocators managing significant wealth who require access, intelligence and discreet deal flow." },
  { title: "Senior Executives", desc: "Leaders operating at the highest levels of global enterprise who value discretion and peer-level connection." },
  { title: "Wealth Creators", desc: "Individuals who have generated significant personal wealth and are now focused on preservation, growth and legacy." },
  { title: "Creative & Cultural Leaders", desc: "Those whose influence extends beyond commerce — into art, media, philanthropy and the shaping of culture." },
];

const ECOSYSTEM_ACCESS = [
  { cat: "Access", text: "Private introductions to ultra-prime real estate, superyachts, private aviation, exotic automobiles and rare collectibles — presented before public market." },
  { cat: "Opportunity", text: "Curated deal flow, co-investment introductions and off-market transactions across the full Billionaire Collection ecosystem and its global network." },
  { cat: "Intelligence", text: "Exclusive briefings, market intelligence and private editorial from Billionaire Magazine, Billionaire Television and the broader media network." },
  { cat: "Network", text: "Direct access to a vetted global community of founders, investors, family offices and wealth creators — connected through shared standards, not shared interests alone." },
  { cat: "Service", text: "Priority access to Billionaire Card concierge, Billionaire Counsel advisory, Billionaire University faculty and the full spectrum of Billionaire Collection services." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Application", desc: "Complete the eight-step application form. Your responses are reviewed in confidence by the Billionaire Collection central team.", time: "Immediate" },
  { num: "02", title: "Review", desc: "Your application is assessed against The Billionaire Standard across all six dimensions. This process is thorough and takes time.", time: "7–14 days" },
  { num: "03", title: "Interview", desc: "Qualified applicants are invited to a private conversation with a senior member of the Billionaire Collection team.", time: "By appointment" },
  { num: "04", title: "Qualification", desc: "Following interview, references may be sought and background verification completed at our discretion.", time: "7–21 days" },
  { num: "05", title: "Acceptance", desc: "Successful applicants receive a formal letter of acceptance and are introduced to their dedicated membership liaison.", time: "Upon completion" },
  { num: "06", title: "Welcome", desc: "Your membership is activated. You are introduced to the ecosystem, your peer network and the full range of available services.", time: "Within 48 hours" },
];

const TESTIMONIALS = [
  { quote: "The calibre of the people in this room is unlike anything I have encountered in twenty years of building businesses. The access is real. The relationships are lasting.", attribution: "— Founder, Private Equity Group [Placeholder]" },
  { quote: "I have been a member of several private networks. None of them connect the breadth of verticals that Billionaire Collection does. It is the only ecosystem I need.", attribution: "— Family Office Principal, Middle East [Placeholder]" },
  { quote: "The intelligence I receive through the media network alone has informed decisions worth multiples of the application fee. The network is the asset.", attribution: "— Investor & Board Director [Placeholder]" },
];

const CAPITAL_OPTIONS = [
  "Under $5 million",
  "$5 million – $20 million",
  "$20 million – $50 million",
  "$50 million – $100 million",
  "$100 million – $500 million",
  "Over $500 million",
  "Prefer to discuss privately",
];

const ECOSYSTEM_VERTICALS = [
  "Ultra-Prime Real Estate", "Superyachts", "Private Aviation", "Exotic Automobiles",
  "Fine Art & Collectibles", "Media & Publishing", "Education & Mentorship",
  "Concierge & Lifestyle", "Funding & Capital", "Legal & Advisory",
  "Technology & Digital", "Health & Longevity",
];

const TOTAL_STEPS = 8;

interface FormData {
  firstName: string; lastName: string; email: string; phone: string; country: string;
  occupation: string; company: string; industry: string; linkedIn: string;
  capitalRange: string;
  ecosystemInterests: string[];
  aspirations: string; contribution: string; personalIntro: string;
  referralName: string; referralEmail: string;
}

const emptyForm: FormData = {
  firstName: "", lastName: "", email: "", phone: "", country: "",
  occupation: "", company: "", industry: "", linkedIn: "",
  capitalRange: "",
  ecosystemInterests: [],
  aspirations: "", contribution: "", personalIntro: "",
  referralName: "", referralEmail: "",
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.18em", color: GOLD }}>Step {step} of {total}</span>
        <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)" }}>
          {["Identity", "Profile", "Capital", "Interests", "Aspirations", "Contribution", "Introduction", "Review & Payment"][step - 1]}
        </span>
      </div>
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", position: "relative" }}>
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, height: "100%", background: GOLD, transformOrigin: "left" }}
          initial={{ scaleX: (step - 1) / total }}
          animate={{ scaleX: step / total }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)",
  padding: "14px 16px", fontFamily: FONT_UI, fontSize: "0.9375rem", color: "#fff",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: FONT_UI, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase",
  letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.5rem",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle, resize: "vertical", minHeight: "120px",
};

export default function Membership() {
  useSEO({
    title: "Private Membership Application — Billionaire Collection",
    description: "Apply for private membership to the Billionaire Collection ecosystem. A $25,000 application fee is required. Membership is by invitation or application only, subject to thorough vetting against The Billionaire Standard.",
    url: "https://billionairecollection.com/membership/apply",
  });

  const [step, setStep] = useState(0); // 0 = landing, 1-8 = form steps
  const [form, setForm] = useState<FormData>(emptyForm);
  const [formError, setFormError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "cancelled">("idle");

  const applyMutation = trpc.membership.submitApplication.useMutation({
    onSuccess: (data) => {
      window.location.href = data.checkoutUrl;
    },
    onError: (err) => {
      setFormError(err.message || "Something went wrong. Please try again.");
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") setPaymentStatus("success");
    if (params.get("payment") === "cancelled") setPaymentStatus("cancelled");
  }, []);

  const setField = (key: keyof FormData, value: string) => setForm(f => ({ ...f, [key]: value }));
  const toggleInterest = (v: string) => setForm(f => ({
    ...f,
    ecosystemInterests: f.ecosystemInterests.includes(v)
      ? f.ecosystemInterests.filter(i => i !== v)
      : [...f.ecosystemInterests, v],
  }));

  const handleNext = () => {
    setFormError("");
    if (step === 1 && (!form.firstName || !form.lastName || !form.email)) {
      setFormError("Please complete all required fields before proceeding.");
      return;
    }
    if (step < TOTAL_STEPS) setStep(s => s + 1);
  };

  const handleSubmit = () => {
    setFormError("");
    applyMutation.mutate({
      ...form,
      ecosystemInterests: JSON.stringify(form.ecosystemInterests),
      origin: window.location.origin,
    });
  };

  if (paymentStatus === "success") {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: "center", maxWidth: "600px" }}>
          <div style={{ width: "64px", height: "64px", border: `1px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "1.5rem" }}>✦</div>
          <SectionBadge>Application Received</SectionBadge>
          <h1 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.5rem" }}>Your application is under review.</h1>
          <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: "2rem" }}>
            Your application fee has been received and your submission is now with the Billionaire Collection review team. A member of our team will be in contact within 7–14 days to discuss next steps.
          </p>
          <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)", marginBottom: "3rem" }}>
            Please ensure your contact details are accurate. All correspondence will be conducted in strict confidence.
          </p>
          <Link href="/"><button className="btn-gold">Return to Billionaire Collection</button></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", color: "#fff" }}>

      {/* ══ SECTION 1 — HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.4) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #000, transparent)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "80px", maxWidth: "900px" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <SectionBadge>Billionaire Collection · Private Membership</SectionBadge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 1.08, color: "#fff", marginBottom: "2rem", maxWidth: "800px" }}
          >
            Billionaire Collection<br />
            <span style={{ color: GOLD }}>is not for everyone.</span><br />
            It is for those who<br />already are.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ fontFamily: FONT_UI, fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "rgba(255,255,255,0.6)", maxWidth: "560px", lineHeight: 1.85, marginBottom: "3rem" }}
          >
            Private membership to the world's most comprehensive luxury ecosystem. Access, opportunity, intelligence, network and service — across 40+ verticals, on one membership.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <button
              onClick={() => { setStep(1); setTimeout(() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" }), 100); }}
              className="btn-gold"
              style={{ fontSize: "0.8125rem", letterSpacing: "0.14em" }}
            >
              Begin Your Application
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION 2 — THE BILLIONAIRE STANDARD ══ */}
      <section style={{ padding: "8rem 0", background: "#000" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionBadge>The Billionaire Standard</SectionBadge>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", marginBottom: "1.5rem" }}>
                Six Dimensions of <span style={{ color: GOLD }}>Qualification</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.45)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.85 }}>
                Membership is not granted on the basis of wealth alone. Every applicant is assessed across six dimensions. Capital is one of six — not the only one.
              </p>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "2px" }}>
            {PILLARS.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.07}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", padding: "2.5rem", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem" }}>
                    <span style={{ fontFamily: FONT_HEADING, fontSize: "3rem", color: "rgba(201,168,76,0.15)", fontWeight: 400, lineHeight: 1 }}>{p.letter}</span>
                    <span style={{ fontFamily: FONT_UI, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: GOLD }}>{p.name}</span>
                  </div>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, margin: 0 }}>{p.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — WHO THIS IS FOR ══ */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.03)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <FadeUp>
              <SectionBadge>Who This Is For</SectionBadge>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff", marginBottom: "1.5rem" }}>
                A membership for those who have <span style={{ color: GOLD }}>already arrived.</span>
              </h2>
              <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "2rem" }}>
                Billionaire Collection is not an aspiration platform. It is a living ecosystem built for those who have already achieved significant success and are now focused on what comes next — access, legacy, connection and the full spectrum of UHNW life.
              </p>
              <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.45)", lineHeight: 1.9 }}>
                The ecosystem spans 40+ verticals: real estate, aviation, superyachts, automotive, media, education, concierge, counsel and more. Membership connects you to all of it.
              </p>
            </FadeUp>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {WHO_ITEMS.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.08}>
                  <div style={{ padding: "1.75rem 2rem", background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${GOLD}` }}>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: GOLD, marginBottom: "0.5rem" }}>{item.title}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — WHAT MEMBERSHIP UNLOCKS ══ */}
      <section style={{ padding: "8rem 0", background: "#000" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionBadge>Ecosystem Access</SectionBadge>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", marginBottom: "1rem" }}>
                What Membership <span style={{ color: GOLD }}>Unlocks</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "1px" }}>
            {ECOSYSTEM_ACCESS.map((item, i) => (
              <FadeUp key={item.cat} delay={i * 0.08}>
                <div style={{ padding: "2.5rem 2rem", background: "rgba(255,255,255,0.02)", textAlign: "center", height: "100%" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "1.125rem", color: GOLD, marginBottom: "1rem", fontStyle: "italic" }}>{item.cat}</div>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, margin: 0 }}>{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — THE PROCESS ══ */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionBadge>The Application Process</SectionBadge>
              <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>
                What to <span style={{ color: GOLD }}>Expect</span>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {PROCESS_STEPS.map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.07}>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "2rem", alignItems: "start", padding: "2rem", background: "rgba(255,255,255,0.02)", borderLeft: `1px solid rgba(201,168,76,0.15)` }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "2.5rem", color: "rgba(201,168,76,0.15)", fontWeight: 400, lineHeight: 1 }}>{s.num}</div>
                  <div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: GOLD, marginBottom: "0.5rem" }}>{s.title}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{s.desc}</div>
                  </div>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.25)", textAlign: "right", whiteSpace: "nowrap", paddingTop: "2px" }}>{s.time}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — THE APPLICATION FEE ══ */}
      <section style={{ padding: "8rem 0", background: "#000" }}>
        <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
          <FadeUp>
            <SectionBadge>Application Fee</SectionBadge>
            <div style={{ fontFamily: FONT_HEADING, fontSize: "clamp(3rem, 8vw, 6rem)", color: GOLD, fontWeight: 400, lineHeight: 1, marginBottom: "1.5rem" }}>$25,000</div>
            <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", marginBottom: "2.5rem" }}>United States Dollars</div>
            <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              The application fee is a deliberate commitment and filtration mechanism. It covers the cost of dedicated review, background verification and interview access by the Billionaire Collection team.
            </p>
            <p style={{ fontFamily: FONT_UI, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
              Payment of the fee does not guarantee acceptance. It signals serious intent and initiates the formal review process.
            </p>
            <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", padding: "1.5rem 2rem", textAlign: "left" }}>
              <div style={{ fontFamily: FONT_UI, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: GOLD, marginBottom: "0.75rem" }}>Payment Terms</div>
              <p style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, margin: 0 }}>
                [Configurable area — refundability policy, credit toward membership dues, and any applicable terms to be confirmed by Billionaire Collection Ltd prior to launch.]
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ SECTION 7 — MEMBER VOICES ══ */}
      <section style={{ padding: "8rem 0", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionBadge>Member Voices</SectionBadge>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "2px" }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{ padding: "2.5rem", background: "rgba(255,255,255,0.02)", height: "100%" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "2rem", color: "rgba(201,168,76,0.2)", lineHeight: 1, marginBottom: "1.25rem" }}>"</div>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>{t.quote}</p>
                  <div style={{ fontFamily: FONT_UI, fontSize: "0.6875rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{t.attribution}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — THE APPLICATION FORM ══ */}
      <section id="application-form" style={{ padding: "8rem 0", background: "#000" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          {step === 0 ? (
            <FadeUp>
              <div style={{ textAlign: "center" }}>
                <SectionBadge>Begin Your Application</SectionBadge>
                <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.5rem" }}>
                  Apply to <span style={{ color: GOLD }}>Billionaire Collection</span>
                </h2>
                <p style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "3rem", maxWidth: "560px", margin: "0 auto 3rem" }}>
                  The application consists of eight steps. You will be asked about your professional background, capital position, ecosystem interests and personal introduction. At the final step, the $25,000 application fee is collected via secure payment.
                </p>
                <button onClick={() => setStep(1)} className="btn-gold" style={{ fontSize: "0.8125rem", letterSpacing: "0.14em" }}>
                  Begin Your Application
                </button>
              </div>
            </FadeUp>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <ProgressBar step={step} total={TOTAL_STEPS} />

                {/* STEP 1 — Identity */}
                {step === 1 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "2rem" }}>Identity & Contact</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div><label style={labelStyle}>First Name *</label><input style={inputStyle} value={form.firstName} onChange={e => setField("firstName", e.target.value)} placeholder="First name" /></div>
                      <div><label style={labelStyle}>Last Name *</label><input style={inputStyle} value={form.lastName} onChange={e => setField("lastName", e.target.value)} placeholder="Last name" /></div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}><label style={labelStyle}>Email Address *</label><input style={inputStyle} type="email" value={form.email} onChange={e => setField("email", e.target.value)} placeholder="your@email.com" /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => setField("phone", e.target.value)} placeholder="+1 (000) 000 0000" /></div>
                      <div><label style={labelStyle}>Country of Residence</label><input style={inputStyle} value={form.country} onChange={e => setField("country", e.target.value)} placeholder="United Kingdom" /></div>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Professional Profile */}
                {step === 2 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "2rem" }}>Professional Profile</h3>
                    <div style={{ marginBottom: "1rem" }}><label style={labelStyle}>Current Role / Title</label><input style={inputStyle} value={form.occupation} onChange={e => setField("occupation", e.target.value)} placeholder="Founder & CEO" /></div>
                    <div style={{ marginBottom: "1rem" }}><label style={labelStyle}>Company / Organisation</label><input style={inputStyle} value={form.company} onChange={e => setField("company", e.target.value)} placeholder="Company name" /></div>
                    <div style={{ marginBottom: "1rem" }}><label style={labelStyle}>Industry / Sector</label><input style={inputStyle} value={form.industry} onChange={e => setField("industry", e.target.value)} placeholder="Private Equity, Technology, Real Estate…" /></div>
                    <div style={{ marginBottom: "1rem" }}><label style={labelStyle}>LinkedIn Profile URL</label><input style={inputStyle} value={form.linkedIn} onChange={e => setField("linkedIn", e.target.value)} placeholder="https://linkedin.com/in/yourprofile" /></div>
                  </div>
                )}

                {/* STEP 3 — Capital Range */}
                {step === 3 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "0.75rem" }}>Capital Position</h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "2rem" }}>
                      Please indicate your approximate investable assets or net worth. This information is treated in strict confidence and used solely for qualification purposes.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                      {CAPITAL_OPTIONS.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setField("capitalRange", opt)}
                          style={{
                            padding: "1.125rem 1.5rem", textAlign: "left", background: form.capitalRange === opt ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${form.capitalRange === opt ? GOLD : "rgba(201,168,76,0.12)"}`,
                            fontFamily: FONT_UI, fontSize: "0.9375rem", color: form.capitalRange === opt ? GOLD : "rgba(255,255,255,0.55)",
                            cursor: "pointer", transition: "all 0.2s",
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 — Ecosystem Interests */}
                {step === 4 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "0.75rem" }}>Ecosystem Interests</h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "2rem" }}>Select the verticals most relevant to your interests and objectives. Select as many as apply.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1px" }}>
                      {ECOSYSTEM_VERTICALS.map(v => (
                        <button
                          key={v}
                          onClick={() => toggleInterest(v)}
                          style={{
                            padding: "1rem", textAlign: "left", background: form.ecosystemInterests.includes(v) ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${form.ecosystemInterests.includes(v) ? GOLD : "rgba(201,168,76,0.1)"}`,
                            fontFamily: FONT_UI, fontSize: "0.8125rem", color: form.ecosystemInterests.includes(v) ? GOLD : "rgba(255,255,255,0.5)",
                            cursor: "pointer", transition: "all 0.2s",
                          }}
                        >
                          {form.ecosystemInterests.includes(v) ? "✦ " : ""}{v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5 — Aspirations */}
                {step === 5 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "0.75rem" }}>Aspirations</h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "2rem" }}>What would you like Billionaire Collection to make possible for you?</p>
                    <textarea style={textareaStyle} value={form.aspirations} onChange={e => setField("aspirations", e.target.value)} placeholder="Describe what you are seeking from membership — access, opportunity, connection, or something else entirely." />
                  </div>
                )}

                {/* STEP 6 — Contribution */}
                {step === 6 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "0.75rem" }}>Contribution</h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "2rem" }}>What knowledge, experience, relationships or perspective would you bring to the Billionaire Collection ecosystem?</p>
                    <textarea style={textareaStyle} value={form.contribution} onChange={e => setField("contribution", e.target.value)} placeholder="The most valued members contribute as much as they receive. Tell us what you would bring." />
                  </div>
                )}

                {/* STEP 7 — Personal Introduction */}
                {step === 7 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "0.75rem" }}>Personal Introduction</h3>
                    <p style={{ fontFamily: FONT_UI, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "2rem" }}>Tell us something about yourself that would not appear on a résumé.</p>
                    <textarea style={{ ...textareaStyle, minHeight: "140px" }} value={form.personalIntro} onChange={e => setField("personalIntro", e.target.value)} placeholder="This is your opportunity to speak directly to the people who will review your application. Be candid." />
                  </div>
                )}

                {/* STEP 8 — Review & Payment */}
                {step === 8 && (
                  <div>
                    <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 400, fontSize: "1.75rem", color: "#fff", marginBottom: "2rem" }}>Review & Payment</h3>

                    {/* Referral */}
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", padding: "1.5rem", marginBottom: "2rem" }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: GOLD, marginBottom: "1rem" }}>Referral (Optional)</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div><label style={labelStyle}>Referring Member Name</label><input style={inputStyle} value={form.referralName} onChange={e => setField("referralName", e.target.value)} placeholder="Full name" /></div>
                        <div><label style={labelStyle}>Referring Member Email</label><input style={inputStyle} type="email" value={form.referralEmail} onChange={e => setField("referralEmail", e.target.value)} placeholder="their@email.com" /></div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", padding: "1.5rem", marginBottom: "2rem" }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: GOLD, marginBottom: "1rem" }}>Application Summary</div>
                      {[
                        ["Name", `${form.firstName} ${form.lastName}`],
                        ["Email", form.email],
                        ["Country", form.country || "—"],
                        ["Role", form.occupation || "—"],
                        ["Capital Range", form.capitalRange || "—"],
                        ["Ecosystem Interests", form.ecosystemInterests.length ? form.ecosystemInterests.join(", ") : "—"],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <span style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</span>
                          <span style={{ fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Fee */}
                    <div style={{ background: "rgba(201,168,76,0.06)", border: `1px solid ${GOLD}`, padding: "1.75rem", marginBottom: "2rem", textAlign: "center" }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: GOLD, marginBottom: "0.75rem" }}>Application Fee</div>
                      <div style={{ fontFamily: FONT_HEADING, fontSize: "2.5rem", color: "#fff", fontWeight: 400 }}>$25,000 <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)" }}>USD</span></div>
                      <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", marginTop: "0.75rem", lineHeight: 1.7 }}>
                        Secure payment via Stripe. You will be redirected to complete payment. Your application data is saved before payment is collected.
                      </p>
                    </div>

                    {paymentStatus === "cancelled" && (
                      <div style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.3)", padding: "1rem 1.25rem", marginBottom: "1.5rem", fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,120,120,0.9)" }}>
                        Your payment was not completed. Your application data has been saved. Please try again when you are ready.
                      </div>
                    )}
                  </div>
                )}

                {/* Error */}
                {formError && (
                  <div style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.3)", padding: "1rem 1.25rem", marginTop: "1.5rem", fontFamily: FONT_UI, fontSize: "0.875rem", color: "rgba(255,120,120,0.9)" }}>
                    {formError}
                  </div>
                )}

                {/* Navigation */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2.5rem" }}>
                  <button
                    onClick={() => setStep(s => s - 1)}
                    style={{ fontFamily: FONT_UI, fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: "0.75rem 0" }}
                  >
                    ← Back
                  </button>
                  {step < TOTAL_STEPS ? (
                    <button onClick={handleNext} className="btn-gold" style={{ fontSize: "0.75rem", letterSpacing: "0.14em" }}>
                      Continue →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={applyMutation.isPending}
                      className="btn-gold"
                      style={{ fontSize: "0.75rem", letterSpacing: "0.14em", opacity: applyMutation.isPending ? 0.6 : 1 }}
                    >
                      {applyMutation.isPending ? "Preparing Payment…" : "Submit Application & Pay $25,000"}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ══ SECTION 9 — PRIVACY ══ */}
      <section style={{ padding: "4rem 0", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
          <FadeUp>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.9, marginBottom: "1rem" }}>
              All information submitted through this application is treated with absolute discretion. Your data is held securely by Billionaire Collection Ltd (128 City Road, London EC1V 2NX) and used solely for the purpose of evaluating your membership application. It will not be shared with third parties without your consent.
            </p>
            <Link href="/privacy" style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: GOLD, textDecoration: "none", letterSpacing: "0.1em" }}>
              Privacy Policy →
            </Link>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
