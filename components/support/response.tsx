import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { parseImagePath } from '@/lib/parse';

interface SupportResponseProps {
  content: string;
  products?: Product[];
}

export default function SupportResponse({ content, products }: Readonly<SupportResponseProps>) {
  return (
    <>
      <div className="max-w-64 rounded-md border bg-card text-card-foreground">
        <div className="break-words px-3 py-2">{content}</div>
      </div>
      {products && (
        <Carousel>
          <CarouselPrevious className="-left-4 z-10 bg-background/50" />
          <CarouselContent>
            {products?.map(({ id, thumbnail: { path, source }, name }) => (
              <CarouselItem key={id} className="basis-1/2">
                <Link href={`/product/${id}`} className="group">
                  <Card className="flex h-full flex-col overflow-hidden transition-colors group-hover:bg-accent">
                    <CardHeader className="relative mb-2 aspect-square overflow-hidden border-b">
                      <Image
                        src={parseImagePath(path, source)}
                        alt={name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    </CardHeader>
                    <CardContent className="px-2 pb-2">
                      <CardTitle className="leading-0.5">{name}</CardTitle>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="-right-4 z-10 bg-background/50" />
        </Carousel>
      )}
    </>
  );
}
