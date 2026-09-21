export interface IPaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  

export interface IPaginatedResult<T> {
    data: T[];
    pagination: IPaginationMeta;
  }
  