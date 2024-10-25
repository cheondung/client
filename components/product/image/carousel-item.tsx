'use client';

import { CarouselItem } from '@/components/ui/carousel';
import { parseProductImageSrc } from '@/lib/parse';
import Image from 'next/image';
import { useProductModal } from '@/hooks/use-modal';

interface ProductImageCarouselItemProps {
  image: ProductImage;
  alt: string;
}

export default function ProductImageCarouselItem({ image, alt }: Readonly<ProductImageCarouselItemProps>) {
  const { openImageDialog } = useProductModal();

  return (
    <CarouselItem className="relative aspect-square p-0 cursor-pointer" onClick={() => openImageDialog(image)}>
      <Image src={parseProductImageSrc(image)} alt={alt} fill className="rounded-lg" />
    </CarouselItem>
  );
}
