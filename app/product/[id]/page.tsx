import {
  ProductCategoryBreadcrumb,
  ProductControl,
  ProductImageCarousel,
  ProductImageCarouselItem,
  ProductList,
  ProductListItem,
} from '@/components/product';
import { getProductDetail, getSimilarProducts } from '@/lib/product';
import { Badge } from '@/components/ui/badge';
import { HeartIcon, StoreIcon } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface ProductDetailPageProps {
  params: Promise<{ id: number }>;
}

export default async function ProductDetailPage({ params }: Readonly<ProductDetailPageProps>) {
  const { id } = await params;
  const [product, similarProducts] = await Promise.all([getProductDetail(id), getSimilarProducts(id)]);
  const { shop, priceHistories } = product;

  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <ProductCategoryBreadcrumb categories={product.categories} />
      <section className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <ProductImageCarousel>
          {product.images.map((image, index) => (
            <ProductImageCarouselItem key={index} image={image} alt={`${product.name}-${index + 1}`} />
          ))}
        </ProductImageCarousel>
        <article className="w-full space-y-2">
          <Link href={`/@${shop.id}`} className="flex items-center gap-2 underline-offset-4 hover:underline">
            <StoreIcon size={14} /> {shop.name}
          </Link>
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="flex flex-wrap items-start gap-1">
            <Badge variant="secondary">{product.saleStatusLabel}</Badge>
            <Badge variant="outline">{product.conditionLabel}</Badge>
            <Badge variant="outline">
              <HeartIcon size={12} className="mr-1 fill-red-500 text-red-500" />
              {product.interestCount}
            </Badge>
            <p className="ml-auto font-semibold">
              <span className="text-lg">{product.price.toLocaleString()}원</span>
              {product.shippingFee > 0 && (
                <span className="ml-2 text-muted-foreground">배송비 {product.shippingFee.toLocaleString()}원</span>
              )}
            </p>
          </div>
          <Separator />
          <p className="whitespace-pre text-wrap">{product.description}</p>
          <Separator />
          <ProductControl productId={id} shopId={shop.id} discount={product.discount} priceHistories={priceHistories} />
        </article>
      </section>
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">이 상품과 비슷한 상품들</h3>
        <ProductList>
          {similarProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </ProductList>
      </section>
    </main>
  );
}
