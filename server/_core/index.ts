import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { newsRefreshHandler } from "../scheduledNewsRefresh";
import { stripeWebhookHandler } from "../stripe";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Stripe webhook MUST use raw body parser — register BEFORE express.json()
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // Scheduled endpoints (MUST be before tRPC middleware)
  app.post("/api/scheduled/news-refresh", newsRefreshHandler);

  // XML Sitemap — dynamically generated for SEO
  app.get("/sitemap.xml", (_req, res) => {
    const BASE = "https://billionairecollection.com";
    const today = new Date().toISOString().split("T")[0];
    const urls = [
      // Core / pillar pages — highest priority
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/services", priority: "0.95", changefreq: "weekly" },
      { loc: "/ecosystem", priority: "0.95", changefreq: "weekly" },
      { loc: "/brands", priority: "0.95", changefreq: "weekly" },
      { loc: "/about", priority: "0.90", changefreq: "monthly" },
      // Brokerage
      { loc: "/marketplace", priority: "0.85", changefreq: "weekly" },
      { loc: "/estates", priority: "0.85", changefreq: "weekly" },
      { loc: "/boat", priority: "0.85", changefreq: "weekly" },
      { loc: "/air", priority: "0.85", changefreq: "weekly" },
      { loc: "/car", priority: "0.85", changefreq: "weekly" },
      { loc: "/art", priority: "0.80", changefreq: "weekly" },
      { loc: "/crypto", priority: "0.75", changefreq: "weekly" },
      // Media
      { loc: "/news", priority: "0.85", changefreq: "daily" },
      { loc: "/magazine", priority: "0.80", changefreq: "monthly" },
      { loc: "/television", priority: "0.80", changefreq: "monthly" },
      { loc: "/radio", priority: "0.75", changefreq: "monthly" },
      { loc: "/media", priority: "0.75", changefreq: "monthly" },
      // Products
      { loc: "/champagne", priority: "0.75", changefreq: "monthly" },
      { loc: "/vodka", priority: "0.75", changefreq: "monthly" },
      { loc: "/cigar", priority: "0.75", changefreq: "monthly" },
      { loc: "/oud", priority: "0.75", changefreq: "monthly" },
      // Services
      { loc: "/card", priority: "0.80", changefreq: "monthly" },
      { loc: "/card-concierge", priority: "0.75", changefreq: "monthly" },
      { loc: "/funding", priority: "0.75", changefreq: "monthly" },
      { loc: "/golf", priority: "0.70", changefreq: "monthly" },
      { loc: "/travel", priority: "0.70", changefreq: "monthly" },
      // Technology
      { loc: "/technology", priority: "0.75", changefreq: "monthly" },
      { loc: "/billionaire-tutor", priority: "0.70", changefreq: "monthly" },
      { loc: "/billionaire-wisdom", priority: "0.70", changefreq: "monthly" },
      // Other
      { loc: "/golden-ticket", priority: "0.70", changefreq: "monthly" },
      { loc: "/contact", priority: "0.65", changefreq: "monthly" },
      { loc: "/news", priority: "0.85", changefreq: "daily" },
      { loc: "/privacy", priority: "0.30", changefreq: "yearly" },
      { loc: "/terms", priority: "0.30", changefreq: "yearly" },
    ];
    const uniqueUrls = urls.filter((u, i, arr) => arr.findIndex(x => x.loc === u.loc) === i);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${uniqueUrls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
    res.header("Content-Type", "application/xml");
    res.header("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
