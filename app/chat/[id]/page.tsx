'use client';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChatMessageImageButton,
  ChatMessageList,
  ChatMessageListItem,
  ChatMessagePosButton,
  ChatMessageTextForm,
} from '@/components/chat';
import { useChatClient } from '@/hooks/use-chat-client';
import { useAuth } from '@/hooks/use-auth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Grid2X2Icon, StoreIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ChatRoomDetail() {
  const { session } = useAuth();
  const { room, messages, loadMoreMessage } = useChatClient();
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;

    const distanceFromBottom = messageList.scrollHeight - messageList.scrollTop - messageList.clientHeight;
    if (distanceFromBottom <= 256) {
      messageList.scrollTo(0, messageList.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (messageListRef.current?.scrollTop === 0) {
        loadMoreMessage();
      }
    };
    messageListRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      return messageListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [messages, loadMoreMessage]);

  return (
    room && (
      <Card className="flex w-full flex-col">
        <CardHeader className="flex flex-row justify-between border-b">
          <div className="space-y-1">
            <CardTitle>{room.participant.name}</CardTitle>
            <CardDescription className="line-clamp-1">
              {room.participant.introduction || '아직 상점 소개가 등록되지 않았습니다.'}
            </CardDescription>
          </div>
          <Button type="button" variant="outline" className="rounded-full p-2.5" asChild>
            <Link href={`/@${room.participant.id}`}>
              <StoreIcon />
            </Link>
          </Button>
        </CardHeader>
        <ChatMessageList ref={messageListRef}>
          {messages.map(
            (message, index) =>
              message.type !== 'READ' && (
                <ChatMessageListItem
                  key={index}
                  message={message}
                  from={message.sender.id == session?.id ? 'ME' : 'OTHER'}
                />
              )
          )}
        </ChatMessageList>
        <CardFooter className="flex gap-2 border-t p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="secondary" className="p-3">
                <Grid2X2Icon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="grid w-fit grid-cols-2 gap-2 p-2">
              <ChatMessageImageButton />
              <ChatMessagePosButton />
            </PopoverContent>
          </Popover>
          <ChatMessageTextForm />
        </CardFooter>
      </Card>
    )
  );
}
