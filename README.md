# KN Store

**Beauty • Care • Confidence**

Premium cosmetics & beauty e-commerce platform.

```
kn-store/
├── frontend/      # React + Vite + Tailwind
├── backend/       # Node.js + Express + Prisma + PostgreSQL
├── render.yaml    # Render Blueprint
└── stitch-export/ # Design reference
```

## Local development

### Backend

```bash
cd backend
cp .env.example .env
# set DATABASE_URL (Neon/Postgres) and DUMMY_MODE=false
npm install
npm run build          # prisma generate + migrate + safe bootstrap
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:5173` · API: `http://localhost:5000`

Default admin (after bootstrap/seed): `admin@example.com` / `Admin@123`

---

## Deploy on Render

You need **two services** (API + Static frontend) plus a Postgres database (Neon already works).

### Option A — Blueprint (`render.yaml`)

1. Push this repo to GitHub
2. Render Dashboard → **New → Blueprint** → select the repo
3. Fill in the prompted env vars (see tables below)
4. Deploy

### Option B — Manual

#### 1) Web Service (API)

| Setting | Value |
|---------|--------|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

#### 2) Static Site (Frontend)

| Setting | Value |
|---------|--------|
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| Rewrite | `/*` → `/index.html` |

---

## Environment variables

### Backend (Web Service)

| Variable | Required | Example / notes |
|----------|----------|-----------------|
| `NODE_ENV` | Yes | `production` |
| `DUMMY_MODE` | Yes | `false` |
| `DATABASE_URL` | Yes | Your Neon/Render Postgres URL (`?sslmode=require`) |
| `JWT_ACCESS_SECRET` | Yes | Long random string (Render can auto-generate) |
| `JWT_REFRESH_SECRET` | Yes | Long random string |
| `FRONTEND_URL` | Yes | `https://kn-store-web.onrender.com` (your Static Site URL) |
| `PUBLIC_API_URL` | Yes | `https://kn-store-api.onrender.com` (your API URL, no `/api`) |
| `ADMIN_EMAIL` | Yes | First admin email (bootstrap creates if DB empty) |
| `ADMIN_PASSWORD` | Yes | Strong password |
| `COOKIE_SAME_SITE` | Recommended | `none` (needed for Static Site ↔ API) |
| `CLOUDINARY_CLOUD_NAME` | Strongly recommended | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Strongly recommended | |
| `CLOUDINARY_API_SECRET` | Strongly recommended | |
| `FRONTEND_ORIGINS` | Optional | Extra CORS origins, comma-separated |
| `PORT` | Auto | Render sets this |

### Frontend (Static Site)

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_API_URL` | Yes | `https://kn-store-api.onrender.com/api` |

> `VITE_*` vars are baked in at **build time**. Set them before the first frontend build, or trigger a rebuild after the API URL is known.

---

## What you still need to provide / set up

1. **Database** — Neon URL you already have works. Paste it as `DATABASE_URL`.
2. **Cloudinary account** (free) — for lasting product/site image uploads on Render.
3. **Frontend + API Render URLs** — after services exist, wire:
   - Frontend `VITE_API_URL`
   - Backend `FRONTEND_URL` + `PUBLIC_API_URL`
4. **Strong admin password** — set `ADMIN_EMAIL` / `ADMIN_PASSWORD` before first boot.
5. **Custom domain** (optional) — then update `FRONTEND_URL` / CORS accordingly.

Without Cloudinary the site still runs; uploaded images may disappear on redeploy.

---

## Tech stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Framer Motion, Axios  
**Backend:** Node.js, Express, Prisma, PostgreSQL, JWT, Cloudinary
