import { Button } from '@/components/ui/button';
import { acceptTrade } from '@/lib/trade';
import { toast } from 'sonner';

interface TradeControlAcceptProps {
  id: number;
  refetch: () => void;
}

export default function TradeControlAccept({ id, refetch }: Readonly<TradeControlAcceptProps>) {
  return (
    <Button
      type="button"
      onClick={() => {
        acceptTrade(id).then((res) => {
          toast.success(res.message);
          refetch();
        });
      }}
    >
      거래 수락
    </Button>
  );
}
