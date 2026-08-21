'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import ErrorView from '@/component/error-view';
import services from '@/services';
import { IBlogProps } from '@/props/blog-props';

export default function BlogView({ blogs }: { blogs: IBlogProps[] }) {

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: services.blogService.getBlog,
    initialData: blogs,
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorView error={ error instanceof Error
        ? error.message
        : 'Failed to load dashboard section' } />

    );
    
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-[var(--font-size-title)] font-bold">
            Our Blog
          </h1>

          <p className="mt-3 max-w-2xl text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
            Insights, ideas, and updates from our team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog:any) => (
            <article
              key={blog.id}
              className="rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <p className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)]">
                {new Date(blog.publishedAt).toLocaleDateString('en-GB')}
              </p>

              <h2 className="mt-3 text-[var(--font-size-lg)] font-semibold">
                {blog.title}
              </h2>

              <p className="mt-2 text-[var(--font-size-sm)] font-medium text-[var(--color-primary)]">
                By {blog.author}
              </p>

              <p className="mt-4 line-clamp-2 text-[var(--font-size-sm)] leading-6 text-[var(--color-text-secondary)]">
                {blog.description}
              </p>

              <Link
                href={`/pages/blog-detail?slug=${blog.slug}`}
                className="mt-5 inline-block text-[var(--font-size-sm)] font-semibold text-[var(--color-primary)] hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}