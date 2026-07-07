import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

export default function Art() {
  useSEO({
    title: "Billionaire Art — Fine Art Investment | A Billionaire Collection Company",
    description: "Billionaire Art is the fine art and collectibles division of Billionaire Collection, the parent company of the world's premier luxury ecosystem. Acquire museum-quality works and investment-grade art through Billionaire Collection's curated brokerage and private sale network.",
    keywords: "Billionaire Art, Billionaire Collection fine art, art investment, luxury art brokerage, blue-chip art, private art sale, UHNW art collection, Billionaire Collection art division, investment art London",
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
        "name": "Billionaire Art",
        "item": "https://billionairecollection.com/art"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Billionaire Art \u2014 Fine Art Investment",
    "description": "Billionaire Art is the fine art division of Billionaire Collection, the parent company of the world's premier luxury ecosystem.",
    "url": "https://billionairecollection.com/art",
    "serviceType": "Fine Art Brokerage",
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
      badge="Billionaire Art"
      heroTitle="Fine Art &"
      heroAccent="Collectibles"
      heroSubtitle="Acquire, sell, and invest in the world's most significant works of art through our curated advisory service — in partnership with Christie's and leading private dealers."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp"
      heroCta={{ label: "Enquire Now", href: "/card-concierge" }}
      heroCtaSecondary={{ label: "View Listings", href: "/marketplace" }}
      aboutTitle="Art as the Ultimate Investment"
      aboutBody={[
  "Billionaire Art provides ultra-high-net-worth collectors with access to the world's most significant works of art, from Old Masters to contemporary blue-chip artists.",
  "In partnership with Christie's, Sotheby's, and the world's most respected private dealers, we offer acquisition advisory, collection management, and discreet private sales for the most important works in existence.",
  "Our team of art advisors brings decades of experience across every major collecting category — from Impressionist masterworks to post-war American abstraction, from rare antiquities to cutting-edge digital art."
]}
      features={[
    { icon: "🎨", title: "Acquisition Advisory", desc: "Expert guidance on purchases" },
    { icon: "📊", title: "Investment Analysis", desc: "Art as alternative asset" },
    { icon: "🏛", title: "Collection Management", desc: "Insurance, storage, loans" },
    { icon: "🔒", title: "Private Sales", desc: "Discreet transactions" }
]}
      listings={[
    { title: "Jean-Michel Basquiat", sub: "Untitled, 1982 — Estimate on Request", price: "POA", img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80", tag: "Private Sale" },
    { title: "Yayoi Kusama", sub: "Infinity Nets, 2019", price: "$3,050,000", img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80", tag: "Available" },
    { title: "Damien Hirst", sub: "Spot Painting — Unique", price: "POA", img: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80", tag: "Exclusive" }
]}
      listingsTitle="Featured Works"
      ctaBanner={{ title: "Build a World-Class Collection", sub: "Our art advisors will guide you through every aspect of collecting, from acquisition to legacy planning.", btnLabel: "Speak to an Art Advisor", btnHref: "/card-concierge" }}
      partnerLogos={["Christie's", "Sotheby's", "Phillips", "Gagosian", "Hauser & Wirth"]}
    />
  );
}
