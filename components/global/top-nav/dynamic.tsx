'use client';

import { useAuth } from '@/hooks/use-auth';
import { TopNavGuest, TopNavMember } from '@/components/global';

export default function TopNavDynamic() {
  const { status } = useAuth();

  return status === 'unauthenticated' ? <TopNavGuest /> : <TopNavMember />;
}
