/* ============================================================
   BILLIONAIRE COLLECTION — Billionaire Golf Page
   Private club access, elite tournaments, bespoke golf travel.
   ============================================================ */

import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const GOLF_HERO = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028447909/xBoLsXGRbUVLaOnT.jpg";

export default function Golf() {
  useSEO({
    title: "Billionaire Golf — Private Club Access & Luxury Golf Travel | A Billionaire Collection Company",
    description: "Billionaire Golf is the exclusive golf division of Billionaire Collection. Secure tee times at Augusta-calibre courses, St Andrews, Pebble Beach, and the world's most private clubs — with helicopter transfers, private instruction, and bespoke golf travel designed for UHNW individuals.",
    keywords: "Billionaire Golf, Billionaire Collection golf, private golf clubs, Augusta National, St Andrews, Pebble Beach, luxury golf access, UHNW golf, Billionaire Collection golf division, exclusive golf membership, bespoke golf travel",
    url: "https://billionairecollection.com/golf",
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
          "name": "Billionaire Golf",
          "item": "https://billionairecollection.com/golf",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Billionaire Golf — Private Club Access & Luxury Golf Travel",
      "description": "Billionaire Golf is the exclusive golf division of Billionaire Collection, providing UHNW individuals with private access to the world's most prestigious courses, clubs, and golf travel experiences.",
      "url": "https://billionairecollection.com/golf",
      "serviceType": "Luxury Golf & Private Club Access",
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
      badge="Billionaire Golf"
      heroTitle="Golf at the"
      heroAccent="Highest Level"
      heroSubtitle="The exclusive golf division of Billionaire Collection — providing ultra-high-net-worth individuals with private access to the world's most prestigious courses, elite tournaments, and bespoke golf travel experiences curated by a dedicated concierge team."
      heroImage={GOLF_HERO}
      heroCta={{ label: "Arrange a Round", href: "/concierge" }}
      heroCtaSecondary={{ label: "View Memberships", href: "/card-concierge" }}
      aboutTitle="Where Golf Meets Absolute Privilege"
      aboutBody={[
        "Billionaire Golf operates at the intersection of the world's most exclusive private clubs and the highest standards of bespoke concierge service. We provide access to Augusta-calibre venues, historic links courses, and ultra-private island retreats that are simply unavailable through conventional channels.",
        "Our global network spans over 200 private clubs across six continents — from the championship fairways of St Andrews and Pebble Beach to the sun-drenched courses of the UAE and the pristine island layouts of the Caribbean. Every engagement is arranged with complete discretion, from tee time procurement and private instruction with touring professionals to helicopter transfers and post-round private dining.",
        "For those who wish to travel the world through golf, our bespoke golf travel programmes combine first-class course access with private aviation, ultra-luxury accommodation, and curated cultural experiences — delivering the complete Billionaire Collection standard at every destination.",
      ]}
      features={[
        { icon: "⛳", title: "Private Club Access", desc: "Exclusive tee times at the world's most prestigious private clubs — including courses that do not accept public bookings" },
        { icon: "🏆", title: "Tournament Experiences", desc: "Private hospitality suites and player access at The Masters, The Open Championship, Ryder Cup, and more" },
        { icon: "🚁", title: "Helicopter Transfers", desc: "Seamless helicopter and private aviation transfers between courses, hotels, and private terminals" },
        { icon: "🎓", title: "Private Instruction", desc: "One-to-one coaching sessions with touring professionals and world-renowned swing coaches" },
        { icon: "✈️", title: "Bespoke Golf Travel", desc: "Fully curated multi-destination golf journeys combining championship courses with private aviation and ultra-luxury stays" },
        { icon: "🍷", title: "Post-Round Dining", desc: "Private dining reservations at clubhouse restaurants and Michelin-starred venues adjacent to the world's finest courses" },
      ]}
      listings={[
        {
          title: "The Grand Links Tour",
          sub: "A 10-day private journey through the historic links of Scotland and Ireland — St Andrews, Royal Portrush, Carnoustie, and beyond",
          price: "From $85,000",
          img: GOLF_HERO,
          tag: "Flagship",
        },
        {
          title: "Masters Hospitality Package",
          sub: "Private hospitality suite at Augusta National during The Masters Tournament, with exclusive course access and player meet-and-greet",
          price: "From $45,000",
          img: GOLF_HERO,
          tag: "Exclusive",
        },
        {
          title: "Annual Golf Membership",
          sub: "Year-round access to our full network of 200+ private clubs worldwide, with dedicated concierge and priority tee time booking",
          price: "POA",
          img: GOLF_HERO,
          tag: "Members Only",
        },
      ]}
      listingsTitle="Signature Experiences"
      ctaBanner={{
        title: "Play Where Others Cannot",
        sub: "Our golf concierge team will arrange access to any course in the world — from Augusta to the most private island retreats — with every detail handled to the Billionaire Collection standard.",
        btnLabel: "Speak to Our Golf Concierge",
        btnHref: "/concierge",
      }}
      partnerLogos={[
        "Augusta National",
        "St Andrews Links",
        "Pebble Beach",
        "Royal Portrush",
        "Emirates Golf Club",
        "Valderrama",
      ]}
    />
  );
}
