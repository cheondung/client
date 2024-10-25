'use client';

import { createContext, ReactNode, useState } from 'react';
import { ProductImageDialog } from '@/components/product';

type ProductModalContextType = {
  image?: ProductImage;
  openImageDialog: (image: ProductImage) => void;
  closeImageDialog: () => void;
};

export const ProductModalContext = createContext({} as ProductModalContextType);

export default function ProductModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [image, setImage] = useState<ProductImage>();

  return (
    <ProductModalContext.Provider
      value={{
        image,
        openImageDialog: (image: ProductImage) => setImage(image),
        closeImageDialog: () => setImage(undefined),
      }}
    >
      {children}
      <ProductImageDialog />
    </ProductModalContext.Provider>
  );
}
