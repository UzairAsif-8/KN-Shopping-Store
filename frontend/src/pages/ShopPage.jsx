import { memo, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import ProductGrid from '../components/products/ProductGrid';
import CategoryCard from '../components/products/CategoryCard';
import { ALL_PRODUCTS, BEST_SELLERS } from '../constants';
import { useSiteContent } from '../context';

const ShopPage = () => {
  const { getImage, categories } = useSiteContent();
  const [params] = useSearchParams();
  const category = params.get('category');
  const filter = params.get('filter');

  const products = useMemo(() => {
    if (filter === 'bestsellers') return BEST_SELLERS;
    if (category) return ALL_PRODUCTS.filter((p) => p.category === category);
    return ALL_PRODUCTS;
  }, [category, filter]);

  const title = filter === 'bestsellers'
    ? 'Best Sellers'
    : category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : 'Shop All';

  return (
    <div>
      <PageHero
        image={getImage('hero.shop')}
        eyebrow="KN Store"
        title={title}
        subtitle="Browse our full collection of premium beauty products, curated with intention."
      />

      {!category && !filter && (
        <section className="container-kn py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="container-kn pb-20 md:pb-28">
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default memo(ShopPage);
