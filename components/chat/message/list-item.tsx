import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleCheckIcon } from 'lucide-react';
import { ChatMessageImageContent, ChatMessageTextContent, ChatMessageTradeContent } from '@/components/chat';
import ChatMessagePosContent from '@/components/chat/message/pos/content';
import { parseImagePath } from '@/lib/parse';

interface ChatMessageListItemProps {
  message: ChatMessage;
  from: 'ME' | 'OTHER';
}

export default function ChatMessageListItem({ message, from }: Readonly<ChatMessageListItemProps>) {
  const { sender, read } = message;

  function renderContent() {
    switch (message.type) {
      case 'TEXT':
        return <ChatMessageTextContent message={message as ChatMessageText} />;
      case 'IMAGE':
        return <ChatMessageImageContent message={message as ChatMessageImage} />;
      case 'POS':
        return <ChatMessagePosContent message={message as ChatMessagePos} />;
      case 'TRADE':
        return <ChatMessageTradeContent message={message as ChatMessageTrade} />;
    }
  }

  return (
    <div className={cn('flex gap-2', from === 'ME' ? 'flex-row-reverse self-end' : 'self-start')}>
      <Avatar className="mt-2 size-6">
        <AvatarImage src={parseImagePath(sender.avatar, 'VERCEL')} />
        <AvatarFallback>{sender.name}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'max-w-sm overflow-hidden rounded-md border',
          from === 'ME' ? 'bg-secondary text-secondary-foreground' : 'bg-card text-card-foreground'
        )}
      >
        {renderContent()}
      </div>
      {read && from === 'ME' && <CircleCheckIcon size={18} className="mb-0.5 self-end fill-green-500 text-white" />}
    </div>
  );
}
