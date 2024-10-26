'use client';

import { useQuery } from 'react-query';
import { getInterestProducts } from '@/lib/product';
import { ProductList, ProductListItem } from '@/components/product';
import { PageItemCount } from '@/components/page';
import UserInterestLoading from '@/app/user/interest/loading';

export default function UserInterestPage() {
  const { data: products, status } = useQuery(['product', 'interest'], getInterestProducts);

  if (status === 'loading') {
    return <UserInterestLoading />;
  }

  return (
    products && (
      <main className="lg:container mx-auto pt-24 pb-8 px-8 min-h-screen space-y-8">
        <section className="space-y-4">
          <ProductList>
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </ProductList>
          <PageItemCount name={'상품'} totalItems={products.length} />
        </section>
      </main>
    )
  );
}
