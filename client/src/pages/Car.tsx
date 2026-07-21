import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Car() {
  useSEO({
    title: "Billionaire Car — Exotic Automobile Brokerage | A Billionaire Collection Company",
    description: "Billionaire Car is the exotic automobile division of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Source and acquire the world's rarest Ferraris, Bugattis, Paganis, and collector cars through Billionaire Collection's specialist automotive brokerage.",
    keywords: "Billionaire Car, Billionaire Collection automobiles, exotic car brokerage, rare Ferrari, Bugatti acquisition, Pagani, collector cars, UHNW automotive, Billionaire Collection car division, luxury supercar broker",
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
        "name": "Billionaire Car",
        "item": "https://billionairecollection.com/car"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Car \u2014 Exotic Automobile Brokerage",
    "description": "Billionaire Car is the exotic automobile division of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/car",
    "serviceType": "Exotic Car Brokerage",
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
      badge="Billionaire Car"
      heroTitle="Rare & Exotic"
      heroAccent="Automobiles"
      heroSubtitle="Acquire the world's most coveted automobiles — from one-off Ferrari hypercars to bespoke Rolls-Royce commissions — through our exclusive automotive brokerage."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp"
      heroCta={{ label: "Enquire Now", href: "/card-concierge" }}
      heroCtaSecondary={{ label: "View Listings", href: "/marketplace" }}
      aboutTitle="Automotive Excellence Without Compromise"
      aboutBody={[
  "Billionaire Car is the world's most exclusive automotive brokerage, specialising in rare, limited-edition, and bespoke vehicles from the world's most prestigious manufacturers.",
  "Our portfolio spans the full spectrum of automotive excellence — from classic Ferrari 250 GTOs to modern Bugatti Chiron Super Sports, from bespoke Rolls-Royce Phantom commissions to one-off Pagani Huayra creations.",
  "With direct relationships with every major luxury and hypercar manufacturer, as well as access to the world's most prestigious private collections, we source vehicles that are simply unavailable through conventional channels."
]}
      features={[
    { icon: "🏎", title: "Hypercar Acquisition", desc: "One-off and limited editions" },
    { icon: "🔑", title: "Bespoke Commission", desc: "Factory order specialists" },
    { icon: "📋", title: "Collection Management", desc: "Multi-vehicle portfolio" },
    { icon: "🌍", title: "Global Sourcing", desc: "Worldwide network" }
]}
      listings={[
    { title: "Ferrari LaFerrari Aperta", sub: "1 of 210, Rosso Corsa", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/ferrari-laferrari-aperta_644ecf63.webp", tag: "Rare" },
    { title: "Bugatti Chiron Super Sport", sub: "2022, 1,600hp", price: "$4,100,000", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bugatti-chiron-super-sport_1dfd1c9b.jpg", tag: "For Sale" },
    { title: "Rolls-Royce Phantom Bespoke", sub: "Commission Available", price: "POA", img: "https://d36hbw14aib5lz.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/rolls-royce-phantom-bespoke_ed6cc70a.webp", tag: "Commission" }
]}
      listingsTitle="Featured Vehicles"
      ctaBanner={{ title: "Find Your Perfect Machine", sub: "Our automotive advisors will source, acquire, or commission the exact vehicle you desire.", btnLabel: "Speak to an Advisor", btnHref: "/card-concierge" }}
      partnerLogos={["Ferrari", "Bugatti", "Rolls-Royce", "Lamborghini", "Porsche", "Pagani", "Koenigsegg"]}
    />
  );
}
