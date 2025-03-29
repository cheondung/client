import { Separator } from '@/components/ui/separator';
import { CompanyInfo, CopyRight, QuickLinks } from '@/components/global';

export default function GlobalFooter() {
  return (
    <footer className="relative bottom-0 w-full space-y-8 border-t bg-card py-8 text-card-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-8 lg:flex-row">
        <CompanyInfo />
        <QuickLinks />
      </div>
      <Separator />
      <CopyRight />
    </footer>
  );
}
