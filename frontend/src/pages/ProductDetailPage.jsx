import { memo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import LazyImage from '../components/ui/LazyImage';
import ProductGrid from '../components/products/ProductGrid';
import { getProductBySlug, BEST_SELLERS } from '../constants';
import { formatPrice } from '../utils';
import { useCart, useWishlist, useUI } from '../context';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, openCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showToast } = useUI();

  if (!product) return <Navigate to="/shop" replace />;

  const inWishlist = isInWishlist(product.id);
  const related = BEST_SELLERS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product);
    showToast(`${product.name} added to cart`);
    openCart();
  };

  return (
    <div className="pt-28 md:pt-36">
      <section className="container-kn pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="aspect-square rounded-lg overflow-hidden mb-4"
              style={{ backgroundColor: product.bgColor || '#F0EDE9' }}
            >
              <LazyImage
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-contain p-8"
                aspectRatio=""
                wrapperClassName="h-full"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-secondary' : 'border-transparent'
                  }`}
                >
                  <LazyImage src={img} alt="" aspectRatio="" wrapperClassName="h-full" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 lg:py-8"
          >
            <div>
              {product.isBestSeller && <span className="label-caps text-accent">Bestseller</span>}
              {product.isNew && !product.isBestSeller && <span className="label-caps text-accent">New</span>}
              <h1 className="display-lg text-text mt-2">{product.name}</h1>
              <p className="body-lg text-text-muted mt-2">{product.subtitle}</p>
              <p className="text-sm text-text-muted mt-1">{product.brand}</p>
            </div>
            <p className="text-2xl font-medium">{formatPrice(product.price)}</p>
            <p className="body-lg text-text-muted">{product.description}</p>
            <p className="text-sm text-text-muted">Size: {product.size}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" onClick={handleAddToCart} className="flex-1">
                Add to Bag
              </Button>
              <button
                onClick={() => toggleItem(product)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 border border-outline rounded-sm hover:border-secondary transition-colors"
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {inWishlist ? <HiHeart className="w-5 h-5 text-primary" /> : <HiOutlineHeart className="w-5 h-5" />}
                <span className="text-sm font-medium tracking-wider uppercase">Wishlist</span>
              </button>
            </div>

            <div className="pt-6 border-t border-outline/30">
              <h3 className="label-caps text-text mb-3">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="px-4 py-2 bg-supporting rounded-full text-sm text-text">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-supporting section-gap">
        <div className="container-kn">
          <div className="text-center mb-16">
            <span className="label-caps text-text-muted">Why You&apos;ll Love It</span>
            <h2 className="headline-xl mt-2">The {product.name.split(' ')[0]} Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {product.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center space-y-3"
              >
                <span className="font-heading text-5xl text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-heading text-2xl">{benefit.title}</h3>
                <p className="text-text-muted">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative my-16 md:my-24">
        <LazyImage
          src={product.editorialImage}
          alt={`${product.name} editorial`}
          className="object-cover max-h-[70vh]"
          aspectRatio="aspect-[21/9]"
        />
      </section>

      <section className="container-kn section-gap">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="label-caps text-accent">Ingredient Spotlight</span>
          <h2 className="font-heading text-4xl md:text-5xl leading-tight text-text">
            {product.spotlight}
          </h2>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-kn section-gap">
          <h2 className="headline-lg mb-10">You May Also Like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
};

export default memo(ProductDetailPage);
