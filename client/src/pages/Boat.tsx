import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Boat() {
  useSEO({
    title: "Superyacht Brokerage & Charter | Billionaire Boat",
    description: "Buy, sell, or charter the world's finest superyachts and mega yachts. Billionaire Boat connects discerning owners with bespoke vessels from 30m to 100m+ across every ocean.",
    keywords: "superyacht brokerage, mega yacht charter, luxury yacht sales, yacht acquisition, private yacht, Lürssen, Feadship, Benetti",
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Boat — Superyacht Brokerage & Charter",
    "description": "Buy, sell, or charter the world's finest superyachts and mega yachts — Lürssen, Feadship, Benetti, and beyond. Vessels from 30m to 100m+ across every ocean.",
    "url": "https://billionairecollection.com/boat",
    "serviceType": "Superyacht Brokerage",
    "provider": {
      "@type": "Organization",
      "name": "Billionaire Collection",
      "url": "https://billionairecollection.com"
    },
    "areaServed": "Worldwide"
  });
  return (
    <DivisionPage
      badge="Billionaire Boat"
      heroTitle="The World's Finest"
      heroAccent="Superyachts"
      heroSubtitle="Acquire, charter, or commission a bespoke superyacht from the world's leading builders — Lürssen, Feadship, Benetti, and beyond."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-yacht-hFeRjh9nRnBaKqx8rPSF24.webp"
      heroCta={{ label: "Enquire Now", href: "/card-concierge" }}
      heroCtaSecondary={{ label: "View Listings", href: "/marketplace" }}
      aboutTitle="Command the Seas in Absolute Luxury"
      aboutBody={[
  "Billionaire Boat represents the most prestigious superyacht brokerage in the world, offering an unparalleled portfolio of vessels for sale, charter, and bespoke new construction.",
  "Our relationships with the world's leading shipyards — including Lürssen, Feadship, Benetti, and the Ferretti Group — ensure access to the finest vessels ever built, as well as the opportunity to commission entirely bespoke new builds.",
  "Whether you seek a 50-metre explorer yacht for Antarctic expeditions or a 100-metre floating palace for Mediterranean summers, our team of naval architects and yacht brokers will guide you to the perfect vessel."
]}
      features={[
    { icon: "⚓", title: "Sale & Acquisition", desc: "World-class brokerage service" },
    { icon: "🛥", title: "Charter Fleet", desc: "Premium charter experiences" },
    { icon: "🔧", title: "New Construction", desc: "Bespoke build management" },
    { icon: "🌊", title: "Management", desc: "Full yacht management services" }
]}
      listings={[
    { title: "M/Y Aurora — 82m Lürssen", sub: "Mediterranean, Available Now", price: "$105,000,000", img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-yacht-hFeRjh9nRnBaKqx8rPSF24.webp", tag: "For Sale" },
    { title: "M/Y Solaris — 65m Benetti", sub: "Caribbean Charter", price: "$490,000/week", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80", tag: "Charter" },
    { title: "M/Y Eclipse — 55m Feadship", sub: "Pacific Crossing", price: "$75,000,000", img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80", tag: "New Listing" }
]}
      listingsTitle="Featured Yachts"
      ctaBanner={{ title: "Your Dream Yacht Awaits", sub: "From charter to acquisition, our team will find or build the perfect vessel for your lifestyle.", btnLabel: "Speak to a Yacht Broker", btnHref: "/card-concierge" }}
      partnerLogos={["Lürssen", "Feadship", "Benetti", "Ferretti Group", "Heesen", "Oceanco"]}
    />
  );
}
