
export interface IBlogHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  isSearching: boolean;
  hasNextPage: boolean;
  blogCount: number;
}
