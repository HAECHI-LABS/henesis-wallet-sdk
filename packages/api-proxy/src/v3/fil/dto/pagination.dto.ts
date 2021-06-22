export class PaginationMetadata {
  nextUrl: string;
  previousUrl: string;
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
