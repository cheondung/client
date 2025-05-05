'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { confirmSignUp } from '@/lib/auth';

interface SignUpConfirmFormProps {
  email: string;
  token: string;
}

export default function SignUpConfirmForm({ email, token }: Readonly<SignUpConfirmFormProps>) {
  const router = useRouter();

  useEffect(() => {
    confirmSignUp(email, token).finally(() => router.replace('/'));
  }, [router, email, token]);

  return <div />;
}
