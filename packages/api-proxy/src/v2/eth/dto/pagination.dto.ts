export class PaginationMetadata {
  /**
   * 다음 pagination url
   * @example http://localhost:3000/api/v2/btc/transfers?page=2
   */
  nextUrl: string;

  /**
   * 이전 pagination url
   * @example http://localhost:3000/api/v2/btc/transfers?page=1
   */
  previousUrl: string;

  /**
   * 총 갯수
   */
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
