import type { MetaFunction } from 'react-router';
import { Link, useParams } from 'react-router';

import PageHeader from '../components/PageHeader';
import ResponsiveImage from '../components/ResponsiveImage';
import CallToAction from '../components/CallToAction';
import { getPostBySlug, BLOG_POSTS_BY_DATE } from '../data/blog';
import { getServiceBySlug } from '../data/services';
import { SITE_ORIGIN } from '../data/site';
import { buildMeta } from '../lib/seo';
import { blogPostingSchema, breadcrumbSchema } from '../lib/schema';

/**
 * Articles live at the site root (e.g. /what-are-the-benefits-of-hair-smoothening)
 * rather than under /blog/, matching the URLs they occupied on the previous
 * WordPress site so the 301s are one-to-one.
 *
 * This is the lowest-priority route in the config, so it only ever matches
 * single-segment paths that no static route claimed.
 */

export const meta: MetaFunction = ({ params }) => {
  const post = getPostBySlug(params.postSlug ?? '');

  if (!post) {
    return buildMeta({
      title: 'Page not found',
      description: 'This page does not exist.',
      path: `/${params.postSlug ?? ''}`,
      noIndex: true,
    });
  }

  const imageUrl = `${SITE_ORIGIN}/img/${post.image}-960.jpg`;
  const trail = [
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/${post.slug}` },
  ];

  return buildMeta({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/${post.slug}`,
    image: imageUrl,
    type: 'article',
    extra: [
      { property: 'article:published_time', content: post.datePublished },
      { property: 'article:modified_time', content: post.dateModified },
      { 'script:ld+json': blogPostingSchema(post, imageUrl) },
      { 'script:ld+json': breadcrumbSchema(trail) },
    ],
  });
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage() {
  const { postSlug } = useParams();
  const post = getPostBySlug(postSlug ?? '');

  if (!post) {
    return (
      <div className="container mx-auto px-4 pb-24 pt-32 text-center">
        <h1 className="mb-4 font-display text-4xl text-primary">Page not found</h1>
        <p className="prose-body mb-8">
          That page has moved or never existed. Our guides are all listed on the blog.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/blog" className="btn btn-primary">
            Read the blog
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const trail = [
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/${post.slug}` },
  ];

  const others = BLOG_POSTS_BY_DATE.filter((p) => p.slug !== post.slug);
  const services = post.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHeader eyebrow="Blog" heading={post.title} trail={trail} />

      <article className="bg-white pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-sm text-gray">
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              {' · '}
              {post.readingMinutes} min read
              {' · '}
              {post.author}
            </p>

            <ResponsiveImage
              name={post.image}
              alt={post.imageAlt}
              widths={[480, 960]}
              sizes="(min-width: 768px) 768px, 92vw"
              width={960}
              height={545}
              className="mb-10 aspect-[16/9] w-full rounded-sm object-cover"
              priority
            />

            {post.sections.map((section, index) => (
              <section key={section.heading ?? index} className="mb-8">
                {section.heading && (
                  <h2 className="mb-4 font-display text-2xl text-primary md:text-3xl">
                    {section.heading}
                  </h2>
                )}
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="prose-body mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {services.length > 0 && (
              <aside className="mt-12 rounded-sm bg-background p-6">
                <h2 className="mb-3 font-display text-xl text-primary">Related services</h2>
                <ul className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link to={`/services/${service.slug}`} className="btn btn-outline">
                        {service.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-background py-14" aria-labelledby="more-reading">
          <div className="container mx-auto px-4">
            <h2 id="more-reading" className="section-title mb-8 text-center">
              More Guides
            </h2>
            <ul className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug} className="rounded-sm bg-white p-5 shadow-sm">
                  <h3 className="mb-1 font-display text-lg">
                    <Link to={`/${other.slug}`} className="text-primary hover:text-accent">
                      {other.title}
                    </Link>
                  </h3>
                  <p className="prose-body text-base">{other.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CallToAction />
    </>
  );
}
