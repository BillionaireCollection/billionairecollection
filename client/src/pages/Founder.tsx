/* ============================================================
   BILLIONAIRE COLLECTION — Founder Page
   Lawrence Colbert | Founder & CEO
   Cinematic luxury magazine editorial layout.
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

/* ── Founder portrait — replace src with actual portrait URL when available ── */
const FOUNDER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";

/* ── Reusable fade-up animation ── */
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Gold divider ── */
function GoldDivider() {
  return (
    <div
      style={{
        width: "48px",
        height: "1px",
        background: GOLD,
        margin: "0 auto",
        opacity: 0.7,
      }}
    />
  );
}

/* ── Section label ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: FONT_UI,
        fontWeight: 700,
        fontSize: "0.6rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: GOLD,
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </p>
  );
}

/* ── Pull quote ── */
function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: `2px solid ${GOLD}`,
        paddingLeft: "1.5rem",
        margin: "2.5rem 0",
        fontFamily: FONT_HEADING,
        fontStyle: "italic",
        fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.88)",
      }}
    >
      {children}
    </blockquote>
  );
}

/* ── Body paragraph ── */
function BodyP({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontFamily: FONT_UI,
        fontWeight: 400,
        fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
        lineHeight: 1.8,
        color: "rgba(255,255,255,0.72)",
        marginBottom: "1.4rem",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/* ── Section heading ── */
function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: FONT_HEADING,
        fontWeight: 700,
        fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
        lineHeight: 1.2,
        color: "#fff",
        marginBottom: "1.5rem",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

/* ── Timeline data ── */
const TIMELINE = [
  { stage: "01", label: "United States Origins", desc: "Born and raised in the United States, shaped by a culture of ambition, resilience, and self-determination." },
  { stage: "02", label: "Military Service", desc: "Served in the United States military, developing discipline, leadership, and an unshakeable commitment to excellence." },
  { stage: "03", label: "United Kingdom", desc: "Relocated to the United Kingdom to pursue business development, establishing roots in one of the world's great commercial centres." },
  { stage: "04", label: "Recording Career", desc: "Entered the international music industry as a recording artist, gaining first-hand experience of global media, branding, and entertainment." },
  { stage: "05", label: "Sales & Consulting", desc: "Built a distinguished career in sales, commercial training, and consulting — mastering the art of persuasion, value creation, and enterprise growth." },
  { stage: "06", label: "BILLIONAIRE Brand", desc: "Created the BILLIONAIRE brand, establishing a distinctive identity at the intersection of wealth, aspiration, and lifestyle." },
  { stage: "07", label: "Billionaire Magazine", desc: "Founded Billionaire Magazine in London — a landmark publication serving the global ultra-high-net-worth community." },
  { stage: "08", label: "Billionaire University", desc: "Launched Billionaire University, a structured education platform designed to close the gap between inspiration and implementation for entrepreneurs worldwide." },
  { stage: "09", label: "The Ecosystem", desc: "Formed the Billionaire Collection — an integrated ecosystem spanning brokerage, media, education, products, and services for the world's most successful individuals." },
  { stage: "10", label: "Golden Ticket Club", desc: "Developed the Golden Ticket Club and Billionaire Giving — combining access, recognition, and purposeful philanthropy within a single membership framework." },
  { stage: "11", label: "Global Expansion", desc: "Established a permanent dual presence between the United Kingdom and South Florida, positioning the Billionaire Collection at the heart of two of the world's most dynamic UHNW markets." },
];

/* ── Ecosystem divisions ── */
const ECOSYSTEM = [
  { label: "Billionaire Magazine", href: "/magazine" },
  { label: "Billionaire Television", href: "/television" },
  { label: "Billionaires Radio", href: "/radio" },
  { label: "Billionaire University", href: "/university" },
  { label: "Billionaire Digital", href: null },
  { label: "Billionaire Counsel", href: "/counsel" },
  { label: "Billionaire Funding", href: "/funding" },
  { label: "Billionaire Estates", href: "/estates" },
  { label: "Billionaire Air", href: "/air" },
  { label: "Billionaire Boat", href: "/boat" },
  { label: "Billionaire Car", href: "/car" },
  { label: "Billionaire Card", href: "/card" },
  { label: "Billionaire Vitality", href: "/vitality" },
  { label: "Billionaire Longevity", href: null },
  { label: "Billionaire Art", href: "/art" },
  { label: "Billionaire Golf", href: "/golf" },
  { label: "Billionaire Oud", href: "/oud" },
  { label: "Billionaire Cigar", href: "/cigar" },
  { label: "Billionaire Giving", href: null },
  { label: "Golden Ticket Club", href: "/golden-ticket" },
];

/* ── Leadership principles ── */
const PRINCIPLES = [
  "VISION BEFORE VALIDATION",
  "PURPOSE BEFORE POPULARITY",
  "OWNERSHIP BEFORE ENTITLEMENT",
  "SERVICE BEFORE RECOGNITION",
  "LEGACY BEFORE CONSUMPTION",
];

/* ── YouTube lazy facade ── */
function VideoEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        background: "#0a0a0a",
        cursor: loaded ? "default" : "pointer",
        overflow: "hidden",
      }}
      onClick={() => setLoaded(true)}
      role={loaded ? undefined : "button"}
      aria-label={loaded ? undefined : "Play interview video"}
    >
      {!loaded ? (
        <>
          {/* Thumbnail facade */}
          <img
            src={`https://img.youtube.com/vi/wwkUQ221cpI/maxresdefault.jpg`}
            alt="Lawrence Colbert interview on the changing geography of global wealth — click to play"
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.75,
            }}
          />
          {/* Play button */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.75)",
              border: `2px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={GOLD}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </>
      ) : (
        <iframe
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          src="https://www.youtube-nocookie.com/embed/wwkUQ221cpI?rel=0&modestbranding=1&playsinline=1&autoplay=1"
          title="Lawrence Colbert interview on the changing geography of global wealth"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function Founder() {
  /* ── SEO ── */
  useSEO({
    title: "Lawrence Colbert | Founder and CEO of Billionaire Collection",
    description:
      "Meet Lawrence Colbert, Founder and CEO of Billionaire Collection, the global ecosystem spanning luxury, media, education, wealth and legacy.",
    keywords:
      "Lawrence Colbert, Billionaire Collection founder, CEO Billionaire Collection, UHNW entrepreneur, luxury ecosystem founder, Billionaire Magazine founder, Billionaire University",
    image: FOUNDER_IMG,
    url: "https://billionairecollection.com/founder",
  });

  /* ── JSON-LD ── */
  useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Lawrence Colbert",
      jobTitle: "Founder and Chief Executive Officer",
      url: "https://billionairecollection.com/founder",
      image: FOUNDER_IMG,
      worksFor: {
        "@type": "Organization",
        name: "Billionaire Collection",
        url: "https://billionairecollection.com/",
      },
      sameAs: [
        "https://uk.linkedin.com/in/lawrencecolbert",
        "https://x.com/CeoLawrence",
        "https://www.instagram.com/ceolawrence/",
      ],
      knowsAbout: [
        "Entrepreneurship",
        "Media",
        "Luxury brands",
        "Sales",
        "Business education",
        "Wealth creation",
        "Strategic advisory",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://billionairecollection.com/" },
        { "@type": "ListItem", position: 2, name: "Founder", item: "https://billionairecollection.com/founder" },
      ],
    },
  ]);

  const maxW = "820px";
  const sectionPad = "clamp(4rem, 8vw, 7rem) 1.25rem";

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Background portrait */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${FOUNDER_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
          aria-hidden="true"
        />
        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.2) 100%)",
          }}
          aria-hidden="true"
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
          aria-hidden="true"
        />

        {/* Hero content */}
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              style={{
                fontFamily: FONT_UI,
                fontWeight: 700,
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: "1.5rem",
                border: `1px solid rgba(201,168,76,0.35)`,
                display: "inline-block",
                padding: "6px 14px",
              }}
            >
              Founder of the Billionaire Collection
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 700,
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#fff",
              marginBottom: "1.25rem",
            }}
          >
            Lawrence
            <br />
            <span style={{ color: GOLD }}>Colbert</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontFamily: FONT_UI,
              fontWeight: 600,
              fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "0.75rem",
            }}
          >
            Founder and Chief Executive Officer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: FONT_HEADING,
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "2.5rem",
              maxWidth: "520px",
            }}
          >
            Architect of a global ecosystem built around wealth, knowledge, access and legacy.
          </motion.p>

          <motion.a
            href="#biography"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: "inline-block",
              fontFamily: FONT_UI,
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: GOLD,
              border: `1px solid rgba(201,168,76,0.5)`,
              padding: "14px 32px",
              textDecoration: "none",
              transition: "background 0.25s ease, color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = GOLD;
              (e.currentTarget as HTMLElement).style.color = "#000";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = GOLD;
            }}
          >
            Discover the Vision
          </motion.a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          1. OPENING STATEMENT + PULL QUOTE
          ══════════════════════════════════════════════════════ */}
      <section id="biography" style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>Opening Statement</SectionLabel>
            <GoldDivider />
            <div style={{ height: "2rem" }} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Lawrence Colbert is the Founder and Chief Executive Officer of the Billionaire Collection — a global luxury and education ecosystem that spans media, brokerage, lifestyle, technology, and philanthropy. Built over more than two decades of entrepreneurial endeavour, the Billionaire Collection stands today as one of the most ambitious and distinctive platforms ever created for ultra-high-net-worth individuals and the aspirational communities that surround them.
            </BodyP>
            <PullQuote>
              "I did not build the Billionaire Collection to impress the world. I built it to serve the world's most exceptional people — and to create a pathway for the next generation to join them."
            </PullQuote>
            <BodyP>
              Lawrence's journey is not the story of inherited privilege or institutional advantage. It is the story of a man who chose, at every crossroads, to build rather than wait — to create rather than consume — and to lead rather than follow. The Billionaire Collection is the living expression of that philosophy.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. FROM ADVERSITY TO ENTERPRISE
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>From Adversity to Enterprise</SectionLabel>
            <SectionH2>Built from the Ground Up</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Lawrence Colbert was born and raised in the United States, shaped by an environment that demanded resilience, resourcefulness, and an unwavering belief in one's own potential. From an early age, he understood that the path to extraordinary achievement required not merely talent, but the willingness to endure, adapt, and persist when others would retreat.
            </BodyP>
            <BodyP>
              His formative years instilled in him a set of values that would define every enterprise he would later build: a commitment to excellence that admits no shortcuts, a respect for the dignity of hard work, and a conviction that genuine success is always earned — never given. These were not abstract principles. They were lessons learned through lived experience, through difficulty, and through the quiet determination to rise regardless of circumstance.
            </BodyP>
            <BodyP>
              It is this foundation — forged in adversity rather than comfort — that gives the Billionaire Collection its distinctive character. Lawrence did not design a luxury ecosystem from the outside looking in. He built it from the inside out, with the knowledge of someone who has navigated the full spectrum of human ambition, from struggle to achievement, from aspiration to realisation.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. THE ENTREPRENEUR
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>The Entrepreneur</SectionLabel>
            <SectionH2>A Commercial Mind Forged in the Field</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Before the Billionaire Collection became a global ecosystem, Lawrence Colbert spent years mastering the fundamentals of commerce. His career in sales, commercial training, and consulting gave him a rare and invaluable education — one that no business school can replicate. He learned how value is created and communicated, how trust is built and maintained, and how organisations grow from single transactions into enduring enterprises.
            </BodyP>
            <PullQuote>
              "Sales is not a profession. It is the fundamental skill of civilisation. Every great leader, every great builder, every great artist — they all understood how to move people toward a vision."
            </PullQuote>
            <BodyP>
              This commercial foundation would prove essential. When Lawrence began building the Billionaire brand, he did not approach it as a creative exercise. He approached it as a business architect — identifying underserved markets, designing products and services that delivered genuine value, and building systems that could scale without sacrificing quality.
            </BodyP>
            <BodyP>
              His consulting work brought him into contact with organisations and individuals across multiple industries and geographies, deepening his understanding of how wealth is created, managed, and deployed at the highest levels. It was during this period that the vision for the Billionaire Collection began to crystallise — not as a single brand, but as an entire ecosystem.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. THE RECORDING ARTIST
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>The Recording Artist</SectionLabel>
            <SectionH2>Where Creativity Meets Commerce</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Lawrence Colbert's journey into the international music industry as a recording artist gave him a dimension of experience that few entrepreneurs possess. The music business is, at its core, a masterclass in brand building, audience cultivation, and the economics of attention — and Lawrence absorbed every lesson.
            </BodyP>
            <BodyP>
              His time in the recording industry exposed him to the global machinery of entertainment: the way narratives are constructed, the way audiences are engaged, and the way a single creative identity can transcend geography and culture to achieve international resonance. These were insights that would later inform every aspect of the Billionaire Collection's media strategy.
            </BodyP>
            <BodyP>
              The experience also reinforced a conviction that would become central to his leadership philosophy: that the most powerful brands are not built on products alone, but on stories, on identity, and on the emotional connection between a creator and their audience. The Billionaire brand, from its earliest incarnation, was conceived as exactly that — a story worth telling, and a community worth belonging to.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. THE BIRTH OF BILLIONAIRE
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>The Birth of Billionaire</SectionLabel>
            <SectionH2>A Name That Carries a Philosophy</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              The creation of the BILLIONAIRE brand was not an act of vanity. It was an act of intention. Lawrence Colbert chose the name with deliberate purpose — to signal a standard of ambition, a quality of aspiration, and a commitment to the extraordinary that would distinguish everything built beneath its banner.
            </BodyP>
            <BodyP>
              In a world saturated with luxury brands that sell aesthetics without substance, Lawrence set out to build something different: a brand that stood for genuine achievement, for the pursuit of mastery, and for the belief that the highest levels of success are accessible to those willing to pursue them with sufficient intelligence, discipline, and determination.
            </BodyP>
            <PullQuote>
              "Billionaire is not a number. It is a mindset. It is the decision to pursue excellence without apology, to build without limitation, and to leave something behind that outlasts you."
            </PullQuote>
            <BodyP>
              The BILLIONAIRE brand launched in the United Kingdom, establishing its home in London — one of the world's great centres of finance, culture, and global commerce. From this foundation, Lawrence began building the architecture of what would eventually become the Billionaire Collection: a multi-division ecosystem serving the full spectrum of ultra-high-net-worth life.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. BUILDING THE BILLIONAIRE COLLECTION
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>Building the Billionaire Collection</SectionLabel>
            <SectionH2>An Ecosystem, Not a Brand</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Most luxury companies build a single brand and extend it horizontally. Lawrence Colbert chose a different architecture. From the outset, he conceived the Billionaire Collection as an integrated ecosystem — a network of interconnected divisions, each serving a distinct dimension of ultra-high-net-worth life, but all united by a shared identity, a shared standard, and a shared purpose.
            </BodyP>
            <BodyP>
              The result is an organisation unlike any other in the luxury sector. The Billionaire Collection today encompasses brokerage services for the world's most extraordinary assets — estates, superyachts, private aircraft, rare automobiles, fine art, and ultra-rare timepieces — alongside a media platform, an education institution, a product range, a concierge membership, and a philanthropic initiative.
            </BodyP>
            <BodyP>
              Each division was built with the same discipline that Lawrence applied to every enterprise in his career: a clear understanding of the market, a relentless focus on quality, and a commitment to delivering genuine value to the clients and communities it serves. The Billionaire Collection is not a portfolio of brands. It is a single, coherent vision expressed across multiple dimensions.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. BILLIONAIRE UNIVERSITY
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>Billionaire University</SectionLabel>
            <SectionH2>Closing the Gap Between Inspiration and Implementation</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Of all the divisions within the Billionaire Collection, Billionaire University holds a particular significance for Lawrence Colbert. It represents the most direct expression of his core conviction: that the greatest obstacle to extraordinary achievement is not a lack of talent, ambition, or even capital — it is a lack of structured, practical knowledge about how to build wealth, how to scale enterprises, and how to navigate the complex landscape of modern commerce.
            </BodyP>
            <BodyP>
              Billionaire University was designed to address this gap with precision. It is not a motivational platform. It is not a collection of inspirational content. It is a structured educational institution, built around the real-world frameworks, systems, and strategies that have produced genuine, measurable success for entrepreneurs and business leaders across multiple industries and geographies.
            </BodyP>
            <PullQuote>
              "Every year, millions of people watch billionaire interviews, take notes, feel inspired — and then nothing changes. The inspiration fades within 48 hours. The gap between understanding and execution stays exactly where it was. Billionaire University was built to close that gap."
            </PullQuote>
            <BodyP>
              The curriculum draws on Lawrence's own experience as an entrepreneur, consultant, and business builder, as well as the collective wisdom of the Billionaire Collection's global network of advisers, operators, and subject-matter experts. It is education designed not for the classroom, but for the boardroom, the deal table, and the marketplace.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. A MEDIA PLATFORM WITH GLOBAL REACH
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>A Media Platform with Global Reach</SectionLabel>
            <SectionH2>The Voice of the Global Elite</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              The Billionaire Collection's media division — encompassing Billionaire Magazine, Billionaire Television, and Billionaires Radio — represents one of the most distinctive media platforms serving the ultra-high-net-worth community anywhere in the world. Founded in London, Billionaire Magazine established the editorial voice that would define the entire ecosystem: authoritative, intelligent, and uncompromisingly premium.
            </BodyP>
            <BodyP>
              Lawrence understood from the beginning that media was not merely a marketing channel. It was a platform for ideas, a forum for the exchange of intelligence, and a means of building the kind of trust and authority that no advertising campaign can manufacture. The Billionaire Collection's media properties have, over the years, become genuine destinations for the world's most successful individuals — people who expect their media to match the standard of everything else in their lives.
            </BodyP>
            <BodyP>
              Billionaire Television and Billionaires Radio extended this reach into new formats, bringing the Billionaire Collection's editorial perspective to audiences across digital and broadcast platforms worldwide. Together, the media division represents a significant and growing influence on the conversation about wealth, success, and the future of the global economy.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. FEATURED INTERVIEW (VIDEO)
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <SectionLabel>Featured Interview</SectionLabel>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                A Global Shift in Wealth
              </h2>
              <GoldDivider />
              <p
                style={{
                  fontFamily: FONT_UI,
                  fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: "1.5rem",
                  maxWidth: "600px",
                  margin: "1.5rem auto 0",
                  lineHeight: 1.7,
                }}
              >
                In this featured interview, Lawrence Colbert discusses the changing geography of global wealth and the historic moment when China emerged as home to more billionaires than the United States.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div
              style={{
                border: `1px solid rgba(201,168,76,0.2)`,
                overflow: "hidden",
              }}
            >
              <VideoEmbed />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. THE GOLDEN TICKET PHILOSOPHY
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>The Golden Ticket Philosophy</SectionLabel>
            <SectionH2>Access, Recognition, Connection and Contribution</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              The Golden Ticket Club is perhaps the most personal expression of Lawrence Colbert's philosophy. It was conceived not as a membership programme in the conventional sense, but as a framework for bringing together the world's most exceptional individuals — those who have achieved extraordinary success and those who are committed to using their knowledge, resources, and influence to create meaningful change in the world.
            </BodyP>
            <BodyP>
              The Golden Ticket represents four things simultaneously: access to the Billionaire Collection's full ecosystem of services and opportunities; recognition of the achievement and character that qualifies a member for inclusion; connection to a global network of peers, advisers, and collaborators; and contribution to a broader mission of purposeful wealth creation and philanthropic impact.
            </BodyP>
            <PullQuote>
              "The Golden Ticket is not a reward for wealth. It is an invitation to a community defined by purpose — people who understand that the greatest measure of success is not what you accumulate, but what you create for others."
            </PullQuote>
            <BodyP>
              Billionaire Giving, the philanthropic arm of the Billionaire Collection, operates in close partnership with the Golden Ticket Club — channelling the collective resources and influence of the membership toward initiatives that create lasting, measurable impact in communities around the world.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. LEADERSHIP PHILOSOPHY
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>Leadership Philosophy</SectionLabel>
            <SectionH2>How Lawrence Leads</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Lawrence Colbert's approach to leadership is shaped by the same principles that have guided every enterprise he has built. He leads from the front — not from behind a title or a hierarchy, but through the quality of his decisions, the clarity of his vision, and the consistency of his standards.
            </BodyP>
            <BodyP>
              He believes that the leader's primary obligation is not to manage people, but to create the conditions in which exceptional people can do their best work. This means setting a standard that is unambiguous and uncompromising, providing the resources and the freedom to pursue excellence, and holding every member of the organisation — including himself — accountable to the same measure.
            </BodyP>
            <BodyP>
              Lawrence is known within the Billionaire Collection for a leadership style that combines high expectations with genuine respect for the individuals who meet them. He does not tolerate mediocrity, but he invests deeply in the development of the people around him — because he understands that the quality of an organisation is ultimately determined not by its founder, but by the team that carries the vision forward.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LEADERSHIP PRINCIPLES BLOCK
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel>Five Principles</SectionLabel>
              <GoldDivider />
            </div>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1px",
              background: "rgba(201,168,76,0.12)",
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <FadeUp key={p} delay={i * 0.08}>
                <div
                  style={{
                    background: "#000",
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: FONT_UI,
                      fontWeight: 800,
                      fontSize: "clamp(0.65rem, 1.2vw, 0.78rem)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: GOLD,
                      lineHeight: 1.6,
                    }}
                  >
                    {p}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          12. A VISION BEYOND LUXURY
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>A Vision Beyond Luxury</SectionLabel>
            <SectionH2>The Bigger Picture</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              The Billionaire Collection is, on its surface, a luxury ecosystem. But Lawrence Colbert has always understood it as something more than that. Luxury, in his conception, is not an end in itself. It is a language — a means of communicating a standard of excellence, a level of aspiration, and a quality of experience that resonates with the world's most discerning individuals.
            </BodyP>
            <BodyP>
              The deeper purpose of the Billionaire Collection is to serve as a platform for the creation and preservation of extraordinary lives — lives defined not merely by material wealth, but by the quality of relationships, the depth of knowledge, the breadth of experience, and the significance of contribution. Lawrence believes that the truly wealthy are those who have mastered not just the accumulation of assets, but the art of living with intention, purpose, and impact.
            </BodyP>
            <BodyP>
              This is the vision that animates every division of the Billionaire Collection — from the brokerage services that help clients acquire the world's most extraordinary assets, to the educational programmes that equip the next generation of entrepreneurs with the knowledge and frameworks to build their own extraordinary lives.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VISUAL TIMELINE
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a", overflowX: "hidden" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <SectionLabel>The Journey</SectionLabel>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                Eleven Stages of a Global Vision
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>
          <div style={{ position: "relative" }}>
            {/* Vertical gold line */}
            <div
              style={{
                position: "absolute",
                left: "calc(50% - 0.5px)",
                top: 0,
                bottom: 0,
                width: "1px",
                background: `linear-gradient(to bottom, transparent, ${GOLD}55, transparent)`,
              }}
              aria-hidden="true"
            />
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <FadeUp key={item.stage} delay={i * 0.06}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 48px 1fr",
                      gap: "0",
                      marginBottom: "2.5rem",
                      alignItems: "center",
                    }}
                  >
                    {/* Left content */}
                    <div
                      style={{
                        textAlign: "right",
                        paddingRight: "2rem",
                        opacity: isLeft ? 1 : 0,
                        pointerEvents: isLeft ? "auto" : "none",
                      }}
                    >
                      {isLeft && (
                        <>
                          <p style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.4rem", textTransform: "uppercase" }}>
                            {item.label}
                          </p>
                          <p style={{ fontFamily: FONT_UI, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                            {item.desc}
                          </p>
                        </>
                      )}
                    </div>
                    {/* Centre dot */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "#000",
                          border: `1.5px solid ${GOLD}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.55rem", color: GOLD, letterSpacing: "0.05em" }}>
                          {item.stage}
                        </span>
                      </div>
                    </div>
                    {/* Right content */}
                    <div
                      style={{
                        paddingLeft: "2rem",
                        opacity: !isLeft ? 1 : 0,
                        pointerEvents: !isLeft ? "auto" : "none",
                      }}
                    >
                      {!isLeft && (
                        <>
                          <p style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.4rem", textTransform: "uppercase" }}>
                            {item.label}
                          </p>
                          <p style={{ fontFamily: FONT_UI, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                            {item.desc}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
          {/* Mobile-friendly stacked version (hidden on desktop via media query approach) */}
          <style>{`
            @media (max-width: 640px) {
              .timeline-desktop { display: none !important; }
              .timeline-mobile { display: block !important; }
            }
            @media (min-width: 641px) {
              .timeline-mobile { display: none !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Mobile timeline (stacked) */}
      <section className="timeline-mobile" style={{ padding: sectionPad, background: "#0a0a0a", display: "none" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {TIMELINE.map((item, i) => (
            <FadeUp key={`mob-${item.stage}`} delay={i * 0.05}>
              <div style={{ display: "flex", gap: "1.25rem", marginBottom: "2rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: "36px", height: "36px", borderRadius: "50%", background: "#000", border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.55rem", color: GOLD }}>{item.stage}</span>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_UI, fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.3rem", textTransform: "uppercase" }}>{item.label}</p>
                  <p style={{ fontFamily: FONT_UI, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. THE MISSION
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>The Mission</SectionLabel>
            <SectionH2>For Everything You Desire</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              The mission of the Billionaire Collection is expressed in four words that have become the defining statement of the entire ecosystem: <em style={{ color: GOLD }}>For Everything You Desire</em>. This is not a marketing slogan. It is a commitment — a promise that the Billionaire Collection will continue to build, expand, and evolve until it can genuinely serve every dimension of an extraordinary life.
            </BodyP>
            <BodyP>
              Lawrence Colbert has never been satisfied with what has already been built. The Billionaire Collection today is larger, more integrated, and more impactful than it has ever been — but it is also, in Lawrence's view, still in its early stages. The divisions that exist today represent the foundation of a much larger architecture: one that will, in time, encompass every domain of ultra-high-net-worth life, from the acquisition of extraordinary assets to the creation of extraordinary legacies.
            </BodyP>
            <BodyP>
              The mission is not simply to serve the world's wealthiest individuals. It is to raise the standard of what is possible — to demonstrate that a business can be built with integrity, that luxury can be delivered with purpose, and that success, at the highest level, is always in service of something greater than itself.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ECOSYSTEM SECTION
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel>The Ecosystem</SectionLabel>
              <h2
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                Twenty Divisions. One Vision.
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1px",
              background: "rgba(201,168,76,0.1)",
            }}
          >
            {ECOSYSTEM.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.03}>
                {item.href ? (
                  <Link href={item.href}>
                    <div
                      style={{
                        background: "#000",
                        padding: "1.5rem 1.25rem",
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                        borderBottom: `1px solid rgba(201,168,76,0.06)`,
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.07)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#000")
                      }
                    >
                      <p
                        style={{
                          fontFamily: FONT_UI,
                          fontWeight: 600,
                          fontSize: "0.72rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.82)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.label}
                      </p>
                      <span style={{ color: GOLD, fontSize: "0.6rem", opacity: 0.7 }}>›</span>
                    </div>
                  </Link>
                ) : (
                  <div
                    style={{
                      background: "#000",
                      padding: "1.5rem 1.25rem",
                      borderBottom: `1px solid rgba(201,168,76,0.06)`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: FONT_UI,
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.38)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.label}
                    </p>
                    <span
                      style={{
                        fontFamily: FONT_UI,
                        fontSize: "0.55rem",
                        letterSpacing: "0.12em",
                        color: "rgba(201,168,76,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      Coming Soon
                    </span>
                  </div>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          14. A LIVING LEGACY
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>A Living Legacy</SectionLabel>
            <SectionH2>What Endures</SectionH2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyP>
              Lawrence Colbert thinks about legacy differently from most. For him, a legacy is not something you leave behind when you are gone. It is something you build while you are here — in the quality of the work you produce, the people you develop, the standards you set, and the communities you create.
            </BodyP>
            <BodyP>
              The Billionaire Collection is, in this sense, a living legacy — an organisation that grows, evolves, and creates value with every passing year. Every new division launched, every client served, every student educated, every asset brokered, and every philanthropic initiative funded adds another layer to a legacy that Lawrence intends to be both enduring and expanding.
            </BodyP>
            <PullQuote>
              "I want the Billionaire Collection to outlast me. I want it to be the institution that the next generation of extraordinary individuals turns to — not because of what I built, but because of what we built together."
            </PullQuote>
            <BodyP>
              This is the ultimate ambition of the Billionaire Collection: to become an institution — one that stands, decades from now, as the definitive global platform for extraordinary lives, built on the foundation of one man's refusal to accept anything less than the extraordinary.
            </BodyP>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GOLDEN TICKET SECTION
          ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: sectionPad,
          background: "#0a0a0a",
          borderTop: `1px solid rgba(201,168,76,0.15)`,
          borderBottom: `1px solid rgba(201,168,76,0.15)`,
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <SectionLabel>Wealth with Purpose</SectionLabel>
            <h2
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#fff",
                marginBottom: "1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              The Golden Ticket
            </h2>
            <GoldDivider />
            <p
              style={{
                fontFamily: FONT_UI,
                fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.65)",
                margin: "2rem 0 2.5rem",
              }}
            >
              The Golden Ticket represents access, recognition, connection and contribution. It brings together exceptional individuals who have achieved success and those who use their knowledge, resources or influence to create meaningful change.
            </p>
            <Link href="/golden-ticket">
              <button
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#000",
                  background: GOLD,
                  border: "none",
                  padding: "16px 40px",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Discover the Golden Ticket Club
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING SIGNATURE + CTAs
          ══════════════════════════════════════════════════════ */}
      <section style={{ padding: sectionPad, background: "#000", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <FadeUp>
            <GoldDivider />
            <div style={{ margin: "3rem 0 2rem" }}>
              <p
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#fff",
                  letterSpacing: "0.04em",
                  marginBottom: "0.5rem",
                }}
              >
                Lawrence Colbert
              </p>
              <p
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 600,
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "0.3rem",
                }}
              >
                Founder and Chief Executive Officer
              </p>
              <p
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 700,
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: "0.3rem",
                }}
              >
                Billionaire Collection
              </p>
              <p
                style={{
                  fontFamily: FONT_HEADING,
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "0.75rem",
                }}
              >
                For Everything You Desire
              </p>
            </div>
            <GoldDivider />
          </FadeUp>

          <FadeUp delay={0.15}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <Link href="/">
                <button
                  style={{
                    fontFamily: FONT_UI,
                    fontWeight: 700,
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "transparent",
                    border: `1px solid rgba(201,168,76,0.45)`,
                    padding: "14px 28px",
                    cursor: "pointer",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = GOLD;
                    (e.currentTarget as HTMLElement).style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = GOLD;
                  }}
                >
                  Explore the Collection
                </button>
              </Link>
              <Link href="/university">
                <button
                  style={{
                    fontFamily: FONT_UI,
                    fontWeight: 700,
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "transparent",
                    border: `1px solid rgba(201,168,76,0.45)`,
                    padding: "14px 28px",
                    cursor: "pointer",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = GOLD;
                    (e.currentTarget as HTMLElement).style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = GOLD;
                  }}
                >
                  Discover Billionaire University
                </button>
              </Link>
              <Link href="/golden-ticket">
                <button
                  style={{
                    fontFamily: FONT_UI,
                    fontWeight: 700,
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#000",
                    background: GOLD,
                    border: `1px solid ${GOLD}`,
                    padding: "14px 28px",
                    cursor: "pointer",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Enter the Golden Ticket Club
                </button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
