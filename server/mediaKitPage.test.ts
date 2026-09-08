import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Media Kit page", () => {
  const page = readFileSync(resolve(projectRoot, "client/src/pages/MediaKit.tsx"), "utf8");
  const router = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");

  it("exposes both professional PDF downloads", () => {
    expect(existsSync(resolve(projectRoot, "client/public/billionaire-collection-media-kit.pdf"))).toBe(true);
    expect(existsSync(resolve(projectRoot, "client/public/billionaire-collection-usd-rate-card.pdf"))).toBe(true);
    expect(page).toContain("/billionaire-collection-media-kit.pdf");
    expect(page).toContain("/billionaire-collection-usd-rate-card.pdf");
    expect(page).toContain("Download Media Kit");
    expect(page).toContain("Download USD Rate Card");
  });

  it("keeps the approved Charter Partner pricing and time limit visible", () => {
    expect(page).toContain("50% off open rates");
    expect(page).toContain("31 October 2026");
    expect(page).toContain("$75,000");
  });

  it("registers a public route for the page", () => {
    expect(router).toContain('import MediaKit from "./pages/MediaKit";');
    expect(router).toContain('<Route path="/media-kit" component={MediaKit} />');
  });

  it("keeps Media Kit visible in desktop and mobile site navigation", () => {
    const navigation = readFileSync(resolve(projectRoot, "client/src/components/Navbar.tsx"), "utf8");
    expect(navigation).toContain('{ label: "Media Kit", href: "/media-kit" }');
    expect(navigation).toContain('[{ label: "News", href: "/news" }, { label: "Media Kit", href: "/media-kit" }');
  });

  it("places the supplied showreel immediately before Starter Packages", () => {
    expect(existsSync(resolve(projectRoot, "client/public/billionaire-collection-showreel.mp4"))).toBe(false);
    expect(page).toContain('const SHOWREEL_URL = "https://billionairecollection.github.io/billionairecollection/billionaire-collection-showreel.mp4";');
    expect(page).toContain('aria-label="Billionaire Collection Showreel"');
    expect(page).toContain("controls");
    expect(page.indexOf('aria-label="Billionaire Collection Showreel"')).toBeLessThan(page.indexOf(">Starter Packages</span>"));
  });

  it("offers proposal capture, embedded PDF previews and tracked download actions", () => {
    expect(page).toContain("trpc.contact.submit.useMutation");
    expect(page).toContain('subject: "Media Kit Custom Proposal Request"');
    expect(page).toContain('division: "Billionaire Media — Media Kit"');
    expect(page).toContain("trpc.mediaKit.trackDownload.useMutation");
    expect(page).toContain('title={`Preview: ${document.title}`}');
    expect(page).toContain("Download interest is recorded in aggregate");
  });

  it("attributes the approved past media partnerships and BBC Newsday feature", () => {
    expect(page).toContain("Trusted By");
    expect(page).toContain("Selected past media partnerships and a featured BBC Newsday interview.");
    expect(page).toContain("TOP MARQUES");
    expect(page).toContain("DUBAI YACHT");
    expect(page).toContain("LUXURY PROPERTY");
    expect(page).toContain("BIG BOYS");
    expect(page).toContain("BBC");
    expect(page).toContain("NEWSDAY");
  });

  it("provides a premium proposal-success dialog and full-screen PDF reading mode", () => {
    expect(page).toContain("isProposalSuccessOpen");
    expect(page).toContain("Proposal Requested");
    expect(page).toContain("Your custom-proposal request is with the Billionaire Collection team.");
    expect(page).toContain("Full-Screen Reading Mode");
    expect(page).toContain('title={`Full-screen reader: ${readerDocument.title}`}');
    expect(page).toContain("Open ${document.title} in full-screen reading mode");
  });
});
