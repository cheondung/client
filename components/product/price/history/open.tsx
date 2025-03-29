import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { TrendingUpIcon } from 'lucide-react';

interface ProductPriceHistoryOpenProps {
  children: React.ReactNode;
}

export default function ProductPriceHistoryOpen({ children }: Readonly<ProductPriceHistoryOpenProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="p-3">
          <TrendingUpIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-3 pb-1 pl-2">{children}</PopoverContent>
    </Popover>
  );
}
