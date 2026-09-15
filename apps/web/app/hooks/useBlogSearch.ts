
import { useMemo, useState } from 'react';

import { IBlogProps } from '@/props/blog-props';

interface UseBlogSearchResult {
  search: string;
  setSearch: (value: string) => void;
  filteredBlogs: IBlogProps[];
  isSearching: boolean;
}

export function useBlogSearch(
  blogs: IBlogProps[],
): UseBlogSearchResult {
  const [search, setSearch] = useState('');

  const filteredBlogs = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      return blogs;
    }

    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm),
    );
  }, [blogs, search]);

  const isSearching = search.trim().length > 0;

  return {
    search,
    setSearch,
    filteredBlogs,
    isSearching,
  };
}

