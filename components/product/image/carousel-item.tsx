'use client';

import { CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { useGlobalModal } from '@/hooks/use-modal';
import { parseImagePath } from '@/lib/parse';

interface ProductImageCarouselItemProps {
  image: ProductImage;
  alt: string;
}

export default function ProductImageCarouselItem({
  image: { path, source },
  alt,
}: Readonly<ProductImageCarouselItemProps>) {
  const { openImageDialog } = useGlobalModal();

  return (
    <CarouselItem
      className="relative aspect-square cursor-pointer p-0"
      onClick={() => openImageDialog(parseImagePath(path, source))}
    >
      <Image src={parseImagePath(path, source)} alt={alt} fill className="rounded-lg object-contain" />
    </CarouselItem>
  );
}
