import { Button } from '@/components/ui/button';
import { cancelTrade } from '@/lib/trade';
import { toast } from 'sonner';

interface TradeControlCancelProps {
  id: number;
  refetch: () => void;
}

export default function TradeControlCancel({ id, refetch }: Readonly<TradeControlCancelProps>) {
  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() =>
        cancelTrade(id).then((res) => {
          toast.success(res.message);
          refetch();
        })
      }
    >
      거래 취소
    </Button>
  );
}
