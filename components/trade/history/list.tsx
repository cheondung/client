import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TradeHistoryListProps {
  children: ReactNode;
}

export default function TradeHistoryList({ children }: Readonly<TradeHistoryListProps>) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>거래 기록</CardTitle>
        <CardDescription>최근 거래 기록을 확인할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
}
