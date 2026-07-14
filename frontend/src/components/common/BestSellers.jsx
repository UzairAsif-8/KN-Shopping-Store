import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BEST_SELLERS } from '../../constants';
import ProductCard from '../products/ProductCard';

const BestSellers = () => (
  <section className="container-kn section-gap">
    <div className="flex items-end justify-between mb-12 md:mb-16">
      <div>
        <span className="label-caps text-text-muted block mb-2">Trusted Favorites</span>
        <h2 className="headline-xl text-text">Best Sellers</h2>
      </div>
      <Link to="/shop?filter=bestsellers" className="link-underline text-text hidden sm:inline-block">
        View All
      </Link>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {BEST_SELLERS.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
    <div className="mt-8 text-center sm:hidden">
      <Link to="/shop?filter=bestsellers" className="link-underline text-text">
        View All
      </Link>
    </div>
  </section>
);

export default memo(BestSellers);
