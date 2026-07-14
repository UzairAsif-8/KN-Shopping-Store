import { memo } from 'react';
import PageHero from '../components/common/PageHero';
import ProductGrid from '../components/products/ProductGrid';
import { NEW_ARRIVALS } from '../constants';
import { useSiteContent } from '../context';

const NewArrivalsPage = () => {
  const { getImage } = useSiteContent();

  return (
    <div>
      <PageHero
        image={getImage('hero.newArrivals')}
        eyebrow="Just Landed"
        title="New Arrivals"
        subtitle="Discover the latest additions to our curated collection of premium beauty."
      />
      <section className="container-kn py-16 md:py-24">
        <ProductGrid products={NEW_ARRIVALS} />
      </section>
    </div>
  );
};

export default memo(NewArrivalsPage);
