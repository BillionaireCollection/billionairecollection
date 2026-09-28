import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const goldenTicketPage = resolve(process.cwd(), "client/src/pages/GoldenTicket.tsx");

describe("Golden Ticket editorial voice", () => {
  it("uses the refined invitation framing and removes the former product/key proposition", () => {
    const source = readFileSync(goldenTicketPage, "utf8");

    expect(source).toContain("An Invitation");
    expect(source).toContain("to the Exceptional.");
    expect(source).toContain("A life well lived is never");
    expect(source).toContain("A World, Curated.");
    expect(source).toContain("Explore the Art of Living");
    expect(source).not.toContain("Not a Product.");
    expect(source).not.toContain("A Key.");
    expect(source).not.toContain("THE KEY TO EVERYTHING");
    expect(source).not.toContain("One Key.");
  });
});
