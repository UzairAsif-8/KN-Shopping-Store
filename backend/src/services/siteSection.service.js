import {
  SITE_SECTION_GROUPS,
  DEFAULT_SITE_IMAGES,
  getDefaultImage,
  getSectionMeta,
} from '../config/siteSections.js';
import { isDatabaseEnabled } from '../config/env.js';
import { getPrisma } from '../config/database.js';
import { dummySiteSections } from '../data/dummyStore.js';
import { ApiError } from '../utils/ApiError.js';

const buildSectionEntry = (key, imageOverride = null) => {
  const meta = getSectionMeta(key);
  const defaultImage = getDefaultImage(key);

  return {
    key,
    label: meta?.label || key,
    group: meta?.group || 'Other',
    groupId: meta?.groupId || 'other',
    image: imageOverride || defaultImage,
    defaultImage,
    isCustom: Boolean(imageOverride),
  };
};

export class SiteSectionService {
  static async getOverridesMap() {
    if (!isDatabaseEnabled()) {
      return dummySiteSections.getAllOverrides();
    }

    const rows = await getPrisma().siteSection.findMany();
    return Object.fromEntries(rows.map((row) => [row.key, row.image]));
  }

  static async getAll() {
    const overrides = await this.getOverridesMap();

    const groups = SITE_SECTION_GROUPS.map((group) => ({
      id: group.id,
      label: group.label,
      sections: group.sections.map((section) =>
        buildSectionEntry(section.key, overrides[section.key] || null)
      ),
    }));

    const flat = groups.flatMap((g) => g.sections);

    return { groups, sections: flat, overrides };
  }

  static async getImage(key) {
    const overrides = await this.getOverridesMap();
    return overrides[key] || getDefaultImage(key);
  }

  static async update(key, image) {
    const meta = getSectionMeta(key);
    if (!meta) {
      throw new ApiError(400, 'Invalid section key');
    }

    if (!image || typeof image !== 'string') {
      throw new ApiError(400, 'Image URL is required');
    }

    if (!isDatabaseEnabled()) {
      return dummySiteSections.update(key, image);
    }

    const row = await getPrisma().siteSection.upsert({
      where: { key },
      create: { key, image },
      update: { image },
    });

    return { key: row.key, image: row.image, updatedAt: row.updatedAt.toISOString() };
  }

  static async reset(key) {
    const meta = getSectionMeta(key);
    if (!meta) {
      throw new ApiError(400, 'Invalid section key');
    }

    if (!isDatabaseEnabled()) {
      dummySiteSections.remove(key);
      return buildSectionEntry(key, null);
    }

    await getPrisma().siteSection.deleteMany({ where: { key } });
    return buildSectionEntry(key, null);
  }
}

export default SiteSectionService;
