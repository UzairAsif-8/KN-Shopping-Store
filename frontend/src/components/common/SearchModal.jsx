import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useUI } from '../../context';
import Logo from './Logo';

const SearchModal = () => {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-text/20 backdrop-blur-sm z-50"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-outline/30"
          >
            <div className="container-kn py-5">
              <div className="flex items-center gap-4 md:gap-6">
                <Logo variant="sm" onClick={closeSearch} />
                <HiOutlineSearch className="w-5 h-5 text-text-muted shrink-0 hidden sm:block" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, collections, journal..."
                  className="flex-1 bg-transparent text-lg text-text placeholder:text-text-muted outline-none font-body"
                  autoFocus
                />
                <button onClick={closeSearch} aria-label="Close search">
                  <HiOutlineX className="w-5 h-5 text-text" />
                </button>
              </div>
              {query && (
                <div className="mt-6 pb-4">
                  <p className="label-caps text-text-muted mb-4">Quick Links</p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/shop" onClick={closeSearch} className="text-sm text-text hover:text-accent transition-colors">
                      All Products
                    </Link>
                    <Link to="/collections" onClick={closeSearch} className="text-sm text-text hover:text-accent transition-colors">
                      Collections
                    </Link>
                    <Link to="/journal" onClick={closeSearch} className="text-sm text-text hover:text-accent transition-colors">
                      Journal
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(SearchModal);
