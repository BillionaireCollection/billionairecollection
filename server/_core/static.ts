import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import {
  BASE_URL,
  PAGE_METADATA,
  normalizePathname,
  pageImage,
  pageStructuredData,
  pageTitle,
} from "./seoMetadata";

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
  const normalizedPathname = normalizePathname(pathname);
  const metadata = PAGE_METADATA[normalizedPathname];
  if (!metadata) return html;

  const canonical = `${BASE_URL}${normalizedPathname === "/" ? "" : normalizedPathname}`;
  const title = pageTitle(metadata.title);
  const image = pageImage(metadata);
  let page = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  page = replaceOrAppendMeta(page, "name", "description", metadata.description);
  page = replaceOrAppendMeta(page, "name", "keywords", metadata.keywords);
  page = replaceOrAppendMeta(page, "name", "author", "Billionaire Collection");
  page = replaceOrAppendMeta(page, "name", "ai-description", metadata.aiDescription);
  page = replaceOrAppendMeta(page, "property", "og:type", metadata.type || "website");
  page = replaceOrAppendMeta(page, "property", "og:title", title);
  page = replaceOrAppendMeta(page, "property", "og:description", metadata.description);
  page = replaceOrAppendMeta(page, "property", "og:url", canonical);
  page = replaceOrAppendMeta(page, "property", "og:image", image);
  page = replaceOrAppendMeta(page, "property", "og:image:alt", title);
  page = replaceOrAppendMeta(page, "name", "twitter:card", "summary_large_image");
  page = replaceOrAppendMeta(page, "name", "twitter:title", title);
  page = replaceOrAppendMeta(page, "name", "twitter:description", metadata.description);
  page = replaceOrAppendMeta(page, "name", "twitter:image", image);
  page = replaceOrAppendMeta(page, "name", "twitter:image:alt", title);
  page = replaceOrAppendMeta(page, "name", "twitter:creator", metadata.twitterCreator || "@BillionaireCol");

  const structuredData = pageStructuredData(normalizedPathname, metadata);
  const structuredTag = `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
  const existing = /<script\b[^>]*\bid=["']route-structured-data["'][^>]*>[\s\S]*?<\/script>/i;
  page = existing.test(page) ? page.replace(existing, structuredTag) : page.replace(/<\/head>/i, `  ${structuredTag}\n</head>`);

  return page;
}

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

const NON_INDEXABLE_ROUTES = new Set(["/admin", "/x-offer", "/offer"]);

export function injectCanonical(html: string, pathname: string): string {
  const normalizedPathname = normalizePathname(pathname);
  const canonical = `${BASE_URL}${normalizedPathname === "/" ? "" : normalizedPathname}`;
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  const replaced = html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i, canonicalTag);
  if (replaced !== html) return replaced;
  return html.replace(/<\/head>/i, `  ${canonicalTag}\n</head>`);
}

export function getRequestPathname(originalUrl: string): string {
  return new URL(originalUrl, BASE_URL).pathname;
}

export function isIndexablePath(pathname: string): boolean {
  return !NON_INDEXABLE_ROUTES.has(normalizePathname(pathname));
}

export function injectIndexabilityDirective(html: string, pathname: string): string {
  if (isIndexablePath(pathname)) return html;
  return replaceOrAppendMeta(html, "name", "robots", "noindex, nofollow, noarchive");
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
  }

  app.get("/store", (_req, res) => {
    res.redirect(301, "/marketplace");
  });

  app.use(express.static(distPath, { index: false }));

  app.get("/googleb0c6e8d7a35c9529.html", (_req, res) => {
    res.set("Content-Type", "text/html").send("google-site-verification: googleb0c6e8d7a35c9529.html");
  });

  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    fs.readFile(indexPath, "utf-8", (err, html) => {
      if (err) {
        console.error("[serveStatic] Failed to read index.html:", err.message);
        res.status(500).set("Content-Type", "text/html").send(
          "<!doctype html><html><head><title>Server Error</title></head><body><h1>500 — Internal Server Error</h1><p>Please try again shortly.</p></body></html>"
        );
        return;
      }
      const pathname = getRequestPathname(req.originalUrl);
      const isKnownRoute = VALID_ROUTES.has(pathname) || pathname.startsWith("/api/");
      const statusCode = isKnownRoute ? 200 : 404;
      const injected = injectIndexabilityDirective(injectPageMetadata(injectCanonical(html, pathname), pathname), pathname);
      if (!isIndexablePath(pathname)) {
        res.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      }
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(injected);
    });
  });
}
