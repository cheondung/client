import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

import Form from 'next/form';
import { ReactNode } from 'react';

interface ProductSearchCardProps {
  children: ReactNode;
}

export default function ProductSearchCard({ children }: Readonly<ProductSearchCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>상품 검색</CardTitle>
        <CardDescription>검색 필터를 통해 원하는 상품을 찾아보세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form action="/product" className="space-y-2">
          {children}
          <Button type="submit" className="w-full gap-2">
            <SearchIcon strokeWidth={2.5} />
            <span>검색</span>
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
