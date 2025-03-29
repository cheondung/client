import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface ChatRoomListProps {
  children: ReactNode;
}

export default function ChatRoomList({ children }: Readonly<ChatRoomListProps>) {
  return <Card className="w-full max-w-sm overflow-hidden overflow-y-auto rounded-lg">{children}</Card>;
}
