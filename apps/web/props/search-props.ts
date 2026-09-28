import { IBlogProps } from './blog-props';

export interface UseBlogSearchResult {
  search: string;
  setSearch: (value: string) => void;
  filteredBlogs: IBlogProps[];
  isSearching: boolean;
}