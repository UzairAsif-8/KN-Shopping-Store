import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import LazyImage from '../ui/LazyImage';

const CategoryCard = ({ category, index = 0, featured = false }) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    className={featured ? 'md:row-span-2' : ''}
  >
    <Link
      to={category.href}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-supporting/50 border border-outline/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(42,38,36,0.15)]"
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'min-h-[360px] lg:min-h-[520px]' : 'aspect-[4/5]'}`}>
        <LazyImage
          src={category.image}
          alt={category.label}
          className="object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
          aspectRatio="h-full w-full"
          wrapperClassName="absolute inset-0"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Index badge */}
        <span className="absolute top-5 left-5 w-10 h-10 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center font-heading text-sm text-text border border-outline/20">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Accent line */}
        <div
          className="absolute top-0 left-0 w-full h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: category.accent }}
        />
      </div>

      {/* Content panel — glass style */}
      <div className="relative p-5 md:p-6 bg-ivory/80 backdrop-blur-md border-t border-outline/10">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <span className="label-caps text-text-muted text-[10px] tracking-[0.12em]">
              {category.eyebrow}
            </span>
            <h3 className="font-heading text-2xl md:text-3xl text-text group-hover:text-accent transition-colors duration-300">
              {category.label}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed line-clamp-2 md:line-clamp-1">
              {category.description}
            </p>
          </div>

          {/* Arrow CTA */}
          <span className="shrink-0 w-11 h-11 rounded-full bg-secondary text-ivory flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
            <HiArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-outline/15 flex items-center justify-between">
          <span className="text-xs text-text-muted tracking-wide">{category.count}</span>
          <span className="text-xs font-medium tracking-widest uppercase text-text opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Explore
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

export default memo(CategoryCard);
