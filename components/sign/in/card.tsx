import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/icon/google';

interface SignInCardProps {
  children: ReactNode;
}

export default function SignInCard({ children }: SignInCardProps) {
  return (
    <Card className="mx-auto lg:max-w-lg md:max-w-lg w-full">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">로그인</CardTitle>
        <CardDescription>로그인을 하시면 더 많은 서비스를 이용하실 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <Separator />
        <Button type="submit" variant="outline" className="w-full">
          <GoogleIcon />
          구글 아이디로 로그인
        </Button>
      </CardContent>
    </Card>
  );
}
