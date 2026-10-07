# Hostinger Deployment Guide — Billionaire Collection

## Approved production configuration

This is a **Node.js Web App** deployment. The repository contains the verified pre-built `dist/` output; Hostinger must not perform a build.

| Hostinger setting | Required value |
|---|---|
| Package manager | `npm` |
| Build command | `None` |
| Entry file | `dist/index.js` |
| Output directory | `dist` |
| Node.js | `20.x` or `22.x` |
| Start command | `NODE_ENV=production node dist/index.js` |

> The `dist/` folder and `dist/database-setup.sql` are committed release artifacts. Never replace this Node app with a static Git website, and do not set a Hostinger build command.

## Required environment variables

Configure secrets only in **Hostinger → Deployments → Settings → Environment Variables**. Never commit values or expose server secrets to the browser bundle.

| Variable | Scope | Purpose |
|---|---|---|
| `NODE_ENV` | Server | Set to `production`. |
| `PORT` | Server | Hostinger-assigned application listener port. |
| `DATABASE_URL` | Server | MySQL connection string for application data; use the Hostinger internal database host. |
| `JWT_SECRET` | Server secret | Signs authenticated session tokens. |
| `VITE_APP_ID` | Client build | Identifies the Manus OAuth application. |
| `OAUTH_SERVER_URL` | Server | Manus OAuth backend URL. |
| `VITE_OAUTH_PORTAL_URL` | Client build | Manus OAuth portal URL. |
| `VITE_APP_TITLE` | Client build | Application title. |
| `VITE_APP_LOGO` | Client build | Public brand-logo URL when configured. |
| `STRIPE_SECRET_KEY` | Server secret | Creates private-membership Stripe Checkout sessions. |
| `STRIPE_WEBHOOK_SECRET` | Server secret | Verifies the Stripe webhook signature. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Client build | Stripe publishable key only. |
| `SMTP_HOST` | Server | Microsoft 365 SMTP host: `smtp.office365.com`. |
| `SMTP_PORT` | Server | Microsoft 365 SMTP port: `587`. |
| `SMTP_SECURE` | Server | `false`; STARTTLS is required. |
| `SMTP_USERNAME` | Server | Protected Billionaire PLC sender identity. |
| `SMTP_PASSWORD` | Server secret | Protected Billionaire PLC SMTP credential. |
| `SMTP_FROM_EMAIL` | Server | Owner-notification sender address. |
| `SMTP_TO_EMAIL` | Server | Owner-notification recipient address. |
| `NEWS_API_KEY` | Server secret | Required only if the scheduled news provider is enabled. |
| `VITE_ANALYTICS_ENDPOINT` | Client build | Required only when website analytics is enabled. |
| `VITE_ANALYTICS_WEBSITE_ID` | Client build | Required only when website analytics is enabled. |

## Release process

1. Run the full test suite, TypeScript check and production build locally.
2. Confirm `dist/index.js`, `dist/public/index.html` and `dist/database-setup.sql` are non-empty.
3. Confirm the production bundle does not import Vite.
4. Commit the intended source changes and regenerated `dist/` assets; do not commit credentials, daily research payloads or error logs.
5. Push the release to the GitHub `main` branch.
6. Trigger the Git-connected Hostinger Node.js build using the approved Hostinger API workflow.
7. Verify the live custom domain returns HTTP 200 with `x-powered-by: Express`, then verify the relevant routes and assets.

## Payments and enquiries

- Private listing access uses server-created Stripe Checkout sessions; the browser must only receive the hosted checkout URL.
- The Stripe webhook endpoint must use the live domain and validate `STRIPE_WEBHOOK_SECRET` before payment state changes.
- Enquiries are persisted before delivery is attempted. Owner email is sent server-side via Microsoft 365 STARTTLS using the protected Billionaire PLC SMTP connector.
- Keep Stripe and SMTP credentials server-only. Do not include values in documentation, commits, screenshots or logs.

## Database bootstrap

`dist/database-setup.sql` contains the non-destructive CREATE TABLE statements required to initialise a fresh MySQL instance. Run it through the approved Hostinger database workflow only when provisioning a new database; do not run schema changes speculatively on production.
