/* ============================================================
   BILLIONAIRE COLLECTION — useSEO
   Sets per-page document title, meta description, OG tags,
   Twitter card tags, meta keywords, and canonical URL.
   ============================================================ */

import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** Explicit canonical URL. Defaults to live domain + current pathname. */
  url?: string;
}

const DEFAULT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-og-preview-M7pD3ZebBXDoyAR52uFPiQ.png";
const BASE_TITLE = "Billionaire Collection";
const BASE_URL = "https://billionairecollection.com";

function setMeta(
  name: string,
  content: string,
  attr: "name" | "property" = "name"
) {
  let el = document.querySelector(
    `meta[${attr}="${name}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector(
    "link[rel='canonical']"
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSEO({ title, description, keywords, image, url }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${BASE_TITLE}`;
    document.title = fullTitle;

    // Canonical URL — explicit prop takes priority; otherwise derive from live domain + pathname
    const pathname = window.location.pathname;
    const canonicalUrl =
      url || `${BASE_URL}${pathname === "/" ? "" : pathname}`;
    setCanonical(canonicalUrl);

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }

    if (keywords) {
      setMeta("keywords", keywords);
    }

    setMeta("og:title", fullTitle, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", BASE_TITLE, "property");
    setMeta("og:url", canonicalUrl, "property");

    setMeta("twitter:title", fullTitle);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@billionmagazine");

    const ogImage = image || DEFAULT_IMG;
    setMeta("og:image", ogImage, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", `${title} — Billionaire Collection`, "property");
    setMeta("twitter:image", ogImage);
  }, [title, description, keywords, image, url]);
}
