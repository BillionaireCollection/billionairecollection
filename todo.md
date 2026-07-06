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

- [ ] Issue 1: Audit and fix all 404 archive links in magazine/media/news sections
- [ ] Issue 2: Add lazy loading, responsive sizes, and loading="lazy" to all images site-wide
- [ ] Issue 3: Audit all "Learn More" buttons — wire to useful destinations or remove if decorative
- [ ] Full site check after all three fixes with screenshots
