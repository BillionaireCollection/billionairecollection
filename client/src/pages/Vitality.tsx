/* ============================================================
   BILLIONAIRE COLLECTION — Billionaire Vitality Page
   Ultra-premium wellness, longevity & biohacking for UHNW.
   ============================================================ */

import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Vitality() {
  useSEO({
    title: "Billionaire Vitality — Ultra-Premium Wellness & Longevity | A Billionaire Collection Company",
    description: "Billionaire Vitality is the ultra-premium wellness and longevity division of Billionaire Collection. Access the world's most advanced biohacking protocols, private longevity clinics, and bespoke health optimisation programmes designed exclusively for ultra-high-net-worth individuals.",
    keywords: "Billionaire Vitality, Billionaire Collection wellness, luxury longevity clinic, UHNW health optimisation, biohacking ultra premium, private wellness retreat, longevity medicine, Billionaire Collection health, executive wellness programme",
    url: "https://billionairecollection.com/vitality",
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
          "name": "Billionaire Vitality",
          "item": "https://billionairecollection.com/vitality",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Billionaire Vitality — Ultra-Premium Wellness & Longevity",
      "description": "Billionaire Vitality is the ultra-premium wellness and longevity division of Billionaire Collection, the world's premier luxury ecosystem for ultra-high-net-worth individuals.",
      "url": "https://billionairecollection.com/vitality",
      "serviceType": "Luxury Wellness & Longevity",
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
      badge="Billionaire Vitality"
      heroTitle="Optimise Your"
      heroAccent="Longevity"
      heroSubtitle="The ultra-premium wellness and longevity division of Billionaire Collection — delivering the world's most advanced biohacking protocols, private longevity clinics, and bespoke health optimisation programmes to ultra-high-net-worth individuals."
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/zxJZwfoQGaClWbjo.jpg"
      heroCta={{ label: "Begin Your Programme", href: "/concierge" }}
      heroCtaSecondary={{ label: "Learn More", href: "/technology" }}
      aboutTitle="The Science of Living Exceptionally"
      aboutBody={[
        "Billionaire Vitality operates at the intersection of cutting-edge longevity science and ultra-premium private healthcare. We curate and deliver the most advanced health optimisation programmes in existence — exclusively for individuals who demand the absolute best for their bodies and minds.",
        "Our network spans the world's leading longevity clinics, elite functional medicine practitioners, and pioneering biohacking facilities. From comprehensive biomarker analysis and personalised supplementation to advanced regenerative therapies and private retreat programmes, every intervention is evidence-based, bespoke, and delivered with complete discretion.",
        "Whether you are seeking to extend your healthspan, optimise peak performance, or access therapies not yet available through conventional medicine, Billionaire Vitality provides the access and expertise that no other service can match.",
      ]}
      features={[
        { icon: "🧬", title: "Longevity Protocols", desc: "Personalised programmes combining the latest advances in longevity medicine, epigenetics, and regenerative science" },
        { icon: "🏥", title: "Private Clinic Access", desc: "Exclusive access to the world's leading longevity and functional medicine clinics, with no waiting lists" },
        { icon: "📊", title: "Biomarker Analysis", desc: "Comprehensive blood, genetic, and metabolic testing to establish your precise biological baseline" },
        { icon: "💊", title: "Bespoke Supplementation", desc: "Pharmaceutical-grade, personalised supplement protocols formulated by leading biochemists" },
        { icon: "🧘", title: "Elite Retreat Programmes", desc: "Immersive wellness retreats at the world's most exclusive private health sanctuaries" },
        { icon: "🤖", title: "Biohacking Technology", desc: "Access to the most advanced biohacking devices and therapies, from hyperbaric oxygen to cryotherapy suites" },
      ]}
      listings={[
        {
          title: "Executive Longevity Assessment",
          sub: "Comprehensive 3-day biomarker analysis, genetic profiling, and personalised longevity roadmap",
          price: "From $25,000",
          img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/GTtaLZsmUzYjtBaV.jpg",
          tag: "Flagship",
        },
        {
          title: "Private Wellness Retreat",
          sub: "7-day immersive programme at an exclusive private health sanctuary — fully bespoke",
          price: "From $75,000",
          img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/zxJZwfoQGaClWbjo.jpg",
          tag: "Exclusive",
        },
        {
          title: "Annual Vitality Membership",
          sub: "Year-round access to our full network of clinics, practitioners, and protocols",
          price: "POA",
          img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/zxJZwfoQGaClWbjo.jpg",
          tag: "Members Only",
        },
      ]}
      listingsTitle="Signature Programmes"
      ctaBanner={{
        title: "Invest in Your Most Valuable Asset",
        sub: "Our longevity specialists will design a bespoke health optimisation programme tailored to your biology, lifestyle, and goals — with access to therapies and clinics unavailable through any other channel.",
        btnLabel: "Speak to a Longevity Specialist",
        btnHref: "/concierge",
      }}
      partnerLogos={[
        "Human Longevity Inc.",
        "Cleveland Clinic",
        "Viome",
        "Fountain Life",
        "SHA Wellness",
        "Lanserhof",
      ]}
    />
  );
}
