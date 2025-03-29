'use client';

import {
  TradeControlAccept,
  TradeControlCancel,
  TradeControlComplete,
  TradeControlReject,
  TradeControlShip,
} from '@/components/trade';

interface TradeControlDynamicProps {
  id: number;
  status: TradeStatus;
  role: 'CUSTOMER' | 'SELLER';
  refetch: () => void;
}

export default function TradeControlDynamic({ id, status, role, refetch }: Readonly<TradeControlDynamicProps>) {
  const renderControl = () => {
    switch (status) {
      case 'REQUESTED': {
        return role === 'CUSTOMER' ? (
          <TradeControlCancel id={id} refetch={refetch} />
        ) : (
          <>
            <TradeControlReject id={id} refetch={refetch} />
            <TradeControlAccept id={id} refetch={refetch} />
          </>
        );
      }
      case 'ACCEPTED': {
        return role === 'CUSTOMER' ? (
          <TradeControlComplete id={id} refetch={refetch} />
        ) : (
          <TradeControlShip id={id} refetch={refetch} />
        );
      }
      case 'SHIPPING':
      case 'SHIPPED': {
        return role === 'CUSTOMER' && <TradeControlComplete id={id} refetch={refetch} />;
      }
      // case 'COMPLETED': {
      //   return <TradeReviewForm tradeId={id} />;
      // }
    }
  };

  return <div className="flex w-full justify-center gap-2">{renderControl()}</div>;
}
