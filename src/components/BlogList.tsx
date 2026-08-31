import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';

import { BLOG_POSTS_BY_DATE } from '../data/blog';
import ResponsiveImage from './ResponsiveImage';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogList({
  headingLevel = 'h2',
  showHeading = true,
  limit,
}: {
  headingLevel?: 'h1' | 'h2';
  showHeading?: boolean;
  limit?: number;
}) {
  const Heading = headingLevel;
  const posts = limit ? BLOG_POSTS_BY_DATE.slice(0, limit) : BLOG_POSTS_BY_DATE;

  return (
    <section className="bg-background py-16" aria-labelledby="blog-heading">
      <div className="container mx-auto px-4">
        {showHeading && (
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              Advice from our stylists
            </p>
            <Heading id="blog-heading" className="section-title">
              Hair &amp; Beauty Guides
            </Heading>
          </div>
        )}

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-lg">
                <Link to={`/${post.slug}`} tabIndex={-1} aria-hidden="true">
                  <ResponsiveImage
                    name={post.image}
                    alt={post.imageAlt}
                    widths={[480, 960]}
                    sizes="(min-width: 768px) 30vw, 92vw"
                    width={960}
                    height={545}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-xs uppercase tracking-widest text-gray">
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                    {' · '}
                    {post.readingMinutes} min read
                  </p>

                  <h3 className="mb-3 font-display text-xl leading-snug text-primary">
                    <Link to={`/${post.slug}`} className="hover:text-accent">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="prose-body mb-4 flex-1 text-base">{post.excerpt}</p>

                  <Link
                    to={`/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary hover:text-accent"
                  >
                    Read more
                    <FaArrowRight aria-hidden="true" className="text-xs" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
