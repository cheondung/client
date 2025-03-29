import { notFound } from 'next/navigation';
import { getShopDetail, getShopProducts } from '@/lib/shop';
import { ProductList, ProductListItem } from '@/components/product';
import { PageItemCount, PageNav } from '@/components/page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { parseImagePath } from '@/lib/parse';

interface ShopPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: number }>;
}

// '%40' equals '@'
const HANDLE_PREFIX = '%40';

export default async function ShopDetailPage({ params, searchParams }: Readonly<ShopPageProps>) {
  const { id } = await params;
  const { page = 1 } = await searchParams;

  if (!id.startsWith(HANDLE_PREFIX)) {
    return notFound();
  }

  const shop = await getShopDetail(Number(id.replace(HANDLE_PREFIX, '')));
  const products = await getShopProducts(Number(id.replace(HANDLE_PREFIX, '')), page);
  const { name, introduction, avatar } = shop;

  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <section className="flex flex-col items-center gap-8 lg:flex-row">
        <Avatar className="size-96 border lg:max-w-lg">
          <AvatarImage src={parseImagePath(avatar, 'VERCEL')} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <article className="space-y-2 text-center lg:text-left">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="whitespace-pre text-wrap">
            {introduction ? introduction : '아직 상점 소개가 등록되지 않았습니다.'}
          </p>
        </article>
      </section>
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">{name}님의 상품</h3>
        <ProductList>
          {products.content.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </ProductList>
        <PageItemCount name={'상품'} totalItems={products.page.totalElements} />
        <PageNav currentPage={products.page.number + 1} totalPages={products.page.totalPages} />
      </section>
    </main>
  );
}
