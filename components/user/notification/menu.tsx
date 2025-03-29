import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BellIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserNotificationMenuProps {
  children: React.ReactNode;
  hasUnreadNotification: boolean;
}

export default function UserNotificationMenu({ children, hasUnreadNotification }: Readonly<UserNotificationMenuProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('rounded-full p-2.5', hasUnreadNotification && 'bg-primary/10')}
        >
          <BellIcon className={cn(hasUnreadNotification && 'text-primary')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 p-0">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
