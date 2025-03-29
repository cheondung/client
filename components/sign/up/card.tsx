import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/icon/google';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface SignInCardProps {
  children: ReactNode;
}

export default function SignUpCard({ children }: SignInCardProps) {
  return (
    <Card className="mx-auto w-full md:max-w-lg lg:max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">회원가입</CardTitle>
        <CardDescription>회원가입을 하시면 더 많은 서비스를 이용하실 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <Separator />
        <Button variant="outline" className="w-full" asChild>
          <Link href={`${process.env.NEXT_PUBLIC_SERVER_HOST}/oauth2/authorization/google`}>
            <GoogleIcon />
            구글 아이디로 회원가입
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
