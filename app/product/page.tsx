import { productSearchSchema } from '@/schemas/product';
import { getProductCategories, getProducts } from '@/lib/product';
import {
  ProductList,
  ProductListItem,
  ProductPostLink,
  ProductSearchCard,
  ProductSearchCategory,
  ProductSearchInclude,
  ProductSearchQuery,
} from '@/components/product';
import { PageItemCount, PageNav } from '@/components/page';

interface ProductListPageProps {
  searchParams: SearchParams;
}

export default async function ProductListPage({ searchParams }: Readonly<ProductListPageProps>) {
  const parsedSearchParams = productSearchSchema.parse(await searchParams);
  const [products, categories] = await Promise.all([getProducts(parsedSearchParams), getProductCategories()]);

  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <h2 className="text-center text-2xl font-bold">상품 찾기</h2>
      <ProductSearchCard>
        <div className="flex gap-2">
          <ProductSearchCategory categories={categories} {...parsedSearchParams} />
          <ProductSearchQuery {...parsedSearchParams} />
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <ProductSearchInclude {...parsedSearchParams} />
        </div>
      </ProductSearchCard>
      <div className="flex justify-end gap-4">
        <ProductPostLink />
      </div>
      <section className="space-y-4">
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
