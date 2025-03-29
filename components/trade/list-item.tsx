import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { TradeProgress } from '@/components/trade/index';
import { parseImagePath } from '@/lib/parse';

interface TradeListItemProps {
  trade: Trade;
}

export default function TradeListItem({ trade }: Readonly<TradeListItemProps>) {
  const {
    id,
    statusLabel,
    productName,
    productThumbnail: { path, source },
  } = trade;

  return (
    <Link href={`/user/trade/${id}`} className="group block">
      <Card className="flex flex-col overflow-hidden transition-colors group-hover:bg-accent">
        <CardHeader className="flex flex-row justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-xl">{productName}</CardTitle>
            <CardDescription>{statusLabel}</CardDescription>
          </div>
          <div className="relative aspect-square size-16 overflow-hidden rounded-md">
            <Image
              src={parseImagePath(path, source)}
              alt={productName}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
          </div>
        </CardHeader>
        <CardContent>
          <TradeProgress status={trade.status} />
          <p className="flex justify-between">
            <span>거래 요청</span>
            <span>거래 수락</span>
            <span>배송 중</span>
            <span>거래 완료</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
