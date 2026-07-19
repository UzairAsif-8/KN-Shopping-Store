import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import productService from '../services/productService';
import { normalizeProduct, normalizeProducts } from '../utils/normalizeProduct';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await productService.getAll({
        active: 'true',
        limit: 100,
        sort: 'newest',
        ...params,
      });
      setProducts(normalizeProducts(data.data || []));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const onFocus = () => fetchProducts();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchProducts]);

  const featured = useMemo(
    () => products.filter((p) => p.isBestSeller || p.featured),
    [products]
  );

  const newArrivals = useMemo(() => {
    const fresh = products.filter((p) => p.isNew);
    return fresh.length ? fresh : products.slice(0, 8);
  }, [products]);

  const getBySlug = useCallback(
    (slug) => products.find((p) => p.slug === slug) || null,
    [products]
  );

  const getByCategory = useCallback(
    (categorySlug) =>
      products.filter(
        (p) => p.category === categorySlug || p.category?.slug === categorySlug
      ),
    [products]
  );

  const value = {
    products,
    featured,
    bestSellers: featured,
    newArrivals,
    loading,
    error,
    filters,
    setProducts,
    setFilters,
    fetchProducts,
    getBySlug,
    getByCategory,
    normalizeProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};

export default ProductContext;
