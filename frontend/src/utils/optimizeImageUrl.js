/**
 * Resize/optimize remote image URLs for faster delivery.
 * Supports Cloudinary + Pexels; leaves other URLs unchanged.
 */
export const optimizeImageUrl = (url, { width = 800, quality = 'auto' } = {}) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('blob:') || url.startsWith('data:')) return url;

  // Cloudinary: inject f_auto,q_auto,w_* after /upload/
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // Already has transforms
    if (/\/upload\/[^/]*[fqwc]_/.test(url)) {
      return url.replace(
        /\/upload\/([^/]+)\//,
        (_m, transforms) => {
          const parts = transforms.split(',').filter((t) => !/^w_/.test(t) && !/^f_/.test(t) && !/^q_/.test(t));
          parts.unshift(`f_auto`, `q_${quality}`, `w_${width}`);
          return `/upload/${parts.join(',')}/`;
        }
      );
    }
    return url.replace('/upload/', `/upload/f_auto,q_${quality},c_limit,w_${width}/`);
  }

  // Pexels: set width query param
  if (url.includes('images.pexels.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('auto', 'compress');
      parsed.searchParams.set('cs', 'tinysrgb');
      parsed.searchParams.set('w', String(width));
      return parsed.toString();
    } catch {
      return url;
    }
  }

  return url;
};

export const IMAGE_WIDTHS = {
  thumb: 160,
  card: 480,
  detail: 900,
  hero: 1200,
  full: 1600,
};
