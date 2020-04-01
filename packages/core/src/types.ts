export interface PaginationOptions {
  page: number;
  size: number;
  sort?: string;
}

export interface Pagination<T> {
  pagination: {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
  }
  results: T[];
}
