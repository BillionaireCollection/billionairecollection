import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";

export default function Car() {
  useSEO({
    title: "Rare & Exotic Automobiles | Billionaire Collection",
    description: "Acquire rare, exotic, and collector automobiles through Billionaire Collection's specialist automotive brokerage. Ferrari, Lamborghini, Bugatti, and the world's most coveted vehicles.",
    keywords: "exotic cars, rare automobiles, luxury car brokerage, Ferrari, Lamborghini, collector cars",
  });
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
    { title: "Ferrari LaFerrari Aperta", sub: "1 of 210, Rosso Corsa", price: "POA", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80", tag: "Rare" },
    { title: "Bugatti Chiron Super Sport", sub: "2022, 1,600hp", price: "£3,200,000", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", tag: "For Sale" },
    { title: "Rolls-Royce Phantom Bespoke", sub: "Commission Available", price: "POA", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80", tag: "Commission" }
]}
      listingsTitle="Featured Vehicles"
      ctaBanner={{ title: "Find Your Perfect Machine", sub: "Our automotive advisors will source, acquire, or commission the exact vehicle you desire.", btnLabel: "Speak to an Advisor", btnHref: "/card-concierge" }}
      partnerLogos={["Ferrari", "Bugatti", "Rolls-Royce", "Lamborghini", "Porsche", "Pagani", "Koenigsegg"]}
    />
  );
}
