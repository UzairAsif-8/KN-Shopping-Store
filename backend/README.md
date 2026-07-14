# KN Store Backend API

Production-ready Express + PostgreSQL (Neon) + Prisma backend for the KN Store React e-commerce frontend.

## Tech Stack

- Node.js + Express.js
- PostgreSQL (Neon)
- Prisma ORM
- JWT + Refresh Tokens (httpOnly cookie)
- Bcrypt password hashing
- Zod validation
- Multer + Cloudinary (optional) / local uploads fallback
- Helmet, CORS, Morgan, Rate Limiting

## Quick Start

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=5000

DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require

JWT_ACCESS_SECRET=your-long-random-access-secret
JWT_REFRESH_SECRET=your-long-random-refresh-secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123

FRONTEND_URL=http://localhost:5173

# Optional — leave blank to use local /uploads storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Run migrations

```bash
npm run db:migrate:deploy
```

For local development with migration history:

```bash
npm run db:migrate
```

### 4. Seed database

```bash
npm run db:seed
```

Seeds:
- 1 admin user
- 5 categories
- 25 products

Default admin:
- **Email:** `admin@example.com`
- **Password:** `Admin@123`

### 5. Start server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

API base URL: `http://localhost:5000/api`

---

## Prisma Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Create & apply migrations (dev) |
| `npm run db:migrate:deploy` | Apply migrations (production) |
| `npm run db:push` | Push schema without migration files |
| `npm run db:seed` | Seed categories, products, admin |
| `npm run db:studio` | Open Prisma Studio |

---

## Folder Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── src/
│   ├── config/          # env, database, cloudinary, cookies
│   ├── controllers/     # HTTP layer only
│   ├── middleware/      # auth, validation, errors, upload
│   ├── routes/          # API route definitions
│   ├── services/        # business logic + database access
│   ├── utils/           # helpers, responses, tokens
│   ├── validators/      # Zod schemas
│   ├── uploads/         # local image storage fallback
│   ├── app.js
│   └── server.js
├── package.json
├── .env.example
└── README.md
```

---

## Authentication

### Admin Login

`POST /api/admin/login`

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "...",
    "admin": { "id": "...", "name": "...", "email": "...", "role": "SUPER_ADMIN" }
  }
}
```

Also sets `kn_refresh_token` httpOnly cookie.

### Protected Routes

Send header:

```
Authorization: Bearer <accessToken>
```

### Refresh Token

`POST /api/admin/refresh` (uses cookie)

### Logout

`POST /api/admin/logout`

---

## API Endpoints

### Health

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/health` | Public |

### Admin

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/admin/login` | Public |
| POST | `/api/admin/refresh` | Cookie |
| POST | `/api/admin/logout` | Public |
| GET | `/api/admin/me` | Admin |
| GET | `/api/admin/dashboard` | Admin |

### Products

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/products` | Public |
| GET | `/api/products/featured` | Public |
| GET | `/api/products/bestsellers` | Public |
| GET | `/api/products/search?q=` | Public |
| GET | `/api/products/:slug` | Public |
| GET | `/api/products/slug/:slug` | Public (frontend compat) |
| GET | `/api/products/id/:id` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |
| POST | `/api/products/bulk-delete` | Admin |
| POST | `/api/products/upload` | Admin |

**Query params for `GET /api/products`:**
- `page`, `limit`
- `search`
- `category` (slug or id)
- `minPrice`, `maxPrice`
- `featured=true|false`
- `active=true|false` (admin only)
- `sort=price_asc|price_desc|newest|oldest|name_asc|name_desc`

### Categories

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/categories` | Public |
| GET | `/api/categories/:slug` | Public |
| GET | `/api/categories/slug/:slug` | Public (frontend compat) |
| GET | `/api/categories/id/:id` | Public |
| POST | `/api/categories` | Admin |
| PUT | `/api/categories/:id` | Admin |
| DELETE | `/api/categories/:id` | Admin |

---

## Response Format

Success:

```json
{
  "success": true,
  "message": "Products fetched",
  "data": [],
  "meta": { "page": 1, "limit": 12, "total": 25, "totalPages": 3 }
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "body.price", "message": "Price cannot be negative" }]
}
```

---

## Image Upload

### Product create/update (multipart)

`POST /api/products` or `PUT /api/products/:id`

Form fields:
- `name`, `categoryId`, `description`, `price`, `stock`, etc.
- `images` — optional JSON array of URLs
- `images` files — optional multipart files (field name: `images`)

### Standalone upload

`POST /api/products/upload`

Returns `{ urls: [...] }`

**Storage:**
- Cloudinary when `CLOUDINARY_*` env vars are set
- Otherwise saved to `src/uploads/` and served at `/uploads/...`

---

## Frontend Integration

Set in frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Existing frontend services map to this API:

| Frontend Service | Backend Route |
|------------------|---------------|
| `productService.getAll()` | `GET /api/products` |
| `productService.getBySlug(slug)` | `GET /api/products/slug/:slug` |
| `productService.getFeatured()` | `GET /api/products/featured` |
| `productService.getBestSellers()` | `GET /api/products/bestsellers` |
| `productService.search(q)` | `GET /api/products/search?q=` |
| `categoryService.getAll()` | `GET /api/categories` |
| `categoryService.getBySlug(slug)` | `GET /api/categories/slug/:slug` |

Admin dashboard can use:
- `GET /api/admin/dashboard`
- Full CRUD on `/api/products` and `/api/categories`

---

## Security

- Helmet security headers
- CORS restricted to `FRONTEND_URL`
- Rate limiting (general + auth + upload)
- Bcrypt password hashing (12 rounds)
- JWT access tokens (15m) + refresh tokens (7d)
- Refresh tokens stored in DB, invalidated on re-login
- Zod input validation
- Prisma parameterized queries (SQL injection safe)
- Input sanitization for XSS-prone strings

---

## Deployment Guide

### Neon PostgreSQL

1. Create a Neon project
2. Copy the connection string to `DATABASE_URL`
3. Ensure `?sslmode=require` is included

### Deploy (Railway / Render / VPS)

1. Set all environment variables
2. Run `npm install`
3. Run `npm run db:migrate:deploy`
4. Run `npm run db:seed` (first deploy only)
5. Start with `npm start`

### Production checklist

- [ ] Strong `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL` set to production domain
- [ ] Cloudinary configured (recommended)
- [ ] HTTPS enabled (required for secure cookies)

---

## License

Private — KN Store
