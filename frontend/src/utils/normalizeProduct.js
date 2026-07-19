const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(
  /\/api\/?$/,
  ''
);

const PLACEHOLDER_IMAGE =
  'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800';

export const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_ORIGIN}${url}`;
  return url;
};

/** Map API product shape to storefront/card-friendly fields */
export const normalizeProduct = (product) => {
  if (!product) return null;

  const images = (product.images || [])
    .map(resolveImageUrl)
    .filter(Boolean);

  const createdAt = product.createdAt ? new Date(product.createdAt) : null;
  const isNew =
    Boolean(product.isNew) ||
    (createdAt instanceof Date &&
      !Number.isNaN(createdAt.getTime()) &&
      Date.now() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 45);

  return {
    ...product,
    price: Number(product.price) || 0,
    subtitle: product.subtitle || product.shortDescription || '',
    image: images[0] || PLACEHOLDER_IMAGE,
    images: images.length ? images : [PLACEHOLDER_IMAGE],
    editorialImage: product.editorialImage || images[0] || PLACEHOLDER_IMAGE,
    category: product.category?.slug || product.category || '',
    categoryName: product.category?.name || '',
    brand: product.brand || 'KN Store',
    isBestSeller: Boolean(product.featured || product.isBestSeller),
    isNew,
    size: product.size || null,
    ingredients: Array.isArray(product.ingredients) ? product.ingredients : [],
    benefits: Array.isArray(product.benefits) ? product.benefits : [],
    spotlight: product.spotlight || product.shortDescription || product.description || '',
  };
};

export const normalizeProducts = (products = []) =>
  products.map(normalizeProduct).filter(Boolean);
