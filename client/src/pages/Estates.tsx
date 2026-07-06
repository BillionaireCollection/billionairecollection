import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";

export default function Estates() {
  useSEO({
    title: "Ultra-Prime Real Estate | Billionaire Collection",
    description: "Discover and acquire ultra-prime real estate worldwide through Billionaire Collection Estates. Private islands, trophy penthouses, historic estates, and off-market properties.",
    keywords: "ultra-prime real estate, luxury property, off-market property, trophy homes, private islands",
  });
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
    { title: "Mayfair Grand Penthouse", sub: "London, United Kingdom", price: "$57,000,000", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", tag: "Off-Market" },
    { title: "Monaco Clifftop Villa", sub: "Monaco, Monte Carlo", price: "$93,500,000", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80", tag: "Exclusive" },
    { title: "Malibu Ocean Estate", sub: "California, USA", price: "$120,000,000", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", tag: "New" }
]}
      listingsTitle="Featured Properties"
      ctaBanner={{ title: "Begin Your Property Journey", sub: "Our advisors are ready to present the world's finest properties, tailored to your exact specifications.", btnLabel: "Speak to an Advisor", btnHref: "/card-concierge" }}
      partnerLogos={["Sotheby's International Realty", "Knight Frank", "Savills", "Christie's Real Estate"]}
    />
  );
}
