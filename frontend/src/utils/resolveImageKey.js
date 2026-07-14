import { FALLBACK_IMAGE, IMAGES } from '../constants/images';

export const resolveImageKey = (key) => {
  if (!key) return FALLBACK_IMAGE;
  const value = key.split('.').reduce((obj, part) => obj?.[part], IMAGES);
  return value || FALLBACK_IMAGE;
};

export default resolveImageKey;
