import { Progress } from '@/components/ui/progress';

interface TradeProgressProps {
  status: TradeStatus;
}

export default function TradeProgress({ status }: Readonly<TradeProgressProps>) {
  const tradeProgress = {
    REQUESTED: 0,
    REJECTED: 0,
    CANCELED: 0,
    ACCEPTED: 35,
    SHIPPING: 65,
    SHIPPED: 65,
    COMPLETED: 100,
  } as Record<TradeStatus, number>;

  return <Progress value={tradeProgress[status]} />;
}
