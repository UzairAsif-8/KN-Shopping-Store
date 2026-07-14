import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../ui/LazyImage';
import { formatPrice } from '../../utils';
import { useCart } from '../../context';
import { useUI } from '../../context';

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, openCart } = useCart();
  const { showToast } = useUI();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    showToast(`${product.name} added to cart`);
    openCart();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/products/${product.slug || product.id}`} className="block">
        <div
          className="relative aspect-square overflow-hidden rounded-lg mb-4"
          style={{ backgroundColor: product.bgColor || '#E8E4E0' }}
        >
          <LazyImage
            src={product.image}
            alt={product.name}
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
            aspectRatio=""
            wrapperClassName="h-full"
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-secondary text-ivory text-xs font-medium tracking-wider uppercase px-6 py-2.5 rounded-sm"
          >
            Add to Cart
          </button>
        </div>
        <div className="text-center md:text-left space-y-1">
          <h3 className="font-heading text-xl text-text">{product.name}</h3>
          <p className="text-sm text-text-muted">{product.subtitle}</p>
          <p className="text-sm font-medium text-text">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.article>
  );
};

export default memo(ProductCard);
