import { ProductEditCard, ProductEditForm } from '@/components/product';
import { getProductCategories, getProductDetail } from '@/lib/product';

interface ProductEditPageProps {
  params: Promise<{ id: number }>;
}

export default async function ProductEditPage({ params }: Readonly<ProductEditPageProps>) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductDetail(id), getProductCategories()]);

  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <ProductEditCard>
        <ProductEditForm
          id={id}
          categories={categories}
          defaultValues={{
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            shippingFee: product.shippingFee.toString(),
            isUsed: product.condition === 'USED',
            categoryId: product.categories[product.categories.length - 1].id,
            images: product.images,
          }}
          defaultCategory={product.categories[product.categories.length - 1]}
        />
      </ProductEditCard>
    </main>
  );
}
