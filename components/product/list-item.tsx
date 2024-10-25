import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { parseProductImageSrc } from '@/lib/parse';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: Readonly<ProductListItemProps>) {
  const { id, name, thumbnail, saleStatusLabel, conditionLabel, price } = product;

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="relative mb-6 aspect-square">
        <Image src={parseProductImageSrc(thumbnail)} alt={name} fill />
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle>{name}</CardTitle>
        <div className="flex flex-wrap items-start gap-1">
          <Badge variant="secondary">{saleStatusLabel}</Badge>
          <Badge variant="outline">{conditionLabel}</Badge>
          <span className="ml-auto font-semibold">{price.toLocaleString()}원</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/product/${id}`}>
            <ChevronRight />
            <span>자세히 보기</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
