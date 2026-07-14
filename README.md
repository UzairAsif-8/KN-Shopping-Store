# KN Store

**Beauty • Care • Confidence**

Premium cosmetics & beauty e-commerce platform built from the Stitch design export.

## Monorepo Structure

```
kn-store/
├── frontend/     # React + Vite + Tailwind
├── backend/      # Node.js + Express (boilerplate)
└── stitch-export/ # Original Stitch export (reference)
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:5000`

## Tech Stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Framer Motion, Swiper, Axios, Context API

**Backend:** Node.js, Express, MongoDB-ready architecture, JWT, Cloudinary, Stripe placeholders

## Pages (from Stitch Export)

| Page | Route | Source |
|------|-------|--------|
| Home | `/` | `home_kn_store/screen.png` |
| Collections | `/collections` | `collections_kn_store/` |
| Product Detail (Radiance Serum) | `/products/radiance-serum` | `radiance_serum_kn_store/` |
| Journal | `/journal` | `journal_kn_store/` |

## Design System

See `stitch-export/kn_store_design_system/DESIGN.md` for tokens, typography, and component guidelines.
