import { isDatabaseEnabled } from '../config/env.js';
import { getPrisma } from '../config/database.js';
import { dummyCategories } from '../data/dummyStore.js';
import { ApiError } from '../utils/ApiError.js';
import { slugify } from '../utils/slugify.js';
import { getPagination, buildPaginationMeta } from '../utils/pagination.js';

const requireDatabase = () => {
  if (!isDatabaseEnabled()) {
    throw new ApiError(503, 'Database not configured. Add DATABASE_URL to enable this feature.');
  }
};

export class CategoryService {
  static async list(query = {}) {
    if (!isDatabaseEnabled()) return dummyCategories.list(query);

    const { page, limit, skip } = getPagination(query);
    const where = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { slug: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const orderBy = this.getSortOrder(query.sort);
    const prisma = getPrisma();

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: { _count: { select: { products: true } } },
      }),
      prisma.category.count({ where }),
    ]);

    return {
      categories: categories.map(({ _count, ...category }) => ({
        ...category,
        productCount: _count.products,
      })),
      meta: buildPaginationMeta({ page, limit, total }),
    };
  }

  static async getAllPublic() {
    if (!isDatabaseEnabled()) return dummyCategories.getAllPublic();

    return getPrisma().category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    });
  }

  static async getBySlug(slug) {
    if (!isDatabaseEnabled()) return dummyCategories.getBySlug(slug);

    const category = await getPrisma().category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { active: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return category;
  }

  static async getById(id) {
    if (!isDatabaseEnabled()) return dummyCategories.getById(id);

    const category = await getPrisma().category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return category;
  }

  static async create(data) {
    requireDatabase();
    const slug = data.slug || slugify(data.name);
    const prisma = getPrisma();

    const existing = await prisma.category.findFirst({
      where: { OR: [{ slug }, { name: { equals: data.name, mode: 'insensitive' } }] },
    });

    if (existing) {
      throw new ApiError(409, 'Category with this name or slug already exists');
    }

    return prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description ?? null,
        image: data.image ?? null,
      },
    });
  }

  static async update(id, data) {
    requireDatabase();
    await this.getById(id);
    const prisma = getPrisma();

    if (data.slug) {
      const slugExists = await prisma.category.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (slugExists) {
        throw new ApiError(409, 'Category slug already exists');
      }
    }

    if (data.name) {
      const nameExists = await prisma.category.findFirst({
        where: { name: { equals: data.name, mode: 'insensitive' }, NOT: { id } },
      });
      if (nameExists) {
        throw new ApiError(409, 'Category name already exists');
      }
    }

    return prisma.category.update({ where: { id }, data });
  }

  static async remove(id) {
    requireDatabase();
    await this.getById(id);

    const productCount = await getPrisma().product.count({ where: { categoryId: id } });

    if (productCount > 0) {
      throw new ApiError(400, 'Cannot delete category with existing products');
    }

    await getPrisma().category.delete({ where: { id } });
  }

  static getSortOrder(sort) {
    switch (sort) {
      case 'name_desc':
        return { name: 'desc' };
      case 'oldest':
        return { createdAt: 'asc' };
      case 'newest':
        return { createdAt: 'desc' };
      default:
        return { name: 'asc' };
    }
  }
}

export default CategoryService;
