import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const homePage = resolve(projectRoot, "client/src/pages/Home.tsx");
const residenceAsset = resolve(projectRoot, "client/public/billionaire-magazine-print-residence.jpg");

describe("home ecosystem Media tile", () => {
  it("uses the supplied Billionaire Collection residence print-edition image instead of the jet visual", () => {
    const source = readFileSync(homePage, "utf8");

    expect(source).toContain('{ label: "Media", desc: "Television, Magazine & Radio", href: "/media", img: "/billionaire-magazine-print-residence.jpg" }');
    expect(source).not.toContain('{ label: "Media", desc: "Television, Magazine & Radio", href: "/media", img: "/bc-division-media-new.jpg" }');
    expect(existsSync(residenceAsset)).toBe(true);
    expect(statSync(residenceAsset).size).toBeGreaterThan(0);
  });
});
