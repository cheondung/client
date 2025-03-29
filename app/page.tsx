import { BellIcon, MessageSquareIcon, PackagePlusIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRightIcon } from '@radix-ui/react-icons';

const services = [
  {
    subject: '검색 기능',
    description: 'PGroonga를 사용한 빠른 FTS(Full Text Search)를 지원합니다.',
    icon: SearchIcon,
  },
  {
    subject: '안전 거래',
    description: '사용자 간의 안전한 상품 거래가 가능합니다.',
    icon: PackagePlusIcon,
  },
  {
    subject: '채팅 기능',
    description: 'WebSocket을 통해 사용자 간의 채팅이 가능합니다.',
    icon: MessageSquareIcon,
  },
  {
    subject: '알림 기능',
    description: '사용자에게 알림을 통해 정보를 실시간으로 전달합니다.',
    icon: BellIcon,
  },
];

export default function HomePage() {
  return (
    <main className="container min-h-screen space-y-4 p-8">
      <section className="space-y-8 py-56 text-center">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-primary">중고 거래 플랫폼</span>
          <h1 className="text-5xl font-bold">천둥장터</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          천둥장터는 중고 물품을 <br className="block lg:hidden" />
          사고 팔 수 있는 중고 거래 플랫폼입니다.
        </p>
        <div className="flex justify-center gap-2">
          <Button className="font-semibold" asChild>
            <Link href={'/product/post'}>
              <PackagePlusIcon />
              <span>판매하기</span>
            </Link>
          </Button>
          <Button className="font-semibold" variant="secondary" asChild>
            <Link href={'/product'}>
              <ShoppingCartIcon />
              <span>구매하기</span>
            </Link>
          </Button>
        </div>
        <Button variant="outline" className="gap-1 rounded-full" asChild>
          <Link href={'/signin'}>
            회원가입을 하고 천둥장터를 이용해보세요! <ChevronRightIcon />
          </Link>
        </Button>
      </section>
      <hr />
      <section className="space-y-8 py-12">
        <div className="space-y-2 text-center">
          <span className="text-sm font-semibold text-primary">기능 소개</span>
          <h2 className="text-3xl font-bold">
            천둥장터에서 제공하는 <br className="block lg:hidden" />
            기능을 확인해보세요.
          </h2>
        </div>
        <div className="gird-cols-1 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ subject, description, icon: Icon }, index) => (
            <div key={index} className="flex gap-3">
              <div className="size-fit rounded-full border p-2">
                <Icon size={16} />
              </div>
              <div className="mt-1 space-y-1">
                <h5 className="font-semibold">{subject}</h5>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
