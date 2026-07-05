import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  subscribeNewsletter,
  createConciergeRequest,
  createCardApplication,
  createContactEnquiry,
  getActiveListings,
  getFeaturedListings,
  createGoldenTicketApplication,
  getNewsletterSubscribers,
  getConciergeRequests,
  getCardApplications,
  getContactEnquiries,
  getGoldenTicketApplications,
  getAdminStats,
  updateCardApplicationStatus,
  updateGoldenTicketStatus,
  updateConciergeStatus,
  updateContactStatus,
  updateContactNotes,
} from "./db";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "./_core/notification";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email(), name: z.string().optional(), source: z.string().optional() }))
      .mutation(async ({ input }) => {
        await subscribeNewsletter({ email: input.email, name: input.name, source: input.source ?? "website" });
        return { success: true };
      }),
    list: adminProcedure.query(async () => getNewsletterSubscribers()),
  }),

  concierge: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        requestType: z.string().min(2),
        description: z.string().min(10),
        budget: z.string().optional(),
        preferredDate: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createConciergeRequest(input);
        return { success: true };
      }),
    list: adminProcedure.query(async () => getConciergeRequests()),
  }),

  card: router({
    submit: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        country: z.string().optional(),
        occupation: z.string().optional(),
        netWorth: z.string().optional(),
        cardTier: z.enum(["black", "platinum", "gold", "golden_ticket"]).default("black"),
        referralCode: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createCardApplication(input);
        // Notify owner
        notifyOwner({
          title: `New Billionaire Card Application — ${input.firstName} ${input.lastName}`,
          content: `**Name:** ${input.firstName} ${input.lastName}\n**Email:** ${input.email}\n**Phone:** ${input.phone ?? "—"}\n**Country:** ${input.country ?? "—"}\n**Occupation:** ${input.occupation ?? "—"}\n**Net Worth:** ${input.netWorth ?? "—"}\n**Card Tier:** ${input.cardTier}\n**Referral Code:** ${input.referralCode ?? "—"}`,
        }).catch(() => {/* non-blocking */});
        return { success: true };
      }),
    list: adminProcedure.query(async () => getCardApplications()),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "reviewing", "approved", "rejected"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateCardApplicationStatus(input.id, input.status, input.notes);
        return { success: true };
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(2),
        message: z.string().min(10),
        division: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createContactEnquiry(input);
        return { success: true };
      }),
    list: adminProcedure.query(async () => getContactEnquiries()),
  }),

  marketplace: router({
    listings: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async ({ input }) => getActiveListings(input.category)),
    featured: publicProcedure.query(async () => getFeaturedListings()),
  }),

  goldenTicket: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        country: z.string().optional(),
        message: z.string().optional(),
        referredBy: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createGoldenTicketApplication(input);
        // Notify owner
        notifyOwner({
          title: `New Golden Ticket Application — ${input.name}`,
          content: `**Name:** ${input.name}\n**Email:** ${input.email}\n**Phone:** ${input.phone ?? "—"}\n**Country:** ${input.country ?? "—"}\n**Referred By:** ${input.referredBy ?? "—"}\n**Message:** ${input.message ?? "—"}`,
        }).catch(() => {/* non-blocking */});
        return { success: true };
      }),
    list: adminProcedure.query(async () => getGoldenTicketApplications()),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "reviewing", "approved", "rejected"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateGoldenTicketStatus(input.id, input.status, input.notes);
        return { success: true };
      }),
  }),

  conciergeAdmin: router({
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateConciergeStatus(input.id, input.status, input.notes);
        return { success: true };
      }),
  }),

  contactAdmin: router({
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateContactStatus(input.id, input.status, input.notes);
        return { success: true };
      }),
    updateNotes: adminProcedure
      .input(z.object({
        id: z.number(),
        notes: z.string(),
      }))
      .mutation(async ({ input }) => {
        await updateContactNotes(input.id, input.notes);
        return { success: true };
      }),
  }),

  admin: router({
    stats: adminProcedure.query(async () => getAdminStats()),
  }),
});

export type AppRouter = typeof appRouter;
