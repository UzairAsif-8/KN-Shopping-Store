import { isDatabaseEnabled } from '../config/env.js';
import { getPrisma } from '../config/database.js';
import { dummyProducts } from '../data/dummyStore.js';
import { getDirectorySize, formatBytes, uploadsDir } from '../utils/storage.js';
import { serializeProducts } from '../utils/index.js';

export class DashboardService {
  static async getStats() {
    if (!isDatabaseEnabled()) {
      return dummyProducts.getDashboardStats();
    }

    const prisma = getPrisma();

    const [
      totalProducts,
      totalCategories,
      featuredProducts,
      latestProducts,
      localStorageBytes,
      imageUrlCount,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      getDirectorySize(uploadsDir),
      prisma.product.findMany({ select: { images: true } }),
    ]);

    const cloudinaryImages = imageUrlCount
      .flatMap((product) => product.images)
      .filter((url) => url.includes('cloudinary.com')).length;

    const localImages = imageUrlCount
      .flatMap((product) => product.images)
      .filter((url) => url.startsWith('/uploads/')).length;

    return {
      totalProducts,
      totalCategories,
      featuredProducts,
      latestProducts: serializeProducts(latestProducts),
      storage: {
        localBytes: localStorageBytes,
        localFormatted: formatBytes(localStorageBytes),
        localImages,
        cloudinaryImages,
        totalImages: localImages + cloudinaryImages,
      },
    };
  }
}

export default DashboardService;
