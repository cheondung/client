import {
  ProductCategoryBreadcrumb,
  ProductControlDynamic,
  ProductImageCarousel,
  ProductImageCarouselItem,
} from '@/components/product';
import { getProductDetail } from '@/lib/product';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { HeartIcon, StoreIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProductDetailPageProps {
  params: { id: number };
}

export default async function ProductDetailPage({ params }: Readonly<ProductDetailPageProps>) {
  const { id } = await params;
  const product = await getProductDetail(id);
  const {
    name,
    description,
    price,
    shippingFee,
    interestCount,
    conditionLabel,
    saleStatusLabel,
    categories,
    images,
    shop,
  } = product;

  return (
    <main className="lg:container mx-auto pt-24 pb-8 px-8 min-h-screen space-y-8">
      <ProductCategoryBreadcrumb categories={categories} />
      <section className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <ProductImageCarousel>
          {images.map((image, index) => (
            <ProductImageCarouselItem key={index} image={image} alt={`${name}-${index + 1}`} />
          ))}
        </ProductImageCarousel>
        <article className="w-full space-y-2">
          <Button variant="link" className="p-0 h-4" asChild>
            <Link href={`/@${shop.id}`}>
              <StoreIcon />
              <span>{shop.name}</span>
            </Link>
          </Button>
          <h2 className="font-semibold text-2xl">{name}</h2>
          <div className="flex items-start gap-1">
            <Badge variant="secondary">{saleStatusLabel}</Badge>
            <Badge variant="outline">{conditionLabel}</Badge>
            <Badge variant="outline">
              <HeartIcon size={12} className="text-red-500 fill-red-500 mr-1" />
              {interestCount}
            </Badge>
            <p className="ml-auto font-semibold">
              <span className="text-lg">{price.toLocaleString()}원</span>
              {shippingFee > 0 && (
                <span className="ml-2 text-muted-foreground">배송비 {shippingFee.toLocaleString()}원</span>
              )}
            </p>
          </div>
          <Separator />
          <p className="whitespace-pre text-wrap">{description}</p>
          <Separator />
          <ProductControlDynamic id={id} shopId={shop.id} />
        </article>
      </section>
    </main>
  );
}
