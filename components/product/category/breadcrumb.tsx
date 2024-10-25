import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';

interface ProductCategoryBreadcrumbProps {
  categories: ProductCategory[];
}

export default function ProductCategoryBreadcrumb({ categories }: Readonly<ProductCategoryBreadcrumbProps>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {categories.map((category, index) => (
          <Fragment key={category.id}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem key={category.id}>
              <BreadcrumbLink href={`/product?category=${category.id}`}>{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
