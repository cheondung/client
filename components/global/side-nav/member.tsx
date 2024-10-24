import { HeartIcon, LogOutIcon, ReceiptTextIcon, StoreIcon, UserCogIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLink from '@/components/global/nav/link';
import { Separator } from '@/components/ui/separator';

export default function SideNavMember() {
  return (
    <>
      <NavLink href={'/my/info'}>
        <UserCogIcon size={16} />
        <span>내 계정</span>
      </NavLink>
      <NavLink href={'/store/TODO'}>
        <StoreIcon size={16} />
        <span>내 상점</span>
      </NavLink>
      <NavLink href={'/my/trade'}>
        <ReceiptTextIcon size={16} />
        <span>내 거래</span>
      </NavLink>
      <NavLink href={'/my/interest'}>
        <HeartIcon size={16} />
        <span>내 찜</span>
      </NavLink>
      <Separator />
      <Button className="w-fit" variant={'outline'}>
        <LogOutIcon size={16} />
        <span>로그아웃</span>
      </Button>
    </>
  );
}
