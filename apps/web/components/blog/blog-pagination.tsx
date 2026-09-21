
import type { ReactElement } from 'react';

interface BlogPaginationProps {
  blogCount: number;
  filteredCount: number;
  total: number;
  isSearching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMoreError: string | null;
  loadMore: () => Promise<void>;
}

export default function BlogPagination({
  blogCount,
  filteredCount,
  total,
  isSearching,
  hasNextPage,
  isFetchingNextPage,
  loadMoreError,
  loadMore,
}: BlogPaginationProps): ReactElement | null {
  if (blogCount === 0) {
    return null;
  }

  const resultText = isSearching
    ? `${filteredCount} result${
      filteredCount === 1 ? '' : 's'
    } in ${blogCount} loaded posts`
    : `Showing ${blogCount} of ${total} posts`;

  const buttonText = isFetchingNextPage
    ? 'Loading more…'
    : loadMoreError
      ? 'Try again'
      : 'Load more';

  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <p
        aria-live="polite"
        className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]"
      >
        {resultText}
      </p>

      {loadMoreError && (
        <p
          role="alert"
          className="text-[var(--color-danger)] text-[var(--font-size-sm)]"
        >
          {loadMoreError}
        </p>
      )}

      {hasNextPage && (
        <button
          type="button"
          onClick={loadMore}
          disabled={isFetchingNextPage}
          className="rounded-[var(--border-radius)] border border-[var(--color-border-strong)] px-6 py-2 text-[var(--font-size-sm)] font-medium disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
