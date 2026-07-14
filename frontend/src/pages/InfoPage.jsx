import { memo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import LazyImage from '../components/ui/LazyImage';
import Button from '../components/ui/Button';
import { useSiteContent } from '../context';

const INFO_PAGES = {
  'ritual-guide': {
    title: 'Ritual Guide',
    eyebrow: 'Your Guide',
    body: 'Build a beauty ritual that honors your skin. Morning: cleanse, tone, treat, moisturize, protect. Evening: double cleanse, treat, nourish.',
  },
  sustainability: {
    title: 'Sustainability',
    eyebrow: 'Our Commitment',
    body: 'We partner with brands committed to responsible sourcing, recyclable packaging, and cruelty-free formulations.',
  },
  shipping: {
    title: 'Shipping',
    eyebrow: 'Delivery',
    body: 'Complimentary shipping on orders over $75. Standard delivery 3–5 business days. Express options available at checkout.',
  },
  returns: {
    title: 'Returns',
    eyebrow: 'Hassle-Free',
    body: 'Unopened products may be returned within 30 days. We provide prepaid return labels for your convenience.',
  },
  faq: {
    title: 'FAQ',
    eyebrow: 'Help Center',
    body: 'Find answers about orders, products, ingredients, and account management. Still need help? Contact our team.',
  },
};

const InfoPage = ({ pageKey }) => {
  const { getInfoPageImages } = useSiteContent();
  const page = INFO_PAGES[pageKey];
  const images = getInfoPageImages(pageKey);

  if (!page || !images) return null;

  return (
    <div>
      <PageHero image={images.image} eyebrow={page.eyebrow} title={page.title} />
      <section className="container-kn py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {images.sideImage && (
            <LazyImage src={images.sideImage} alt={page.title} className="rounded-lg" aspectRatio="aspect-[4/3]" />
          )}
          <div className="space-y-6">
            <p className="body-lg text-text-muted">{page.body}</p>
            <Button variant="outline" as={Link} to="/contact">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(InfoPage);
