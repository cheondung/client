'use client';

import { useQuery } from 'react-query';
import { PageItemCount } from '@/components/page';
import { getTrades } from '@/lib/trade';
import { TradeList, TradeListItem } from '@/components/trade';

export default function UserTradeListPage() {
  const { data: trades } = useQuery(['trade'], getTrades);

  return (
    trades && (
      <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
        <section className="space-y-4">
          <h2 className="text-center text-2xl font-semibold">거래 목록</h2>
          <TradeList>
            {trades.map((trade) => (
              <TradeListItem key={trade.id} trade={trade} />
            ))}
          </TradeList>
          <PageItemCount name={'거래'} totalItems={trades.length} />
        </section>
      </main>
    )
  );
}
