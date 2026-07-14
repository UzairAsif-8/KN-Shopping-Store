import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../components/ui/LazyImage';
import ProductCard from '../components/products/ProductCard';
import { BEST_SELLERS, COLLECTIONS } from '../constants';
import { useSiteContent } from '../context';

const CollectionsPage = () => {
  const { getImage } = useSiteContent();

  return (
    <div className="pt-28 md:pt-36">
      <section className="container-kn pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4"
        >
          <span className="label-caps text-text-muted">Curated Edits</span>
          <h1 className="display-lg text-text">Collections</h1>
          <p className="body-lg text-text-muted">
            Explore our thoughtfully assembled collections — each one a journey through
            premium beauty, designed to simplify your ritual and elevate your everyday.
          </p>
        </motion.div>
      </section>

      <section className="relative mb-16 md:mb-24">
        <div className="relative h-[50vh] md:h-[60vh] min-h-[350px]">
          <LazyImage
            src={getImage('collections.featured')}
            alt="Skincare Essentials Collection"
            className="object-cover"
            aspectRatio=""
            wrapperClassName="absolute inset-0 h-full"
          />
          <div className="absolute inset-0 bg-text/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-kn pb-12 md:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-ivory max-w-lg space-y-3"
              >
                <span className="label-caps text-ivory/80">Featured Collection</span>
                <h2 className="headline-xl">Skincare Essentials</h2>
                <Link to="/collections/skincare-essentials" className="link-underline text-ivory inline-block mt-2">
                  Explore the Edit
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-kn section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {COLLECTIONS.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link to={collection.href} className="group block">
                <LazyImage
                  src={getImage(
                    collection.id === 'skincare-essentials'
                      ? 'collections.skincareEdit'
                      : 'collections.makeupEdit'
                  )}
                  alt={collection.title}
                  className="rounded-lg group-hover:scale-[1.02] transition-transform duration-700"
                  aspectRatio="aspect-[4/5]"
                />
                <div className="mt-6 space-y-2">
                  <span className="label-caps text-text-muted">{collection.eyebrow}</span>
                  <h3 className="font-heading text-2xl md:text-3xl">{collection.title}</h3>
                  <span className="link-underline text-text inline-block mt-2">{collection.cta}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-kn section-gap">
        <div className="text-center mb-12">
          <span className="label-caps text-text-muted block mb-2">From Our Collections</span>
          <h2 className="headline-xl">Shop the Edit</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {BEST_SELLERS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default memo(CollectionsPage);
