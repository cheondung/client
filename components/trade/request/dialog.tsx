'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HandshakeIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { requestTrade } from '@/lib/trade';
import { toast } from 'sonner';

interface TradeRequestDialogProps {
  productId: number;
  isOpen: boolean;
  close: () => void;
}

export default function TradeRequestDialog({ productId, isOpen, close }: Readonly<TradeRequestDialogProps>) {
  const router = useRouter();
  const handleRequestTrade = () =>
    requestTrade(productId)
      .then((res) => {
        toast.success(res.message);
        router.push(`/user/trade/${res.id}`);
      })
      .catch(() => console.log('Failed to request trade'));

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>거래 요청</DialogTitle>
          <DialogDescription>거래를 요청하시려면 아래 버튼을 클릭해주세요.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            <XIcon /> 취소
          </Button>
          <Button type="button" onClick={handleRequestTrade}>
            <HandshakeIcon /> 거래 요청
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
