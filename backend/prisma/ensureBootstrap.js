/**
 * Safe bootstrap for first deploy — never wipes existing data.
 * Creates admin + sample catalog only when the database is empty.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const p = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const CATEGORIES = [
  { name: 'Skincare', slug: 'skincare', description: 'Serums, moisturizers, and rituals for radiant skin.', image: p(3373736) },
  { name: 'Makeup', slug: 'makeup', description: 'Modern color essentials for every occasion.', image: p(3997987) },
  { name: 'Fragrance', slug: 'fragrance', description: 'Fine perfumes and artisan scents.', image: p(3785147) },
  { name: 'Hair Care', slug: 'hair-care', description: 'Nourishing treatments for healthy, luminous hair.', image: p(6679869) },
  { name: 'Body Care', slug: 'body-care', description: 'Luxurious body oils, balms, and daily rituals.', image: p(4938508) },
];

const PRODUCTS = [
  { name: 'Radiance Serum', slug: 'radiance-serum', category: 'skincare', price: 76, featured: true, stock: 85, images: [p(7750099), p(2539396)] },
  { name: 'Hydra-Rich Moisturizer', slug: 'hydra-rich-moisturizer', category: 'skincare', price: 48, featured: true, stock: 200, images: [p(3373736)] },
  { name: 'Velvet Lip Tint', slug: 'velvet-lip-tint', category: 'makeup', price: 28, featured: true, stock: 180, images: [p(7792788)] },
  { name: 'Luminous Foundation', slug: 'luminous-foundation', category: 'makeup', price: 54, featured: true, stock: 95, images: [p(3997987)] },
  { name: 'Amber Oud Perfume', slug: 'amber-oud-perfume', category: 'fragrance', price: 98, featured: true, stock: 60, images: [p(3785147)] },
];

async function main() {
  const adminCount = await prisma.admin.count();
  if (adminCount > 0) {
    console.log('Bootstrap skipped — admin already exists.');
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.admin.create({
    data: {
      name: 'KN Store Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log(`Created admin: ${adminEmail}`);

  const productCount = await prisma.product.count();
  if (productCount > 0) {
    console.log('Catalog already present — leaving products unchanged.');
    return;
  }

  const categoryMap = {};
  for (const category of CATEGORIES) {
    const created = await prisma.category.create({ data: category });
    categoryMap[category.slug] = created.id;
  }

  for (const product of PRODUCTS) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        categoryId: categoryMap[product.category],
        shortDescription: `Elevated ${product.name.toLowerCase()} for modern beauty rituals.`,
        description: `${product.name} is a KN Store signature formula crafted with premium ingredients.`,
        price: product.price,
        images: product.images,
        stock: product.stock,
        featured: product.featured,
        active: true,
      },
    });
  }

  console.log(`Bootstrapped ${CATEGORIES.length} categories and ${PRODUCTS.length} products`);
}

main()
  .catch((error) => {
    console.error('Bootstrap failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
