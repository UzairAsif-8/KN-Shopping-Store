/** Site section definitions — keys map to IMAGES dot-paths on the frontend */
export const SITE_SECTION_GROUPS = [
  {
    id: 'homepage',
    label: 'Homepage',
    sections: [
      { key: 'hero.main', label: 'Hero — Main Image' },
      { key: 'hero.accent', label: 'Hero — Accent Image' },
      { key: 'hero.detail', label: 'Hero — Detail Image' },
      { key: 'editorial.philosophy', label: 'Philosophy Banner' },
      { key: 'collections.featured', label: 'Featured Collection' },
    ],
  },
  {
    id: 'headers',
    label: 'Page Headers',
    sections: [
      { key: 'hero.shop', label: 'Shop Page' },
      { key: 'hero.newArrivals', label: 'New Arrivals Page' },
      { key: 'hero.brands', label: 'Brands Page' },
      { key: 'hero.about', label: 'About Page' },
      { key: 'hero.contact', label: 'Contact Page' },
      { key: 'placeholders.wishlist', label: 'Wishlist Page' },
      { key: 'placeholders.account', label: 'Account Page' },
      { key: 'placeholders.checkout', label: 'Checkout Page' },
    ],
  },
  {
    id: 'categories',
    label: 'Category Cards',
    sections: [
      { key: 'categories.skincare', label: 'Skincare Category' },
      { key: 'categories.makeup', label: 'Makeup Category' },
      { key: 'categories.fragrance', label: 'Fragrance Category' },
    ],
  },
  {
    id: 'collections',
    label: 'Collections & Editorial',
    sections: [
      { key: 'collections.skincareHero', label: 'Skincare Collection Hero' },
      { key: 'collections.skincareEdit', label: 'Skincare Edit Block' },
      { key: 'collections.makeupEdit', label: 'Makeup Edit Block' },
      { key: 'collections.ritual', label: 'Ritual Section' },
      { key: 'editorial.spa', label: 'Journal Header / Spa' },
      { key: 'editorial.team', label: 'About — Team Image' },
    ],
  },
  {
    id: 'journal',
    label: 'Journal Articles',
    sections: [
      { key: 'journal.morningRitual', label: 'Morning Ritual' },
      { key: 'journal.vitaminC', label: 'Vitamin C Guide' },
      { key: 'journal.seasonal', label: 'Seasonal Beauty' },
      { key: 'journal.glow', label: 'Glow Guide' },
      { key: 'journal.wellness', label: 'Wellness Edit' },
      { key: 'journal.selfCare', label: 'Self Care' },
    ],
  },
  {
    id: 'info',
    label: 'Info Pages',
    sections: [
      { key: 'placeholders.ritualGuide', label: 'Ritual Guide' },
      { key: 'placeholders.sustainability', label: 'Sustainability' },
      { key: 'placeholders.shipping', label: 'Shipping Info' },
      { key: 'placeholders.returns', label: 'Returns Policy' },
      { key: 'placeholders.faq', label: 'FAQ' },
      { key: 'editorial.routine', label: 'Ritual Guide Side Image' },
      { key: 'editorial.sustainability', label: 'Sustainability Side Image' },
      { key: 'editorial.shipping', label: 'Shipping Side Image' },
      { key: 'editorial.ingredients', label: 'FAQ Side Image' },
    ],
  },
];

export const ALL_SECTION_KEYS = SITE_SECTION_GROUPS.flatMap((g) =>
  g.sections.map((s) => s.key)
);

const p = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/** Default images — mirrors frontend IMAGES constants */
export const DEFAULT_SITE_IMAGES = {
  'hero.main': p(4465124, 900),
  'hero.accent': p(7750099, 700),
  'hero.detail': p(3373736, 700),
  'hero.shop': p(3685530, 1600),
  'hero.newArrivals': p(2533266, 1600),
  'hero.brands': p(4465124, 1600),
  'hero.about': p(4938508, 1600),
  'hero.contact': p(9654031, 1600),
  'categories.skincare': p(2533266, 800),
  'categories.makeup': p(3997987, 800),
  'categories.fragrance': p(3785147, 800),
  'collections.skincareHero': p(3373736, 1600),
  'collections.skincareEdit': p(3373736, 900),
  'collections.makeupEdit': p(3997987, 900),
  'collections.featured': p(3685530, 1600),
  'collections.ritual': p(3018845, 900),
  'editorial.philosophy': p(4938508, 1600),
  'editorial.spa': p(9654031, 1600),
  'editorial.application': p(3018845, 1600),
  'editorial.ingredients': p(2539396, 1600),
  'editorial.routine': p(4938508, 1600),
  'editorial.sustainability': p(6679869, 1600),
  'editorial.shipping': p(3685530, 1200),
  'editorial.team': p(1459481, 1200),
  'journal.morningRitual': p(4938508, 800),
  'journal.vitaminC': p(2539396, 800),
  'journal.seasonal': p(2533266, 800),
  'journal.glow': p(3018845, 800),
  'journal.wellness': p(9654031, 800),
  'journal.selfCare': p(6679869, 800),
  'placeholders.shop': p(3685530, 1200),
  'placeholders.newArrivals': p(2533266, 1200),
  'placeholders.brands': p(4465124, 1200),
  'placeholders.wishlist': p(7750099, 1200),
  'placeholders.account': p(3018845, 1200),
  'placeholders.checkout': p(7750099, 1200),
  'placeholders.about': p(4938508, 1200),
  'placeholders.contact': p(9654031, 1200),
  'placeholders.ritualGuide': p(3018845, 1200),
  'placeholders.sustainability': p(6679869, 1200),
  'placeholders.shipping': p(3685530, 1200),
  'placeholders.returns': p(2533266, 1200),
  'placeholders.faq': p(2539396, 1200),
};

export const getDefaultImage = (key) => DEFAULT_SITE_IMAGES[key] || null;

export const getSectionMeta = (key) => {
  for (const group of SITE_SECTION_GROUPS) {
    const section = group.sections.find((s) => s.key === key);
    if (section) return { ...section, group: group.label, groupId: group.id };
  }
  return null;
};
