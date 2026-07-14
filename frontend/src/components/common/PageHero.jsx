import { memo } from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../ui/LazyImage';

const PageHero = ({ image, title, eyebrow, subtitle, overlay = true }) => (
  <section className="relative pt-20">
    <div className="relative h-[35vh] md:h-[45vh] min-h-[240px]">
      <LazyImage
        src={image}
        alt={title}
        className="object-cover"
        aspectRatio=""
        wrapperClassName="absolute inset-0 h-full"
      />
      {overlay && <div className="absolute inset-0 bg-text/35" />}
      <div className="absolute inset-0 flex items-end">
        <div className="container-kn pb-10 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`space-y-2 max-w-2xl ${overlay ? 'text-ivory' : 'text-text'}`}
          >
            {eyebrow && (
              <span className={`label-caps ${overlay ? 'text-ivory/80' : 'text-text-muted'}`}>
                {eyebrow}
              </span>
            )}
            <h1 className="display-lg">{title}</h1>
            {subtitle && (
              <p className={`body-lg max-w-xl ${overlay ? 'text-ivory/85' : 'text-text-muted'}`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default memo(PageHero);
