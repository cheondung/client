'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ProductControlChat, ProductControlInterest } from '@/components/product';
import { useAuth } from '@/hooks/use-auth';
import { EditIcon, EyeOffIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';

interface ProductControlDynamicProps {
  id: number;
  shopId: number;
}

export default function ProductControlDynamic({ id, shopId }: Readonly<ProductControlDynamicProps>) {
  const { status, session } = useAuth();

  return (
    status === 'authenticated' && (
      <div className="flex justify-end gap-2">
        {session?.id == shopId ? (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="px-3">
                  <Link href={`/product/${id}/edit`}>
                    <EditIcon />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>수정</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" className="px-3">
                  <EyeOffIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>숨기기</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" className="px-3">
                  <TrashIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>삭제하기</TooltipContent>
            </Tooltip>
          </>
        ) : (
          <>
            <ProductControlInterest id={id} />
            <ProductControlChat id={id} />
          </>
        )}
      </div>
    )
  );
}
