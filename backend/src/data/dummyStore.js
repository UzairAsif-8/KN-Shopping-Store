import env from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { buildPaginationMeta } from '../utils/pagination.js';
import { serializeProduct, serializeProducts } from '../utils/index.js';
import { slugify } from '../utils/slugify.js';

const p = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const dummyAdmin = {
  id: 'dummy-admin-1',
  name: 'KN Store Admin',
  email: env.admin.email,
  role: 'SUPER_ADMIN',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/** Mutable credentials for dummy-mode profile updates (do not export password). */
const dummyCredentials = {
  email: env.admin.email,
  password: env.admin.password,
};

const categories = [
  { id: 'cat-1', name: 'Skincare', slug: 'skincare', description: 'Serums and moisturizers.', image: p(3373736), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-2', name: 'Makeup', slug: 'makeup', description: 'Modern color essentials.', image: p(3997987), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-3', name: 'Fragrance', slug: 'fragrance', description: 'Fine perfumes.', image: p(3785147), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-4', name: 'Grocery', slug: 'grocery', description: 'Daily pantry and household essentials.', image: p(3685530), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-5', name: 'Cosmetic', slug: 'cosmetic', description: 'Beauty color essentials.', image: p(3997987), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-6', name: 'Electronics', slug: 'electronics', description: 'Smart devices and accessories.', image: p(9654031), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-7', name: 'Men and Women Essentials', slug: 'essentials', description: 'Shared wardrobe and personal essentials.', image: p(1459481), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-8', name: 'Luggage', slug: 'luggage', description: 'Travel-ready carry-ons and storage.', image: p(4938508), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-9', name: 'Hair Care', slug: 'hair-care', description: 'Hair treatments.', image: p(6679869), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-10', name: 'Body Care', slug: 'body-care', description: 'Body oils and balms.', image: p(4938508), createdAt: new Date(), updatedAt: new Date() },
];

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

const products = [
  { id: 'prod-1', categoryId: 'cat-1', name: 'Radiance Serum', slug: 'radiance-serum', shortDescription: 'Brightening vitamin C serum.', description: 'A luminous serum with stabilized Vitamin C.', price: 76, images: [p(7750099), p(2539396)], stock: 85, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-2', categoryId: 'cat-1', name: 'Hydra-Rich Moisturizer', slug: 'hydra-rich-moisturizer', shortDescription: 'Deep hydration cream.', description: '24-hour moisture with ceramides.', price: 48, images: [p(3373736)], stock: 200, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-3', categoryId: 'cat-2', name: 'Velvet Lip Tint', slug: 'velvet-lip-tint', shortDescription: 'Soft matte lip color.', description: 'Long-wearing lip tint.', price: 28, images: [p(7792788)], stock: 180, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-4', categoryId: 'cat-2', name: 'Luminous Foundation', slug: 'luminous-foundation', shortDescription: 'Skin-like coverage.', description: 'Buildable luminous foundation.', price: 54, images: [p(3997987)], stock: 95, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-5', categoryId: 'cat-3', name: 'Amber Oud Perfume', slug: 'amber-oud-perfume', shortDescription: 'Warm amber fragrance.', description: 'Artisan eau de parfum.', price: 98, images: [p(3785147)], stock: 60, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-6', categoryId: 'cat-1', name: 'Luminous Face Oil', slug: 'luminous-face-oil', shortDescription: 'Revitalizing glow oil.', description: 'Rosehip and jojoba face oil.', price: 55, images: [p(2656952)], stock: 120, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-7', categoryId: 'cat-4', name: 'Pantry Essentials Box', slug: 'pantry-essentials-box', shortDescription: 'Everyday grocery staples.', description: 'A curated pantry and household essentials bundle.', price: 34, images: [p(3685530)], stock: 150, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-12', categoryId: 'cat-4', name: 'Home Stockup Crate', slug: 'home-stockup-crate', shortDescription: 'Bulk grocery basics.', description: 'A fuller stock-up box for the home pantry.', price: 58, images: [p(4465124)], stock: 90, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-8', categoryId: 'cat-5', name: 'Daily Living Bundle', slug: 'daily-living-bundle', shortDescription: 'Beauty and daily care basics.', description: 'A simple starter bundle for everyday routines.', price: 44, images: [p(3997987)], stock: 120, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-13', categoryId: 'cat-5', name: 'Fresh Start Kit', slug: 'fresh-start-kit', shortDescription: 'Easy daily beauty essentials.', description: 'A compact kit for a fresh, minimal routine.', price: 39, images: [p(1459481)], stock: 140, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-9', categoryId: 'cat-6', name: 'Smart Essentials Speaker', slug: 'smart-essentials-speaker', shortDescription: 'Compact audio for daily life.', description: 'A portable smart speaker with rich sound.', price: 89, images: [p(9654031)], stock: 75, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-14', categoryId: 'cat-6', name: 'Compact Power Bank', slug: 'compact-power-bank', shortDescription: 'Portable charging backup.', description: 'A pocket-friendly power bank for travel and work.', price: 27, images: [p(3018845)], stock: 180, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-10', categoryId: 'cat-7', name: 'Everyday Essentials Set', slug: 'everyday-essentials-set', shortDescription: 'Shared essentials for men and women.', description: 'A clean essentials kit for daily use.', price: 52, images: [p(1459481)], stock: 140, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-15', categoryId: 'cat-7', name: 'Everyday Travel Pouch', slug: 'everyday-travel-pouch', shortDescription: 'Keep essentials organized.', description: 'A simple pouch for toiletries, grooming items, and daily carry.', price: 22, images: [p(4938508)], stock: 220, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-11', categoryId: 'cat-8', name: 'Travel Carry-On Case', slug: 'travel-carry-on-case', shortDescription: 'Lightweight luggage for trips.', description: 'A durable carry-on case for smart travel.', price: 110, images: [p(4938508)], stock: 65, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-16', categoryId: 'cat-8', name: 'Weekend Duffel Bag', slug: 'weekend-duffel-bag', shortDescription: 'Flexible travel storage.', description: 'A roomy duffel for short trips and gym days.', price: 74, images: [p(9654031)], stock: 100, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
];

const refreshTokens = new Map();

const withCategory = (product) => {
  const category = categories.find((c) => c.id === product.categoryId);
  return serializeProduct({ ...product, category });
};

export const dummyAuth = {
  login({ email, password }) {
    if (email !== dummyCredentials.email || password !== dummyCredentials.password) {
      throw new ApiError(401, 'Invalid email or password');
    }
    return { ...dummyAdmin };
  },

  verifyPassword(password) {
    return password === dummyCredentials.password;
  },

  changeEmail(newEmail) {
    dummyCredentials.email = newEmail;
    dummyAdmin.email = newEmail;
    dummyAdmin.updatedAt = new Date().toISOString();
    return { ...dummyAdmin };
  },

  changePassword(newPassword) {
    dummyCredentials.password = newPassword;
    dummyAdmin.updatedAt = new Date().toISOString();
    return { ...dummyAdmin };
  },

  saveRefreshToken(token, adminId) {
    refreshTokens.set(token, { adminId, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  },

  getRefreshToken(token) {
    const entry = refreshTokens.get(token);
    if (!entry || entry.expiresAt < Date.now()) {
      refreshTokens.delete(token);
      return null;
    }
    return entry;
  },

  deleteRefreshToken(token) {
    refreshTokens.delete(token);
  },

  clearAdminTokens() {
    refreshTokens.clear();
  },
};

export const dummyProducts = {
  list(query = {}, { publicOnly = false } = {}) {
    const page = Math.max(parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(query.limit, 10) || 12, 1), 100);

    let filtered = [...products];

    if (publicOnly) {
      filtered = filtered.filter((p) => p.active);
    } else if (query.active === 'true') {
      filtered = filtered.filter((p) => p.active);
    } else if (query.active === 'false') {
      filtered = filtered.filter((p) => !p.active);
    }

    if (query.featured === 'true') filtered = filtered.filter((p) => p.featured);
    if (query.search) {
      const q = query.search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q)
      );
    }

    if (query.category) {
      filtered = filtered.filter(
        (p) => {
          const cat = categories.find((c) => c.id === p.categoryId);
          return cat && (cat.slug === query.category || cat.id === query.category);
        }
      );
    }

    if (query.minPrice) filtered = filtered.filter((p) => p.price >= Number(query.minPrice));
    if (query.maxPrice) filtered = filtered.filter((p) => p.price <= Number(query.maxPrice));

    const sort = query.sort || 'newest';
    filtered.sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'name_asc') return a.name.localeCompare(b.name);
      if (sort === 'name_desc') return b.name.localeCompare(a.name);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit).map(withCategory);

    return { products: items, meta: buildPaginationMeta({ page, limit, total }) };
  },

  getFeatured(limit = 8) {
    return serializeProducts(
      products.filter((p) => p.featured && p.active).slice(0, limit).map((prod) => ({
        ...prod,
        category: categories.find((c) => c.id === prod.categoryId),
      }))
    );
  },

  getBestSellers(limit = 8) {
    return this.getFeatured(limit);
  },

  getBySlug(slug, { publicOnly = false } = {}) {
    const product = products.find((p) => p.slug === slug);
    if (!product || (publicOnly && !product.active)) {
      throw new ApiError(404, 'Product not found');
    }
    return withCategory(product);
  },

  getById(id) {
    const product = products.find((p) => p.id === id);
    if (!product) throw new ApiError(404, 'Product not found');
    return withCategory(product);
  },

  getDashboardStats() {
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      featuredProducts: products.filter((p) => p.featured).length,
      latestProducts: serializeProducts(
        products.slice(0, 5).map((prod) => ({
          ...prod,
          category: categories.find((c) => c.id === prod.categoryId),
        }))
      ),
      storage: {
        localBytes: 0,
        localFormatted: '0 B',
        localImages: 0,
        cloudinaryImages: 0,
        totalImages: products.reduce((sum, p) => sum + p.images.length, 0),
      },
    };
  },

  create(data) {
    const category = categories.find((c) => c.id === data.categoryId);
    if (!category) throw new ApiError(400, 'Category not found');

    const slug = data.slug || slugify(data.name);
    if (products.some((p) => p.slug === slug)) {
      throw new ApiError(409, 'Product with this slug already exists');
    }

    const product = {
      id: `prod-${Date.now()}`,
      categoryId: data.categoryId,
      name: data.name,
      slug,
      shortDescription: data.shortDescription ?? null,
      description: data.description,
      price: Number(data.price),
      images: data.images ?? [],
      stock: data.stock ?? 0,
      featured: data.featured ?? false,
      active: data.active ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    products.unshift(product);
    return withCategory(product);
  },

  update(id, data) {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new ApiError(404, 'Product not found');

    if (data.categoryId) {
      const category = categories.find((c) => c.id === data.categoryId);
      if (!category) throw new ApiError(400, 'Category not found');
    }

    if (data.slug && products.some((p) => p.slug === data.slug && p.id !== id)) {
      throw new ApiError(409, 'Product slug already exists');
    }

    products[index] = {
      ...products[index],
      ...data,
      price: data.price !== undefined ? Number(data.price) : products[index].price,
      stock: data.stock !== undefined ? Number(data.stock) : products[index].stock,
      updatedAt: new Date(),
    };

    return withCategory(products[index]);
  },

  remove(id) {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new ApiError(404, 'Product not found');
    products.splice(index, 1);
  },

  bulkDelete(ids) {
    let deletedCount = 0;
    ids.forEach((id) => {
      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        deletedCount += 1;
      }
    });
    return { deletedCount };
  },
};

export const dummyCategories = {
  getAllPublic() {
    return categories.map((c) => ({ ...c, _count: { products: products.filter((p) => p.categoryId === c.id).length } }));
  },

  list(query = {}) {
    const page = Math.max(parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(query.limit, 10) || 12, 1), 100);
    let filtered = [...categories];

    if (query.search) {
      const q = query.search.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q));
    }

    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit).map((c) => ({
      ...c,
      productCount: products.filter((p) => p.categoryId === c.id).length,
    }));

    return { categories: items, meta: buildPaginationMeta({ page, limit, total }) };
  },

  getBySlug(slug) {
    const category = categoryBySlug[slug];
    if (!category) throw new ApiError(404, 'Category not found');
    return {
      ...category,
      products: products.filter((p) => p.categoryId === category.id && p.active).map(withCategory),
      _count: { products: products.filter((p) => p.categoryId === category.id).length },
    };
  },

  getById(id) {
    const category = categories.find((c) => c.id === id);
    if (!category) throw new ApiError(404, 'Category not found');
    return { ...category, _count: { products: products.filter((p) => p.categoryId === category.id).length } };
  },
};

const siteSectionOverrides = {};

export const dummySiteSections = {
  getOverride(key) {
    return siteSectionOverrides[key] || null;
  },

  getAllOverrides() {
    return { ...siteSectionOverrides };
  },

  update(key, image) {
    siteSectionOverrides[key] = image;
    return { key, image, updatedAt: new Date().toISOString() };
  },

  remove(key) {
    delete siteSectionOverrides[key];
  },
};
