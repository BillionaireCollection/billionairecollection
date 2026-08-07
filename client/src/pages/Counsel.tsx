/* ============================================================
   BILLIONAIRE COLLECTION — Billionaire Counsel Page
   Ultra-premium legal advisory for UHNW individuals.
   ============================================================ */

import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Counsel() {
  useSEO({
    title: "Billionaire Counsel — Ultra-Premium Legal Advisory | A Billionaire Collection Company",
    description: "Billionaire Counsel is the ultra-premium legal advisory division of Billionaire Collection. Access the world's most elite legal minds for wealth structuring, asset protection, international tax planning, and complex cross-border transactions — exclusively for ultra-high-net-worth individuals.",
    keywords: "Billionaire Counsel, Billionaire Collection legal, UHNW legal advisory, wealth structuring, asset protection, international tax planning, private client law, ultra premium legal services, Billionaire Collection counsel",
    url: "https://billionairecollection.com/counsel",
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
          "item": "https://billionairecollection.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Billionaire Counsel",
          "item": "https://billionairecollection.com/counsel",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Billionaire Counsel — Ultra-Premium Legal Advisory",
      "description": "Billionaire Counsel is the ultra-premium legal advisory division of Billionaire Collection, the world's premier luxury ecosystem for ultra-high-net-worth individuals.",
      "url": "https://billionairecollection.com/counsel",
      "serviceType": "Ultra-Premium Legal Advisory",
      "provider": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://billionairecollection.com",
      },
      "areaServed": "Worldwide",
      "parentOrganization": {
        "@type": "Organization",
        "name": "Billionaire Collection",
        "url": "https://billionairecollection.com",
      },
    },
  ]);

  return (
    <DivisionPage
      badge="Billionaire Counsel"
      heroTitle="Legal Mastery at"
      heroAccent="the Highest Level"
      heroSubtitle="The ultra-premium legal advisory division of Billionaire Collection — connecting ultra-high-net-worth individuals with the world's most elite legal minds for wealth structuring, asset protection, and complex cross-border transactions."
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/VwUGnELdcTIZDXDK.jpg"
      heroCta={{ label: "Request a Consultation", href: "/concierge" }}
      heroCtaSecondary={{ label: "Learn More", href: "/services" }}
      aboutTitle="Counsel Reserved for Those Who Operate at the Pinnacle"
      aboutBody={[
        "Billionaire Counsel provides ultra-high-net-worth individuals with access to the world's most elite private client lawyers, wealth structuring specialists, and cross-border legal advisors — through a single, discreet point of contact.",
        "Our network spans the leading private client practices across London, New York, Geneva, Dubai, and Singapore. We connect clients with specialists in international tax planning, trust and estate structuring, family office governance, complex asset protection, and high-value dispute resolution.",
        "Every engagement is conducted with absolute confidentiality. Whether you require urgent legal counsel on a multi-jurisdictional transaction, long-term wealth structuring advice, or representation in a sensitive matter, Billionaire Counsel provides the calibre of legal expertise that the world's most significant fortunes demand.",
      ]}
      features={[
        { icon: "🏛️", title: "Wealth Structuring", desc: "Bespoke trust, foundation, and holding structures designed to protect and perpetuate generational wealth" },
        { icon: "🌍", title: "Cross-Border Transactions", desc: "Expert counsel on complex multi-jurisdictional deals, acquisitions, and international asset transfers" },
        { icon: "🛡️", title: "Asset Protection", desc: "Comprehensive strategies to shield assets from litigation, regulatory risk, and political instability" },
        { icon: "📋", title: "Estate & Succession Planning", desc: "Sophisticated succession frameworks ensuring seamless wealth transfer across generations" },
        { icon: "💼", title: "Family Office Governance", desc: "Legal architecture for family offices, investment vehicles, and private holding structures" },
        { icon: "⚖️", title: "Dispute Resolution", desc: "Discreet representation in high-value commercial disputes, arbitration, and sensitive personal matters" },
      ]}
      listings={[
        {
          title: "Wealth Structuring Review",
          sub: "Comprehensive audit of existing structures with recommendations for optimisation across all jurisdictions",
          price: "From $50,000",
          img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/bfisuZeLSolsuwIP.jpg",
          tag: "Flagship",
        },
        {
          title: "Cross-Border Transaction Advisory",
          sub: "End-to-end legal counsel for complex international acquisitions, mergers, and asset transfers",
          price: "POA",
          img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/VwUGnELdcTIZDXDK.jpg",
          tag: "Bespoke",
        },
        {
          title: "Annual Retainer Programme",
          sub: "Priority access to our full network of elite private client lawyers — on-demand, year-round",
          price: "POA",
          img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/bfisuZeLSolsuwIP.jpg",
          tag: "Members Only",
        },
      ]}
      listingsTitle="Advisory Services"
      ctaBanner={{
        title: "Protect What You Have Built",
        sub: "Our legal specialists will connect you with the world's most elite private client counsel — tailored to your specific circumstances, delivered with absolute discretion.",
        btnLabel: "Request a Private Consultation",
        btnHref: "/concierge",
      }}
      partnerLogos={[
        "Withers LLP",
        "Boodle Hatfield",
        "Macfarlanes",
        "Harneys",
        "Appleby",
        "Linklaters",
      ]}
    />
  );
}
