import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../ui/LazyImage';

const EditorialBlock = ({ block, index = 0 }) => {
  const isImageLeft = block.imagePosition === 'left';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="container-kn"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${!isImageLeft ? 'lg:[direction:rtl]' : ''}`}>
        <div className={`${!isImageLeft ? 'lg:[direction:ltr]' : ''}`}>
          <LazyImage
            src={block.image}
            alt={block.title}
            className="rounded-lg"
            aspectRatio="aspect-[4/5] lg:aspect-[5/6]"
          />
        </div>
        <div className={`space-y-6 py-8 lg:py-16 ${!isImageLeft ? 'lg:[direction:ltr]' : ''}`}>
          <span className="label-caps text-text-muted">{block.eyebrow}</span>
          <h2 className="headline-xl text-text">{block.title}</h2>
          <p className="body-lg text-text-muted max-w-md">{block.description}</p>
          <Link to={block.href} className="link-underline text-text inline-block mt-4">
            {block.cta}
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default memo(EditorialBlock);
