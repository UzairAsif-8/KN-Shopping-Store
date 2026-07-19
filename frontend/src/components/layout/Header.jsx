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

const NAV_HEIGHT = 'h-[68px] md:h-[72px]';
const NAV_OFFSET = 'top-[68px] md:top-[72px]';

const formatNavLabel = (label) =>
  label.charAt(0) + label.slice(1).toLowerCase();

const iconBtn =
  'inline-flex h-9 w-9 items-center justify-center text-text-muted hover:text-text transition-colors duration-300 shrink-0';

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
            ? 'bg-ivory/94 backdrop-blur-xl border-b border-outline/30 shadow-[0_8px_32px_rgba(42,38,36,0.06)]'
            : 'bg-background/75 backdrop-blur-lg border-b border-transparent'
        )}
      >
        <div className="container-kn h-full">
          {/* True center logo: equal side rails + auto center */}
          <div className="relative grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4">

            {/* Left — menu / nav links */}
            <div className="flex h-full min-w-0 items-center justify-start">
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className={cn(iconBtn, 'lg:hidden -ml-1')}
              >
                {mobileMenuOpen ? (
                  <HiOutlineX className="h-5 w-5" />
                ) : (
                  <HiOutlineMenu className="h-5 w-5" />
                )}
              </button>

              <nav
                aria-label="Primary"
                className="hidden h-full min-w-0 items-center lg:flex"
              >
                <ul className="flex h-full items-center gap-x-3 xl:gap-x-5 2xl:gap-x-6">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href} className="flex h-full items-center">
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          cn(
                            'flex h-full items-center font-heading text-[12px] xl:text-[13px] 2xl:text-[14px] tracking-[0.06em] whitespace-nowrap transition-colors duration-300',
                            isActive
                              ? 'text-text'
                              : 'text-text-muted/80 hover:text-text'
                          )
                        }
                      >
                        {formatNavLabel(link.label)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Center — logo */}
            <div className="flex h-full items-center justify-center px-1">
              <Logo variant="navbar" onClick={closeMobileMenu} />
            </div>

            {/* Right — actions (mirrored rail) */}
            <div className="flex h-full min-w-0 items-center justify-end">
              <div className="flex h-full items-center gap-0.5 sm:gap-1">
                <button
                  type="button"
                  onClick={toggleSearch}
                  aria-label="Search"
                  className={iconBtn}
                >
                  <HiOutlineSearch className="h-[18px] w-[18px] stroke-[1.5]" />
                </button>

                <Link
                  to="/wishlist"
                  aria-label="Wishlist"
                  className={cn(iconBtn, 'relative')}
                >
                  <HiOutlineHeart className="h-[18px] w-[18px] stroke-[1.5]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-semibold text-text">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/account"
                  aria-label="Account"
                  className={cn(iconBtn, 'hidden sm:inline-flex')}
                >
                  <HiOutlineUser className="h-[18px] w-[18px] stroke-[1.5]" />
                </Link>

                <button
                  type="button"
                  onClick={toggleCart}
                  aria-label="Cart"
                  className={cn(iconBtn, 'relative')}
                >
                  <HiOutlineShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-0.5 text-[9px] font-semibold text-ivory">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-text/30 backdrop-blur-md lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.aside
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'fixed left-0 right-0 z-50 border-b border-outline/25 bg-ivory/98 shadow-xl backdrop-blur-xl lg:hidden',
                NAV_OFFSET
              )}
            >
              <nav className="container-kn flex flex-col items-center gap-1 py-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="w-full max-w-xs"
                  >
                    <NavLink
                      to={link.href}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        cn(
                          'block py-3 text-center font-heading text-2xl tracking-wide transition-colors',
                          isActive ? 'text-text' : 'text-text-muted hover:text-primary'
                        )
                      }
                    >
                      {formatNavLabel(link.label)}
                    </NavLink>
                  </motion.div>
                ))}

                <div className="my-4 h-px w-12 bg-outline/40" />

                <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => { toggleSearch(); closeMobileMenu(); }}
                    aria-label="Search"
                    className={iconBtn}
                  >
                    <HiOutlineSearch className="h-5 w-5" />
                  </button>
                  <Link to="/wishlist" onClick={closeMobileMenu} aria-label="Wishlist" className={iconBtn}>
                    <HiOutlineHeart className="h-5 w-5" />
                  </Link>
                  <Link to="/account" onClick={closeMobileMenu} aria-label="Account" className={iconBtn}>
                    <HiOutlineUser className="h-5 w-5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => { toggleCart(); closeMobileMenu(); }}
                    aria-label="Cart"
                    className={iconBtn}
                  >
                    <HiOutlineShoppingBag className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-4 text-center text-[9px] tracking-[0.12em] text-text-muted/70">
                  {BRAND.fullName}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-text-muted/70">
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
