'use client';

import {
  ProductDiscountPopover,
  ProductInterestToggle,
  ProductPriceHistoryChart,
  ProductPriceHistoryOpen,
} from '@/components/product';
import { ChatRoomCreateDialog } from '@/components/chat';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EditIcon, HandshakeIcon, MessageSquareIcon } from 'lucide-react';
import { useState } from 'react';
import { TradeRequestDialog } from '@/components/trade';

interface ProductControlProps {
  productId: number;
  shopId: number;
  discount?: ProductDiscount;
  priceHistories: ProductPriceHistory[];
}

export default function ProductControl({ productId, shopId, discount, priceHistories }: Readonly<ProductControlProps>) {
  const { status, session } = useAuth();
  const [isChatRoomCreateDialogOpen, setIsChatRoomCreateDialogOpen] = useState(false);
  const [isTradeRequestDialogOpen, setIsTradeRequestDialogOpen] = useState(false);

  return (
    <div className="flex justify-end gap-2">
      {status === 'authenticated' &&
        (session?.id == shopId ? (
          <>
            <ProductDiscountPopover productId={productId} discount={discount} />
            <Button variant="secondary" className="px-3" asChild>
              <Link href={`/product/${productId}/edit`}>
                <EditIcon />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <ChatRoomCreateDialog
              sellerId={shopId}
              isOpen={isChatRoomCreateDialogOpen}
              close={() => setIsChatRoomCreateDialogOpen(false)}
            />
            <TradeRequestDialog
              productId={productId}
              isOpen={isTradeRequestDialogOpen}
              close={() => setIsTradeRequestDialogOpen(false)}
            />
            <Button type="button" variant="outline" className="p-3" onClick={() => setIsChatRoomCreateDialogOpen(true)}>
              <MessageSquareIcon />
            </Button>
            <Button type="button" variant="outline" className="p-3" onClick={() => setIsTradeRequestDialogOpen(true)}>
              <HandshakeIcon />
            </Button>
            <ProductInterestToggle productId={productId} />
          </>
        ))}
      {priceHistories.length >= 2 && (
        <ProductPriceHistoryOpen>
          <ProductPriceHistoryChart priceHistories={priceHistories} />
        </ProductPriceHistoryOpen>
      )}
    </div>
  );
}
