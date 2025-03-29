import { ReactNode } from 'react';

interface ProductListProps {
  children: ReactNode;
}

export default function ProductList({ children }: Readonly<ProductListProps>) {
  return (
    <div role="list" className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {children}
    </div>
  );
}
