import Link from 'next/link';
import Image from 'next/image';
import { SideNavGuest, SideNavSheet, TopNavDefault, TopNavGuest } from '@/components/global';

export default function GlobalHeader() {
  return (
    <header className="fixed z-50 top-0 w-screen h-16 shadow-md text-card-foreground bg-card">
      <div className="lg:container flex items-center gap-8 mx-auto px-8 h-16">
        <h1>
          <Link href={'/'}>
            <Image src={'https://nextjs.org/icons/next.svg'} alt={'Logo'} width={148} height={32} />
          </Link>
        </h1>
        <div className="hidden md:flex lg:flex justify-between gap-2 w-full">
          <TopNavDefault />
          <TopNavGuest />
        </div>
        <SideNavSheet>
          <SideNavGuest />
        </SideNavSheet>
      </div>
    </header>
  );
}
