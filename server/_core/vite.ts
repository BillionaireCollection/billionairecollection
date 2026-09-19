import fs from "fs";
import { type Express } from "express";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import {
  getRequestPathname,
  injectCanonical,
  injectIndexabilityDirective,
  injectPageMetadata,
} from "./static";

export async function setupVite(app: Express, server: Server) {
  const [{ createServer: createViteServer }, { default: viteConfig }] = await Promise.all([
    import("vite"),
    import("../../vite.config"),
  ]);
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
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
      let page = await vite.transformIndexHtml(url, template);
      const pathname = getRequestPathname(req.originalUrl);
      page = injectIndexabilityDirective(injectPageMetadata(injectCanonical(page, pathname), pathname), pathname);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}
