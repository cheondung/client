import { ProductList, ProductListSkeleton } from '@/components/product';

export default function UserInterestLoading() {
  return (
    <main className="lg:container mx-auto pt-24 pb-8 px-8 min-h-screen space-y-8">
      <ProductList>
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductListSkeleton key={index} />
        ))}
      </ProductList>
    </main>
  );
}
