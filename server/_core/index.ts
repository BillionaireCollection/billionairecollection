import dotenv from "dotenv";
dotenv.config({ override: true });
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { PAGE_METADATA } from "./seoMetadata";
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
    const routeSettings: Record<string, { priority: string; changefreq: string }> = {
      "/": { priority: "1.0", changefreq: "weekly" },
      "/services": { priority: "0.95", changefreq: "weekly" },
      "/ecosystem": { priority: "0.95", changefreq: "weekly" },
      "/brands": { priority: "0.95", changefreq: "weekly" },
      "/about": { priority: "0.90", changefreq: "monthly" },
      "/membership/apply": { priority: "0.90", changefreq: "monthly" },
      "/marketplace": { priority: "0.85", changefreq: "weekly" },
      "/estates": { priority: "0.85", changefreq: "weekly" },
      "/boat": { priority: "0.85", changefreq: "weekly" },
      "/air": { priority: "0.85", changefreq: "weekly" },
      "/car": { priority: "0.85", changefreq: "weekly" },
      "/news": { priority: "0.85", changefreq: "daily" },
      "/art": { priority: "0.80", changefreq: "weekly" },
      "/magazine": { priority: "0.80", changefreq: "monthly" },
      "/television": { priority: "0.80", changefreq: "monthly" },
      "/card": { priority: "0.80", changefreq: "monthly" },
      "/privacy": { priority: "0.30", changefreq: "yearly" },
      "/terms": { priority: "0.30", changefreq: "yearly" },
    };
    const urls = Object.keys(PAGE_METADATA).map(loc => ({
      loc,
      ...(routeSettings[loc] ?? { priority: "0.70", changefreq: "monthly" }),
    }));
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
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
