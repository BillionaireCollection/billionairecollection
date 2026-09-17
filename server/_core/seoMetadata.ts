export const BASE_URL = "https://billionairecollection.com";
export const SITE_NAME = "Billionaire Collection";

export type PageMetadata = {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  type?: "website" | "profile";
  twitterCreator?: string;
  aiDescription: string;
  structuredData?: Record<string, unknown>;
};

const DEFAULT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-og-preview-M7pD3ZebBXDoyAR52uFPiQ.png";
const FOUNDER_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";

const page = (
  title: string,
  description: string,
  keywords: string,
  aiDescription = description
): PageMetadata => ({ title, description, keywords, aiDescription });

/**
 * Server-delivered metadata for every indexable public route. This deliberately
 * describes real page intent rather than repeating a generic keyword list.
 */
export const PAGE_METADATA: Record<string, PageMetadata> = {
  "/": page(
    "Billionaire Collection | Luxury Services for Billionaires & UHNW Individuals",
    "Billionaire Collection is a London-founded luxury ecosystem for billionaires and ultra-high-net-worth individuals, connecting private aviation, superyachts, ultra-prime real estate, rare automobiles, fine art, concierge and curated experiences.",
    "Billionaire Collection, billionaire services, luxury services for billionaires, UHNW services, ultra-high-net-worth, luxury ecosystem, private aviation, superyachts, ultra-prime real estate, luxury concierge",
    "The official website of Billionaire Collection, a London-founded luxury ecosystem for billionaires and ultra-high-net-worth individuals. Explore private aviation, superyachts, ultra-prime real estate, rare automobiles, fine art, concierge, membership and luxury media."
  ),
  "/about": page(
    "About Billionaire Collection | Global Luxury Ecosystem",
    "Learn about Billionaire Collection, the London-founded luxury ecosystem connecting specialist brands, private access and concierge-led services for ultra-high-net-worth individuals worldwide.",
    "about Billionaire Collection, luxury ecosystem, UHNW company, London luxury services, billionaire brands"
  ),
  "/ecosystem": page(
    "The Billionaire Ecosystem | Billionaire Collection",
    "Explore the Billionaire Collection ecosystem: a connected portfolio of luxury services, specialist brands, private access and curated opportunities for ultra-high-net-worth individuals.",
    "Billionaire ecosystem, Billionaire Collection brands, luxury ecosystem, UHNW lifestyle services, billionaire brands"
  ),
  "/brands": page(
    "Billionaire Collection Brands | Luxury Portfolio & Divisions",
    "Discover the brands and divisions within Billionaire Collection, spanning luxury brokerage, media, education, products, private access and concierge services.",
    "Billionaire Collection brands, luxury brand portfolio, Billionaire divisions, billionaire companies, UHNW brands"
  ),
  "/services": page(
    "Billionaire Services | Private Access & UHNW Solutions",
    "Billionaire Collection services combine private access, bespoke concierge, luxury travel, funding, golf and specialist solutions for ultra-high-net-worth individuals.",
    "billionaire services, UHNW services, luxury concierge, private access, bespoke lifestyle services"
  ),
  "/marketplace": page(
    "Billionaire Collection Marketplace | Curated Luxury Assets",
    "Browse the Billionaire Collection marketplace for curated luxury assets, signature products and private opportunities across the ultra-high-net-worth lifestyle.",
    "Billionaire Collection marketplace, luxury marketplace, luxury assets, UHNW products, curated luxury"
  ),
  "/estates": page(
    "Billionaire Estates | Ultra-Prime Real Estate",
    "Billionaire Estates connects qualified clients with ultra-prime real estate and off-market property opportunities in the world's most sought-after destinations.",
    "Billionaire Estates, ultra-prime real estate, luxury property, off-market property, billionaire real estate"
  ),
  "/boat": page(
    "Billionaire Boat | Superyachts & Private Vessels",
    "Billionaire Boat provides private access to superyacht acquisition, sale and charter opportunities for discerning ultra-high-net-worth clients.",
    "Billionaire Boat, superyachts, yacht charter, yacht brokerage, private vessels, luxury yachting"
  ),
  "/air": page(
    "Billionaire Air | Private Aviation & Jet Charter",
    "Billionaire Air offers private aviation access, jet charter and aircraft acquisition guidance for ultra-high-net-worth travellers.",
    "Billionaire Air, private aviation, private jet charter, aircraft acquisition, UHNW travel"
  ),
  "/car": page(
    "Billionaire Car | Rare & Exotic Automobiles",
    "Billionaire Car curates rare, exotic and collector automobiles for clients seeking exceptional vehicles and discreet acquisition opportunities.",
    "Billionaire Car, rare cars, exotic automobiles, collector cars, luxury car brokerage"
  ),
  "/art": page(
    "Billionaire Art | Fine Art & Collectibles",
    "Billionaire Art provides curated access to fine art, collectible works and specialist acquisition opportunities for discerning collectors.",
    "Billionaire Art, fine art, art collecting, luxury collectibles, art brokerage"
  ),
  "/chrono": page(
    "Billionaire Chrono | Exceptional Timepieces",
    "Billionaire Chrono celebrates exceptional timepieces and horological collectibles for connoisseurs of rare and significant watches.",
    "Billionaire Chrono, luxury watches, rare timepieces, horological collectibles, collector watches"
  ),
  "/crypto": page(
    "Billionaire Crypto | Digital Asset Perspectives",
    "Billionaire Crypto presents digital-asset perspectives and opportunities within the wider Billionaire Collection ecosystem.",
    "Billionaire Crypto, digital assets, cryptocurrency, UHNW digital assets, luxury technology"
  ),
  "/media": page(
    "Billionaire Media | Luxury Intelligence & Culture",
    "Billionaire Media brings together the editorial, broadcast and digital channels of Billionaire Collection for the global luxury audience.",
    "Billionaire Media, luxury media, UHNW media, billionaire lifestyle media, luxury intelligence"
  ),
  "/news": page(
    "Billionaire News | UHNW Intelligence & Luxury Market Insights",
    "Read Billionaire News for curated intelligence on wealth, ultra-prime real estate, superyachts, private aviation, art, luxury and the UHNW world.",
    "Billionaire News, UHNW news, billionaire news, luxury market insights, superyacht news, private aviation news"
  ),
  "/news-brand": page(
    "Billionaire News | Intelligence for the UHNW World",
    "Billionaire News is the Billionaire Collection editorial division, covering wealth, luxury markets, private aviation, yachting, real estate and culture.",
    "Billionaire News, billionaire intelligence, UHNW editorial, luxury market news, Billionaire Collection media"
  ),
  "/television": page(
    "Billionaire Television | Luxury Lifestyle Programming",
    "Billionaire Television is the broadcast division of Billionaire Collection, exploring luxury lifestyle, wealth, real estate, yachting, aviation and culture.",
    "Billionaire Television, luxury lifestyle television, billionaire media, UHNW television"
  ),
  "/magazine": page(
    "Billionaire Magazine | Luxury Lifestyle & UHNW Culture",
    "Billionaire Magazine presents luxury lifestyle, wealth, travel, property and culture for the global ultra-high-net-worth audience.",
    "Billionaire Magazine, luxury magazine, billionaire lifestyle, UHNW culture, luxury media"
  ),
  "/radio": page(
    "Billionaire Radio | Luxury Conversations & Culture",
    "Billionaire Radio brings luxury conversations, interviews and cultural perspectives to the Billionaire Collection audience.",
    "Billionaire Radio, luxury radio, billionaire podcast, UHNW conversations, luxury culture"
  ),
  "/technology": page(
    "Billionaire Technology | Education, Digital & Vitality",
    "Billionaire Technology is the innovation division of Billionaire Collection, connecting education, digital ventures, vitality and future-focused services.",
    "Billionaire Technology, Billionaire University, luxury technology, UHNW innovation, Billionaire Collection"
  ),
  "/university": page(
    "Billionaire University | Elite Education & Mentorship",
    "Billionaire University delivers ambitious education, mentorship and personal development resources within the Billionaire Collection ecosystem.",
    "Billionaire University, elite education, entrepreneur mentorship, sales training, wealth education"
  ),
  "/billionaire-tutor": page(
    "Billionaire Tutor | Personal Development & Coaching",
    "Billionaire Tutor connects personal development, coaching and educational support for ambitious individuals and families.",
    "Billionaire Tutor, private tutor, elite coaching, personal development, Billionaire Collection education"
  ),
  "/billionaire-wisdom": page(
    "Billionaire Wisdom | Insights for Ambitious Lives",
    "Billionaire Wisdom shares perspectives, ideas and practical insights from the Billionaire Collection world.",
    "Billionaire Wisdom, wealth insights, billionaire mindset, luxury lifestyle insights, personal development"
  ),
  "/vitality": page(
    "Billionaire Vitality | Wellness & Longevity",
    "Billionaire Vitality focuses on premium wellness, longevity and personal-performance perspectives for the Billionaire Collection community.",
    "Billionaire Vitality, luxury wellness, longevity, UHNW health, performance optimisation"
  ),
  "/counsel": page(
    "Billionaire Counsel | Specialist Advisory Services",
    "Billionaire Counsel introduces specialist advisory services within the Billionaire Collection ecosystem.",
    "Billionaire Counsel, luxury advisory, specialist counsel, UHNW advisory services"
  ),
  "/funding": page(
    "Billionaire Funding | Private Capital & Opportunities",
    "Billionaire Funding presents private-capital perspectives and funding opportunities for qualified clients within the Billionaire Collection ecosystem.",
    "Billionaire Funding, private capital, UHNW funding, luxury finance, funding opportunities"
  ),
  "/golf": page(
    "Billionaire Golf | Private Golf Experiences",
    "Billionaire Golf creates access to distinctive golf experiences, clubs and hospitality for the Billionaire Collection community.",
    "Billionaire Golf, private golf, luxury golf experiences, golf hospitality, UHNW golf"
  ),
  "/travel": page(
    "Billionaire Travel | Bespoke Luxury Experiences",
    "Billionaire Travel curates bespoke journeys, exceptional stays and private experiences for discerning global travellers.",
    "Billionaire Travel, bespoke luxury travel, private travel, UHNW travel, luxury experiences"
  ),
  "/card": page(
    "Billionaire Card | Private Membership & Concierge",
    "The Billionaire Card introduces private membership and concierge access within the Billionaire Collection ecosystem.",
    "Billionaire Card, private membership, luxury concierge, billionaire membership, UHNW concierge"
  ),
  "/card-concierge": page(
    "Billionaire Concierge | 24/7 Private Access",
    "Billionaire Concierge connects members with round-the-clock assistance for travel, reservations, access and bespoke lifestyle requirements.",
    "Billionaire Concierge, 24/7 concierge, luxury concierge, private access, UHNW lifestyle"
  ),
  "/golden-ticket": page(
    "The Golden Ticket | Billionaire Collection Private Access",
    "The Golden Ticket is a private-access pathway within Billionaire Collection, designed for qualified applicants and member referrals.",
    "Golden Ticket, Billionaire Collection membership, private access, luxury membership, UHNW community"
  ),
  "/membership/apply": page(
    "Apply for Private Membership | Billionaire Collection",
    "Submit a private membership enquiry to Billionaire Collection and begin the qualification process for access to the ecosystem's services and opportunities.",
    "Billionaire Collection membership, apply for private membership, luxury membership, UHNW membership"
  ),
  "/champagne": page(
    "Billionaire Champagne | Exceptional Cuvées",
    "Billionaire Champagne presents exceptional cuvées and celebratory experiences within the Billionaire Collection product portfolio.",
    "Billionaire Champagne, luxury champagne, premium cuvée, rare champagne, luxury products"
  ),
  "/vodka": page(
    "Billionaire Vodka | Ultra-Premium Spirits",
    "Billionaire Vodka is an ultra-premium spirits brand within the Billionaire Collection product portfolio.",
    "Billionaire Vodka, ultra-premium vodka, luxury spirits, premium vodka"
  ),
  "/cigar": page(
    "Billionaire Cigar | Rare Hand-Rolled Cigars",
    "Billionaire Cigar presents rare hand-rolled cigars and refined smoking accessories for discerning enthusiasts.",
    "Billionaire Cigar, rare cigars, hand-rolled cigars, luxury cigars, premium tobacco"
  ),
  "/oud": page(
    "Billionaire Oud | Bespoke Luxury Fragrances",
    "Billionaire Oud introduces distinctive Arabian-inspired fragrances and refined olfactory experiences.",
    "Billionaire Oud, luxury oud, bespoke fragrance, Arabian perfume, luxury fragrance"
  ),
  "/media-kit": page(
    "Billionaire Collection Media Kit | Partnerships & Advertising",
    "Download the Billionaire Collection Media Kit and USD Rate Card, explore partnership opportunities and request a tailored media proposal.",
    "Billionaire Collection media kit, luxury media partnerships, advertising rate card, Billionaire Magazine media kit"
  ),
  "/contact": page(
    "Contact Billionaire Collection | Private Enquiries",
    "Contact Billionaire Collection for private enquiries about luxury services, partnerships, membership and concierge access.",
    "contact Billionaire Collection, luxury concierge enquiry, private membership enquiry, UHNW services contact"
  ),
  "/privacy": page(
    "Privacy Policy | Billionaire Collection",
    "Read the Billionaire Collection Privacy Policy.",
    "Billionaire Collection privacy policy"
  ),
  "/terms": page(
    "Terms & Conditions | Billionaire Collection",
    "Read the terms and conditions governing use of the Billionaire Collection website and services.",
    "Billionaire Collection terms and conditions"
  ),
  "/founder": {
    title: "Lawrence Colbert | Founder & Owner of Billionaire Collection and Billionaire Magazine",
    description:
      "Lawrence Colbert is the Founder, Owner and Chief Executive Officer of Billionaire Collection and Founder and Owner of Billionaire Magazine. He leads the London-founded luxury ecosystem behind 40+ Billionaire brands, websites and ventures.",
    keywords:
      "Lawrence Colbert, Lawrence Colbert founder and owner, Billionaire Collection founder, Billionaire Collection owner, Billionaire Magazine founder, Billionaire Magazine owner, Billionaire Collection CEO, luxury ecosystem founder, luxury media founder, UHNW entrepreneur, Lawrence Colbert London",
    image: FOUNDER_IMAGE,
    type: "profile",
    twitterCreator: "@CeoLawrence",
    aiDescription:
      "Official profile of Lawrence Colbert: Founder, Owner and Chief Executive Officer of Billionaire Collection, and Founder and Owner of Billionaire Magazine. Billionaire Collection is a London-founded luxury ecosystem spanning media, education, brokerage, technology, products, membership and philanthropy.",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://billionairecollection.com/founder#lawrence-colbert",
          name: "Lawrence Colbert",
          jobTitle: "Founder, Owner and Chief Executive Officer",
          description:
            "Founder, Owner and Chief Executive Officer of Billionaire Collection; Founder and Owner of Billionaire Magazine.",
          url: "https://billionairecollection.com/founder",
          image: FOUNDER_IMAGE,
          worksFor: { "@id": "https://billionairecollection.com/#organization" },
          affiliation: {
            "@type": "Organization",
            name: "Billionaire Magazine",
            url: "https://billionairecollectionmagazine.com",
          },
        },
        {
          "@type": "ProfilePage",
          "@id": "https://billionairecollection.com/founder#webpage",
          name: "Lawrence Colbert | Founder & Owner of Billionaire Collection and Billionaire Magazine",
          url: "https://billionairecollection.com/founder",
          description:
            "The official profile of Lawrence Colbert, Founder, Owner and Chief Executive Officer of Billionaire Collection and Founder and Owner of Billionaire Magazine.",
          inLanguage: "en-GB",
          isPartOf: { "@id": "https://billionairecollection.com/#website" },
          mainEntity: {
            "@id": "https://billionairecollection.com/founder#lawrence-colbert",
          },
          primaryImageOfPage: { "@type": "ImageObject", url: FOUNDER_IMAGE },
        },
      ],
    },
  },
};

export function normalizePathname(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function pageTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function pageImage(metadata: PageMetadata): string {
  return metadata.image || DEFAULT_IMAGE;
}

export function pageStructuredData(
  pathname: string,
  metadata: PageMetadata
): Record<string, unknown> {
  if (metadata.structuredData) return metadata.structuredData;

  const canonicalPath = normalizePathname(pathname);
  const url = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: pageTitle(metadata.title),
    url,
    description: metadata.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: pageImage(metadata),
    },
  };
}
