# Billionaire Collection — Project TODO

## Core Site
- [x] Homepage with hero, ecosystem grid, featured brokerage, products, news, concierge CTA
- [x] Three.js gold particle sphere animation on hero
- [x] Navbar with all navigation links and dropdowns
- [x] Footer with full brand ecosystem links
- [x] All brokerage pages (Estates, Boat, Air, Car, Art, Crypto)
- [x] All division pages (Media, Technology, Services)
- [x] All product pages (Champagne, Vodka, Cigar, Oud)
- [x] Marketplace / Store page
- [x] News page
- [x] Card / Concierge page
- [x] Golden Ticket page
- [x] Contact page
- [x] About page
- [x] Privacy & Terms pages
- [x] Funding, Golf, Travel, Television, Magazine, Radio pages

## Backend & Database
- [x] tRPC server with all public procedures
- [x] Newsletter subscribe procedure
- [x] Concierge request submit procedure
- [x] Card application submit procedure
- [x] Golden Ticket application submit procedure
- [x] Contact enquiry submit procedure
- [x] Marketplace listings query procedure
- [x] Admin-only list procedures (card, golden ticket, concierge, contact, newsletter)
- [x] Admin stats procedure (counts for all submission types)
- [x] Status update procedures (card, golden ticket, concierge, contact)

## Notifications
- [x] Owner notification on new Card Application submission
- [x] Owner notification on new Golden Ticket submission

## Admin Dashboard
- [x] /admin route outside public Layout (no Navbar/Footer)
- [x] Auth gate: unauthenticated users see Sign In prompt
- [x] Access denied screen for non-admin users
- [x] Stats overview row (5 stat cards with pending counts)
- [x] Tabbed navigation (Card Applications, Golden Ticket, Concierge, Contact, Newsletter)
- [x] Card Applications table with status update dropdown
- [x] Golden Ticket table with status update dropdown
- [x] Concierge Requests table with status update dropdown
- [x] Contact Enquiries table with status update dropdown
- [x] Newsletter Subscribers table

## Fixes
- [x] AURUM VANT text bleed-through on sphere (dark fill + overflow hidden + gradient overlay)
- [x] dotenv import fix in server/_core/index.ts
- [x] App.tsx routing fix (admin outside public Layout)

## Tests
- [x] 31 vitest tests passing (auth, newsletter, concierge, card, golden ticket, contact, marketplace, admin RBAC, status updates)

## Inline Notes (Admin Dashboard)
- [x] Add notes column to Card Applications admin table with inline edit/save
- [x] Add notes column to Golden Ticket admin table with inline edit/save
- [x] Add notes column to Concierge Requests admin table with inline edit/save
- [x] Add notes column to Contact Enquiries admin table with inline edit/save (via contactAdmin.updateNotes)
- [x] Add updateContactNotes procedure to server (contact table has no notes column — add to schema + migrate)
- [x] Add notes field to contactEnquiries schema in drizzle/schema.ts
- [x] Run pnpm db:push to migrate the notes column for contact_enquiries (also added notes to golden_ticket_applications)

## CSV Export (Admin Dashboard)
- [x] Add downloadCSV utility function to Admin.tsx (converts array of objects to CSV string and triggers browser download)
- [x] Add Download CSV button to Card Applications tab header
- [x] Add Download CSV button to Golden Ticket tab header
- [x] Add Download CSV button to Concierge Requests tab header
- [x] Add Download CSV button to Contact Enquiries tab header
- [x] Add Download CSV button to Newsletter Subscribers tab header

## Audit Fixes

- [x] Fix Issue 1: Wire footer newsletter Subscribe button with trpc.newsletter.subscribe mutation
- [x] Fix Issue 2: Change Card page hero CTA from /card-concierge to #apply

## Launch Instructions Implementation (from PDF)

- [x] SEO: Update useSEO hook to support keywords prop rendering <meta name="keywords">
- [x] SEO: Optimise title (30-60 chars), meta description (50-160 chars), add keywords on all pages
- [x] Header: Ensure brand name "BILLIONAIRE COLLECTION" visible on ALL screen sizes including mobile (already correct — no hidden classes used)
- [x] Images: Product card images updated to object-fit: contain (Home.tsx PRODUCTS section); Marketplace uses cover as images are full-bleed lifestyle/property photos
- [x] Admin: Enhance admin dashboard with user/subscriber list (roles, join dates, last sign-in)
- [x] Admin: Revenue/stats overview section added to admin dashboard with proper empty state, 3 KPI cards (Total Revenue, Orders, Avg. Order Value), and Stripe connect CTA
- [x] X-Offer page: Create /x-offer landing page with 48-hour countdown timer, promo code display, and struck-through original price
- [x] X-Offer page: Timer must persist across page refreshes using localStorage

## Grok Fixes (Issue 1–3)

- [x] Issue 1: Audited all magazine/media/news links — no 404 archive links found; news uses live RSS feeds with safe fallback URLs
- [x] Issue 2: Added loading=lazy to 6 img tags missing it (About.tsx, Home.tsx ×2, Marketplace.tsx, Media.tsx, DivisionPage.tsx)
- [x] Issue 3: Audited all promotional buttons — no dead "Learn More" buttons found; all btn-gold/btn-ghost-gold are wrapped in Link/anchor tags; Load More Listings button wired with informative sonner toast
- [x] Full site check completed — homepage and marketplace screenshots confirmed clean; 31 tests pass; TypeScript 0 errors

## Full SEO Optimisation

- [x] Update useSEO hook to auto-set canonical URL from window.location.href when no url prop is passed
- [x] Add og:url to all pages via url prop in useSEO calls
- [x] Rewrite all 30 page meta descriptions with AI-optimised, intent-driven copy
- [x] Add page-specific JSON-LD schemas (Service, RealEstateAgent, Product, WebPage) to key pages
- [x] Add WebSite + SearchAction JSON-LD to Home page (WebSite schema with potentialAction SearchAction)
- [x] Verify sitemap.xml includes /card and /card-concierge routes (confirmed, both present)
- [x] Add lastmod dates to all 29 sitemap.xml entries
- [x] Add Disallow for /admin, /x-offer, /offer in robots.txt
- [x] Fix GoldenTicket.tsx hero heading from div to h1 for correct heading hierarchy
- [x] Verify all img tags have descriptive alt text (confirmed — all 100% covered)
- [x] Add useJsonLd hook (18 pages: Home, Estates, Card, CardConcierge, GoldenTicket, Marketplace, About, Contact, Champagne, Vodka, Cigar, Oud, Boat, Air, Car, Art, Privacy, Terms)

## Parent-Company SEO & AI Optimisation

- [x] Rewrite all 30 page meta titles with parent-company positioning ("A Billionaire Collection Company" suffix on all sub-brand pages)
- [x] Rewrite all 30 page meta descriptions explicitly naming BC as parent company of each sub-brand
- [x] Add parent-company keywords to all pages (billionaire collection parent company, luxury ecosystem, umbrella brand)
- [x] Implement global Organisation JSON-LD in index.html with full sub-brand hierarchy (hasOfferCatalog, brand, subOrganization, founder, address, contactPoint, sameAs)
- [x] Add BreadcrumbList JSON-LD to all 29 sub-brand pages (Billionaire Collection → sub-brand)
- [x] Add SiteLinksSearchBox + WebSite JSON-LD to homepage
- [x] Create /public/llms.txt — AI-readable brand authority document for LLM crawlers (ChatGPT, Perplexity, Claude, Gemini)
- [x] Create /public/ai-plugin.json — OpenAI/AI plugin manifest for AI search discovery
- [x] Create /public/openapi.yaml — OpenAPI stub for AI plugin
- [x] Update index.html global OG tags, Twitter Card, and meta description for parent-company positioning
- [x] Add <meta name="application-name">, <meta name="author">, <meta name="ai-description"> and <link rel="ai-plugin"> tags globally
- [x] Add "parentOrganization" field to all sub-brand page JSON-LD schemas
- [x] Update robots.txt with explicit AI crawler permissions (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai)
- [x] Upgrade useJsonLd hook to support arrays of schemas (BreadcrumbList + page schema simultaneously)
