'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SignInCard, SignInForm } from '@/components/sign';

export default function SignInPage() {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  return (
    <main className="lg:container mx-auto pt-24 pb-8 px-8 min-h-screen space-y-8">
      <SignInCard>
        <SignInForm />
      </SignInCard>
    </main>
  );
}
