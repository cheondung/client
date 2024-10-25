'use client';

import { useAuth } from '@/hooks/use-auth';
import { SideNavGuest, SideNavMember } from '@/components/global';

export default function SideNavDynamic() {
  const { status } = useAuth();

  return status === 'unauthenticated' ? <SideNavGuest /> : <SideNavMember />;
}
