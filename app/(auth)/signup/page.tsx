'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SignUpCard, SignUpForm } from '@/components/sign';

export default function SignUpPage() {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <SignUpCard>
        <SignUpForm />
      </SignUpCard>
    </main>
  );
}
