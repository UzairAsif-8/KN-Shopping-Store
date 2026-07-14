import { IMAGES } from './images';
export {
  ALL_PRODUCTS,
  BEST_SELLERS,
  NEW_ARRIVALS,
  BRANDS,
  RADIANCE_SERUM,
  getProductBySlug,
  getProductsByCategory,
} from './products';

export const BRAND = {
  name: 'KN Store',
  tagline: 'Beauty • Confidence • You',
  logo: '/logo.png',
  logoFull: '/logo-full.png',
};

export const COLORS = {
  primary: '#E8C4C8',
  secondary: '#222222',
  accent: '#CFA670',
  background: '#F8F5F1',
  supporting: '#EFE7E2',
  text: '#2A2624',
  textMuted: '#4f4445',
  surface: '#fcf9f5',
  surfaceContainer: '#f0ede9',
  outline: '#d3c3c4',
  onPrimary: '#ffffff',
  ivory: '#F8F5F1',
};

export const TYPOGRAPHY = {
  heading: '"Cormorant Garamond", Georgia, serif',
  body: '"Inter", system-ui, sans-serif',
};

export const LAYOUT = {
  maxWidth: '1400px',
  marginDesktop: '80px',
  marginMobile: '24px',
  gutter: '32px',
  sectionGap: '120px',
};

export const NAV_LINKS = [
  { label: 'SHOP', href: '/shop' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'NEW ARRIVALS', href: '/new-arrivals' },
  { label: 'BRANDS', href: '/brands' },
  { label: 'JOURNAL', href: '/journal' },
];

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Collections', href: '/collections' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Ritual Guide', href: '/ritual-guide' },
    { label: 'Journal', href: '/journal' },
    { label: 'Sustainability', href: '/sustainability' },
  ],
  customerCare: [
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
];

export const CATEGORIES = [
  {
    id: 'skincare',
    label: 'Skincare',
    eyebrow: 'Shop the',
    description: 'Serums, creams & transformative daily rituals',
    count: '24 products',
    href: '/shop?category=skincare',
    image: IMAGES.categories.skincare,
    accent: '#E8C4C8',
    featured: true,
  },
  {
    id: 'makeup',
    label: 'Makeup',
    eyebrow: 'Shop the',
    description: 'Luminous color with effortless, modern finish',
    count: '18 products',
    href: '/shop?category=makeup',
    image: IMAGES.categories.makeup,
    accent: '#CFA670',
    featured: false,
  },
  {
    id: 'fragrance',
    label: 'Fragrance',
    eyebrow: 'Shop the',
    description: 'Signature scents for every mood & moment',
    count: '12 products',
    href: '/shop?category=fragrance',
    image: IMAGES.categories.fragrance,
    accent: '#73575b',
    featured: false,
  },
];

export const COLLECTIONS = [
  {
    id: 'skincare-essentials',
    title: 'Skincare Essentials',
    eyebrow: 'CURATED BY US',
    description:
      'Discover our handpicked selection of transformative skincare rituals designed to nourish, restore, and illuminate your natural radiance.',
    cta: 'EXPLORE THE EDIT',
    href: '/collections/skincare-essentials',
    image: IMAGES.collections.skincareEdit,
    imagePosition: 'left',
  },
  {
    id: 'makeup-collection',
    title: 'The Makeup Collection',
    eyebrow: 'MODERN & RADIANT',
    description:
      'Elevate your everyday look with our curated makeup essentials — luminous finishes, effortless application, and timeless elegance.',
    cta: 'SHOP THE LOOK',
    href: '/collections/makeup',
    image: IMAGES.collections.makeupEdit,
    imagePosition: 'right',
  },
];

export const JOURNAL_POSTS = [
  {
    id: 'morning-ritual',
    slug: 'morning-ritual',
    title: 'The Art of the Morning Ritual',
    excerpt: 'How intentional skincare routines transform not just your skin, but your entire day.',
    category: 'Rituals',
    date: 'June 12, 2026',
    readTime: '5 min read',
    image: IMAGES.journal.morningRitual,
    heroImage: IMAGES.editorial.routine,
    href: '/journal/morning-ritual',
    body: 'The morning ritual is more than a routine — it is a declaration of self-worth. Begin with a gentle cleanse, follow with a balancing toner, and seal in hydration before the world asks anything of you.',
  },
  {
    id: 'ingredient-spotlight',
    slug: 'ingredient-spotlight',
    title: 'Ingredient Spotlight: Vitamin C',
    excerpt: 'The science behind brightening serums and why radiance starts at the cellular level.',
    category: 'Ingredients',
    date: 'June 5, 2026',
    readTime: '7 min read',
    image: IMAGES.journal.vitaminC,
    heroImage: IMAGES.editorial.ingredients,
    href: '/journal/ingredient-spotlight',
    body: 'Vitamin C remains the gold standard in brightening skincare. When stabilized and paired with niacinamide, it delivers visible results within weeks — not months.',
  },
  {
    id: 'seasonal-skincare',
    slug: 'seasonal-skincare',
    title: 'Seasonal Skincare Transitions',
    excerpt: 'Adapting your beauty routine as the seasons change — a guide to year-round glow.',
    category: 'Guide',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image: IMAGES.journal.seasonal,
    heroImage: IMAGES.editorial.sustainability,
    href: '/journal/seasonal-skincare',
    body: 'As temperatures shift, so should your skincare. Lighter textures for summer, richer creams for winter — the key is listening to what your skin needs today.',
  },
  {
    id: 'glow-guide',
    slug: 'glow-guide',
    title: 'The Luminous Skin Guide',
    excerpt: 'Expert tips for achieving that coveted dewy, lit-from-within glow all year round.',
    category: 'Skincare',
    date: 'May 20, 2026',
    readTime: '8 min read',
    image: IMAGES.journal.glow,
    heroImage: IMAGES.editorial.application,
    href: '/journal/glow-guide',
    body: 'Glow is not about shine — it is about health. Layer hydration, protect with antioxidants, and never skip the face oil as your final step.',
  },
  {
    id: 'wellness-beauty',
    slug: 'wellness-beauty',
    title: 'Wellness Meets Beauty',
    excerpt: 'The connection between inner wellness and outer radiance — a holistic approach.',
    category: 'Wellness',
    date: 'May 14, 2026',
    readTime: '6 min read',
    image: IMAGES.journal.wellness,
    heroImage: IMAGES.editorial.spa,
    href: '/journal/wellness-beauty',
    body: 'Sleep, hydration, and mindful moments are the foundation of every great beauty routine. What you nurture inside always shows outside.',
  },
  {
    id: 'self-care-evening',
    slug: 'self-care-evening',
    title: 'Evening Self-Care Rituals',
    excerpt: 'Wind down beautifully with our guide to restorative nighttime skincare routines.',
    category: 'Rituals',
    date: 'May 8, 2026',
    readTime: '5 min read',
    image: IMAGES.journal.selfCare,
    heroImage: IMAGES.editorial.philosophy,
    href: '/journal/self-care-evening',
    body: 'The evening ritual is where repair happens. Double cleanse, treat with actives, and finish with a rich moisturizer to let skin regenerate overnight.',
  },
];

export const getJournalBySlug = (slug) =>
  JOURNAL_POSTS.find((p) => p.slug === slug) ?? null;

export { IMAGES, PRODUCT_IMAGES, getProductImages, FALLBACK_IMAGE } from './images';
