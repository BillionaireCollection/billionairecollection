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
});
