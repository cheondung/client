'use client';

import { UserInfoForm } from '@/components/user';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from 'react-query';
import { getSelfShop } from '@/lib/shop';
import { Button } from '@/components/ui/button';
import { SquareAsteriskIcon, UserMinusIcon } from 'lucide-react';
import { useUserModal } from '@/hooks/use-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserInfoPage() {
  const { data: shop } = useQuery(['shop', 'self'], getSelfShop);
  const { openAvatarDialog, openPasswordDialog, openWithdrawDialog } = useUserModal();

  return (
    shop && (
      <main className="lg:container mx-auto pt-24 pb-8 px-8 min-h-screen space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">회원정보 수정</CardTitle>
            <CardDescription>회원정보 수정을 하시려면 아래 폼을 작성해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <Avatar
              className="w-32 h-32 cursor-pointer transition-opacity hover:opacity-80"
              onClick={() => openAvatarDialog(shop.avatar)}
            >
              <AvatarImage src={`${process.env.NEXT_PUBLIC_BLOB_HOST}/avatars/${shop.avatar}`} />
              <AvatarFallback>{shop.name}</AvatarFallback>
            </Avatar>
            <UserInfoForm shop={shop} />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="submit" variant="outline" onClick={openPasswordDialog}>
              <SquareAsteriskIcon />
              <span>비밀번호 변경</span>
            </Button>
            <Button type="submit" variant="destructive" onClick={openWithdrawDialog}>
              <UserMinusIcon />
              <span>회원 탈퇴</span>
            </Button>
          </CardFooter>
        </Card>
      </main>
    )
  );
}
