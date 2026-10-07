import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
const exists = (relative: string) => fs.existsSync(path.join(root, relative));

describe("marketing consent and public claim controls", () => {
  it("delays newsletter capture and requires affirmative marketing consent", () => {
    const prompt = read("client/src/components/NewsletterPrompt.tsx");
    const footer = read("client/src/components/Footer.tsx");
    const news = read("client/src/pages/News.tsx");
    const router = read("server/routers.ts");
    expect(prompt).toContain("6_000");
    expect(prompt).toContain("marketingConsent: true");
    expect(footer).toContain("marketingConsent: true");
    expect(news).toContain("marketingConsent: true");
    expect(router).toContain("marketingConsent: z.literal(true)");
  });

  it("does not render a cookie notice or load optional analytics", () => {
    const html = read("client/index.html");
    const app = read("client/src/App.tsx");
    expect(html).not.toContain("data-website-id");
    expect(app).not.toContain("CookieConsent");
    expect(exists("client/src/components/CookieConsent.tsx")).toBe(false);
  });

  it("removes unsupported scale figures from the homepage", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).not.toContain("395000");
    expect(home).not.toContain('prefix: "$"');
    expect(home).not.toContain('label: "Elite Partners"');
  });

  it("labels the independent home directory as Curated Brands and gives each entry a link", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain("Curated Brands");
    expect(home).not.toContain("Curated Partners & Brands");
    expect(home).toContain('href={brand.href}');
    expect(home).toContain("https://www.louisvuitton.com/");
    expect(home).toContain("https://www.lurssen.com/");
  });

  it("removes unverified partnership language from division content", () => {
    for (const page of ["Air", "Art", "Boat", "Car", "Chrono", "Counsel", "Crypto", "Estates", "Travel", "Vitality"]) {
      const source = read(`client/src/pages/${page}.tsx`);
      expect(source.toLowerCase()).not.toContain("in partnership with");
      expect(source).not.toContain("partnerLogos=");
    }
  });
});
