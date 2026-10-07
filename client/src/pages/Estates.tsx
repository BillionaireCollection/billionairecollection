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
      heroCta={{ label: "Enquire Now", href: "https://billionaireestates.com" }}
      heroCtaSecondary={{ label: "View Listings", href: "/subscribe?interest=Billionaire%20Estates" }}
      aboutTitle="Where Architecture Meets Aspiration"
      aboutBody={[
  "Billionaire Estates specialises in ultra-prime residential and commercial property opportunities across leading global markets.",
  "Our specialist network provides discreet access to property opportunities, including off-market conversations for qualified clients.",
  "From London's most prestigious addresses to private island estates in the Indian Ocean, every property in our portfolio represents the pinnacle of architectural achievement and locational prestige."
]}
      features={[
    { icon: "🏛", title: "Off-Market Access", desc: "Exclusive properties not listed publicly" },
    { icon: "🌍", title: "Global Portfolio", desc: "Opportunities across leading markets" },
    { icon: "🔒", title: "NDA-Protected", desc: "Complete discretion guaranteed" },
    { icon: "⚡", title: "Dedicated Advisor", desc: "Personal property consultant" }
]}
      listings={[
    { title: "Mayfair Grand Penthouse", sub: "London, United Kingdom", price: "$57,000,000", img: "/listing-mayfair-penthouse.jpg", tag: "Off-Market" },
    { title: "Monaco Clifftop Villa", sub: "Monaco, Monte Carlo", price: "$93,500,000", img: "/listing-monaco-clifftop-villa.jpg", tag: "Exclusive" },
    { title: "Malibu Ocean Estate", sub: "California, USA", price: "$120,000,000", img: "/listing-malibu-ocean-estate.jpg", tag: "New" }
]}
      listingsTitle="Featured Properties"
      ctaBanner={{ title: "Begin Your Property Journey", sub: "Our advisors are ready to present the world's finest properties, tailored to your exact specifications.", btnLabel: "Speak to an Advisor", btnHref: "https://billionaireestates.com" }}
      externalWebsite={{ label: "Visit billionaireestates.com", href: "https://billionaireestates.com" }}
    />
  );
}
