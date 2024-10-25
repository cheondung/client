'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import { useQuery } from 'react-query';
import { addInterest, isInterestProduct, removeInterest } from '@/lib/product';
import { cn } from '@/lib/utils';

interface ProductControlInterestProps {
  id: number;
}

export default function ProductControlInterest({ id }: Readonly<ProductControlInterestProps>) {
  const { data: isInterest, refetch } = useQuery(['isInterest', id], () => isInterestProduct(id));
  const toggleInterest = async () => {
    if (isInterest) {
      await removeInterest(id);
    } else {
      await addInterest(id);
    }
    refetch();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" className="px-3" onClick={toggleInterest}>
          <HeartIcon className={cn('text-red-500', isInterest && 'fill-red-500')} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>찜하기</TooltipContent>
    </Tooltip>
  );
}
