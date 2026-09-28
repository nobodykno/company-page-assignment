export interface IBlogPaginationProps {
    blogCount: number;
    filteredCount: number;
    total: number;
    isSearching: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    loadMoreError: string | null;
    loadMore: () => Promise<void>;
  }