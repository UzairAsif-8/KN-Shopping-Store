import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const p = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const CATEGORIES = [
  {
    name: 'Skincare',
    slug: 'skincare',
    description: 'Serums, moisturizers, and rituals for radiant skin.',
    image: p(3373736),
  },
  {
    name: 'Makeup',
    slug: 'makeup',
    description: 'Modern color essentials for every occasion.',
    image: p(3997987),
  },
  {
    name: 'Fragrance',
    slug: 'fragrance',
    description: 'Fine perfumes and artisan scents.',
    image: p(3785147),
  },
  {
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Nourishing treatments for healthy, luminous hair.',
    image: p(6679869),
  },
  {
    name: 'Body Care',
    slug: 'body-care',
    description: 'Luxurious body oils, balms, and daily rituals.',
    image: p(4938508),
  },
];

const PRODUCTS = [
  { name: 'Luminous Face Oil', slug: 'luminous-face-oil', category: 'skincare', price: 55, featured: true, stock: 120, images: [p(2656952), p(2533266), p(3373736)] },
  { name: 'Radiance Serum', slug: 'radiance-serum', category: 'skincare', price: 76, featured: true, stock: 85, images: [p(7750099), p(2539396), p(3685530)] },
  { name: 'Hydra-Rich Moisturizer', slug: 'hydra-rich-moisturizer', category: 'skincare', price: 48, featured: true, stock: 200, images: [p(3373736), p(2533266), p(3685530)] },
  { name: 'Golden Eye Cream', slug: 'golden-eye-cream', category: 'skincare', price: 62, featured: false, stock: 90, images: [p(2539396), p(3373736), p(3018845)] },
  { name: 'Rosewater Toner', slug: 'rosewater-toner', category: 'skincare', price: 32, featured: false, stock: 150, images: [p(2533266), p(3685530), p(7750099)] },
  { name: 'Silk Cleansing Balm', slug: 'silk-cleansing-balm', category: 'skincare', price: 42, featured: false, stock: 110, images: [p(3685530), p(7750099), p(4938508)] },
  { name: 'Velvet Lip Tint', slug: 'velvet-lip-tint', category: 'makeup', price: 28, featured: true, stock: 180, images: [p(7792788), p(3997987), p(4041391)] },
  { name: 'Luminous Foundation', slug: 'luminous-foundation', category: 'makeup', price: 54, featured: true, stock: 95, images: [p(3997987), p(9654031), p(7792788)] },
  { name: 'Cashmere Blush', slug: 'cashmere-blush', category: 'makeup', price: 36, featured: false, stock: 140, images: [p(9654031), p(7792788), p(1459481)] },
  { name: 'Velvet Mascara', slug: 'velvet-mascara', category: 'makeup', price: 32, featured: false, stock: 160, images: [p(4041391), p(3997987), p(7792788)] },
  { name: 'Bare Lip Gloss', slug: 'bare-lip-gloss', category: 'makeup', price: 24, featured: false, stock: 200, images: [p(1459481), p(7792788), p(3997987)] },
  { name: 'Amber Oud Perfume', slug: 'amber-oud-perfume', category: 'fragrance', price: 98, featured: true, stock: 60, images: [p(3785147), p(4465124), p(2656952)] },
  { name: 'Noir Rose Eau de Parfum', slug: 'noir-rose-edp', category: 'fragrance', price: 112, featured: false, stock: 45, images: [p(3785147), p(3685530)] },
  { name: 'Citrus Veil Body Mist', slug: 'citrus-veil-mist', category: 'fragrance', price: 38, featured: false, stock: 130, images: [p(3785147), p(2533266)] },
  { name: 'Silk Repair Shampoo', slug: 'silk-repair-shampoo', category: 'hair-care', price: 34, featured: false, stock: 175, images: [p(6679869), p(3993446)] },
  { name: 'Bond Repair Mask', slug: 'bond-repair-mask', category: 'hair-care', price: 46, featured: true, stock: 88, images: [p(6679869), p(4938508)] },
  { name: 'Scalp Renewal Serum', slug: 'scalp-renewal-serum', category: 'hair-care', price: 52, featured: false, stock: 70, images: [p(6679869), p(7750099)] },
  { name: 'Shine Gloss Treatment', slug: 'shine-gloss-treatment', category: 'hair-care', price: 29, featured: false, stock: 120, images: [p(3993446), p(6679869)] },
  { name: 'Curl Define Cream', slug: 'curl-define-cream', category: 'hair-care', price: 31, featured: false, stock: 95, images: [p(6679869), p(3018845)] },
  { name: 'Rose Body Oil', slug: 'rose-body-oil', category: 'body-care', price: 44, featured: true, stock: 100, images: [p(4938508), p(2656952)] },
  { name: 'Shea Recovery Balm', slug: 'shea-recovery-balm', category: 'body-care', price: 36, featured: false, stock: 140, images: [p(4938508), p(3685530)] },
  { name: 'Mineral Body Polish', slug: 'mineral-body-polish', category: 'body-care', price: 40, featured: false, stock: 85, images: [p(4938508), p(2533266)] },
  { name: 'Overnight Hand Mask', slug: 'overnight-hand-mask', category: 'body-care', price: 26, featured: false, stock: 160, images: [p(3018845), p(4938508)] },
  { name: 'Cedarwood Bath Soak', slug: 'cedarwood-bath-soak', category: 'body-care', price: 30, featured: false, stock: 110, images: [p(4938508), p(2539396)] },
  { name: 'Vitamin C Glow Drops', slug: 'vitamin-c-glow-drops', category: 'skincare', price: 58, featured: true, stock: 75, images: [p(7750099), p(2539396), p(3018845)] },
];

const productDescription = (name) =>
  `${name} is a KN Store signature formula crafted with premium ingredients for visible results and a luxurious daily ritual.`;

const shortDescription = (name) =>
  `Elevated ${name.toLowerCase()} for modern beauty rituals.`;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.refreshToken.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.admin.deleteMany();

  await prisma.admin.create({
    data: {
      name: 'KN Store Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

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
        shortDescription: shortDescription(product.name),
        description: productDescription(product.name),
        price: product.price,
        images: product.images,
        stock: product.stock,
        featured: product.featured,
        active: true,
      },
    });
  }

  console.log(`Seeded admin: ${adminEmail}`);
  console.log(`Seeded ${CATEGORIES.length} categories and ${PRODUCTS.length} products`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
