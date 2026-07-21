import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Air() {
  useSEO({
    title: "Billionaire Air — Private Aviation | A Billionaire Collection Company",
    description: "Billionaire Air is the private aviation division of Billionaire Collection, the parent company behind the world's premier luxury ecosystem. Charter or acquire Gulfstream, Bombardier, and Dassault Falcon aircraft through Billionaire Collection's dedicated aviation brokerage.",
    keywords: "Billionaire Air, Billionaire Collection aviation, private jet charter, private jet acquisition, Gulfstream charter, Bombardier jet, Dassault Falcon, UHNW aviation, Billionaire Collection flight, luxury aviation group",
  });
  useJsonLd([
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Billionaire Collection",
        "item": "https://billionairecollection.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Billionaire Air",
        "item": "https://billionairecollection.com/air"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Air \u2014 Private Aviation Charter & Acquisition",
    "description": "Billionaire Air is the private aviation division of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/air",
    "serviceType": "Private Aviation",
    "provider": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "areaServed": "Worldwide",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
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
    { title: "Bombardier Global 7500", sub: "London to Sydney Non-Stop", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bombardier-global-7500_695fc715.png", tag: "Charter" },
    { title: "Airbus ACJ320neo", sub: "VIP Airliner Conversion", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/acj320neo_8c266873.webp", tag: "New" }
]}
      listingsTitle="Featured Aircraft"
      ctaBanner={{ title: "Fly Without Compromise", sub: "Our aviation advisors are available 24/7 to arrange your next flight or guide your aircraft acquisition.", btnLabel: "Request a Flight", btnHref: "/card-concierge" }}
      partnerLogos={["Gulfstream", "Bombardier", "Dassault", "Airbus Corporate Jets", "Embraer"]}
    />
  );
}
