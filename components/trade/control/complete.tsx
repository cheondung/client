import { Button } from '@/components/ui/button';
import { completeTrade } from '@/lib/trade';
import { toast } from 'sonner';

interface TradeControlCompleteProps {
  id: number;
  refetch: () => void;
}

export default function TradeControlComplete({ id, refetch }: Readonly<TradeControlCompleteProps>) {
  return (
    <Button
      type="button"
      onClick={() => {
        completeTrade(id).then((res) => {
          toast.success(res.message);
          refetch();
        });
      }}
    >
      거래 완료
    </Button>
  );
}
