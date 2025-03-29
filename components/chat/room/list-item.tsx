'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { parseImagePath } from '@/lib/parse';

interface ChatRoomListItemProps {
  room: ChatRoom;
}

export default function ChatRoomListItem({ room }: Readonly<ChatRoomListItemProps>) {
  const { id, lastMessageContent, participant } = room;
  const { id: currentId } = useParams<{ id: string }>();

  return (
    <Link href={`/chat/${id}`}>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-3 border-b p-4 transition-colors hover:bg-accent hover:text-accent-foreground',
          Number(currentId) === id && 'bg-accent text-accent-foreground'
        )}
      >
        <Avatar className="block">
          <AvatarImage src={parseImagePath(participant.avatar, 'VERCEL')} />
          <AvatarFallback>{participant.name}</AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <h5 className="font-semibold">{participant.name}</h5>
          <p className="truncate text-muted-foreground">{lastMessageContent}</p>
        </div>
      </div>
    </Link>
  );
}
