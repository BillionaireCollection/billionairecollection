import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homePage = resolve(process.cwd(), "client/src/pages/Home.tsx");

describe("homepage hero tagline", () => {
  it("restores the requested italic tagline without the former prefixed headline", () => {
    const source = readFileSync(homePage, "utf8");

    expect(source).toContain('<em style={{ color: "#fff", fontStyle: "italic" }}>The place for everything you desire</em>');
    expect(source).not.toContain("Billionaire Collection: The Place for");
    expect(source).toContain('id="homepage-hero-content"');
    expect(source).toContain('#homepage-hero-content { padding-top: clamp(12rem, 24vh, 14rem) !important; }');
  });
});
