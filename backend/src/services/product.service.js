import { Prisma } from '@prisma/client';
import { isDatabaseEnabled } from '../config/env.js';
import { getPrisma } from '../config/database.js';
import { dummyProducts } from '../data/dummyStore.js';
import { ApiError } from '../utils/ApiError.js';
import { slugify } from '../utils/slugify.js';
import { getPagination, buildPaginationMeta } from '../utils/pagination.js';
import { serializeProduct, serializeProducts } from '../utils/index.js';

const requireDatabase = () => {
  if (!isDatabaseEnabled()) {
    throw new ApiError(503, 'Database not configured. Add DATABASE_URL to enable this feature.');
  }
};

export class ProductService {
  static buildWhere(query = {}, { publicOnly = false } = {}) {
    const where = {};

    if (publicOnly) {
      where.active = true;
    } else if (query.active === 'true') {
      where.active = true;
    } else if (query.active === 'false') {
      where.active = false;
    }

    if (query.featured === 'true') where.featured = true;
    if (query.featured === 'false') where.featured = false;

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { slug: { contains: query.search, mode: 'insensitive' } },
        { shortDescription: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.category) {
      where.category = {
        OR: [{ slug: query.category }, { id: query.category }],
      };
    }

    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice) where.price.gte = new Prisma.Decimal(query.minPrice);
      if (query.maxPrice) where.price.lte = new Prisma.Decimal(query.maxPrice);
    }

    return where;
  }

  static getSortOrder(sort) {
    switch (sort) {
      case 'price_asc':
        return { price: 'asc' };
      case 'price_desc':
        return { price: 'desc' };
      case 'oldest':
        return { createdAt: 'asc' };
      case 'name_asc':
        return { name: 'asc' };
      case 'name_desc':
        return { name: 'desc' };
      case 'newest':
      default:
        return { createdAt: 'desc' };
    }
  }

  static async list(query = {}, options = {}) {
    if (!isDatabaseEnabled()) return dummyProducts.list(query, options);

    const { page, limit, skip } = getPagination(query);
    const prisma = getPrisma();
    const where = this.buildWhere(query, options);
    const orderBy = this.getSortOrder(query.sort);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products: serializeProducts(products),
      meta: buildPaginationMeta({ page, limit, total }),
    };
  }

  static async getFeatured(limit = 8) {
    if (!isDatabaseEnabled()) return dummyProducts.getFeatured(limit);

    const products = await getPrisma().product.findMany({
      where: { featured: true, active: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });

    return serializeProducts(products);
  }

  static async getBestSellers(limit = 8) {
    if (!isDatabaseEnabled()) return dummyProducts.getBestSellers(limit);

    const products = await getPrisma().product.findMany({
      where: { active: true },
      take: limit,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      include: { category: true },
    });

    return serializeProducts(products);
  }

  static async search(query, pagination = {}) {
    return this.list({ ...pagination, search: query }, { publicOnly: true });
  }

  static async getBySlug(slug, { publicOnly = false } = {}) {
    if (!isDatabaseEnabled()) return dummyProducts.getBySlug(slug, { publicOnly });

    const product = await getPrisma().product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product || (publicOnly && !product.active)) {
      throw new ApiError(404, 'Product not found');
    }

    return serializeProduct(product);
  }

  static async getById(id) {
    if (!isDatabaseEnabled()) return dummyProducts.getById(id);

    const product = await getPrisma().product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    return serializeProduct(product);
  }

  static async ensureCategoryExists(categoryId) {
    requireDatabase();
    const category = await getPrisma().category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new ApiError(400, 'Category not found');
    }
    return category;
  }

  static async create(data) {
    if (!isDatabaseEnabled()) return dummyProducts.create(data);

    requireDatabase();
    await this.ensureCategoryExists(data.categoryId);

    const slug = data.slug || slugify(data.name);
    const prisma = getPrisma();

    const existing = await prisma.product.findFirst({
      where: { OR: [{ slug }, { name: { equals: data.name, mode: 'insensitive' } }] },
    });

    if (existing) {
      throw new ApiError(409, 'Product with this name or slug already exists');
    }

    const product = await prisma.product.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        slug,
        shortDescription: data.shortDescription ?? null,
        description: data.description,
        price: data.price,
        images: data.images ?? [],
        stock: data.stock ?? 0,
        featured: data.featured ?? false,
        active: data.active ?? true,
      },
      include: { category: true },
    });

    return serializeProduct(product);
  }

  static async update(id, data) {
    if (!isDatabaseEnabled()) return dummyProducts.update(id, data);

    requireDatabase();
    await this.getById(id);

    if (data.categoryId) {
      await this.ensureCategoryExists(data.categoryId);
    }

    if (data.slug) {
      const slugExists = await getPrisma().product.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (slugExists) {
        throw new ApiError(409, 'Product slug already exists');
      }
    }

    const product = await getPrisma().product.update({
      where: { id },
      data,
      include: { category: true },
    });

    return serializeProduct(product);
  }

  static async remove(id) {
    if (!isDatabaseEnabled()) {
      dummyProducts.remove(id);
      return;
    }

    requireDatabase();
    await this.getById(id);
    await getPrisma().product.delete({ where: { id } });
  }

  static async bulkDelete(ids) {
    if (!isDatabaseEnabled()) return dummyProducts.bulkDelete(ids);

    requireDatabase();
    const result = await getPrisma().product.deleteMany({
      where: { id: { in: ids } },
    });

    return { deletedCount: result.count };
  }
}

export default ProductService;
