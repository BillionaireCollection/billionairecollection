# Hostinger Deployment Guide — Billionaire Collection

## Overview

This project is pre-built. The `dist/` folder is committed to the repository and contains the production-ready server bundle (`dist/index.js`) and the compiled React frontend (`dist/public/`). Hostinger does **not** need to run a build step.

---

## Hostinger Build & Output Settings

| Setting | Value |
|---|---|
| **Package manager** | `npm` |
| **Build command** | `None` |
| **Output directory** | `dist` |
| **Entry file** | `dist/index.js` |

> **Important:** Set Build command to **None**. The `dist/` folder is already built and committed to the repo. Hostinger only needs to run `node dist/index.js`.

---

## Environment Variables

Set the following in Hostinger → Deployments → Settings → Environment Variables:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `mysql://u802634764_bcuser:<password>@127.0.0.1:3306/u802634764_bcdb` |
| `JWT_SECRET` | Any long random string (min 32 chars) |
| `VITE_APP_ID` | Manus OAuth App ID |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |

---

## Database Migration

After the first successful deployment, run the database migrations to create all tables in the Hostinger MySQL database.

**Option A — Via SSH:**
```bash
cd /path/to/app
npm run db:push
```

**Option B — Via phpMyAdmin:**
Run the SQL migration scripts from the `drizzle/migrations/` folder in the Hostinger phpMyAdmin panel.

---

## Deployment Steps

1. In Hostinger, go to **Websites → Your Site → Git** and connect the GitHub repository: `https://github.com/BillionaireCollection/billionairecollection`
2. Set the branch to `main`
3. In **Build and output settings**, configure as shown in the table above
4. Add all required environment variables
5. Click **Deploy** (or **Save and redeploy**)
6. After successful deployment, run database migrations (see above)

---

## Stripe Webhook

After deployment, update the Stripe webhook endpoint in the Stripe Dashboard to:
```
https://yourdomain.com/api/stripe/webhook
```

---

## Local Development

```bash
npm install
npm run dev
```

## Production Build (if needed to regenerate dist/)

```bash
npm run build
```

This regenerates `dist/index.js` (server bundle) and `dist/public/` (React frontend).

---

## Troubleshooting

| Problem | Solution |
|---|---|
| White screen / 404 on page refresh | Entry file must be `dist/index.js` — confirm in Hostinger settings |
| Stripe webhook 400 errors | Check `STRIPE_WEBHOOK_SECRET` matches the Stripe dashboard value exactly |
| Database connection refused | Use `127.0.0.1` as host for Hostinger MySQL (not `localhost`) |
| App crashes on start | Check all environment variables are set correctly |

---

## Package Manager

This project uses **npm**. The lockfile is `package-lock.json`. Do not use pnpm or yarn.

---

*Last updated: July 19, 2026*
