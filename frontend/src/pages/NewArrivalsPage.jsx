import { memo } from 'react';
import PageHero from '../components/common/PageHero';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts, useSiteContent } from '../context';

const NewArrivalsPage = () => {
  const { getImage } = useSiteContent();
  const { newArrivals, loading, error } = useProducts();

  return (
    <div>
      <PageHero
        image={getImage('hero.newArrivals')}
        eyebrow="Just Landed"
        title="New Arrivals"
        subtitle="Discover the latest additions to our curated collection of premium beauty."
      />
      <section className="container-kn py-10 md:py-14">
        {loading && <p className="text-text-muted py-8">Loading products…</p>}
        {error && !loading && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-sm">
            {error}
          </p>
        )}
        {!loading && !error && newArrivals.length === 0 && (
          <p className="text-text-muted py-8">No new arrivals yet.</p>
        )}
        {!loading && newArrivals.length > 0 && <ProductGrid products={newArrivals} />}
      </section>
    </div>
  );
};

export default memo(NewArrivalsPage);
