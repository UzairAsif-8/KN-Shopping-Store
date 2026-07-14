import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../components/ui/LazyImage';
import { useSiteContent } from '../context';

const JournalPage = () => {
  const { getImage, journalPosts } = useSiteContent();
  const featured = journalPosts[0];

  return (
    <div>
      <section className="relative pt-20">
        <div className="relative h-[35vh] md:h-[45vh] min-h-[240px]">
          <LazyImage
            src={getImage('editorial.spa')}
            alt="Beauty and wellness editorial"
            className="object-cover"
            aspectRatio=""
            wrapperClassName="absolute inset-0 h-full"
          />
          <div className="absolute inset-0 bg-text/35" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-kn pb-10 md:pb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl space-y-3 text-ivory"
              >
                <span className="label-caps text-ivory/80">The KN Journal</span>
                <h1 className="display-lg">Beauty, Ritual &amp; Inspiration</h1>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-kn py-12 md:py-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="body-lg text-text-muted max-w-2xl"
        >
          Stories, guides, and insights from the world of premium beauty —
          curated for the modern woman who values intention in every ritual.
        </motion.p>
      </section>

      {featured && (
        <section className="container-kn mb-16 md:mb-24">
          <Link to={featured.href} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <LazyImage
              src={featured.image}
              alt={featured.title}
              className="rounded-lg group-hover:scale-[1.02] transition-transform duration-700"
              aspectRatio="aspect-[4/3] lg:aspect-[5/4]"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 py-4"
            >
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span className="label-caps">{featured.category}</span>
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="headline-xl group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              <p className="body-lg text-text-muted">{featured.excerpt}</p>
              <span className="link-underline text-text inline-block mt-4">Read Article</span>
            </motion.div>
          </Link>
        </section>
      )}

      <section className="container-kn section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {journalPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link to={post.href} className="group block">
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="rounded-lg group-hover:scale-[1.02] transition-transform duration-700"
                  aspectRatio="aspect-[4/3]"
                />
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="label-caps">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-supporting section-gap">
        <div className="container-kn max-w-3xl mx-auto text-center space-y-4">
          <span className="label-caps text-accent">Editorial</span>
          <blockquote className="font-heading text-3xl md:text-4xl leading-snug text-text italic">
            &ldquo;True beauty is not about perfection — it&apos;s about the ritual of caring for yourself with intention.&rdquo;
          </blockquote>
          <p className="text-sm text-text-muted">— KN Store Editorial Team</p>
        </div>
      </section>
    </div>
  );
};

export default memo(JournalPage);
