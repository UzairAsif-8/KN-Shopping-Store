import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';
import { BRAND } from '../../constants';

// Hardcoded hero section images - static assets from public folder
const HERO_IMAGES = {
  main: '/hero_main.png',      // Large left column image (3/4 or 4/5 aspect ratio)
  accent: '/hero_accent.png',  // Top right square image (square aspect ratio)
  detail: '/hero_detail.png',  // Bottom right image (4/3 aspect ratio)
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-supporting/40 pointer-events-none" />
      <div className="absolute top-32 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-kn relative pt-[88px] md:pt-[96px] pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <span className="label-caps text-accent tracking-[0.15em]">
                {BRAND.tagline}
              </span>
              <div className="w-12 h-px bg-secondary/30" />
              <h1 className="display-lg text-text">
                Beauty Curated With Intention.
              </h1>
            </div>

            <p className="body-lg text-text-muted max-w-md leading-relaxed">
              Discover a thoughtfully curated collection of premium cosmetics and skincare —
              where every product is chosen to elevate your daily ritual and celebrate your natural radiance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button variant="primary" as={Link} to="/collections">
                Explore Collection
              </Button>
              <Button variant="outline" as={Link} to="/new-arrivals">
                Shop New Arrivals
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-outline/30">
              {['Clean Ingredients', 'Cruelty Free', 'Free Shipping'].map((item) => (
                <span key={item} className="text-xs text-text-muted tracking-wide uppercase">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="lg:col-span-7 relative"
          >
            <div className="grid grid-cols-12 gap-4 md:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="col-span-7 row-span-2"
              >
                <LazyImage
                  src={HERO_IMAGES.main}
                  alt="White luxury skincare bottles in warm sunlight"
                  className="rounded-xl shadow-sm"
                  aspectRatio="aspect-[3/4] md:aspect-[4/5]"
                  width={720}
                  sizes="(max-width: 1024px) 60vw, 35vw"
                />
              </motion.div>

              <div className="col-span-5 flex flex-col gap-4 md:gap-5">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                >
                  <LazyImage
                    src={HERO_IMAGES.accent}
                    alt="Premium serum and cream on marble"
                    className="rounded-xl shadow-sm"
                    aspectRatio="aspect-square"
                    width={480}
                    sizes="(max-width: 1024px) 40vw, 20vw"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="relative"
                >
                  <LazyImage
                    src={HERO_IMAGES.detail}
                    alt="Curated beauty collection flat lay"
                    className="rounded-xl shadow-sm"
                    aspectRatio="aspect-[4/3]"
                    width={480}
                    sizes="(max-width: 1024px) 40vw, 20vw"
                  />
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-ivory border border-outline/30 rounded-lg px-4 py-3 shadow-sm hidden sm:block">
                    <p className="label-caps text-accent text-[10px]">New Edit</p>
                    <p className="font-heading text-lg text-text mt-0.5">Spring Ritual</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
