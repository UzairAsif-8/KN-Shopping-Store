import { createContext, useContext, useState, useCallback } from 'react';
import { ALL_PRODUCTS } from '../constants';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    // Placeholder — connect to productService.getAll
    setLoading(false);
  }, []);

  const value = {
    products,
    loading,
    filters,
    setProducts,
    setFilters,
    fetchProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};

export default ProductContext;
