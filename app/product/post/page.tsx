import { ProductPostCard, ProductPostForm } from '@/components/product';
import { getProductCategories } from '@/lib/product';

export default async function ProductPostPage() {
  const categories = await getProductCategories();

  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <ProductPostCard>
        <ProductPostForm
          categories={categories}
          defaultValues={{
            name: '',
            description: '',
            price: '',
            shippingFee: '',
            isUsed: false,
            categoryId: 0,
            images: [],
          }}
        />
      </ProductPostCard>
    </main>
  );
}
