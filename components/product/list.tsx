import { ReactNode } from 'react';

interface ProductListProps {
  children: ReactNode;
}

export default function ProductList({ children }: Readonly<ProductListProps>) {
  return (
    <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
