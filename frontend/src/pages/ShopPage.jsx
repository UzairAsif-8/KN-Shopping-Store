import { memo, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import ProductGrid from '../components/products/ProductGrid';
import CategoryCard from '../components/products/CategoryCard';
import { useProducts, useSiteContent } from '../context';

const ShopPage = () => {
  const { getImage, categories } = useSiteContent();
  const { products, bestSellers, loading, error, getByCategory, fetchProducts } = useProducts();
  const [params] = useSearchParams();
  const category = params.get('category');
  const filter = params.get('filter');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const list = useMemo(() => {
    if (filter === 'bestsellers') return bestSellers;
    if (category) return getByCategory(category);
    return products;
  }, [bestSellers, category, filter, getByCategory, products]);

  const title =
    filter === 'bestsellers'
      ? 'Best Sellers'
      : category
        ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
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
        <section className="container-kn py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </section>
      )}

      <section
        className={`container-kn pb-16 md:pb-20 ${
          category || filter ? 'pt-8 md:pt-10' : 'pt-2 md:pt-4'
        }`}
      >
        {loading && <p className="text-text-muted py-6">Loading products…</p>}
        {error && !loading && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-sm">
            {error}
          </p>
        )}
        {!loading && !error && list.length === 0 && (
          <p className="text-text-muted py-6">No products found.</p>
        )}
        {!loading && list.length > 0 && <ProductGrid products={list} />}
      </section>
    </div>
  );
};

export default memo(ShopPage);
