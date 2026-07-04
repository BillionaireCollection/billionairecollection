import { eq, desc, and } from "drizzle-orm";
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
