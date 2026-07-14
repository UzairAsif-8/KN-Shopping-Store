import { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const value = {
    searchOpen,
    mobileMenuOpen,
    toast,
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    toggleSearch: () => setSearchOpen((o) => !o),
    openMobileMenu: () => setMobileMenuOpen(true),
    closeMobileMenu: () => setMobileMenuOpen(false),
    toggleMobileMenu: () => setMobileMenuOpen((o) => !o),
    showToast,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};

export default UIContext;
