import { memo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import LazyImage from '../components/ui/LazyImage';
import Button from '../components/ui/Button';
import { useSiteContent } from '../context';

const AboutPage = () => {
  const { getImage } = useSiteContent();

  return (
    <div>
      <PageHero
        image={getImage('hero.about')}
        eyebrow="Our Story"
        title="Beauty With Intention"
      />
      <section className="container-kn py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <LazyImage
            src={getImage('editorial.team')}
            alt="KN Store philosophy"
            className="rounded-lg"
            aspectRatio="aspect-[4/5]"
          />
          <div className="space-y-6">
            <h2 className="headline-xl">Founded on Ritual</h2>
            <p className="body-lg text-text-muted">
              KN Store was born from a simple belief: that beauty is not vanity, but an act of self-care.
              We curate only what we would use ourselves — products that honor your skin, your time, and your ritual.
            </p>
            <p className="body-lg text-text-muted">
              Every product in our collection is chosen for its efficacy, its ingredients, and its ability
              to transform a routine into a moment of calm in a busy world.
            </p>
            <Button variant="outline" as={Link} to="/collections">Explore Collections</Button>
          </div>
        </div>
      </section>
      <section className="relative my-8">
        <LazyImage
          src={getImage('editorial.philosophy')}
          alt="Our philosophy"
          className="object-cover max-h-[50vh]"
          aspectRatio="aspect-[21/9]"
        />
      </section>
    </div>
  );
};

export default memo(AboutPage);
