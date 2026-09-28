
'use client';

import { IBlogProps, IBlogViewProps } from '@/props/blog-props';
import { IPaginationMeta } from '@/types/pagination';

import { PAGE_SIZE } from '@/constants/pagination';

import Container from '@/components/ui/container';
import ErrorView from '@/components/error-view';

import { useInfiniteBlogs } from '@/app/hooks/useBlogPagination';
import { useBlogSearch } from '@/app/hooks/useBlogSearch';
import BlogPagination from '@/components/blog/blog-pagination';
import BlogList from '@/components/blog/blog-list';
import BlogHeader from '@/components/blog/blog-header';



export default function BlogView({
  initialBlogs,
  initialPagination,
}: IBlogViewProps) {
  const {
    blogs,
    total,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    loadMoreError,
    loadMore,
  } = useInfiniteBlogs({
    initialBlogs,
    initialPagination,
  });

  const {
    search,
    setSearch,
    filteredBlogs,
    isSearching,
  } = useBlogSearch(blogs);

  if (isError) {
    return (
      <ErrorView
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load blog posts'
        }
      />
    );
  }

  return (
    <main
      aria-label="Blog page"
      className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]"
    >
      <BlogHeader
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
        hasNextPage={hasNextPage}
        blogCount={blogs.length}
      />

      <Container className="px-4 py-10 sm:px-6 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <BlogList
            blogs={filteredBlogs}
            isFetchingNextPage={isFetchingNextPage}
            skeletonCount={PAGE_SIZE.BLOG_LIST}
          />
        </div>

        <div className="mt-8 sm:mt-10">
          <BlogPagination
            blogCount={blogs.length}
            filteredCount={filteredBlogs.length}
            total={total}
            isSearching={isSearching}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadMoreError={loadMoreError}
            loadMore={loadMore}
          />
        </div>
      </Container>
    </main>
  );
}

