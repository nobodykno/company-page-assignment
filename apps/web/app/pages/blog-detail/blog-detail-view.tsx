

import env from '@/config/env';
import { IBlogDetailProps } from '@/props/blog-detail-props';;
import Link from 'next/link';

export default function BlogDetailView(blog: IBlogDetailProps ) {

  return (
    <main aria-labelledby="blog-title" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Blog */}
      <article aria-labelledby="blog-title">
        {/* Hero */}
        <section aria-labelledby="blog-title"  className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <Link
              href="/pages/blog"
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
          <div className="overflow-hidden rounded-[var(--border-radius)]">
            <img
              src= {`${env.imageUrl}`+blog.image.url}
              alt={blog.title}
              className="h-[300px] w-full object-cover md:h-[500px]"
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
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
            Digital Solutions — Building better digital experiences.
          </p>
        </div>
      </footer>
    </main>
  );
}






export const revalidate = 60;

