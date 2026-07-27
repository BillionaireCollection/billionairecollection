// server/_core/index.ts
import dotenv from "dotenv";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  decimal
} from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
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
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  source: varchar("source", { length: 64 }).default("website"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var conciergeRequests = mysqlTable("concierge_requests", {
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var cardApplications = mysqlTable("card_applications", {
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var contactEnquiries = mysqlTable("contact_enquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  division: varchar("division", { length: 128 }),
  status: mysqlEnum("status", ["new", "read", "replied", "archived"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var marketplaceListings = mysqlTable("marketplace_listings", {
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var goldenTicketApplications = mysqlTable("golden_ticket_applications", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  country: varchar("country", { length: 128 }),
  message: text("message"),
  referredBy: varchar("referredBy", { length: 255 }),
  status: mysqlEnum("status", ["pending", "reviewing", "approved", "rejected"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var facultyApplications = mysqlTable("faculty_applications", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  ventures: text("ventures"),
  journey: text("journey"),
  linkedin: varchar("linkedin", { length: 512 }),
  source: varchar("source", { length: 128 }).default("billionairecollection.com/billionaire-tutor"),
  status: mysqlEnum("status", ["new", "reviewing", "invited", "rejected"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var newsArticles = mysqlTable("news_articles", {
  id: int("id").autoincrement().primaryKey(),
  /** Stable dedup key — slug derived from title, used for upsert */
  slug: varchar("slug", { length: 512 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  summary: text("summary").notNull(),
  category: varchar("category", { length: 64 }).notNull().default("Wealth"),
  source: varchar("source", { length: 128 }).notNull().default("Billionaire Collection"),
  imageUrl: text("imageUrl"),
  articleUrl: text("articleUrl"),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  publishedAt: timestamp("publishedAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var merchOrders = mysqlTable("merch_orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  // nullable — guest checkout allowed
  printfulOrderId: varchar("printfulOrderId", { length: 64 }),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  totalAmount: int("totalAmount").notNull(),
  // in cents (USD)
  items: text("items").notNull(),
  // JSON: [{productId, name, color, size, qty, unitPrice}]
  shippingAddress: text("shippingAddress").notNull(),
  // JSON: {name, address1, city, zip, country_code, email}
  email: varchar("email", { length: 320 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  newsApiKey: process.env.NEWS_API_KEY ?? "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? ""
};

// server/db.ts
var _db = null;
async function getDb() {
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
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function subscribeNewsletter(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(newsletterSubscribers).values(data).onDuplicateKeyUpdate({ set: { isActive: true, name: data.name ?? null } });
}
async function getNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
}
async function createConciergeRequest(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(conciergeRequests).values(data);
  return result;
}
async function getConciergeRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(conciergeRequests).orderBy(desc(conciergeRequests.createdAt));
}
async function createCardApplication(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(cardApplications).values(data);
  return result;
}
async function getCardApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cardApplications).orderBy(desc(cardApplications.createdAt));
}
async function createContactEnquiry(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(contactEnquiries).values(data);
  return result;
}
async function getContactEnquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactEnquiries).orderBy(desc(contactEnquiries.createdAt));
}
async function getActiveListings(category) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(marketplaceListings.isActive, true)];
  if (category && category !== "all") {
    conditions.push(
      eq(
        marketplaceListings.category,
        category
      )
    );
  }
  return db.select().from(marketplaceListings).where(and(...conditions)).orderBy(desc(marketplaceListings.isFeatured), desc(marketplaceListings.createdAt));
}
async function getFeaturedListings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(marketplaceListings).where(and(eq(marketplaceListings.isActive, true), eq(marketplaceListings.isFeatured, true))).orderBy(desc(marketplaceListings.createdAt)).limit(6);
}
async function createGoldenTicketApplication(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(goldenTicketApplications).values(data);
  return result;
}
async function getGoldenTicketApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(goldenTicketApplications).orderBy(desc(goldenTicketApplications.createdAt));
}
async function getAdminStats() {
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
    totalNewsletterSubscribers: 0
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
    newsletterTotal
  ] = await Promise.all([
    db.select({ count: sql`count(*)` }).from(cardApplications),
    db.select({ count: sql`count(*)` }).from(cardApplications).where(eq(cardApplications.status, "pending")),
    db.select({ count: sql`count(*)` }).from(goldenTicketApplications),
    db.select({ count: sql`count(*)` }).from(goldenTicketApplications).where(eq(goldenTicketApplications.status, "pending")),
    db.select({ count: sql`count(*)` }).from(conciergeRequests),
    db.select({ count: sql`count(*)` }).from(conciergeRequests).where(eq(conciergeRequests.status, "pending")),
    db.select({ count: sql`count(*)` }).from(contactEnquiries),
    db.select({ count: sql`count(*)` }).from(contactEnquiries).where(eq(contactEnquiries.status, "new")),
    db.select({ count: sql`count(*)` }).from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, true))
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
    totalNewsletterSubscribers: Number(newsletterTotal[0]?.count ?? 0)
  };
}
async function updateCardApplicationStatus(id, status, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(cardApplications).set({ status, ...notes !== void 0 ? { notes } : {} }).where(eq(cardApplications.id, id));
}
async function updateGoldenTicketStatus(id, status, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(goldenTicketApplications).set({ status, ...notes !== void 0 ? { notes } : {} }).where(eq(goldenTicketApplications.id, id));
}
async function updateConciergeStatus(id, status, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(conciergeRequests).set({ status, ...notes !== void 0 ? { notes } : {} }).where(eq(conciergeRequests.id, id));
}
async function updateContactStatus(id, status, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactEnquiries).set({ status, ...notes !== void 0 ? { notes } : {} }).where(eq(contactEnquiries.id, id));
}
async function updateContactNotes(id, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactEnquiries).set({ notes }).where(eq(contactEnquiries.id, id));
}
async function getUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    createdAt: users.createdAt,
    lastSignedIn: users.lastSignedIn
  }).from(users).orderBy(sql`${users.lastSignedIn} DESC`);
}
async function getNewsArticles(limit = 30) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsArticles).orderBy(sql`${newsArticles.publishedAt} DESC`).limit(limit);
}
async function upsertNewsArticle(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(newsArticles).values(data).onDuplicateKeyUpdate({
    set: {
      title: data.title,
      summary: data.summary,
      category: data.category,
      source: data.source,
      imageUrl: data.imageUrl ?? null,
      articleUrl: data.articleUrl ?? null,
      isFeatured: data.isFeatured ?? false,
      publishedAt: data.publishedAt
    }
  });
}
async function upsertManyNewsArticles(articles) {
  for (const article of articles) {
    await upsertNewsArticle(article);
  }
}
async function createMerchOrder(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(merchOrders).values({
    email: data.email,
    items: data.items,
    shippingAddress: data.shippingAddress,
    totalAmount: data.totalAmount,
    status: data.status ?? "pending"
  });
  return { id: result.insertId };
}
async function getMerchOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(merchOrders).orderBy(sql`${merchOrders.createdAt} DESC`);
}
async function updateMerchOrderStatus(orderId, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(merchOrders).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(sql`${merchOrders.id} = ${orderId}`);
}
async function createFacultyApplication(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(facultyApplications).values({
    name: data.name,
    email: data.email,
    phone: data.phone,
    ventures: data.ventures,
    journey: data.journey,
    linkedin: data.linkedin,
    source: data.source ?? "billionairecollection.com/billionaire-tutor"
  });
}
async function getFacultyApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(facultyApplications).orderBy(sql`${facultyApplications.createdAt} DESC`);
}
async function updateFacultyApplicationStatus(id, status, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(facultyApplications).set({ status, ...notes !== void 0 ? { notes } : {} }).where(eq(facultyApplications.id, id));
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    let sessionToken = cookies.get(COOKIE_NAME);
    if (!sessionToken) {
      const authHeader = req.headers.authorization;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.slice(7);
      }
    }
    const session = await this.verifySession(sessionToken);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
function registerStorageProxy(app) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/routers.ts
import { z as z2 } from "zod";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/stripe.ts
import Stripe from "stripe";
var _stripe = null;
function getStripe() {
  if (!_stripe) {
    if (!ENV.stripeSecretKey) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(ENV.stripeSecretKey, { apiVersion: "2026-06-24.dahlia" });
  }
  return _stripe;
}
async function createMerchCheckoutSession(input) {
  const stripe = getStripe();
  const totalAmount = input.items.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0
  );
  const order = await createMerchOrder({
    email: input.email,
    items: JSON.stringify(input.items),
    shippingAddress: JSON.stringify(input.shippingAddress),
    totalAmount,
    status: "pending"
  });
  const lineItems = input.items.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: item.unitPrice,
      // already in cents
      product_data: {
        name: `${item.name}${item.color ? ` \u2014 ${item.color}` : ""}${item.size ? ` / ${item.size}` : ""}`,
        description: "Billionaire Collection Official Merchandise"
      }
    },
    quantity: item.qty
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: input.email,
    line_items: lineItems,
    allow_promotion_codes: true,
    shipping_address_collection: {
      allowed_countries: [
        "US",
        "GB",
        "CA",
        "AU",
        "DE",
        "FR",
        "IT",
        "ES",
        "NL",
        "AE",
        "SG",
        "HK",
        "JP",
        "CH",
        "SE",
        "NO",
        "DK",
        "BE",
        "AT",
        "NZ"
      ]
    },
    metadata: {
      order_id: String(order.id),
      customer_email: input.email
    },
    client_reference_id: String(order.id),
    success_url: `${input.origin}/marketplace?order=success&id=${order.id}`,
    cancel_url: `${input.origin}/marketplace?order=cancelled`
  });
  return { checkoutUrl: session.url, orderId: order.id };
}
async function stripeWebhookHandler(req, res) {
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    res.status(400).send("Missing stripe-signature header");
    return;
  }
  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      req.body,
      sig,
      ENV.stripeWebhookSecret
    );
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    res.status(400).send("Webhook signature verification failed");
    return;
  }
  if (event.id.startsWith("evt_test_")) {
    console.log("[Stripe Webhook] Test event detected, returning verification response");
    res.json({ verified: true });
    return;
  }
  console.log(`[Stripe Webhook] Event: ${event.type} (${event.id})`);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.order_id ? parseInt(session.metadata.order_id, 10) : null;
    if (orderId) {
      try {
        await updateMerchOrderStatus(orderId, "processing");
        console.log(`[Stripe Webhook] Order ${orderId} marked as processing`);
        const email = session.metadata?.customer_email ?? "unknown";
        const amount = session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : "unknown";
        notifyOwner({
          title: `\u{1F4B3} Payment Received \u2014 Order #${orderId}`,
          content: `**Customer:** ${email}
**Amount:** ${amount}
**Stripe Session:** ${session.id}`
        }).catch(() => {
        });
      } catch (err) {
        console.error(`[Stripe Webhook] Failed to update order ${orderId}:`, err);
      }
    }
  }
  res.json({ received: true });
}

// server/routers.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
var adminProcedure2 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  newsletter: router({
    subscribe: publicProcedure.input(z2.object({ email: z2.string().email(), name: z2.string().optional(), source: z2.string().optional() })).mutation(async ({ input }) => {
      await subscribeNewsletter({ email: input.email, name: input.name, source: input.source ?? "website" });
      return { success: true };
    }),
    list: adminProcedure2.query(async () => getNewsletterSubscribers())
  }),
  concierge: router({
    submit: publicProcedure.input(z2.object({
      name: z2.string().min(2),
      email: z2.string().email(),
      phone: z2.string().optional(),
      requestType: z2.string().min(2),
      description: z2.string().min(10),
      budget: z2.string().optional(),
      preferredDate: z2.string().optional()
    })).mutation(async ({ input }) => {
      await createConciergeRequest(input);
      return { success: true };
    }),
    list: adminProcedure2.query(async () => getConciergeRequests())
  }),
  card: router({
    submit: publicProcedure.input(z2.object({
      firstName: z2.string().min(1),
      lastName: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().optional(),
      country: z2.string().optional(),
      occupation: z2.string().optional(),
      netWorth: z2.string().optional(),
      cardTier: z2.enum(["black", "platinum", "gold", "golden_ticket"]).default("black"),
      referralCode: z2.string().optional()
    })).mutation(async ({ input }) => {
      await createCardApplication(input);
      notifyOwner({
        title: `New Billionaire Card Application \u2014 ${input.firstName} ${input.lastName}`,
        content: `**Name:** ${input.firstName} ${input.lastName}
**Email:** ${input.email}
**Phone:** ${input.phone ?? "\u2014"}
**Country:** ${input.country ?? "\u2014"}
**Occupation:** ${input.occupation ?? "\u2014"}
**Net Worth:** ${input.netWorth ?? "\u2014"}
**Card Tier:** ${input.cardTier}
**Referral Code:** ${input.referralCode ?? "\u2014"}`
      }).catch(() => {
      });
      return { success: true };
    }),
    list: adminProcedure2.query(async () => getCardApplications()),
    updateStatus: adminProcedure2.input(z2.object({
      id: z2.number(),
      status: z2.enum(["pending", "reviewing", "approved", "rejected"]),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      await updateCardApplicationStatus(input.id, input.status, input.notes);
      return { success: true };
    })
  }),
  contact: router({
    submit: publicProcedure.input(z2.object({
      name: z2.string().min(2),
      email: z2.string().email(),
      phone: z2.string().optional(),
      subject: z2.string().min(2),
      message: z2.string().min(10),
      division: z2.string().optional()
    })).mutation(async ({ input }) => {
      await createContactEnquiry(input);
      return { success: true };
    }),
    list: adminProcedure2.query(async () => getContactEnquiries())
  }),
  marketplace: router({
    listings: publicProcedure.input(z2.object({ category: z2.string().optional() })).query(async ({ input }) => getActiveListings(input.category)),
    featured: publicProcedure.query(async () => getFeaturedListings())
  }),
  goldenTicket: router({
    submit: publicProcedure.input(z2.object({
      name: z2.string().min(2),
      email: z2.string().email(),
      phone: z2.string().optional(),
      country: z2.string().optional(),
      message: z2.string().optional(),
      referredBy: z2.string().optional()
    })).mutation(async ({ input }) => {
      await createGoldenTicketApplication(input);
      notifyOwner({
        title: `New Golden Ticket Application \u2014 ${input.name}`,
        content: `**Name:** ${input.name}
**Email:** ${input.email}
**Phone:** ${input.phone ?? "\u2014"}
**Country:** ${input.country ?? "\u2014"}
**Referred By:** ${input.referredBy ?? "\u2014"}
**Message:** ${input.message ?? "\u2014"}`
      }).catch(() => {
      });
      return { success: true };
    }),
    list: adminProcedure2.query(async () => getGoldenTicketApplications()),
    updateStatus: adminProcedure2.input(z2.object({
      id: z2.number(),
      status: z2.enum(["pending", "reviewing", "approved", "rejected"]),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      await updateGoldenTicketStatus(input.id, input.status, input.notes);
      return { success: true };
    })
  }),
  conciergeAdmin: router({
    updateStatus: adminProcedure2.input(z2.object({
      id: z2.number(),
      status: z2.enum(["pending", "in_progress", "completed", "cancelled"]),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      await updateConciergeStatus(input.id, input.status, input.notes);
      return { success: true };
    })
  }),
  contactAdmin: router({
    updateStatus: adminProcedure2.input(z2.object({
      id: z2.number(),
      status: z2.enum(["new", "read", "replied", "archived"]),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      await updateContactStatus(input.id, input.status, input.notes);
      return { success: true };
    }),
    updateNotes: adminProcedure2.input(z2.object({
      id: z2.number(),
      notes: z2.string()
    })).mutation(async ({ input }) => {
      await updateContactNotes(input.id, input.notes);
      return { success: true };
    })
  }),
  facultyApplication: router({
    submit: publicProcedure.input(z2.object({
      name: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().optional(),
      ventures: z2.string().optional(),
      journey: z2.string().optional(),
      linkedin: z2.string().optional(),
      source: z2.string().optional()
    })).mutation(async ({ input }) => {
      await createFacultyApplication(input);
      notifyOwner({
        title: `New Faculty Application \u2014 ${input.name}`,
        content: `**Name:** ${input.name}
**Email:** ${input.email}
**Phone:** ${input.phone ?? "\u2014"}
**Ventures:** ${input.ventures ?? "\u2014"}
**Journey:** ${input.journey ?? "\u2014"}
**LinkedIn:** ${input.linkedin ?? "\u2014"}`
      }).catch(() => {
      });
      return { success: true };
    }),
    list: adminProcedure2.query(async () => getFacultyApplications()),
    updateStatus: adminProcedure2.input(z2.object({
      id: z2.number(),
      status: z2.enum(["new", "reviewing", "invited", "rejected"]),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      await updateFacultyApplicationStatus(input.id, input.status, input.notes);
      return { success: true };
    })
  }),
  news: router({
    list: publicProcedure.input(z2.object({ limit: z2.number().min(1).max(50).default(30) })).query(async ({ input }) => getNewsArticles(input.limit)),
    // Called by the AGENT cron via /api/scheduled/news-refresh
    // Also available to admin for manual refresh
    upsertMany: adminProcedure2.input(z2.array(z2.object({
      slug: z2.string(),
      title: z2.string(),
      summary: z2.string(),
      category: z2.string().default("Wealth"),
      source: z2.string().default("Billionaire Collection"),
      imageUrl: z2.string().optional(),
      articleUrl: z2.string().optional(),
      isFeatured: z2.boolean().default(false),
      publishedAt: z2.date()
    }))).mutation(async ({ input }) => {
      await upsertManyNewsArticles(input);
      return { success: true, count: input.length };
    })
  }),
  merch: router({
    // Creates a Stripe Checkout session and returns the hosted checkout URL
    createCheckout: publicProcedure.input(z2.object({
      email: z2.string().email(),
      items: z2.array(z2.object({
        productId: z2.string(),
        name: z2.string(),
        color: z2.string(),
        size: z2.string().optional(),
        qty: z2.number().min(1),
        unitPrice: z2.number()
        // in cents
      })),
      shippingAddress: z2.object({
        name: z2.string(),
        address1: z2.string(),
        city: z2.string(),
        zip: z2.string(),
        country_code: z2.string()
      }),
      origin: z2.string().url()
    })).mutation(async ({ input }) => {
      const { checkoutUrl, orderId } = await createMerchCheckoutSession({
        email: input.email,
        items: input.items,
        shippingAddress: input.shippingAddress,
        origin: input.origin
      });
      return { checkoutUrl, orderId };
    }),
    // Legacy direct order (kept for admin reference / fallback)
    placeOrder: publicProcedure.input(z2.object({
      email: z2.string().email(),
      items: z2.array(z2.object({
        productId: z2.string(),
        name: z2.string(),
        color: z2.string(),
        size: z2.string().optional(),
        qty: z2.number().min(1),
        unitPrice: z2.number()
      })),
      shippingAddress: z2.object({
        name: z2.string(),
        address1: z2.string(),
        city: z2.string(),
        zip: z2.string(),
        country_code: z2.string()
      })
    })).mutation(async ({ input }) => {
      const totalAmount = input.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
      const order = await createMerchOrder({
        email: input.email,
        items: JSON.stringify(input.items),
        shippingAddress: JSON.stringify(input.shippingAddress),
        totalAmount,
        status: "pending"
      });
      notifyOwner({
        title: `New Merch Order \u2014 ${input.email}`,
        content: `**Email:** ${input.email}
**Items:** ${input.items.map((i) => `${i.qty}x ${i.name} (${i.color})`).join(", ")}
**Total:** $${(totalAmount / 100).toFixed(2)}`
      }).catch(() => {
      });
      return { success: true, orderId: order.id };
    }),
    listOrders: adminProcedure2.query(async () => getMerchOrders())
  }),
  admin: router({
    stats: adminProcedure2.query(async () => getAdminStats()),
    listUsers: adminProcedure2.query(async () => getUsers())
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var PROJECT_ROOT = import.meta.dirname;
var LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        const reqBody = req.body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/scheduledNewsRefresh.ts
var CATEGORIES = {
  "real estate": "Real Estate",
  "property": "Real Estate",
  "yacht": "Superyachts",
  "superyacht": "Superyachts",
  "aviation": "Aviation",
  "private jet": "Aviation",
  "aircraft": "Aviation",
  "ferrari": "Automotive",
  "lamborghini": "Automotive",
  "bugatti": "Automotive",
  "rolls-royce": "Automotive",
  "bentley": "Automotive",
  "art": "Art",
  "auction": "Art",
  "philanthropy": "Philanthropy",
  "charity": "Philanthropy",
  "crypto": "Technology",
  "bitcoin": "Technology",
  "tech": "Technology",
  "family office": "Family Offices",
  "hedge fund": "Markets",
  "stock": "Markets",
  "market": "Markets",
  "luxury": "Luxury",
  "wealth": "Wealth",
  "billionaire": "Wealth",
  "uhnw": "Wealth",
  "ultra-high": "Wealth"
};
function categorise(title, description) {
  const text2 = (title + " " + description).toLowerCase();
  for (const [keyword, cat] of Object.entries(CATEGORIES)) {
    if (text2.includes(keyword)) return cat;
  }
  return "Wealth";
}
function slugify(title, date) {
  const base = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);
  const ts = date.toISOString().slice(0, 10);
  return `${base}-${ts}`;
}
var CATEGORY_IMAGES = {
  "Wealth": "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
  "Real Estate": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "Superyachts": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
  "Aviation": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
  "Automotive": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "Art": "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80",
  "Philanthropy": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
  "Technology": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
  "Markets": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "Luxury": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "Family Offices": "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80"
};
async function fetchFromNewsAPI() {
  const apiKey = ENV.newsApiKey;
  if (!apiKey) throw new Error("NEWS_API_KEY not set");
  const queries = [
    "billionaire wealth",
    "ultra high net worth luxury",
    "superyacht private jet",
    "luxury real estate mansion",
    "billionaire philanthropy"
  ];
  const allArticles = [];
  const seenSlugs = /* @__PURE__ */ new Set();
  for (const q of queries) {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", q);
    url.searchParams.set("language", "en");
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", "5");
    url.searchParams.set("apiKey", apiKey);
    const resp = await fetch(url.toString());
    if (!resp.ok) {
      console.error(`[news-refresh] NewsAPI error for "${q}": ${resp.status}`);
      continue;
    }
    const data = await resp.json();
    if (data.status !== "ok" || !Array.isArray(data.articles)) continue;
    for (const a of data.articles) {
      if (!a.title || a.title === "[Removed]") continue;
      const publishedAt = new Date(a.publishedAt);
      const slug = slugify(a.title, publishedAt);
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      const category = categorise(a.title, a.description ?? "");
      const imageUrl = a.urlToImage ?? CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Wealth"];
      allArticles.push({
        slug,
        title: a.title,
        summary: a.description ?? a.title,
        category,
        source: a.source.name,
        imageUrl,
        articleUrl: a.url,
        isFeatured: allArticles.length < 2,
        // first 2 are featured
        publishedAt
      });
      if (allArticles.length >= 20) break;
    }
    if (allArticles.length >= 20) break;
  }
  return allArticles;
}
async function newsRefreshHandler(req, res) {
  try {
    let rows = [];
    const bodyArticles = req.body?.articles;
    if (Array.isArray(bodyArticles) && bodyArticles.length > 0) {
      rows = bodyArticles.map((a) => ({
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        category: a.category ?? "Wealth",
        source: a.source ?? "Billionaire Collection",
        imageUrl: a.imageUrl ?? null,
        articleUrl: a.articleUrl ?? null,
        isFeatured: a.isFeatured ?? false,
        publishedAt: new Date(a.publishedAt)
      }));
    } else {
      rows = await fetchFromNewsAPI();
    }
    if (rows.length === 0) {
      return res.status(200).json({ ok: true, upserted: 0, message: "no articles fetched" });
    }
    await upsertManyNewsArticles(rows);
    console.log(`[news-refresh] Upserted ${rows.length} articles`);
    return res.json({ ok: true, upserted: rows.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[news-refresh] Error:", message);
    return res.status(500).json({ error: message, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  }
}

// server/_core/index.ts
dotenv.config();
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.post("/api/stripe/webhook", express2.raw({ type: "application/json" }), stripeWebhookHandler);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.post("/api/scheduled/news-refresh", newsRefreshHandler);
  app.get("/sitemap.xml", (_req, res) => {
    const BASE = "https://billionairecollection.com";
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const urls = [
      // Core / pillar pages — highest priority
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/services", priority: "0.95", changefreq: "weekly" },
      { loc: "/ecosystem", priority: "0.95", changefreq: "weekly" },
      { loc: "/brands", priority: "0.95", changefreq: "weekly" },
      { loc: "/about", priority: "0.90", changefreq: "monthly" },
      // Brokerage
      { loc: "/marketplace", priority: "0.85", changefreq: "weekly" },
      { loc: "/estates", priority: "0.85", changefreq: "weekly" },
      { loc: "/boat", priority: "0.85", changefreq: "weekly" },
      { loc: "/air", priority: "0.85", changefreq: "weekly" },
      { loc: "/car", priority: "0.85", changefreq: "weekly" },
      { loc: "/art", priority: "0.80", changefreq: "weekly" },
      { loc: "/crypto", priority: "0.75", changefreq: "weekly" },
      // Media
      { loc: "/news", priority: "0.85", changefreq: "daily" },
      { loc: "/magazine", priority: "0.80", changefreq: "monthly" },
      { loc: "/television", priority: "0.80", changefreq: "monthly" },
      { loc: "/radio", priority: "0.75", changefreq: "monthly" },
      { loc: "/media", priority: "0.75", changefreq: "monthly" },
      // Products
      { loc: "/champagne", priority: "0.75", changefreq: "monthly" },
      { loc: "/vodka", priority: "0.75", changefreq: "monthly" },
      { loc: "/cigar", priority: "0.75", changefreq: "monthly" },
      { loc: "/oud", priority: "0.75", changefreq: "monthly" },
      // Services
      { loc: "/card", priority: "0.80", changefreq: "monthly" },
      { loc: "/card-concierge", priority: "0.75", changefreq: "monthly" },
      { loc: "/funding", priority: "0.75", changefreq: "monthly" },
      { loc: "/golf", priority: "0.70", changefreq: "monthly" },
      { loc: "/travel", priority: "0.70", changefreq: "monthly" },
      // Technology
      { loc: "/technology", priority: "0.75", changefreq: "monthly" },
      { loc: "/billionaire-tutor", priority: "0.70", changefreq: "monthly" },
      { loc: "/billionaire-wisdom", priority: "0.70", changefreq: "monthly" },
      // Other
      { loc: "/golden-ticket", priority: "0.70", changefreq: "monthly" },
      { loc: "/contact", priority: "0.65", changefreq: "monthly" },
      { loc: "/news", priority: "0.85", changefreq: "daily" },
      { loc: "/privacy", priority: "0.30", changefreq: "yearly" },
      { loc: "/terms", priority: "0.30", changefreq: "yearly" }
    ];
    const uniqueUrls = urls.filter((u, i, arr) => arr.findIndex((x) => x.loc === u.loc) === i);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${uniqueUrls.map((u) => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
    res.header("Content-Type", "application/xml");
    res.header("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
