import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SignInCardProps {
  children: ReactNode;
}

export default function SignUpCard({ children }: SignInCardProps) {
  return (
    <Card className="mx-auto lg:max-w-lg md:max-w-lg w-full">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">회원가입</CardTitle>
        <CardDescription>회원가입을 하시면 더 많은 서비스를 이용하실 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
