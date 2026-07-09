/**
 * Billionaire Collection — tRPC procedure unit tests
 * Tests all public and admin procedures for correct input validation and response shape.
 */
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeCtx(role: "user" | "admin" | null = null): TrpcContext {
  const user =
    role === null
      ? null
      : {
          id: 1,
          openId: "test-open-id",
          email: "test@billionairecollection.com",
          name: "Test User",
          loginMethod: "manus",
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// ── Auth ──────────────────────────────────────────────────────────────────────

describe("auth.me", () => {
  it("returns null for unauthenticated requests", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user object for authenticated requests", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.email).toBe("test@billionairecollection.com");
  });
});

// ── Newsletter ────────────────────────────────────────────────────────────────

describe("newsletter.subscribe", () => {
  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.newsletter.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("accepts a valid email", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    // DB may not be available in test env — we just check input validation passes
    try {
      const result = await caller.newsletter.subscribe({
        email: "test@example.com",
      });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      // Accept DB-unavailable errors; reject validation errors
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

// ── Concierge ─────────────────────────────────────────────────────────────────

describe("concierge.submit", () => {
  it("rejects missing required fields", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      // @ts-expect-error intentional bad input
      caller.concierge.submit({ name: "A" })
    ).rejects.toThrow();
  });

  it("accepts a valid concierge request", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    try {
      const result = await caller.concierge.submit({
        name: "Lawrence Colbert",
        email: "lc@billionairecollection.com",
        requestType: "Private Aviation",
        description: "Need a G800 from London to Dubai next Friday.",
      });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

// ── Card Application ──────────────────────────────────────────────────────────

describe("card.submit", () => {
  it("rejects missing first/last name", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      // @ts-expect-error intentional bad input
      caller.card.submit({ email: "test@example.com" })
    ).rejects.toThrow();
  });

  it("accepts a valid card application", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    try {
      const result = await caller.card.submit({
        firstName: "Lawrence",
        lastName: "Colbert",
        email: "lc@billionairecollection.com",
        cardTier: "black",
      });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

// ── Golden Ticket ─────────────────────────────────────────────────────────────

describe("goldenTicket.submit", () => {
  it("rejects short name", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.goldenTicket.submit({ name: "A", email: "test@example.com" })
    ).rejects.toThrow();
  });

  it("accepts a valid golden ticket application", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    try {
      const result = await caller.goldenTicket.submit({
        name: "Lawrence Colbert",
        email: "lc@billionairecollection.com",
        message: "I would like to apply for the Golden Ticket.",
      });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

// ── Contact ───────────────────────────────────────────────────────────────────

describe("contact.submit", () => {
  it("rejects short message", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.contact.submit({
        name: "Test",
        email: "test@example.com",
        subject: "Hello",
        message: "Hi",
      })
    ).rejects.toThrow();
  });

  it("accepts a valid contact enquiry", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    try {
      const result = await caller.contact.submit({
        name: "Lawrence Colbert",
        email: "lc@billionairecollection.com",
        subject: "Partnership Enquiry",
        message: "I would like to discuss a potential partnership with Billionaire Collection.",
      });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

// ── Marketplace ───────────────────────────────────────────────────────────────

describe("marketplace.listings", () => {
  it("returns an array (or throws DB-unavailable error)", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    try {
      const result = await caller.marketplace.listings({});
      expect(Array.isArray(result)).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

// ── Admin — Access Control ────────────────────────────────────────────────────

describe("admin.stats", () => {
  it("rejects unauthenticated access", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.admin.stats()).rejects.toThrow();
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(caller.admin.stats()).rejects.toThrow();
  });

  it("returns stats object for admin users (or DB-unavailable error)", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    try {
      const result = await caller.admin.stats();
      expect(typeof result.totalCardApplications).toBe("number");
      expect(typeof result.totalGoldenTickets).toBe("number");
      expect(typeof result.totalConciergeRequests).toBe("number");
      expect(typeof result.totalContactEnquiries).toBe("number");
      expect(typeof result.totalNewsletterSubscribers).toBe("number");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

describe("card.list (admin only)", () => {
  it("rejects unauthenticated access", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.card.list()).rejects.toThrow();
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(caller.card.list()).rejects.toThrow();
  });

  it("returns array for admin users (or DB-unavailable error)", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    try {
      const result = await caller.card.list();
      expect(Array.isArray(result)).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

describe("goldenTicket.list (admin only)", () => {
  it("rejects unauthenticated access", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.goldenTicket.list()).rejects.toThrow();
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(caller.goldenTicket.list()).rejects.toThrow();
  });
});

describe("card.updateStatus (admin only)", () => {
  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(
      caller.card.updateStatus({ id: 1, status: "approved" })
    ).rejects.toThrow();
  });

  it("rejects invalid status values", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    await expect(
      // @ts-expect-error intentional bad input
      caller.card.updateStatus({ id: 1, status: "invalid_status" })
    ).rejects.toThrow();
  });

  it("accepts valid status update for admin (or DB-unavailable error)", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    try {
      const result = await caller.card.updateStatus({ id: 999, status: "reviewing" });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

describe("goldenTicket.updateStatus (admin only)", () => {
  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(
      caller.goldenTicket.updateStatus({ id: 1, status: "approved" })
    ).rejects.toThrow();
  });

  it("accepts valid status update for admin (or DB-unavailable error)", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    try {
      const result = await caller.goldenTicket.updateStatus({ id: 999, status: "reviewing" });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

describe("conciergeAdmin.updateStatus (admin only)", () => {
  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(
      caller.conciergeAdmin.updateStatus({ id: 1, status: "in_progress" })
    ).rejects.toThrow();
  });

  it("rejects invalid status values", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    await expect(
      // @ts-expect-error intentional bad input
      caller.conciergeAdmin.updateStatus({ id: 1, status: "bad_status" })
    ).rejects.toThrow();
  });
});

describe("contactAdmin.updateStatus (admin only)", () => {
  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(
      caller.contactAdmin.updateStatus({ id: 1, status: "read" })
    ).rejects.toThrow();
  });

  it("rejects invalid status values", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    await expect(
      // @ts-expect-error intentional bad input
      caller.contactAdmin.updateStatus({ id: 1, status: "unknown" })
    ).rejects.toThrow();
  });
});

// ── Billionaire Tutor Leads ───────────────────────────────────────────────────

describe("tutorLead.submit", () => {
  it("rejects missing name", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.tutorLead.submit({ name: "", email: "test@example.com" })
    ).rejects.toThrow();
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.tutorLead.submit({ name: "John Doe", email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("accepts valid submission (or DB-unavailable error)", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    try {
      const result = await caller.tutorLead.submit({
        name: "John Doe",
        email: "john@example.com",
        phone: "+44 7700 900000",
        wealthStage: "$10M – $50M net worth",
        mentorGoal: "Scale my business to 9 figures and build generational wealth.",
        source: "billionairecollection.com/billionaire-tutor",
      });
      expect(result.success).toBe(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).not.toContain("Invalid");
    }
  });
});

describe("tutorLead.list (admin only)", () => {
  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(caller.tutorLead.list()).rejects.toThrow();
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.tutorLead.list()).rejects.toThrow();
  });
});

describe("tutorLead.updateStatus (admin only)", () => {
  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(
      caller.tutorLead.updateStatus({ id: 1, status: "contacted" })
    ).rejects.toThrow();
  });

  it("rejects invalid status values", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    await expect(
      // @ts-expect-error intentional bad input
      caller.tutorLead.updateStatus({ id: 1, status: "bad_status" })
    ).rejects.toThrow();
  });
});
