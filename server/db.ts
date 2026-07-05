import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  newsletterSubscribers,
  InsertNewsletterSubscriber,
  conciergeRequests,
  InsertConciergeRequest,
  cardApplications,
  InsertCardApplication,
  contactEnquiries,
  InsertContactEnquiry,
  marketplaceListings,
  goldenTicketApplications,
  InsertGoldenTicketApplication,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Newsletter ─────────────────────────────────────────────────────────────────────
export async function subscribeNewsletter(data: InsertNewsletterSubscriber) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(newsletterSubscribers).values(data).onDuplicateKeyUpdate({ set: { isActive: true, name: data.name ?? null } });
}

export async function getNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
}

// ─── Concierge Requests ───────────────────────────────────────────────────────
export async function createConciergeRequest(data: InsertConciergeRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(conciergeRequests).values(data);
  return result;
}

export async function getConciergeRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(conciergeRequests).orderBy(desc(conciergeRequests.createdAt));
}

// ─── Card Applications ──────────────────────────────────────────────────────────
export async function createCardApplication(data: InsertCardApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(cardApplications).values(data);
  return result;
}

export async function getCardApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cardApplications).orderBy(desc(cardApplications.createdAt));
}

// ─── Contact Enquiries ─────────────────────────────────────────────────────────
export async function createContactEnquiry(data: InsertContactEnquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(contactEnquiries).values(data);
  return result;
}

export async function getContactEnquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactEnquiries).orderBy(desc(contactEnquiries.createdAt));
}

// ─── Marketplace Listings ─────────────────────────────────────────────────────
export async function getActiveListings(category?: string) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(marketplaceListings.isActive, true)];
  if (category && category !== "all") {
    conditions.push(
      eq(
        marketplaceListings.category,
        category as "estate" | "yacht" | "aviation" | "automotive" | "art" | "crypto" | "other"
      )
    );
  }
  return db
    .select()
    .from(marketplaceListings)
    .where(and(...conditions))
    .orderBy(desc(marketplaceListings.isFeatured), desc(marketplaceListings.createdAt));
}

export async function getFeaturedListings() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(marketplaceListings)
    .where(and(eq(marketplaceListings.isActive, true), eq(marketplaceListings.isFeatured, true)))
    .orderBy(desc(marketplaceListings.createdAt))
    .limit(6);
}

// ─── Golden Ticket Applications ───────────────────────────────────────────────
export async function createGoldenTicketApplication(data: InsertGoldenTicketApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(goldenTicketApplications).values(data);
  return result;
}

export async function getGoldenTicketApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(goldenTicketApplications).orderBy(desc(goldenTicketApplications.createdAt));
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────
export async function getAdminStats() {
  const db = await getDb();
  if (!db) return {
    totalCardApplications: 0,
    pendingCardApplications: 0,
    totalGoldenTickets: 0,
    pendingGoldenTickets: 0,
    totalConciergeRequests: 0,
    pendingConciergeRequests: 0,
    totalContactEnquiries: 0,
    newContactEnquiries: 0,
    totalNewsletterSubscribers: 0,
  };

  const [
    cardTotal,
    cardPending,
    gtTotal,
    gtPending,
    conciergeTotal,
    conciergePending,
    contactTotal,
    contactNew,
    newsletterTotal,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(cardApplications),
    db.select({ count: sql<number>`count(*)` }).from(cardApplications).where(eq(cardApplications.status, "pending")),
    db.select({ count: sql<number>`count(*)` }).from(goldenTicketApplications),
    db.select({ count: sql<number>`count(*)` }).from(goldenTicketApplications).where(eq(goldenTicketApplications.status, "pending")),
    db.select({ count: sql<number>`count(*)` }).from(conciergeRequests),
    db.select({ count: sql<number>`count(*)` }).from(conciergeRequests).where(eq(conciergeRequests.status, "pending")),
    db.select({ count: sql<number>`count(*)` }).from(contactEnquiries),
    db.select({ count: sql<number>`count(*)` }).from(contactEnquiries).where(eq(contactEnquiries.status, "new")),
    db.select({ count: sql<number>`count(*)` }).from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, true)),
  ]);

  return {
    totalCardApplications: Number(cardTotal[0]?.count ?? 0),
    pendingCardApplications: Number(cardPending[0]?.count ?? 0),
    totalGoldenTickets: Number(gtTotal[0]?.count ?? 0),
    pendingGoldenTickets: Number(gtPending[0]?.count ?? 0),
    totalConciergeRequests: Number(conciergeTotal[0]?.count ?? 0),
    pendingConciergeRequests: Number(conciergePending[0]?.count ?? 0),
    totalContactEnquiries: Number(contactTotal[0]?.count ?? 0),
    newContactEnquiries: Number(contactNew[0]?.count ?? 0),
    totalNewsletterSubscribers: Number(newsletterTotal[0]?.count ?? 0),
  };
}

// ─── Status Updates ───────────────────────────────────────────────────────────
export async function updateCardApplicationStatus(
  id: number,
  status: "pending" | "reviewing" | "approved" | "rejected",
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(cardApplications)
    .set({ status, ...(notes !== undefined ? { notes } : {}) })
    .where(eq(cardApplications.id, id));
}

export async function updateGoldenTicketStatus(
  id: number,
  status: "pending" | "reviewing" | "approved" | "rejected",
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(goldenTicketApplications)
    .set({ status, ...(notes !== undefined ? { notes: notes as string } : {}) })
    .where(eq(goldenTicketApplications.id, id));
}

export async function updateConciergeStatus(
  id: number,
  status: "pending" | "in_progress" | "completed" | "cancelled",
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(conciergeRequests)
    .set({ status, ...(notes !== undefined ? { notes } : {}) })
    .where(eq(conciergeRequests.id, id));
}

export async function updateContactStatus(
  id: number,
  status: "new" | "read" | "replied" | "archived",
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactEnquiries)
    .set({ status, ...(notes !== undefined ? { notes } : {}) })
    .where(eq(contactEnquiries.id, id));
}

export async function updateContactNotes(
  id: number,
  notes: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactEnquiries)
    .set({ notes })
    .where(eq(contactEnquiries.id, id));
}

// ─── Admin: Users List ────────────────────────────────────────────────────────
export async function getUsers() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
      lastSignedIn: users.lastSignedIn,
    })
    .from(users)
    .orderBy(sql`${users.lastSignedIn} DESC`);
}
