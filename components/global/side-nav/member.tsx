'use client';

import { HeartIcon, LogOutIcon, ReceiptTextIcon, StoreIcon, UserCogIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLink from '@/components/global/nav/link';
import { Separator } from '@/components/ui/separator';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';

export default function SideNavMember() {
  const { unregisterSession, session } = useAuth();

  return (
    <>
      <NavLink href={'/user/info'}>
        <UserCogIcon />
        <span>내 계정</span>
      </NavLink>
      <NavLink href={`/@${session?.id}`}>
        <StoreIcon />
        <span>내 상점</span>
      </NavLink>
      <NavLink href={'/user/trade'}>
        <ReceiptTextIcon />
        <span>내 거래</span>
      </NavLink>
      <NavLink href={'/user/interest'}>
        <HeartIcon />
        <span>내 찜</span>
      </NavLink>
      <Separator />
      <Button className="w-fit" variant={'outline'} onClick={() => signOut().then(unregisterSession)}>
        <LogOutIcon />
        <span>로그아웃</span>
      </Button>
    </>
  );
}
