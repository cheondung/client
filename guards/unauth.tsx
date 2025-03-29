'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface UnAuthGuardProps {
  children: React.ReactNode;
}

export default function UnAuthGuard({ children }: Readonly<UnAuthGuardProps>) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  return <Slot style={{ visibility: status === 'unauthenticated' ? 'visible' : 'hidden' }}>{children}</Slot>;
}
