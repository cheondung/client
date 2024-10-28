'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HeartIcon, LogOutIcon, ReceiptTextIcon, StoreIcon, UserCogIcon } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function TopNavMember() {
  const { unregisterSession, session } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer transition-opacity hover:opacity-80">
          <AvatarImage src={`${process.env.NEXT_PUBLIC_BLOB_HOST}/avatars/${session?.avatar}`} />
          <AvatarFallback>{session?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/user/info'}>
            <UserCogIcon />
            <span>내 계정</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/@${session?.id}`}>
            <StoreIcon />
            <span>내 상점</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user/trade'}>
            <ReceiptTextIcon />
            <span>내 거래</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user/interest'}>
            <HeartIcon />
            <span>내 찜</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut().then(unregisterSession)}>
          <LogOutIcon />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
