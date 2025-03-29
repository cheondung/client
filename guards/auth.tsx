'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Readonly<AuthGuardProps>) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen" style={{ visibility: status === 'authenticated' ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
}
