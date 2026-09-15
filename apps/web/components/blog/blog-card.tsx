import Link from 'next/link';

import Card from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { IBlogProps } from '@/props/blog-props';

interface BlogCardProps {
  blog: IBlogProps;
}

export default function BlogCard({
  blog,
}: BlogCardProps) {
  const publishedDate = new Date(blog.publishedAt).toLocaleDateString(
    'en-GB',
  );

  return (
    <Card
      className="p-6"
      aria-label={`Blog post: ${blog.title}`}
    >
      <p
        aria-label={`Published date: ${publishedDate}`}
        className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)]"
      >
        {publishedDate}
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
        href={`${ROUTES.BLOG_DETAIL}/${blog.slug}`}
        className="mt-5 inline-block text-[var(--font-size-sm)] font-semibold text-[var(--color-primary)] hover:underline"
      >
        Read more →
      </Link>
    </Card>
  );
}