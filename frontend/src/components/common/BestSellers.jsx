import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../context';
import ProductCard from '../products/ProductCard';

const BestSellers = () => {
  const { bestSellers, loading } = useProducts();
  const items = bestSellers.slice(0, 8);

  return (
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

      {loading && <p className="text-text-muted">Loading products…</p>}

      {!loading && items.length === 0 && (
        <p className="text-text-muted">No featured products yet.</p>
      )}

      {!loading && items.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center sm:hidden">
        <Link to="/shop?filter=bestsellers" className="link-underline text-text">
          View All
        </Link>
      </div>
    </section>
  );
};

export default memo(BestSellers);
