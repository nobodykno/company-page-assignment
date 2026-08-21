'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import ErrorView from '@/component/error-view';
import services from '@/services';
import { IBlogProps } from '@/props/blog-props';
import { useState } from 'react';

/**
 * 
 * @param blogs  accept the data from the page to render the view
 * @returns the blog page view
 */


export default function BlogView({ blogs }: { blogs: IBlogProps[] }) {
  const [search, setSearch] = useState('');
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

  const filteredBlogs = data.filter((blog: IBlogProps) => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      return true;
    }

    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <main  aria-label="Blog page" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <section aria-label="Blog introduction" className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 aria-label="Our Blog" className="text-[var(--font-size-title)] font-bold">
            Our Blog
          </h1>

          <p aria-label="Blog introduction description" className="mt-3 max-w-2xl text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
            Insights, ideas, and updates from our team.
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="blog-search"
            className="sr-only"
          >
              Search blogs
          </label>

          <input
            id="blog-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search blogs..."
            aria-label="Search blogs"
            className="w-full max-w-md rounded border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </section>

      <section aria-label="Blog posts" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.length === 0 ? (
            <p
              className="text-[var(--color-text-secondary)]"
              role="status"
            >
    No blogs found.
            </p>
          ) : (
            filteredBlogs.map((blog: IBlogProps) => (
              <article
                key={blog.id}
                className="rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
                aria-label={`Blog post: ${blog.title}`}
              >
                <p
                  aria-label={`Published date: ${new Date(
                    blog.publishedAt
                  ).toLocaleDateString('en-GB')}`}
                  className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)]"
                >
                  {new Date(blog.publishedAt).toLocaleDateString('en-GB')}
                </p>

                <h2
                  aria-label={blog.title}
                  className="mt-3 text-[var(--font-size-lg)] font-semibold"
                >
                  {blog.title}
                </h2>

                <p
                  aria-label={`Author: ${blog.author}`}
                  className="mt-2 text-[var(--font-size-sm)] font-medium text-[var(--color-primary)]"
                >
        By {blog.author}
                </p>

                <p className="mt-4 line-clamp-2 text-[var(--font-size-sm)] leading-6 text-[var(--color-text-secondary)]">
                  {blog.content}
                </p>

                <Link
                  href={`/pages/blog-detail?slug=${blog.slug}`}
                  className="mt-5 inline-block text-[var(--font-size-sm)] font-semibold text-[var(--color-primary)] hover:underline"
                  aria-label={`Read more about ${blog.title}`}
                >
        Read more →
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}