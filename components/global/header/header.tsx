import Link from 'next/link';
import Image from 'next/image';
import { SideNavDynamic, SideNavSheet, TopNavDefault, TopNavDynamic } from '@/components/global';

export default function GlobalHeader() {
  return (
    <header className="fixed top-0 z-30 h-16 w-screen bg-card text-card-foreground shadow-md">
      <div className="mx-auto flex h-16 items-center gap-8 px-8 lg:container">
        <h1>
          <Link href={'/'}>
            <Image src={'/logo.svg'} alt={'Logo'} width={148} height={32} />
          </Link>
        </h1>
        <div className="hidden w-full justify-between gap-2 md:flex lg:flex">
          <TopNavDefault />
          <TopNavDynamic />
        </div>
        <SideNavSheet>
          <SideNavDynamic />
        </SideNavSheet>
      </div>
    </header>
  );
}
