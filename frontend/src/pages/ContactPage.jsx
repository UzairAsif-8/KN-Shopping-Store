import { memo } from 'react';
import PageHero from '../components/common/PageHero';
import LazyImage from '../components/ui/LazyImage';
import Button from '../components/ui/Button';
import { useSiteContent } from '../context';

const ContactPage = () => {
  const { getImage } = useSiteContent();

  return (
    <div>
      <PageHero
        image={getImage('hero.contact')}
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Our team responds within 24 hours."
      />
      <section className="container-kn py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <LazyImage
            src={getImage('editorial.spa')}
            alt="Contact KN Store"
            className="rounded-lg"
            aspectRatio="aspect-[4/3]"
          />
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label-caps text-text-muted block mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="label-caps text-text-muted block mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="label-caps text-text-muted block mb-2">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary resize-none" />
            </div>
            <Button variant="primary" type="submit">Send Message</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default memo(ContactPage);
