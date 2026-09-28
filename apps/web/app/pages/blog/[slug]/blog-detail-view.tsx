
import { ROUTES } from '@/constants/routes';
import { IBlogDetailProps } from '@/props/blog-detail-props';
import Link from 'next/link';
import Image from 'next/image';

/**
 * @param blog Accepts blog data from the page to render the view
 * @returns The blog detail page view
 */
export default function BlogDetailView(blog: IBlogDetailProps) {
  return (
    <main aria-labelledby="blog-title" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Blog */}
      <article aria-labelledby="blog-title">
        {/* Hero */}
        <section aria-labelledby="blog-title" className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
            <Link
              href={ROUTES.BLOG}
              className="inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              ← Back to blogs
            </Link>

            <p
              id="blog-published-date"
              className="mt-6 text-sm text-[var(--color-text-secondary)] sm:mt-8"
            >
              {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>

            <h1 id="blog-title" className="mt-3 max-w-4xl text-3xl font-bold leading-tight sm:mt-4 sm:text-4xl md:text-5xl"
            >
              {blog.title}
            </h1>

            <p id="blog-author" className="mt-4 text-sm font-medium text-[var(--color-primary)] sm:mt-5 sm:text-base"
            >
              By {blog.author}
            </p>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--border-radius)] sm:aspect-[16/8]">
            <Image
              src={`/api/uploads/${blog.image.url.replace('/uploads/', '')}`}
              alt={blog.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
              className="object-cover"
            />
          </div>
        </section>

        {/* Content */}
        <section  aria-labelledby="blog-content-title" className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 sm:pb-16 md:pb-20"
        >
          <div id="blog-content-title" className="text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg sm:leading-8">
            {blog.content}
          </div>
        </section>
      </article>
    </main>
  );
}








