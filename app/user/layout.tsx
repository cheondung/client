'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import UserModalProvider from '@/providers/user-modal';

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: Readonly<UserLayoutProps>) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  return <UserModalProvider>{children}</UserModalProvider>;
}
