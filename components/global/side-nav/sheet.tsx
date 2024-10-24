'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { HomeIcon, MenuIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SideNavDefault } from '@/components/global';

interface SideNavSheetProps {
  children: ReactNode;
}

export default function SideNavSheet({ children }: Readonly<SideNavSheetProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="flex md:hidden lg:hidden justify-end w-full">
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Button className="p-2.5 rounded-full md:hidden lg:hidden" variant="ghost">
            <MenuIcon size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col overflow-y-auto">
          <SheetTitle className="hidden">Side Nav</SheetTitle>
          <Link href={'/'}>
            <Button variant={pathname === '/' ? 'secondary' : 'ghost'} className="gap-2">
              <HomeIcon size={18} />
              <span>천둥장터</span>
            </Button>
          </Link>
          <Separator className="my-2" />
          <SideNavDefault />
          <Separator className="my-2" />
          {children}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
