import { HomeHeroContent, HomeServiceList, HomeServiceListItem } from '@/components/home';
import BlurFade from '@/components/ui/blur-fade';
import { MapIcon, MessageCircleIcon, PackagePlusIcon } from 'lucide-react';

const services = [
  {
    subject: '상품 거래',
    description: '사용자 간의 상품 거래가 가능합니다.',
    icon: <PackagePlusIcon size={16} />,
  },
  {
    subject: '채팅 기능',
    description: '판매자와 구매자 간의 실시간 채팅이 가능합니다.',
    icon: <MessageCircleIcon size={16} />,
  },
  {
    subject: '맵뷰 지원',
    description: '지도를 통해 상품의 거래 위치를 확인할 수 있습니다.',
    icon: <MapIcon size={16} />,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen pb-8 space-y-4">
      <section className="relative h-[64vh]">
        <HomeHeroContent />
      </section>
      <section className="relative -top-8 container mx-auto px-8">
        <HomeServiceList>
          {services.map((service, index) => (
            <BlurFade key={index} delay={0.25 * index} className="w-full">
              <HomeServiceListItem {...service} />
            </BlurFade>
          ))}
        </HomeServiceList>
      </section>
    </main>
  );
}
