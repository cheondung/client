'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import ChatClientProvider from '@/providers/chat-client';
import ChatModalProvider from '@/providers/chat-modal';
import { useQuery } from 'react-query';
import { getChatRooms } from '@/lib/chat';
import { ChatRoomList, ChatRoomListItem } from '@/components/chat';
import AuthGuard from '@/guards/auth';

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { status } = useAuth();
  const { data: rooms, refetch: refetchRooms } = useQuery(['chatRooms'], getChatRooms, {
    enabled: status === 'authenticated',
    // refetchInterval: 1000, // TODO: Enable polling on production
  });

  return (
    <AuthGuard>
      {rooms && (
        <ChatClientProvider rooms={rooms} refetchRooms={refetchRooms}>
          <ChatModalProvider>
            <main className="mx-auto flex max-h-screen min-h-screen gap-4 px-8 pb-8 pt-24 lg:container">
              <ChatRoomList>{rooms?.map((room) => <ChatRoomListItem key={room.id} room={room} />)}</ChatRoomList>
              {children}
            </main>
          </ChatModalProvider>
        </ChatClientProvider>
      )}
    </AuthGuard>
  );
}
