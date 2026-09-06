import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const BASE_URL = "https://billionairecollection.com";

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
        page = injectCanonical(page, getRequestPathname(req.originalUrl));
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
      const injected = injectCanonical(html, pathname);
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(injected);
    });
  });
}
