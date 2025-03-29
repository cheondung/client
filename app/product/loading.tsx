import { ProductList, ProductListSkeleton } from '@/components/product';

export default function ProductListLoading() {
  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <ProductList>
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductListSkeleton key={index} />
        ))}
      </ProductList>
    </main>
  );
}
