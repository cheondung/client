import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductPostCardProps {
  children: ReactNode;
}

export default function ProductPostCard({ children }: Readonly<ProductPostCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">상품 등록</CardTitle>
        <CardDescription>판매할 상품을 등록하시려면 아래의 폼을 작성해주세요.</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
