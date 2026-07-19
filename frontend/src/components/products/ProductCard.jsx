import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../ui/LazyImage';
import { formatPrice } from '../../utils';
import { useCart, useUI } from '../../context';

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, openCart } = useCart();
  const { showToast } = useUI();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast(`${product.name} added to cart`);
    openCart();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className="group flex flex-col h-full"
    >
      <Link to={`/products/${product.slug || product.id}`} className="block flex-1">
        <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 shadow-[0_8px_30px_-12px_rgba(42,38,36,0.18)] ring-1 ring-outline/15">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            aspectRatio=""
            wrapperClassName="h-full bg-supporting/30"
            width={480}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        <div className="space-y-1 text-center">
          <h3 className="font-heading text-lg sm:text-xl text-text leading-snug group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="text-sm text-text-muted line-clamp-1">{product.subtitle}</p>
          )}
          <p className="text-sm font-medium text-text pt-1">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 w-full inline-flex items-center justify-center rounded-full border border-secondary/80 bg-transparent px-5 py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase text-secondary transition-all duration-300 hover:bg-secondary hover:text-ivory"
      >
        Add to Cart
      </button>
    </motion.article>
  );
};

export default memo(ProductCard);
