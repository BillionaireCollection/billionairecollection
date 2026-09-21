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
});
