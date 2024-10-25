import { getProductCategories, getProducts } from '@/lib/product';
import {
  ProductList,
  ProductListItem,
  ProductSearchCard,
  ProductSearchCategory,
  ProductSearchInclude,
  ProductSearchQuery,
} from '@/components/product';
import React from 'react';
import { PageItemCount, PageNav } from '@/components/page';

interface ProductListPageProps {
  searchParams: SearchProduct;
}

export default async function ProductListPage({ searchParams }: Readonly<ProductListPageProps>) {
  const [products, categories] = await Promise.all([getProducts(await searchParams), getProductCategories()]);
  const { category, query = '', includeUsed = true, includeSoldOut = true } = await searchParams;

  return (
    <main className="lg:container mx-auto pt-24 pb-8 px-8 min-h-screen space-y-8">
      <ProductSearchCard>
        <div className="flex gap-2">
          <ProductSearchCategory categories={categories} category={Number(category)} />
          <ProductSearchQuery query={query} />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <ProductSearchInclude includeUsed={includeUsed} includeSoldOut={includeSoldOut} />
        </div>
      </ProductSearchCard>
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
