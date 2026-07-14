import { memo } from 'react';
import ProductCard from '../products/ProductCard';

const ProductGrid = ({ products, columns = 'grid-cols-2 lg:grid-cols-4' }) => {
  if (!products.length) {
    return (
      <p className="text-center text-text-muted py-16">No products found.</p>
    );
  }

  return (
    <div className={`grid ${columns} gap-6 md:gap-8`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default memo(ProductGrid);
