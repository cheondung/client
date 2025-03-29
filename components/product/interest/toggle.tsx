'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { useQuery } from 'react-query';
import { addInterest, isInterestProduct, removeInterest } from '@/lib/product';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProductInterestToggleProps {
  productId: number;
}

export default function ProductInterestToggle({ productId }: Readonly<ProductInterestToggleProps>) {
  const { status } = useAuth();
  const { data: isInterest, refetch } = useQuery(['isInterest', productId], () => isInterestProduct(productId), {
    enabled: status === 'authenticated',
  });
  async function toggleInterest() {
    if (isInterest) {
      await removeInterest(productId);
    } else {
      await addInterest(productId);
    }
    await refetch();
  }

  return status === 'authenticated' ? (
    <Button variant="outline" className="p-3" onClick={toggleInterest}>
      <HeartIcon className={cn('text-red-500', isInterest && 'fill-red-500')} />
    </Button>
  ) : (
    <Button variant="outline" className="p-3" asChild>
      <Link href={'/signin'}>
        <HeartIcon className={cn('text-red-500', isInterest && 'fill-red-500')} />
      </Link>
    </Button>
  );
}
