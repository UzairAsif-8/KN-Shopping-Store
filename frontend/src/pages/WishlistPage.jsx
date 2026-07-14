import { memo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import ProductGrid from '../components/products/ProductGrid';
import Logo from '../components/common/Logo';
import Button from '../components/ui/Button';
import { useWishlist, useSiteContent } from '../context';

const WishlistPage = () => {
  const { items } = useWishlist();
  const { getImage } = useSiteContent();

  return (
    <div>
      <PageHero
        image={getImage('placeholders.wishlist')}
        eyebrow="Saved Favorites"
        title="Your Wishlist"
        subtitle={items.length ? `${items.length} item${items.length > 1 ? 's' : ''} saved` : 'Products you love, all in one place.'}
      />
      <section className="container-kn py-16 md:py-24">
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <div className="text-center max-w-md mx-auto space-y-6 py-12">
            <Logo variant="auth" />
            <p className="text-text-muted">Your wishlist is empty. Explore our collection and save your favorites.</p>
            <Button variant="primary" as={Link} to="/shop">Browse Products</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default memo(WishlistPage);
