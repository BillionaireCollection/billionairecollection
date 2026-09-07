import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const BASE_URL = "https://billionairecollection.com";

type PageMetadata = {
  title: string;
  description: string;
  keywords: string;
  image: string;
  type?: "website" | "profile";
  aiDescription: string;
  structuredData?: Record<string, unknown>;
};

const FOUNDER_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-hero-main-QJbNmDnsM8Jru6dBDixZQ8.webp";

const PAGE_METADATA: Record<string, PageMetadata> = {
  "/founder": {
    title: "Lawrence Colbert | Founder & Owner of Billionaire Magazine and Billionaire Collection",
    description: "Lawrence Colbert is the Founder, Owner and Chief Executive Officer of Billionaire Collection and Founder and Owner of Billionaire Magazine. He leads the London-founded luxury ecosystem behind 40+ Billionaire brands, websites and ventures.",
    keywords: "Lawrence Colbert, Lawrence Colbert founder and owner, Billionaire Collection founder, Billionaire Collection owner, Billionaire Magazine founder, Billionaire Magazine owner, Billionaire Magazine founder and owner, Billionaire Collection CEO, luxury ecosystem founder, luxury media founder, UHNW entrepreneur, Lawrence Colbert London",
    image: FOUNDER_IMAGE,
    type: "profile",
    aiDescription: "Official profile of Lawrence Colbert: Founder, Owner and Chief Executive Officer of Billionaire Collection, and Founder and Owner of Billionaire Magazine. Billionaire Collection is a London-founded luxury ecosystem spanning media, education, brokerage, technology, products, membership and philanthropy.",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://billionairecollection.com/founder#lawrence-colbert",
          name: "Lawrence Colbert",
          jobTitle: "Founder, Owner and Chief Executive Officer",
          description: "Founder, Owner and Chief Executive Officer of Billionaire Collection; Founder and Owner of Billionaire Magazine.",
          url: "https://billionairecollection.com/founder",
          image: FOUNDER_IMAGE,
          worksFor: { "@id": "https://billionairecollection.com/#organization" },
          affiliation: { "@type": "Organization", name: "Billionaire Magazine", url: "https://billionairecollectionmagazine.com" },
        },
        {
          "@type": "ProfilePage",
          "@id": "https://billionairecollection.com/founder#webpage",
          name: "Lawrence Colbert | Founder & Owner of Billionaire Magazine and Billionaire Collection",
          url: "https://billionairecollection.com/founder",
          description: "The official profile of Lawrence Colbert, Founder, Owner and Chief Executive Officer of Billionaire Collection and Founder and Owner of Billionaire Magazine.",
          inLanguage: "en-GB",
          isPartOf: { "@id": "https://billionairecollection.com/#website" },
          mainEntity: { "@id": "https://billionairecollection.com/founder#lawrence-colbert" },
          primaryImageOfPage: { "@type": "ImageObject", url: FOUNDER_IMAGE },
        },
      ],
    },
  },
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function replaceOrAppendMeta(html: string, attr: "name" | "property", key: string, value: string): string {
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
  const expression = new RegExp(`<meta\\b[^>]*\\b${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "i");
  if (expression.test(html)) return html.replace(expression, tag);
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

export function injectPageMetadata(html: string, pathname: string): string {
  const metadata = PAGE_METADATA[pathname];
  if (!metadata) return html;

  let page = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(metadata.title)} | Billionaire Collection</title>`);
  page = replaceOrAppendMeta(page, "name", "description", metadata.description);
  page = replaceOrAppendMeta(page, "name", "keywords", metadata.keywords);
  page = replaceOrAppendMeta(page, "name", "author", "Lawrence Colbert");
  page = replaceOrAppendMeta(page, "name", "ai-description", metadata.aiDescription);
  page = replaceOrAppendMeta(page, "property", "og:type", metadata.type || "website");
  page = replaceOrAppendMeta(page, "property", "og:title", metadata.title);
  page = replaceOrAppendMeta(page, "property", "og:description", metadata.description);
  page = replaceOrAppendMeta(page, "property", "og:url", `${BASE_URL}${pathname}`);
  page = replaceOrAppendMeta(page, "property", "og:image", metadata.image);
  page = replaceOrAppendMeta(page, "property", "og:image:alt", metadata.title);
  page = replaceOrAppendMeta(page, "name", "twitter:card", "summary_large_image");
  page = replaceOrAppendMeta(page, "name", "twitter:title", metadata.title);
  page = replaceOrAppendMeta(page, "name", "twitter:description", metadata.description);
  page = replaceOrAppendMeta(page, "name", "twitter:image", metadata.image);
  page = replaceOrAppendMeta(page, "name", "twitter:image:alt", metadata.title);
  page = replaceOrAppendMeta(page, "name", "twitter:creator", "@CeoLawrence");

  if (metadata.structuredData) {
    const structuredTag = `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(metadata.structuredData)}</script>`;
    const existing = /<script\b[^>]*\bid=["']route-structured-data["'][^>]*>[\s\S]*?<\/script>/i;
    page = existing.test(page) ? page.replace(existing, structuredTag) : page.replace(/<\/head>/i, `  ${structuredTag}\n</head>`);
  }

  return page;
}

// Known valid SPA routes — any other path is a 404
const VALID_ROUTES = new Set([
  "/", "/estates", "/boat", "/air", "/car", "/art", "/chrono", "/crypto",
  "/media", "/television", "/magazine", "/radio", "/news-brand",
  "/technology", "/services", "/funding", "/golf", "/travel",
  "/vitality", "/counsel", "/card", "/card-concierge",
  "/champagne", "/vodka", "/cigar", "/oud",
  "/marketplace", "/store", "/news",
  "/privacy", "/terms", "/contact", "/about",
  "/golden-ticket", "/billionaire-wisdom", "/billionaire-tutor",
  "/university", "/ecosystem", "/brands", "/founder",
  "/admin", "/x-offer", "/offer",
  "/membership/apply",
  "/media-kit",
]);

export function injectCanonical(html: string, pathname: string): string {
  const canonical = `${BASE_URL}${pathname === "/" ? "" : pathname.replace(/\/$/, "")}`;
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  const replaced = html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i, canonicalTag);

  // The static HTML shell does not carry a canonical tag; always inject one
  // before sending the response so crawlers receive it without JavaScript.
  if (replaced !== html) return replaced;
  return html.replace(/<\/head>/i, `  ${canonicalTag}\n</head>`);
}

export function getRequestPathname(originalUrl: string): string {
  return new URL(originalUrl, BASE_URL).pathname;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        const clientTemplate = path.resolve(
          import.meta.dirname,
          "../..",
          "client",
          "index.html"
        );

        // always reload the index.html file from disk incase it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`
        );
        let page = await vite.transformIndexHtml(url, template);
        const pathname = getRequestPathname(req.originalUrl);
        page = injectPageMetadata(injectCanonical(page, pathname), pathname);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // /store is a legacy alias for the Marketplace. Redirect at HTTP level so
  // crawlers do not index a second URL for the same content.
  app.get("/store", (_req, res) => {
    res.redirect(301, "/marketplace");
  });

  app.use(express.static(distPath));

  // Google Search Console ownership verification
  app.get("/googleb0c6e8d7a35c9529.html", (_req, res) => {
    res.set("Content-Type", "text/html").send("google-site-verification: googleb0c6e8d7a35c9529.html");
  });

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res, next) => {
    const indexPath = path.resolve(distPath, "index.html");
    fs.readFile(indexPath, "utf-8", (err, html) => {
      if (err) {
        // Log the error but return a clean 500 — never expose stack traces
        console.error("[serveStatic] Failed to read index.html:", err.message);
        res.status(500).set("Content-Type", "text/html").send(
          "<!doctype html><html><head><title>Server Error</title></head><body><h1>500 — Internal Server Error</h1><p>Please try again shortly.</p></body></html>"
        );
        return;
      }
      // Determine HTTP status: unknown paths get 404 so Googlebot doesn't soft-404
      const pathname = getRequestPathname(req.originalUrl);
      const isKnownRoute = VALID_ROUTES.has(pathname) || pathname.startsWith("/api/");
      const statusCode = isKnownRoute ? 200 : 404;
      const injected = injectPageMetadata(injectCanonical(html, pathname), pathname);
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(injected);
    });
  });
}
