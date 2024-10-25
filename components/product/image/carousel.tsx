import { ReactNode } from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ProductImageCarouselProps {
  children: ReactNode;
}

export default function ProductImageCarousel({ children }: Readonly<ProductImageCarouselProps>) {
  return (
    <Carousel className="lg:max-w-lg w-full">
      <CarouselPrevious className="z-10 -left-4 bg-background/50" />
      <CarouselContent className="m-0">{children}</CarouselContent>
      <CarouselNext className="z-10 -right-4 bg-background/50" />
    </Carousel>
  );
}
