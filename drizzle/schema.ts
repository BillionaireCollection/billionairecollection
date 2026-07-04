import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  decimal,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Newsletter Subscribers ───────────────────────────────────────────────────
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  source: varchar("source", { length: 64 }).default("website"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// ─── Concierge Requests ───────────────────────────────────────────────────────
export const conciergeRequests = mysqlTable("concierge_requests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  requestType: varchar("requestType", { length: 128 }).notNull(),
  description: text("description").notNull(),
  budget: varchar("budget", { length: 128 }),
  preferredDate: varchar("preferredDate", { length: 64 }),
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "cancelled"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ConciergeRequest = typeof conciergeRequests.$inferSelect;
export type InsertConciergeRequest = typeof conciergeRequests.$inferInsert;

// ─── Billionaire Card Applications ───────────────────────────────────────────
export const cardApplications = mysqlTable("card_applications", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  country: varchar("country", { length: 128 }),
  occupation: varchar("occupation", { length: 255 }),
  netWorth: varchar("netWorth", { length: 128 }),
  cardTier: mysqlEnum("cardTier", ["black", "platinum", "gold", "golden_ticket"]).default("black").notNull(),
  referralCode: varchar("referralCode", { length: 64 }),
  status: mysqlEnum("status", ["pending", "reviewing", "approved", "rejected"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type CardApplication = typeof cardApplications.$inferSelect;
export type InsertCardApplication = typeof cardApplications.$inferInsert;

// ─── Contact / Enquiries ──────────────────────────────────────────────────────
export const contactEnquiries = mysqlTable("contact_enquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  division: varchar("division", { length: 128 }),
  status: mysqlEnum("status", ["new", "read", "replied", "archived"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ContactEnquiry = typeof contactEnquiries.$inferSelect;
export type InsertContactEnquiry = typeof contactEnquiries.$inferInsert;

// ─── Marketplace Listings ─────────────────────────────────────────────────────
export const marketplaceListings = mysqlTable("marketplace_listings", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: mysqlEnum("category", ["estate", "yacht", "aviation", "automotive", "art", "crypto", "other"]).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 18, scale: 2 }),
  currency: varchar("currency", { length: 8 }).default("USD"),
  location: varchar("location", { length: 255 }),
  imageUrl: text("imageUrl"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  isActive: boolean("isActive").default(true).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;
export type InsertMarketplaceListing = typeof marketplaceListings.$inferInsert;

// ─── Golden Ticket Applications ───────────────────────────────────────────────
export const goldenTicketApplications = mysqlTable("golden_ticket_applications", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  country: varchar("country", { length: 128 }),
  message: text("message"),
  referredBy: varchar("referredBy", { length: 255 }),
  status: mysqlEnum("status", ["pending", "reviewing", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type GoldenTicketApplication = typeof goldenTicketApplications.$inferSelect;
export type InsertGoldenTicketApplication = typeof goldenTicketApplications.$inferInsert;