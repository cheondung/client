import { ReactNode } from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ProductImageCarouselProps {
  children: ReactNode;
}

export default function ProductImageCarousel({ children }: Readonly<ProductImageCarouselProps>) {
  return (
    <Carousel className="h-fit w-full overflow-hidden rounded-lg border lg:max-w-lg">
      <CarouselPrevious className="left-4 z-10 bg-background/50" />
      <CarouselContent className="m-0">{children}</CarouselContent>
      <CarouselNext className="right-4 z-10 bg-background/50" />
    </Carousel>
  );
}
