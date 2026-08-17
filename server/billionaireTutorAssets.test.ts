import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const tutorPagePath = resolve(projectRoot, "client", "src", "pages", "BillionaireTutor.tsx");
const logoPath = resolve(projectRoot, "client", "public", "billionaire-university-logo.webp");

describe("Billionaire Tutor original University logo assets", () => {
  it("uses the deployable original logo in all four small-image placements", () => {
    const source = readFileSync(tutorPagePath, "utf8");

    expect(source).toContain('const BILLIONAIRE_UNIVERSITY_LOGO = "/billionaire-university-logo.webp"');
    expect(source.match(/src=\{BILLIONAIRE_UNIVERSITY_LOGO\}/g)).toHaveLength(4);
  });

  it("keeps the original logo below the production checkpoint size limit", () => {
    const stats = statSync(logoPath);

    expect(stats.size).toBeGreaterThan(0);
    expect(stats.size).toBeLessThan(1_000_000);
  });
});
