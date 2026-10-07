import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("enquiry and private listing routing", () => {
  it("sends shared division enquiry CTAs to the on-site contact workflow", () => {
    const divisionPage = read("client/src/components/DivisionPage.tsx");
    expect(divisionPage).toContain("return `/contact?${params.toString()}`");
    expect(divisionPage).toContain("cta={primaryCta}");
    expect(divisionPage).toContain("btnHref: enquiryHref(ctaBanner.btnLabel)");
  });

  it("redirects every shared View Listings CTA to the private subscription page", () => {
    const divisionPage = read("client/src/components/DivisionPage.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(divisionPage).toContain("/subscribe?interest=${encodeURIComponent(badge)}");
    expect(divisionPage).toContain("href={listingSubscriptionHref}");
    expect(home).toContain('href="/subscribe?interest=Billionaire%20Collection"');
  });

  it("does not declare the merchandise store as a listing destination", () => {
    for (const page of ["Estates", "Boat", "Air", "Car", "Art", "Crypto", "Chrono"]) {
      const source = read(`client/src/pages/${page}.tsx`);
      expect(source).toContain('/subscribe?interest=');
      expect(source).not.toMatch(/heroCtaSecondary=\{\{ label: "View (Listings|Collection)", href: "\/marketplace"/);
    }
  });

  it("does not retain the invalid /concierge destination in public page source", () => {
    const pageDirectory = path.join(root, "client/src/pages");
    const invalidReferences = fs.readdirSync(pageDirectory)
      .filter((file) => file.endsWith(".tsx"))
      .filter((file) => read(path.join("client/src/pages", file)).includes('"/concierge"'));
    expect(invalidReferences).toEqual([]);
  });

  it("persists enquiries before attempting bounded owner-email delivery", () => {
    const router = read("server/routers.ts");
    const email = read("server/_core/email.ts");
    expect(router).toContain("const enquiry = await createContactEnquiry(input)");
    expect(router).toContain("recordContactOwnerEmailDelivery(enquiryId, \"pending\")");
    expect(router).toContain("recordContactOwnerEmailDelivery(enquiryId, delivery.status)");
    expect(router).toContain("void sendOwnerEmail(");
    expect(router).toContain("replyTo: input.email");
    expect(email).toContain("await smtpTransport.verify()");
    expect(email).toContain("escapeHtml(body)");
    expect(email).not.toContain("console.error(`[Email] Failed:");
  });
});
