import { Input } from '@/components/ui/input';

interface ProductSearchQueryProps {
  query?: string;
}

export default function ProductSearchQuery({ query }: Readonly<ProductSearchQueryProps>) {
  return <Input name="query" placeholder="검색어를 입력해주세요..." defaultValue={query} />;
}
