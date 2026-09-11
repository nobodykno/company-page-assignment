


import env from '@/config/env';
import { ROUTES } from '@/constants/routes';
import { IBlogDetailProps } from '@/props/blog-detail-props';;
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/footer-view';

/**
 * 
 * @param blogs  accept the data from the page to render the view
 * @returns the blog detail page view
 */

export default function BlogDetailView(blog: IBlogDetailProps ) {

  return (
    <main  aria-labelledby="blog-title" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Blog */}
      <article aria-labelledby="blog-title">
        {/* Hero */}
        <section aria-labelledby="blog-title"  className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <Link
              href={`${ROUTES.BLOG}`}
              className="text-[var(--font-size-sm)] font-medium text-[var(--color-primary)] hover:underline"
            >
              ← Back to blogs
            </Link>

            <p id="blog-published-date" className="mt-8 text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
              {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>

            <h1 id="blog-title" className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              {blog.title}
            </h1>

            <p id="blog-author" className="mt-5 text-[var(--font-size-md)] font-medium text-[var(--color-primary)]">
              By {blog.author}
            </p>
          </div>
        </section>

        {/* Featured Image */}
        <section  className="mx-auto max-w-6xl px-6 py-12">
          <div className="relative overflow-hidden rounded-[var(--border-radius)] h-[300px] md:h-[500px]">
            <Image
              src={`/api/uploads/${blog.image.url.replace('/uploads/', '')}`}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Content */}
        <section  aria-labelledby="blog-content-title" className="mx-auto max-w-4xl px-6 pb-20">
          <div id="blog-content-title" className="text-[var(--font-size-md)] leading-8 text-[var(--color-text-secondary)]">
            {blog.content}
          </div>
        </section>
      </article>

      {/* Footer */}
      <Footer />
    </main>
  );
}








