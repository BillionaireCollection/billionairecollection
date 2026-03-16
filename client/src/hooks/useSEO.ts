/* ============================================================
   BILLIONAIRE COLLECTION — useSEO
   Sets per-page document title, meta description, and OG tags.
   ============================================================ */

import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const DEFAULT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";
const BASE_TITLE = "Billionaire Collection";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} — ${BASE_TITLE}`;
    document.title = fullTitle;

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }

    setMeta("og:title", fullTitle, "property");
    setMeta("twitter:title", fullTitle);

    if (image) {
      setMeta("og:image", image, "property");
      setMeta("twitter:image", image);
    } else {
      setMeta("og:image", DEFAULT_IMG, "property");
      setMeta("twitter:image", DEFAULT_IMG);
    }

    if (url) {
      setMeta("og:url", url, "property");
      const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (canonical) canonical.href = url;
    }
  }, [title, description, image, url]);
}
