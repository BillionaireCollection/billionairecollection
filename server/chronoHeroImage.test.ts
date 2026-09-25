import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Chrono hero image", () => {
  const pagePath = resolve(process.cwd(), "client/src/pages/Chrono.tsx");
  const assetPath = resolve(process.cwd(), "client/public/chrono-patek-philippe-diamond-timepiece.jpg");
  const source = readFileSync(pagePath, "utf8");

  it("uses the supplied Patek Philippe timepiece image for the hero", () => {
    expect(source).toContain('heroImage="/chrono-patek-philippe-diamond-timepiece.jpg"');
    expect(source).not.toContain('heroImage="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80"');
  });

  it("ships the local high-resolution hero asset", () => {
    expect(existsSync(assetPath)).toBe(true);
    expect(statSync(assetPath).size).toBeGreaterThan(400_000);
  });
});
