
import { useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import services from '@/services';
import { PAGE_SIZE } from '@/constants/pagination';
import { CACHE_DURATION } from '@/constants/cache';
import { IBlogProps } from '@/props/blog-props';
import {
  IPaginatedResult,
} from '@/types/pagination';
import { UseInfiniteBlogsProps, UseInfiniteBlogsResult } from '@/props/pagination-props';




export function useInfiniteBlogs({
  initialBlogs,
  initialPagination,
}: UseInfiniteBlogsProps): UseInfiniteBlogsResult {
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  const {
    data,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<IPaginatedResult<IBlogProps>>({
    queryKey: ['blogs'],
    queryFn: ({ pageParam }) =>
      services.blogService.getBlogPaginated(
        pageParam as number,
        PAGE_SIZE.BLOG_LIST,
      ),
    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.pageCount
        ? lastPage.pagination.page + 1
        : undefined,

    initialData: {
      pages: [
        {
          data: initialBlogs,
          pagination: initialPagination,
        },
      ],
      pageParams: [1],
    },

    staleTime: CACHE_DURATION.CLIENT_STALE_TIME_MS,
  });

  const blogs = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const total =
    data?.pages[data.pages.length - 1]?.pagination.total ??
    initialPagination.total;

  const loadMore = useCallback(async (): Promise<void> => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    setLoadMoreError(null);

    const result = await fetchNextPage();

    if (result.error) {
      setLoadMoreError(
        result.error instanceof Error
          ? result.error.message
          : 'Failed to load more blog posts.',
      );
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return {
    blogs,
    total,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    loadMoreError,
    loadMore,
  };
}

