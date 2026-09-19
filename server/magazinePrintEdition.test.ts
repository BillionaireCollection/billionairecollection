import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const magazinePage = resolve(projectRoot, "client/src/pages/Magazine.tsx");
const printAssets = [
  "billionaire-magazine-print-aviation.jpg",
  "billionaire-magazine-print-residence.jpg",
  "billionaire-magazine-print-yacht.jpg",
];

describe("Billionaire Magazine print-edition gallery", () => {
  it("presents the print edition as an editorial feature on the Magazine page", () => {
    const source = readFileSync(magazinePage, "utf8");

    expect(source).toContain('id="print-edition"');
    expect(source).toContain("The Print Edition");
    expect(source).toContain("A Tangible Expression of");
    expect(source).toContain("Exceptional Living");
    expect(source).toContain("The journey continues");
    expect(source).toContain("At home with the extraordinary");
    expect(source).toContain("On the water, in the moment");
  });

  it("uses all three supplied print-edition images with meaningful alternative text", () => {
    const source = readFileSync(magazinePage, "utf8");

    for (const asset of printAssets) {
      expect(source).toContain(`/${asset}`);
      const assetPath = resolve(projectRoot, "client/public", asset);
      expect(existsSync(assetPath)).toBe(true);
      expect(statSync(assetPath).size).toBeGreaterThan(0);
    }

    expect(source).toContain("private aviation lounge");
    expect(source).toContain("luxury residence");
    expect(source).toContain("superyacht salon");
    expect((source.match(/loading="lazy"/g) || []).length).toBeGreaterThanOrEqual(3);
  });
});
