interface SupportResponse {
  type: 'TEXT' | 'SEARCH';
  content: string;
  fromBot: boolean;
}

interface SupportSearchResponse extends SupportResponse {
  products: Product[];
}
