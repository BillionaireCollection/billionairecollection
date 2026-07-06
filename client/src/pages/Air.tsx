import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Air() {
  useSEO({
    title: "Private Aviation Charter & Aircraft Acquisition | Billionaire Air",
    description: "Charter or acquire private jets, turboprops, and helicopters through Billionaire Air. From on-demand empty-leg flights to full aircraft ownership — seamless, discreet, and global.",
    keywords: "private jet charter, aircraft acquisition, private aviation, empty leg flights, Gulfstream, Bombardier, Dassault Falcon, helicopter charter",
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Air — Private Aviation Charter & Acquisition",
    "description": "Charter or acquire private jets, turboprops, and helicopters — from on-demand empty-leg flights to full aircraft ownership. Gulfstream, Bombardier, Dassault Falcon, and more.",
    "url": "https://billionairecollection.com/air",
    "serviceType": "Private Aviation",
    "provider": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "areaServed": "Worldwide"
  });
  return (
    <DivisionPage
      badge="Billionaire Air"
      heroTitle="Private Aviation"
      heroAccent="Redefined"
      heroSubtitle="Charter, acquire, or manage the world's finest private jets — from Gulfstream G800 to Airbus ACJ — with complete discretion and unrivalled service."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-aviation-K37Bb2CGs26HxxPg9N8RhR.webp"
      heroCta={{ label: "Enquire Now", href: "/card-concierge" }}
      heroCtaSecondary={{ label: "View Listings", href: "/marketplace" }}
      aboutTitle="The Sky Is Not the Limit"
      aboutBody={[
  "Billionaire Air is the premier private aviation brokerage for ultra-high-net-worth individuals, offering aircraft acquisition, charter, management, and bespoke aviation solutions worldwide.",
  "Our fleet access spans the full spectrum of private aviation — from light jets for short hops to ultra-long-range aircraft capable of non-stop transoceanic flights. We also specialise in VIP airliner conversions for those who demand the ultimate in airborne luxury.",
  "With access to over 7,000 aircraft globally and relationships with every major OEM including Gulfstream, Bombardier, Dassault, and Airbus Corporate Jets, we deliver aviation solutions that are as unique as our clients."
]}
      features={[
    { icon: "✈", title: "Aircraft Acquisition", desc: "Purchase and ownership advisory" },
    { icon: "🛫", title: "Charter Services", desc: "On-demand global charter" },
    { icon: "🔧", title: "Fleet Management", desc: "Complete aircraft management" },
    { icon: "🌐", title: "Global Network", desc: "7,000+ aircraft worldwide" }
]}
      listings={[
    { title: "Gulfstream G800", sub: "Ultra-Long Range, 8,000nm", price: "POA", img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-aviation-K37Bb2CGs26HxxPg9N8RhR.webp", tag: "For Sale" },
    { title: "Bombardier Global 7500", sub: "London to Sydney Non-Stop", price: "POA", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", tag: "Charter" },
    { title: "Airbus ACJ320neo", sub: "VIP Airliner Conversion", price: "POA", img: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80", tag: "New" }
]}
      listingsTitle="Featured Aircraft"
      ctaBanner={{ title: "Fly Without Compromise", sub: "Our aviation advisors are available 24/7 to arrange your next flight or guide your aircraft acquisition.", btnLabel: "Request a Flight", btnHref: "/card-concierge" }}
      partnerLogos={["Gulfstream", "Bombardier", "Dassault", "Airbus Corporate Jets", "Embraer"]}
    />
  );
}
