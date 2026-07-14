import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import CategoryCard from '../products/CategoryCard';
import { useSiteContent } from '../../context';

const CategoryGrid = () => {
  const { categories } = useSiteContent();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-supporting/30 to-transparent pointer-events-none" />

      <div className="container-kn relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="flex items-center gap-3">
              <span className="label-caps text-accent">Shop by Category</span>
              <span className="h-px flex-1 max-w-[60px] bg-accent/50" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text leading-[1.05] tracking-tight">
              Find Your Ritual
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-start justify-between gap-6"
          >
            <p className="body-lg text-text-muted max-w-sm leading-relaxed">
              Three curated worlds of beauty — each designed to elevate your everyday into something intentional.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-text hover:text-accent transition-colors"
            >
              View All Products
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6 auto-rows-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={
                category.featured
                  ? 'md:col-span-1 lg:col-span-5 lg:row-span-2'
                  : index === 1
                    ? 'md:col-span-1 lg:col-span-7'
                    : 'md:col-span-2 lg:col-span-7'
              }
            >
              <CategoryCard
                category={category}
                index={index}
                featured={category.featured}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-12 md:mt-16"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.href}
              className="px-5 py-2.5 rounded-full text-sm font-medium tracking-wide border border-outline/30 bg-ivory/60 backdrop-blur-sm text-text hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              {cat.label}
            </Link>
          ))}
          <Link
            to="/collections"
            className="px-5 py-2.5 rounded-full text-sm font-medium tracking-wide bg-secondary text-ivory hover:bg-accent transition-colors duration-300"
          >
            All Collections
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(CategoryGrid);
