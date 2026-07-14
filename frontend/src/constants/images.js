/** Verified Pexels photo IDs — tested working via images.pexels.com */
const p = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const PHOTOS = {
  cosmetics: 4465124,
  skincareTubes: 7750099,
  makeupModel: 3997987,
  perfume: 3785147,
  flatLay: 2533266,
  skincareJars: 3373736,
  spaRitual: 4938508,
  application: 3018845,
  lipstick: 7792788,
  beautyProducts: 3685530,
  ingredients: 2539396,
  makeupBrushes: 4041391,
  salon: 9654031,
  beautyPortrait: 1459481,
  oilBottles: 2656952,
  hairSalon: 6679869,
  lifestyle: 3993446,
};

const img = (key, w) => p(PHOTOS[key], w);

export const FALLBACK_IMAGE = img('cosmetics');

export const PRODUCT_IMAGES = {
  'luminous-face-oil': {
    main: img('oilBottles', 800),
    gallery: [img('oilBottles', 900), img('flatLay', 900), img('skincareJars', 900), img('application', 900)],
    editorial: img('application', 1600),
  },
  'radiance-serum': {
    main: img('skincareTubes', 800),
    gallery: [img('skincareTubes', 900), img('ingredients', 900), img('beautyProducts', 900), img('flatLay', 900)],
    editorial: img('ingredients', 1600),
  },
  'hydra-rich-moisturizer': {
    main: img('skincareJars', 800),
    gallery: [img('skincareJars', 900), img('flatLay', 900), img('beautyProducts', 900), img('spaRitual', 900)],
    editorial: img('spaRitual', 1600),
  },
  'velvet-lip-tint': {
    main: img('lipstick', 800),
    gallery: [img('lipstick', 900), img('makeupModel', 900), img('salon', 900), img('makeupBrushes', 900)],
    editorial: img('makeupModel', 1600),
  },
  'silk-cleansing-balm': {
    main: img('beautyProducts', 800),
    gallery: [img('beautyProducts', 900), img('skincareTubes', 900), img('flatLay', 900), img('spaRitual', 900)],
    editorial: img('spaRitual', 1600),
  },
  'golden-eye-cream': {
    main: img('ingredients', 800),
    gallery: [img('ingredients', 900), img('skincareJars', 900), img('application', 900), img('flatLay', 900)],
    editorial: img('application', 1600),
  },
  'rosewater-toner': {
    main: img('flatLay', 800),
    gallery: [img('flatLay', 900), img('beautyProducts', 900), img('skincareTubes', 900), img('oilBottles', 900)],
    editorial: img('spaRitual', 1600),
  },
  'luminous-foundation': {
    main: img('makeupModel', 800),
    gallery: [img('makeupModel', 900), img('salon', 900), img('lipstick', 900), img('makeupBrushes', 900)],
    editorial: img('makeupModel', 1600),
  },
  'cashmere-blush': {
    main: img('salon', 800),
    gallery: [img('salon', 900), img('lipstick', 900), img('beautyPortrait', 900), img('makeupModel', 900)],
    editorial: img('beautyPortrait', 1600),
  },
  'velvet-mascara': {
    main: img('makeupBrushes', 800),
    gallery: [img('makeupBrushes', 900), img('makeupModel', 900), img('salon', 900), img('lipstick', 900)],
    editorial: img('makeupModel', 1600),
  },
  'amber-oud-perfume': {
    main: img('perfume', 800),
    gallery: [img('perfume', 900), img('cosmetics', 900), img('oilBottles', 900), img('beautyProducts', 900)],
    editorial: img('perfume', 1600),
  },
  'bare-lip-gloss': {
    main: img('beautyPortrait', 800),
    gallery: [img('beautyPortrait', 900), img('lipstick', 900), img('salon', 900), img('makeupModel', 900)],
    editorial: img('lipstick', 1600),
  },
};

export const IMAGES = {
  hero: {
    main: img('cosmetics', 900),
    accent: img('skincareTubes', 700),
    detail: img('skincareJars', 700),
    shop: img('beautyProducts', 1600),
    newArrivals: img('flatLay', 1600),
    brands: img('cosmetics', 1600),
    about: img('spaRitual', 1600),
    contact: img('salon', 1600),
  },

  categories: {
    skincare: img('flatLay', 800),
    makeup: img('makeupModel', 800),
    fragrance: img('perfume', 800),
  },

  collections: {
    skincareHero: img('skincareJars', 1600),
    skincareEdit: img('skincareJars', 900),
    makeupEdit: img('makeupModel', 900),
    featured: img('beautyProducts', 1600),
    ritual: img('application', 900),
  },

  editorial: {
    philosophy: img('spaRitual', 1600),
    spa: img('salon', 1600),
    application: img('application', 1600),
    ingredients: img('ingredients', 1600),
    routine: img('spaRitual', 1600),
    sustainability: img('hairSalon', 1600),
    shipping: img('beautyProducts', 1200),
    team: img('beautyPortrait', 1200),
  },

  journal: {
    morningRitual: img('spaRitual', 800),
    vitaminC: img('ingredients', 800),
    seasonal: img('flatLay', 800),
    glow: img('application', 800),
    wellness: img('salon', 800),
    selfCare: img('hairSalon', 800),
  },

  brands: {
    laMer: img('skincareTubes', 600),
    charlotte: img('makeupModel', 600),
    dior: img('perfume', 600),
    tomFord: img('cosmetics', 600),
    aesop: img('ingredients', 600),
    glossier: img('lipstick', 600),
  },

  placeholders: {
    shop: img('beautyProducts', 1200),
    newArrivals: img('flatLay', 1200),
    brands: img('cosmetics', 1200),
    wishlist: img('skincareTubes', 1200),
    account: img('application', 1200),
    checkout: img('skincareTubes', 1200),
    about: img('spaRitual', 1200),
    contact: img('salon', 1200),
    ritualGuide: img('application', 1200),
    sustainability: img('hairSalon', 1200),
    shipping: img('beautyProducts', 1200),
    returns: img('flatLay', 1200),
    faq: img('ingredients', 1200),
  },
};

export const getProductImages = (slug) =>
  PRODUCT_IMAGES[slug] ?? {
    main: img('beautyProducts', 800),
    gallery: [img('beautyProducts', 900), img('flatLay', 900), img('cosmetics', 900)],
    editorial: img('cosmetics', 1600),
  };

export default IMAGES;
