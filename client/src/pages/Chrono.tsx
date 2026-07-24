import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Chrono() {
  useSEO({
    title: "Billionaire Chrono — Ultra-Rare Timepieces | A Billionaire Collection Company",
    description: "Billionaire Chrono is the private watch division of Billionaire Collection. Acquiring and placing only the world's most significant timepieces — strictly above one million dollars — for a closed circle of discerning collectors.",
    keywords: "Billionaire Chrono, Billionaire Collection watches, ultra-rare timepieces, Patek Philippe, Richard Mille, Jacob Co, luxury watch brokerage, UHNW watch collection, investment watches, private watch acquisition",
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
        "name": "Billionaire Chrono",
        "item": "https://billionairecollection.com/chrono"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Chrono — Ultra-Rare Timepieces",
    "description": "The private watch division of Billionaire Collection. Acquiring and placing only the world's most significant timepieces — strictly above one million dollars.",
    "url": "https://billionairecollection.com/chrono",
    "serviceType": "Private Watch Brokerage",
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
      badge="Billionaire Chrono"
      heroTitle="Where Rarity Meets"
      heroAccent="Absolute Precision"
      heroSubtitle="The private watch division of Billionaire Collection. Acquiring and placing only the world's most significant timepieces — strictly above one million dollars — for a closed circle of discerning collectors."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/billionaire-chrono-hero-fRufSSQqNiuNDpFcCMxSqZ.webp"
      heroCta={{ label: "Enquire Now", href: "https://billionairechrono.com" }}
      heroCtaSecondary={{ label: "View Collection", href: "https://billionairechrono.com" }}
      aboutTitle="Investment-Grade Horology at the Absolute Pinnacle"
      aboutBody={[
  "Billionaire Chrono operates above traditional auction houses and retail dealers. Every timepiece is investment-grade, museum-worthy, and drawn from the absolute pinnacle of horology — never anything under one million dollars.",
  "Our global network sources the rarest grand complications, diamond tourbillons, and one-of-a-kind commissions from Patek Philippe, Richard Mille, Jacob & Co., Vacheron Constantin, Audemars Piguet, A. Lange & Söhne, and beyond.",
  "Transactions are conducted with absolute privacy. From acquisition to authentication, white-glove delivery, and discreet private sale — every detail is handled with the discretion that collectors of this calibre demand."
]}
      features={[
    { icon: "⌚", title: "Source a Timepiece", desc: "We locate the impossible-to-find" },
    { icon: "💎", title: "Sell Your Watch", desc: "Discreet seven & eight-figure sales" },
    { icon: "🔐", title: "Golden Ticket Access", desc: "First refusal on every acquisition" },
    { icon: "✅", title: "Authentication", desc: "Verified by the world's top experts" }
]}
      listings={[
    { title: "Patek Philippe Grandmaster Chime", sub: "Ref. 6300A-010 — World Auction Record · 20 Complications", price: "$31M+", img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/chrono-grandmaster-chime-7kBFBn4qMFkw6tDXxyuLUU.webp", tag: "Private Sale" },
    { title: "Jacob & Co. Billionaire Series", sub: "Diamond Tourbillon — 260ct · 18k White Gold", price: "$18M–$20M+", img: "/images/chrono-jacob-co-billionaire.jpg", tag: "Available" },
    { title: "Richard Mille RM 53-02", sub: "Sapphire Tourbillon — Ultra-Rare", price: "$4M–$5M+", img: "/images/chrono-richard-mille-rm53.webp", tag: "Exclusive" }
]}
      listingsTitle="Featured Acquisitions"
      ctaBanner={{ title: "Access Reserved for Those Who Collect at the Pinnacle", sub: "Our concierge team is available to source, authenticate, and place the world's most significant timepieces with absolute discretion.", btnLabel: "Request Private Access", btnHref: "https://billionairechrono.com" }}
      externalWebsite={{ label: "Visit billionairechrono.com", href: "https://billionairechrono.com" }}
      partnerLogos={["Patek Philippe", "Richard Mille", "Jacob & Co.", "Vacheron Constantin", "Audemars Piguet", "A. Lange & Söhne"]}
    />
  );
}
