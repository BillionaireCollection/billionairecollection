import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getRequestPathname, injectCanonical } from "./_core/vite";

describe("server-delivered indexability controls", () => {
  it("adds a route-specific canonical when the HTML shell has none", () => {
    const html = "<!doctype html><html><head><title>Page</title></head><body></body></html>";
    expect(injectCanonical(html, "/media-kit")).toContain(
      '<link rel="canonical" href="https://billionairecollection.com/media-kit" />'
    );
  });

  it("replaces an existing canonical rather than adding a duplicate", () => {
    const html = '<html><head><link rel="canonical" href="https://example.test/" /></head><body></body></html>';
    const result = injectCanonical(html, "/founder");
    expect(result.match(/rel="canonical"/g)).toHaveLength(1);
    expect(result).toContain('href="https://billionairecollection.com/founder"');
  });

  it("derives the requested crawl path from the original URL rather than Express mount state", () => {
    expect(getRequestPathname("/media-kit?utm_source=google")).toBe("/media-kit");
    expect(getRequestPathname("/founder/")).toBe("/founder/");
  });

  it("keeps the public Media Kit route crawlable and listed in the sitemap source", () => {
    const source = readFileSync(resolve(process.cwd(), "server/_core/index.ts"), "utf8");
    const staticServer = readFileSync(resolve(process.cwd(), "server/_core/vite.ts"), "utf8");
    expect(source).toContain('{ loc: "/media-kit", priority: "0.75", changefreq: "monthly" }');
    expect(staticServer).toContain('"/media-kit"');
  });

  it("uses a permanent HTTP redirect for the legacy store alias", () => {
    const staticServer = readFileSync(resolve(process.cwd(), "server/_core/vite.ts"), "utf8");
    expect(staticServer).toContain('res.redirect(301, "/marketplace")');
  });
});
