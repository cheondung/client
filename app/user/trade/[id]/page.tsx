'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { getDeliveryTrack, getTrade } from '@/lib/trade';
import { useAuth } from '@/hooks/use-auth';
import { Progress } from '@/components/ui/progress';
import { CheckIcon, HandshakeIcon, PackageIcon, TruckIcon } from 'lucide-react';
import {
  TradeControlDynamic,
  TradeDeliveryTrackList,
  TradeDeliveryTrackListItem,
  TradeHistoryList,
  TradeHistoryListItem,
} from '@/components/trade';
import Image from 'next/image';
import { parseImagePath } from '@/lib/parse';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type UserTradeDetailPageParams = {
  id: string;
};

export default function UserTradeDetailPage() {
  const { id } = useParams<UserTradeDetailPageParams>();
  const { data: trade, refetch } = useQuery(['trade', id], () => getTrade(Number(id)), { enabled: !!id });
  const { data: tracks } = useQuery(['deliveryTrack', id], () => getDeliveryTrack(Number(id)), {
    enabled: !!id && !!trade?.delivery,
  });
  const { session } = useAuth();
  const tradeProgress = {
    REQUESTED: 0,
    REJECTED: 0,
    CANCELED: 0,
    ACCEPTED: 35,
    SHIPPING: 65,
    SHIPPED: 65,
    COMPLETED: 100,
  } as Record<TradeStatus, number>;

  return (
    trade && (
      <main className="container min-h-screen space-y-8 p-8 pt-20">
        <section className="space-y-8 py-12">
          <div className="relative mx-auto aspect-square size-32 overflow-hidden rounded-xl shadow-md">
            <Image
              src={parseImagePath(trade.productThumbnail.path, trade.productThumbnail.source)}
              alt={trade.productName}
              fill
            />
          </div>
          <h2 className="text-center text-2xl font-semibold">{trade.productName}</h2>
          <p className="text-center text-muted-foreground">
            거래 현황: <strong className="text-primary">{trade.statusLabel}</strong>
          </p>
          <div className="relative flex items-center">
            <div className="absolute z-10 flex w-full justify-between">
              <div className="size-fit rounded-full border bg-background p-2.5">
                <HandshakeIcon size={24} />
              </div>
              <div className="size-fit rounded-full border bg-background p-2.5">
                <PackageIcon size={24} />
              </div>
              <div className="size-fit rounded-full border bg-background p-2.5">
                <TruckIcon size={24} />
              </div>
              <div className="size-fit rounded-full border bg-background p-2.5">
                <CheckIcon size={24} />
              </div>
            </div>
            <Progress value={tradeProgress[trade.status]} className="h-3" />
          </div>
          <div>
            <TradeControlDynamic
              id={trade.id}
              status={trade.status}
              role={session?.id == trade.customer.id ? 'CUSTOMER' : 'SELLER'}
              refetch={refetch}
            />
          </div>
        </section>
        <section className="flex flex-col items-center gap-6 lg:flex-row">
          <Card className="flex w-full gap-4 p-6">
            <Avatar>
              <AvatarImage src={parseImagePath(trade.customer.avatar, 'VERCEL')} />
              <AvatarFallback>{trade.customer.name.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardContent className="space-y-2 p-0">
              <CardTitle className="flex items-center gap-2">
                {trade.customer.name} <Badge>구매자</Badge>
              </CardTitle>
              <CardDescription>{trade.customer.introduction || '아직 등록된 자기소개가 없습니다.'}</CardDescription>
            </CardContent>
          </Card>
          <HandshakeIcon className="size-8 rotate-90 text-muted-foreground lg:size-20 lg:rotate-0" />
          <Card className="flex w-full gap-4 p-6">
            <Avatar>
              <AvatarImage src={parseImagePath(trade.seller.avatar, 'VERCEL')} />
              <AvatarFallback>{trade.seller.name.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardContent className="space-y-2 p-0">
              <CardTitle className="flex items-center gap-2">
                {trade.seller.name} <Badge>판매자</Badge>
              </CardTitle>
              <CardDescription>{trade.seller.introduction || '아직 등록된 자기소개가 없습니다.'}</CardDescription>
            </CardContent>
          </Card>
        </section>
        <section className="flex flex-col gap-6 lg:flex-row">
          <TradeHistoryList>
            {trade.histories.map((history) => (
              <TradeHistoryListItem key={history.id} history={history} />
            ))}
          </TradeHistoryList>
        </section>
        {trade.delivery && tracks && tracks.length > 0 && (
          <section className="flex flex-col gap-6 lg:flex-row">
            <TradeDeliveryTrackList delivery={trade.delivery}>
              {tracks.map((track, index) => (
                <TradeDeliveryTrackListItem key={index} track={track} />
              ))}
            </TradeDeliveryTrackList>
          </section>
        )}
      </main>
    )
  );
}
