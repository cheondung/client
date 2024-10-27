import BlurFade from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { PackagePlusIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

export default function HomeHeroContent() {
  return (
    <>
      {/*TODO: Implement hero background image*/}
      {/* <Image src={'/images/hero.webp'} alt={'Hero'} priority fill className="-z-20 object-cover" /> */}
      <div className="absolute -z-10 top-0 left-0 flex items-center px-8 w-full h-full bg-background/30 backdrop-blur-sm">
        <div className="container mx-auto text-center lg:text-left">
          <div className="lg:max-w-lg space-y-2">
            <BlurFade>
              <h2 className="font-semibold text-4xl">천둥장터</h2>
            </BlurFade>
            <BlurFade delay={0.25}>
              <p className="text-secondary-foreground">
                천둥장터는 중고 물품을 <br className="block lg:hidden" />
                사고 팔 수 있는 중고 거래 플랫폼입니다.
              </p>
            </BlurFade>
            <BlurFade delay={0.25 * 2} className="pt-4 flex justify-center lg:justify-start gap-4">
              <Button className="p-6 text-lg font-semibold" asChild>
                <Link href={'/product/post'}>
                  <PackagePlusIcon />
                  <span>판매하기</span>
                </Link>
              </Button>
              <Button className="p-6 text-lg font-semibold" variant="secondary" asChild>
                <Link href={'/product'}>
                  <ShoppingCartIcon />
                  <span>판매하기</span>
                </Link>
              </Button>
            </BlurFade>
          </div>
        </div>
      </div>
    </>
  );
}
