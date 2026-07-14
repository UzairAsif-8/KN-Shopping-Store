import { memo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import LazyImage from '../components/ui/LazyImage';
import { useSiteContent } from '../context';

const JournalArticlePage = () => {
  const { slug } = useParams();
  const { getJournalBySlug, journalPosts } = useSiteContent();
  const post = getJournalBySlug(slug);

  if (!post) return <Navigate to="/journal" replace />;

  const related = journalPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div>
      <PageHero
        image={post.heroImage || post.image}
        eyebrow={post.category}
        title={post.title}
        subtitle={`${post.date} · ${post.readTime}`}
      />
      <article className="container-kn py-16 md:py-24 max-w-3xl">
        <LazyImage
          src={post.image}
          alt={post.title}
          className="rounded-lg mb-12"
          aspectRatio="aspect-[16/9]"
        />
        <p className="body-lg text-text-muted leading-relaxed">{post.body}</p>
        <p className="body-lg text-text-muted leading-relaxed mt-6">{post.excerpt}</p>
      </article>
      {related.length > 0 && (
        <section className="bg-supporting py-16 md:py-24">
          <div className="container-kn">
            <h2 className="headline-lg mb-10">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link key={item.id} to={item.href} className="group block">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg group-hover:scale-[1.02] transition-transform duration-700"
                    aspectRatio="aspect-[4/3]"
                  />
                  <h3 className="font-heading text-xl mt-4 group-hover:text-accent transition-colors">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default memo(JournalArticlePage);
