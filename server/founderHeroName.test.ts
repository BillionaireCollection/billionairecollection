import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Founder hero name", () => {
  const source = readFileSync(resolve(process.cwd(), "client/src/pages/Founder.tsx"), "utf8");

  it("keeps Lawrence Colbert on one responsive horizontal line", () => {
    expect(source).toContain('fontSize: "clamp(1.6rem, 6.25vw, 5rem)"');
    expect(source).toContain('whiteSpace: "nowrap"');
    expect(source).toContain('Lawrence <span style={{ color: GOLD }}>Colbert</span>');
    expect(source).not.toContain("Lawrence\n            <br />\n            <span style={{ color: GOLD }}>Colbert</span>");
  });

  it("uses the supplied Forever In Service edition with an Amazon purchase link", () => {
    expect(source).toContain('src="/forever-in-service-book-2026.jpg"');
    expect(source).toContain('href="https://a.co/d/00clGz60"');
    expect(source).toContain("Buy on Amazon");
  });

  it("places the five supplied published works between entrepreneurship and the recording-artist story", () => {
    const entrepreneurIndex = source.indexOf("The Entrepreneur");
    const publishedWorksIndex = source.indexOf("Published Works");
    const recordingArtistIndex = source.indexOf("The Recording Artist");

    expect(entrepreneurIndex).toBeGreaterThan(-1);
    expect(publishedWorksIndex).toBeGreaterThan(entrepreneurIndex);
    expect(recordingArtistIndex).toBeGreaterThan(publishedWorksIndex);
    expect(source).toContain("const PUBLISHED_WORKS = [");
    expect(source).toContain('image: "/best-book-on-sales-2026.jpg"');
    expect(source).toContain('image: "/founders-90-day-raise-2026.jpg"');
    expect(source).toContain('image: "/the-super-founder-2026.jpg"');
    expect(source).toContain('image: "/beyond-fears-2026.jpg"');
    expect(source).toContain('image: "/the-overnight-millionaire-2026.webp"');
    expect(source).toContain('gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))"');
  });

  it("provides the supplied Amazon links for every newly added book without cropping a cover", () => {
    expect(source).toContain('href: "https://a.co/d/0cTF4qDX"');
    expect(source).toContain('href: "https://a.co/d/05KACSWh"');
    expect(source).toContain('href: "https://a.co/d/00ywbbJ5"');
    expect(source).toContain('href: "https://a.co/d/060cXuKQ"');
    expect(source).toContain('href: "https://a.co/d/0872q9cF"');
    expect(source).toContain('aria-label={`View ${book.title} by Lawrence Colbert on Amazon`}');
    expect(source).toContain('objectFit: "contain"');
    expect(source).toContain("View on Amazon");
  });
});
