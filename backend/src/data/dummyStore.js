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
  { id: 'cat-4', name: 'Hair Care', slug: 'hair-care', description: 'Hair treatments.', image: p(6679869), createdAt: new Date(), updatedAt: new Date() },
  { id: 'cat-5', name: 'Body Care', slug: 'body-care', description: 'Body oils and balms.', image: p(4938508), createdAt: new Date(), updatedAt: new Date() },
];

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

const products = [
  { id: 'prod-1', categoryId: 'cat-1', name: 'Radiance Serum', slug: 'radiance-serum', shortDescription: 'Brightening vitamin C serum.', description: 'A luminous serum with stabilized Vitamin C.', price: 76, images: [p(7750099), p(2539396)], stock: 85, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-2', categoryId: 'cat-1', name: 'Hydra-Rich Moisturizer', slug: 'hydra-rich-moisturizer', shortDescription: 'Deep hydration cream.', description: '24-hour moisture with ceramides.', price: 48, images: [p(3373736)], stock: 200, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-3', categoryId: 'cat-2', name: 'Velvet Lip Tint', slug: 'velvet-lip-tint', shortDescription: 'Soft matte lip color.', description: 'Long-wearing lip tint.', price: 28, images: [p(7792788)], stock: 180, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-4', categoryId: 'cat-2', name: 'Luminous Foundation', slug: 'luminous-foundation', shortDescription: 'Skin-like coverage.', description: 'Buildable luminous foundation.', price: 54, images: [p(3997987)], stock: 95, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-5', categoryId: 'cat-3', name: 'Amber Oud Perfume', slug: 'amber-oud-perfume', shortDescription: 'Warm amber fragrance.', description: 'Artisan eau de parfum.', price: 98, images: [p(3785147)], stock: 60, featured: true, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 'prod-6', categoryId: 'cat-1', name: 'Luminous Face Oil', slug: 'luminous-face-oil', shortDescription: 'Revitalizing glow oil.', description: 'Rosehip and jojoba face oil.', price: 55, images: [p(2656952)], stock: 120, featured: false, active: true, createdAt: new Date(), updatedAt: new Date() },
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
