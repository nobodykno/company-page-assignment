import { IPaginationMeta } from '@/types/pagination';
import { IBlogProps } from './blog-props';

export interface UseInfiniteBlogsProps {
  initialBlogs: IBlogProps[];
  initialPagination: IPaginationMeta;
}




export interface UseInfiniteBlogsResult {
  blogs: IBlogProps[];
  total: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  error: unknown;
  loadMoreError: string | null;
  loadMore: () => Promise<void>;
}