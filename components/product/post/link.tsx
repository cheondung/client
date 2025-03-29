'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { PackagePlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProductPostLink() {
  const { status } = useAuth();

  if (status === 'authenticated') {
    return (
      <Button variant="outline" asChild>
        <Link href={'/product/post'}>
          <PackagePlusIcon /> 상품 판매
        </Link>
      </Button>
    );
  }
}
