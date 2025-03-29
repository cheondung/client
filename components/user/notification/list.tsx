import { Children } from 'react';

interface UserNotificationListProps {
  children: React.ReactNode;
}

export default function UserNotificationList({ children }: Readonly<UserNotificationListProps>) {
  const childrenCount = Children.count(children);

  return (
    <ul className="max-h-64 w-64 max-w-64 overflow-y-auto">
      {childrenCount > 0 ? (
        children
      ) : (
        <li className="py-4 text-center text-sm text-muted-foreground">아직 알림이 없습니다.</li>
      )}
    </ul>
  );
}
