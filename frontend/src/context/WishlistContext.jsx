import { createContext, useContext, useState, useCallback } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (id) => items.some((i) => i.id === id),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    count: items.length,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};

export default WishlistContext;
