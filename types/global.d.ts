type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
