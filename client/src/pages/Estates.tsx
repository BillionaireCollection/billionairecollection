import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Estates() {
  useSEO({
    title: "Billionaire Estates — Ultra-Prime Real Estate | A Billionaire Collection Company",
    description: "Billionaire Estates is the ultra-prime real estate division of Billionaire Collection, the world's premier luxury ecosystem. Buy and sell off-market properties in London, Monaco, Dubai, New York, and worldwide through the parent company's dedicated brokerage arm.",
    keywords: "Billionaire Estates, Billionaire Collection real estate, ultra-prime property, off-market real estate, luxury homes London, Monaco villas, Dubai penthouses, UHNW real estate, Billionaire Collection brokerage, luxury property group",
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
        "name": "Billionaire Estates",
        "item": "https://billionairecollection.com/estates"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Billionaire Estates",
    "description": "Billionaire Estates is the ultra-prime real estate division of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Brokering off-market properties in London, Monaco, Dubai, New York, and worldwide.",
    "url": "https://billionairecollection.com/estates",
    "telephone": "+44-207-183-1700",
    "email": "info@billionaireplc.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "128 City Road",
      "addressLocality": "London",
      "postalCode": "EC1V 2NX",
      "addressCountry": "GB"
    },
    "areaServed": [
      "London",
      "Monaco",
      "Dubai",
      "New York",
      "Malibu",
      "Caribbean"
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    }
  }
]);
  return (
    <DivisionPage
      badge="Billionaire Estates"
      heroTitle="Ultra-Prime Real Estate"
      heroAccent="Worldwide"
      heroSubtitle="Access the world's most exclusive properties — from Mayfair penthouses and Monaco villas to Malibu clifftop estates and private Caribbean islands."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-estates-5tXLsMCEXgogpiaShTiVMe.webp"
      heroCta={{ label: "Enquire Now", href: "/card-concierge" }}
      heroCtaSecondary={{ label: "View Listings", href: "/marketplace" }}
      aboutTitle="Where Architecture Meets Aspiration"
      aboutBody={[
  "Billionaire Estates is the world's most exclusive real estate brokerage, specialising in ultra-prime residential and commercial properties across every major global market.",
  "Our network of elite brokers, in partnership with Sotheby's International Realty and the world's leading private property advisors, provides discreet access to properties that never reach the open market.",
  "From London's most prestigious addresses to private island estates in the Indian Ocean, every property in our portfolio represents the pinnacle of architectural achievement and locational prestige."
]}
      features={[
    { icon: "🏛", title: "Off-Market Access", desc: "Exclusive properties not listed publicly" },
    { icon: "🌍", title: "Global Portfolio", desc: "Properties across 40+ countries" },
    { icon: "🔒", title: "NDA-Protected", desc: "Complete discretion guaranteed" },
    { icon: "⚡", title: "Dedicated Advisor", desc: "Personal property consultant" }
]}
      listings={[
    { title: "Mayfair Grand Penthouse", sub: "London, United Kingdom", price: "$57,000,000", img: "/manus-storage/mayfair-penthouse_486d2a47.webp", tag: "Off-Market" },
    { title: "Monaco Clifftop Villa", sub: "Monaco, Monte Carlo", price: "$93,500,000", img: "/manus-storage/monaco-clifftop-villa_a8c03bf4.jpg", tag: "Exclusive" },
    { title: "Malibu Ocean Estate", sub: "California, USA", price: "$120,000,000", img: "/manus-storage/malibu-ocean-estate_d137b630.jpg", tag: "New" }
]}
      listingsTitle="Featured Properties"
      ctaBanner={{ title: "Begin Your Property Journey", sub: "Our advisors are ready to present the world's finest properties, tailored to your exact specifications.", btnLabel: "Speak to an Advisor", btnHref: "/card-concierge" }}
      partnerLogos={["Sotheby's International Realty", "Knight Frank", "Savills", "Christie's Real Estate"]}
    />
  );
}
