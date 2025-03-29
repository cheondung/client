import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductEditCardProps {
  children: ReactNode;
}

export default function ProductEditCard({ children }: Readonly<ProductEditCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">상품 수정</CardTitle>
        <CardDescription>판매할 상품을 수정하시려면 아래의 폼을 작성해주세요.</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
