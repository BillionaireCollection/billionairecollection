import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";

export default function Crypto() {
  useSEO({
    title: "Digital Asset & Crypto Wealth Management | Billionaire Collection",
    description: "Institutional-grade digital asset strategies for ultra-high-net-worth individuals. Navigate Bitcoin, Ethereum, and alternative digital assets with Billionaire Collection's specialist advisors.",
    keywords: "crypto wealth management, digital assets, Bitcoin investment, Ethereum, blockchain, institutional crypto, UHNW digital wealth, DeFi",
  });
  return (
    <DivisionPage
      badge="Billionaire Crypto"
      heroTitle="Digital Asset"
      heroAccent="Investments"
      heroSubtitle="Navigate the digital asset landscape with confidence — from Bitcoin and Ethereum to tokenised real-world assets and exclusive Web3 opportunities for UHNW investors."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-lifestyle-AH2eKQkWWtkQqo8wcxHVw2.webp"
      heroCta={{ label: "Enquire Now", href: "/card-concierge" }}
      heroCtaSecondary={{ label: "View Listings", href: "/marketplace" }}
      aboutTitle="The New Frontier of Wealth"
      aboutBody={[
  "Billionaire Crypto provides ultra-high-net-worth individuals with sophisticated access to digital asset markets — from direct cryptocurrency holdings to tokenised real-world assets and exclusive DeFi opportunities.",
  "Our team of digital asset specialists works alongside traditional wealth managers to integrate crypto into diversified UHNW portfolios, with a focus on institutional-grade custody, tax efficiency, and risk management.",
  "We also provide exclusive access to pre-launch token opportunities, private blockchain projects, and tokenised versions of real-world luxury assets including real estate, art, and collectibles."
]}
      features={[
    { icon: "₿", title: "Crypto Acquisition", desc: "BTC, ETH and beyond" },
    { icon: "🔐", title: "Custody Solutions", desc: "Institutional-grade security" },
    { icon: "📈", title: "Portfolio Strategy", desc: "Diversification advisory" },
    { icon: "🌐", title: "Web3 Access", desc: "Exclusive early opportunities" }
]}
      listings={[
    
]}
      listingsTitle="Digital Assets"
      ctaBanner={{ title: "Enter the Digital Frontier", sub: "Our digital asset advisors will guide your crypto strategy with institutional expertise.", btnLabel: "Speak to an Advisor", btnHref: "/card-concierge" }}
      partnerLogos={["Coinbase Institutional", "Fireblocks", "Anchorage Digital", "Galaxy Digital"]}
    />
  );
}
