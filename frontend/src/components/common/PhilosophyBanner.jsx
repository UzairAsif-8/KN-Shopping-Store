import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';
import { useSiteContent } from '../../context';

const PhilosophyBanner = () => {
  const { getImage } = useSiteContent();

  return (
    <section className="relative my-16 md:my-24 overflow-hidden">
      <div className="relative h-[60vh] md:h-[70vh] min-h-[400px]">
        <LazyImage
          src={getImage('editorial.philosophy')}
          alt="Serene spa atmosphere with natural light"
          className="object-cover"
          aspectRatio=""
          wrapperClassName="absolute inset-0 h-full"
        />
        <div className="absolute inset-0 bg-text/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-ivory px-6 max-w-2xl space-y-6"
          >
            <h2 className="headline-xl md:text-5xl">
              Beauty begins with thoughtful rituals.
            </h2>
            <p className="body-lg text-ivory/80 italic font-heading">
              &ldquo;The way we care for ourselves reflects the way we see the world.&rdquo;
            </p>
            <Button variant="white-outline" as={Link} to="/about" className="mt-4">
              Our Philosophy
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(PhilosophyBanner);
