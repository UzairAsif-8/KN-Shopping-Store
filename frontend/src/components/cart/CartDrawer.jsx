import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context';
import { formatPrice } from '../../utils';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';
import Logo from '../common/Logo';

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-text/30 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-outline/30">
              <div className="flex items-center gap-3">
                <Logo variant="sm" link={false} />
                <h2 className="font-heading text-xl">Your Bag</h2>
              </div>
              <button onClick={closeCart} aria-label="Close cart">
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-6">
                  <Logo variant="auth" link={false} />
                  <p className="text-text-muted">Your bag is empty</p>
                  <Button variant="outline" onClick={closeCart} as={Link} to="/shop">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-supporting shrink-0">
                        <LazyImage
                          src={item.image}
                          alt={item.name}
                          aspectRatio=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg truncate">{item.name}</h3>
                        <p className="text-sm text-text-muted">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-outline rounded-sm"
                            aria-label="Decrease quantity"
                          >
                            <HiOutlineMinus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-outline rounded-sm"
                            aria-label="Increase quantity"
                          >
                            <HiOutlinePlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-text-muted hover:text-text self-start"
                        aria-label="Remove item"
                      >
                        <HiOutlineX className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-outline/30 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <Button variant="primary" className="w-full" as={Link} to="/checkout" onClick={closeCart}>
                  Checkout
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(CartDrawer);
