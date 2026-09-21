
import type { ReactElement } from 'react';

import Container from '@/components/ui/container';
import PageTitle from '@/components/ui/page-title';

interface BlogHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  isSearching: boolean;
  hasNextPage: boolean;
  blogCount: number;
}

export default function BlogHeader({
  search,
  setSearch,
  isSearching,
  hasNextPage,
  blogCount,
}: BlogHeaderProps): ReactElement {
  return (
    <section
      aria-label="Blog introduction"
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <PageTitle
        title="Our Blog"
        titleProps={{ 'aria-label': 'Our Blog' }}
        description="Insights, ideas, and updates from our team."
        descriptionProps={{
          'aria-label': 'Blog introduction description',
        }}
      />

      <Container className="pb-10">
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
          className="w-full max-w-md rounded border border-[var(--color-border-strong)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
        />

        {isSearching && hasNextPage && (
          <p className="mt-2 text-[var(--font-size-xs)] text-[var(--color-text-secondary)]">
            Searching only the {blogCount} post
            {blogCount === 1 ? '' : 's'} loaded so far - load
            more to search a wider range.
          </p>
        )}
      </Container>
    </section>
  );
}

