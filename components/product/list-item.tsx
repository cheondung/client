import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { parseImagePath } from '@/lib/parse';
import Image from 'next/image';
import Link from 'next/link';

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: Readonly<ProductListItemProps>) {
  const {
    id,
    name,
    thumbnail: { path, source },
    saleStatusLabel,
    conditionLabel,
    price,
  } = product;

  return (
    <Link href={`/product/${id}`} className="group">
      <Card className="flex h-full flex-col overflow-hidden transition-colors group-hover:bg-accent">
        <CardHeader className="relative mb-6 aspect-square overflow-hidden border-b">
          <Image
            src={parseImagePath(path, source)}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="leading-0.5">{name}</CardTitle>
        </CardContent>
        <CardFooter className="mt-auto flex flex-wrap items-start gap-1">
          <Badge variant="secondary">{saleStatusLabel}</Badge>
          <Badge variant="outline">{conditionLabel}</Badge>
          <span className="ml-auto font-semibold">{price.toLocaleString()}원</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
