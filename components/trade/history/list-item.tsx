import { CircleCheckIcon, HandIcon, HandshakeIcon, TruckIcon, XIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { getRelativeDate } from '@/lib/parse';

interface TradeHistoryListItemProps {
  history: TradeHistory;
}

export default function TradeHistoryListItem({ history }: Readonly<TradeHistoryListItemProps>) {
  const { status, statusMessage, createdAt } = history;
  const tradeIcon = {
    REQUESTED: <HandIcon size={28} className="rounded-full border bg-secondary p-1.5 text-secondary-foreground" />,
    REJECTED: <XIcon size={28} className="rounded-full border bg-destructive p-1.5 text-destructive-foreground" />,
    CANCELED: <XIcon size={28} className="rounded-full border bg-destructive p-1.5 text-destructive-foreground" />,
    ACCEPTED: <HandshakeIcon size={28} className="rounded-full border bg-green-500 p-1.5 text-white" />,
    SHIPPING: <TruckIcon size={28} className="rounded-full border bg-green-500 p-1.5 text-white" />,
    SHIPPED: <TruckIcon size={28} className="rounded-full border bg-green-500 p-1.5 text-white" />,
    COMPLETED: <CircleCheckIcon size={28} className="rounded-full border bg-green-700 p-1.5 text-white" />,
  } as Record<TradeStatus, ReactNode>;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tradeIcon[status]}
      <p>{statusMessage}</p>
      <p className="ml-auto text-sm text-muted-foreground">{getRelativeDate(new Date(createdAt))}</p>
    </div>
  );
}
