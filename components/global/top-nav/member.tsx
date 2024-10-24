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

export default function TopNavMember() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Username</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Username</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserCogIcon />
          <span>내 계정</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StoreIcon />
          <span>내 상점</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ReceiptTextIcon />
          <span>내 거래</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HeartIcon />
          <span>내 찜</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
