import { Button } from '@/components/ui/button';
import { rejectTrade } from '@/lib/trade';
import { toast } from 'sonner';

interface TradeControlRejectProps {
  id: number;
  refetch: () => void;
}

export default function TradeControlReject({ id, refetch }: Readonly<TradeControlRejectProps>) {
  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() => {
        rejectTrade(id).then((res) => {
          toast.success(res.message);
          refetch();
        });
      }}
    >
      거래 거절
    </Button>
  );
}
