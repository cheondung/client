'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  activeVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  inactiveVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export default function NavLink({
  href,
  children,
  activeVariant = 'secondary',
  inactiveVariant = 'ghost',
}: Readonly<NavLinkProps>) {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname.startsWith(href) ? activeVariant : inactiveVariant}
      className={cn('w-fit gap-2', pathname.startsWith(href) && 'font-medium')}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
