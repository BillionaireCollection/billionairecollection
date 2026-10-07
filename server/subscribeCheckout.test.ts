import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("private listings subscription", () => {
  it("registers a dedicated subscription route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import Subscribe from "./pages/Subscribe"');
    expect(app).toContain('<Route path="/subscribe" component={Subscribe} />');
  });

  it("presents price disclosure and starts the existing secure Stripe membership checkout", () => {
    const page = read("client/src/pages/Subscribe.tsx");
    expect(page).toContain("$25,000");
    expect(page).toContain("trpc.membership.submitApplication.useMutation");
    expect(page).toContain('successPath: "/subscribe"');
    expect(page).toContain("Continue to Secure Checkout");
  });

  it("permits the subscription page to receive the secure checkout return", () => {
    const router = read("server/routers.ts");
    const stripe = read("server/stripe.ts");
    expect(router).toContain("successPath: z.string().regex");
    expect(stripe).toContain('input.successPath ?? "/membership/apply"');
  });
});
