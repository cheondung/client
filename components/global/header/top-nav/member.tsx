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
import { HeartIcon, ListIcon, LogOutIcon, ReceiptTextIcon, StoreIcon, UserCogIcon } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { parseImagePath } from '@/lib/parse';
import { useNotification } from '@/hooks/use-notification';
import { UserNotificationList, UserNotificationListItem, UserNotificationMenu } from '@/components/user';

export default function TopNavMember() {
  const { unregisterSession, session } = useAuth();
  const { notifications, readNotification, hasUnreadNotification } = useNotification();

  return (
    <div className="flex items-center gap-4">
      <UserNotificationMenu hasUnreadNotification={hasUnreadNotification}>
        <UserNotificationList>
          {notifications.map((notification, index) => (
            <UserNotificationListItem key={index} notification={notification} readNotification={readNotification} />
          ))}
        </UserNotificationList>
      </UserNotificationMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border transition-opacity hover:opacity-80">
            {session?.avatar && <AvatarImage src={parseImagePath(session.avatar, 'VERCEL')} />}
            <AvatarFallback>{session?.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={'/user/info'}>
              <UserCogIcon /> 내 계정
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/@${session?.id}`}>
              <StoreIcon /> 내 상점
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={'/user/trade'}>
              <ReceiptTextIcon /> 내 거래
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={'/user/interest'}>
              <HeartIcon /> 내 찜
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={'/user/wishlist'}>
              <ListIcon /> 위시리스트
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut().then(unregisterSession)}>
            <LogOutIcon />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
