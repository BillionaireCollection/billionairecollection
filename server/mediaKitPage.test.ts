import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Media Kit page", () => {
  const page = readFileSync(resolve(projectRoot, "client/src/pages/MediaKit.tsx"), "utf8");
  const router = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");

  it("exposes both supplied downloadable assets", () => {
    expect(page).toContain("/billionaire-media-kit.zip");
    expect(page).toContain("/billionaire-usd-rate-card.md");
    expect(page).toContain("Download Media Kit");
    expect(page).toContain("Download USD Rate Card");
  });

  it("keeps the approved Charter Partner pricing and time limit visible", () => {
    expect(page).toContain("50% off open rates");
    expect(page).toContain("31 October 2026");
    expect(page).toContain("$75,000");
  });

  it("registers a public route for the page", () => {
    expect(router).toContain('import MediaKit from "./pages/MediaKit";');
    expect(router).toContain('<Route path="/media-kit" component={MediaKit} />');
  });

  it("keeps Media Kit visible in desktop and mobile site navigation", () => {
    const navigation = readFileSync(resolve(projectRoot, "client/src/components/Navbar.tsx"), "utf8");
    expect(navigation).toContain('{ label: "Media Kit", href: "/media-kit" }');
    expect(navigation).toContain('[{ label: "News", href: "/news" }, { label: "Media Kit", href: "/media-kit" }');
  });

  it("places the supplied showreel immediately before Starter Packages", () => {
    expect(existsSync(resolve(projectRoot, "client/public/billionaire-collection-showreel.mp4"))).toBe(false);
    expect(page).toContain('const SHOWREEL_URL = "https://billionairecollection.github.io/billionairecollection/billionaire-collection-showreel.mp4";');
    expect(page).toContain('aria-label="Billionaire Collection Showreel"');
    expect(page).toContain("controls");
    expect(page.indexOf('aria-label="Billionaire Collection Showreel"')).toBeLessThan(page.indexOf(">Starter Packages</span>"));
  });
});
