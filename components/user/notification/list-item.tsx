'use client';

import Link from 'next/link';
import { getRelativeDate } from '@/lib/parse';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserNotificationListItemProps {
  notification: UserNotification;
  readNotification: (notificationId: number) => void;
}

export default function UserNotificationListItem({
  notification,
  readNotification,
}: Readonly<UserNotificationListItemProps>) {
  const { content, path, read, createdAt } = notification;

  return (
    <Link href={path} onClick={() => readNotification(notification.id)}>
      <li className="flex cursor-pointer flex-wrap items-center gap-2 border-b bg-secondary/20 px-3 py-2 transition-colors hover:bg-secondary">
        <p className={cn('text-sm', read && 'text-muted-foreground')}>
          {read ? (
            <CheckIcon className="mr-2 inline-block size-2 text-muted-foreground" />
          ) : (
            <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-primary" />
          )}
          {content}
        </p>
        <p className="ml-auto mt-auto text-xs">{getRelativeDate(new Date(createdAt))}</p>
      </li>
    </Link>
  );
}
