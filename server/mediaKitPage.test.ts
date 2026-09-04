import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Media Kit page", () => {
  const page = readFileSync(resolve(projectRoot, "client/src/pages/MediaKit.tsx"), "utf8");
  const router = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");

  it("exposes both supplied downloadable assets", () => {
    expect(page).toContain("/manus-storage/billionaire-media-kit_bca047b3.zip");
    expect(page).toContain("/manus-storage/billionaire-usd-rate-card_604d9edf.md");
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
});
