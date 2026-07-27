/* ============================================================
   BILLIONAIRE COLLECTION — Billionaire Travel Page
   Ultra-luxury bespoke travel for UHNW individuals.
   ============================================================ */

import DivisionPage from "@/components/DivisionPage";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";

const TRAVEL_HERO = "/images/bc-travel-hero.png";

export default function Travel() {
  useSEO({
    title: "Billionaire Travel — Ultra-Luxury Bespoke Travel Experiences | A Billionaire Collection Company",
    description: "Billionaire Travel is the ultra-luxury travel division of Billionaire Collection. Bespoke private island retreats, expedition voyages, and exclusive destination programmes — curated for ultra-high-net-worth individuals who demand the absolute best.",
    keywords: "Billionaire Travel, Billionaire Collection travel, ultra-luxury travel, private island retreat, bespoke travel experience, UHNW travel, luxury expedition, Billionaire Collection travel division, exclusive destination, private jet travel",
    url: "https://billionairecollection.com/travel",
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
          "name": "Billionaire Travel",
          "item": "https://billionairecollection.com/travel",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Billionaire Travel — Ultra-Luxury Bespoke Travel",
      "description": "Billionaire Travel is the ultra-luxury travel division of Billionaire Collection, the world's premier luxury ecosystem for ultra-high-net-worth individuals.",
      "url": "https://billionairecollection.com/travel",
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
      badge="Billionaire Travel"
      heroTitle="The World"
      heroAccent="Awaits"
      heroSubtitle="The ultra-luxury travel division of Billionaire Collection — crafting bespoke journeys for ultra-high-net-worth individuals who demand private island exclusivity, expedition-grade adventure, and the absolute finest in global hospitality."
      heroImage={TRAVEL_HERO}
      heroCta={{ label: "Plan Your Journey", href: "/concierge" }}
      heroCtaSecondary={{ label: "View Programmes", href: "/card-concierge" }}
      aboutTitle="Travel Without Compromise"
      aboutBody={[
        "Billionaire Travel, in partnership with Virtuoso and the world's leading ultra-luxury travel specialists, creates bespoke journeys that transcend the ordinary. Every itinerary is designed from first principles — built around your preferences, timeline, and vision of the perfect experience, with no template and no compromise.",
        "Our portfolio spans private island buyouts in the Maldives and French Polynesia, Antarctic expedition cruises aboard luxury vessels, exclusive African safari camps with private game reserves, and villa retreats on the Amalfi Coast, Côte d'Azur, and Santorini. We also arrange private jet programmes that connect multiple destinations in a single seamless journey — with Billionaire Air as our preferred aviation partner.",
        "For those who seek experiences beyond the reach of any travel agency, Billionaire Travel provides access to the truly extraordinary — from private access to closed archaeological sites to exclusive cultural events, private audience dinners, and once-in-a-lifetime expedition programmes that simply cannot be booked elsewhere.",
      ]}
      features={[
        { icon: "🏝️", title: "Private Island Retreats", desc: "Exclusive buyouts of the world's most coveted private islands — from the Maldives to the Caribbean and beyond" },
        { icon: "✈️", title: "Private Jet Programmes", desc: "Seamless multi-destination journeys in partnership with Billionaire Air — combining the finest courses with ultra-luxury accommodation" },
        { icon: "🚢", title: "Expedition Voyages", desc: "Luxury expedition cruises to Antarctica, the Arctic, the Galápagos, and other remote destinations aboard world-class vessels" },
        { icon: "🦁", title: "Exclusive Safari Camps", desc: "Private game reserves and exclusive-use safari camps in Kenya, Tanzania, Botswana, and South Africa" },
        { icon: "🏰", title: "Villa & Estate Stays", desc: "Curated private villas and historic estates on the Amalfi Coast, Côte d'Azur, Tuscany, and Santorini" },
        { icon: "🎭", title: "Cultural Experiences", desc: "Private access to closed cultural sites, exclusive events, and once-in-a-lifetime experiences arranged with complete discretion" },
      ]}
      listings={[
        {
          title: "The Maldives Private Island",
          sub: "7-night exclusive buyout of a private island resort — fully staffed, with private chef, water sports, and sunset cruises",
          price: "From $120,000",
          img: TRAVEL_HERO,
          tag: "Flagship",
        },
        {
          title: "Antarctic Expedition Voyage",
          sub: "14-day luxury expedition cruise to Antarctica aboard a private-charter vessel with expert naturalist guides",
          price: "From $95,000",
          img: TRAVEL_HERO,
          tag: "Exclusive",
        },
        {
          title: "Annual Travel Membership",
          sub: "Year-round bespoke travel planning, priority access to our full partner network, and a dedicated travel concierge",
          price: "POA",
          img: TRAVEL_HERO,
          tag: "Members Only",
        },
      ]}
      listingsTitle="Signature Journeys"
      ctaBanner={{
        title: "Your Journey Begins Here",
        sub: "Our travel concierge team will design a bespoke itinerary tailored to your vision — from a single extraordinary weekend to a year-long global programme — with every detail arranged to the Billionaire Collection standard.",
        btnLabel: "Speak to Our Travel Concierge",
        btnHref: "/concierge",
      }}
      partnerLogos={[
        "Virtuoso",
        "Aman Resorts",
        "Four Seasons",
        "Silversea Cruises",
        "&Beyond",
        "Abercrombie & Kent",
      ]}
    />
  );
}
