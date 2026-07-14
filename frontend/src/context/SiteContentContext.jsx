import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import siteContentService from '../services/siteContentService';
import { resolveImageKey } from '../utils/resolveImageKey';
import {
  CATEGORIES,
  COLLECTIONS,
  JOURNAL_POSTS,
} from '../constants';
import {
  CATEGORY_IMAGE_KEYS,
  COLLECTION_IMAGE_KEYS,
  JOURNAL_IMAGE_KEYS,
  INFO_PAGE_IMAGE_KEYS,
} from '../constants/siteImageKeys';
import { getProductImages } from '../constants/images';

const SiteContentContext = createContext(null);

export const SiteContentProvider = ({ children }) => {
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { data } = await siteContentService.getAll();
      setOverrides(data.data?.overrides || {});
    } catch {
      setOverrides({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getImage = useCallback(
    (key) => overrides[key] || resolveImageKey(key),
    [overrides]
  );

  const categories = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        image: getImage(CATEGORY_IMAGE_KEYS[category.id]),
      })),
    [getImage]
  );

  const collections = useMemo(
    () =>
      COLLECTIONS.map((collection) => ({
        ...collection,
        image: getImage(COLLECTION_IMAGE_KEYS[collection.id]),
      })),
    [getImage]
  );

  const journalPosts = useMemo(
    () =>
      JOURNAL_POSTS.map((post) => {
        const keys = JOURNAL_IMAGE_KEYS[post.slug];
        if (!keys) return post;
        return {
          ...post,
          image: getImage(keys.image),
          heroImage: getImage(keys.heroImage),
        };
      }),
    [getImage]
  );

  const getJournalBySlug = useCallback(
    (slug) => journalPosts.find((p) => p.slug === slug) ?? null,
    [journalPosts]
  );

  const getInfoPageImages = useCallback(
    (pageKey) => {
      const keys = INFO_PAGE_IMAGE_KEYS[pageKey];
      if (!keys) return null;

      return {
        image: getImage(keys.image),
        sideImage:
          pageKey === 'returns'
            ? getProductImages('hydra-rich-moisturizer').main
            : keys.sideImage
              ? getImage(keys.sideImage)
              : null,
      };
    },
    [getImage]
  );

  const value = useMemo(
    () => ({
      loading,
      overrides,
      refresh,
      getImage,
      categories,
      collections,
      journalPosts,
      getJournalBySlug,
      getInfoPageImages,
    }),
    [
      loading,
      overrides,
      refresh,
      getImage,
      categories,
      collections,
      journalPosts,
      getJournalBySlug,
      getInfoPageImages,
    ]
  );

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return context;
};

export default SiteContentContext;
