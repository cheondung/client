'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

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
    <Button variant={pathname.startsWith(href) ? activeVariant : inactiveVariant} className="gap-2 w-fit" asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
