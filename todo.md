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
