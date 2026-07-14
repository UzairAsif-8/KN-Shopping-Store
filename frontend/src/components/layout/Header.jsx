import { memo, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import Logo from '../common/Logo';
import { BRAND, NAV_LINKS } from '../../constants';
import { useCart, useWishlist, useUI } from '../../context';
import { cn } from '../../utils';

const NAV_HEIGHT = 'h-[72px]';

const formatNavLabel = (label) =>
  label.charAt(0) + label.slice(1).toLowerCase();

const Header = () => {
  const { itemCount, toggleCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { toggleSearch, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-500',
          NAV_HEIGHT,
          scrolled
            ? 'bg-ivory/92 backdrop-blur-xl border-b border-outline/30 shadow-[0_8px_32px_rgba(42,38,36,0.06)]'
            : 'bg-background/70 backdrop-blur-lg border-b border-transparent'
        )}
      >
        <div className="container-kn h-full">
          <div className="relative h-full grid grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">

            {/* Logo */}
            <div className="flex items-center h-full z-10">
              <Logo variant="navbar" onClick={closeMobileMenu} />
            </div>

            {/* Desktop Nav — editorial center */}
            <nav className="hidden lg:flex items-center justify-center gap-0">
              {NAV_LINKS.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-5 text-primary/50 font-heading text-sm select-none">·</span>
                  )}
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      cn(
                        'font-heading text-[15px] tracking-[0.04em] transition-all duration-300 whitespace-nowrap',
                        isActive
                          ? 'text-text'
                          : 'text-text-muted/80 hover:text-text'
                      )
                    }
                  >
                    {formatNavLabel(link.label)}
                  </NavLink>
                </span>
              ))}
            </nav>

            {/* Actions — refined icon cluster */}
            <div className="flex items-center justify-end gap-0.5 sm:gap-1">
              <div className="hidden lg:block w-px h-5 bg-outline/40 mr-3" />

              <button
                onClick={toggleSearch}
                aria-label="Search"
                className="p-2.5 text-text-muted hover:text-text transition-colors duration-300"
              >
                <HiOutlineSearch className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>

              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative hidden sm:flex p-2.5 text-text-muted hover:text-text transition-colors duration-300"
              >
                <HiOutlineHeart className="w-[18px] h-[18px] stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-text text-[9px] font-semibold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/account"
                aria-label="Account"
                className="hidden md:flex p-2.5 text-text-muted hover:text-text transition-colors duration-300"
              >
                <HiOutlineUser className="w-[18px] h-[18px] stroke-[1.5]" />
              </Link>

              <button
                onClick={toggleCart}
                aria-label="Cart"
                className="relative p-2.5 text-text-muted hover:text-text transition-colors duration-300"
              >
                <HiOutlineShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-ivory text-[9px] font-semibold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="lg:hidden p-2.5 ml-1 text-text hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineMenu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-text/30 backdrop-blur-md z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.aside
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[72px] left-0 right-0 z-50 lg:hidden bg-ivory/98 backdrop-blur-xl border-b border-outline/25 shadow-xl"
            >
              <nav className="container-kn py-8 flex flex-col items-center gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.href}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        cn(
                          'block py-3 font-heading text-2xl tracking-wide transition-colors',
                          isActive ? 'text-text' : 'text-text-muted hover:text-primary'
                        )
                      }
                    >
                      {formatNavLabel(link.label)}
                    </NavLink>
                  </motion.div>
                ))}

                <div className="w-12 h-px bg-outline/40 my-4" />

                <div className="flex items-center gap-8">
                  <button onClick={() => { toggleSearch(); closeMobileMenu(); }} className="text-text-muted hover:text-text transition-colors">
                    <HiOutlineSearch className="w-5 h-5" />
                  </button>
                  <Link to="/wishlist" onClick={closeMobileMenu} className="text-text-muted hover:text-text transition-colors">
                    <HiOutlineHeart className="w-5 h-5" />
                  </Link>
                  <Link to="/account" onClick={closeMobileMenu} className="text-text-muted hover:text-text transition-colors">
                    <HiOutlineUser className="w-5 h-5" />
                  </Link>
                </div>

                <p className="mt-6 text-[10px] tracking-[0.25em] uppercase text-text-muted/70">
                  {BRAND.tagline}
                </p>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);
