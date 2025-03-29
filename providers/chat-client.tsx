'use client';

import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { useParams } from 'next/navigation';
import { getChatMessages, getChatRoom } from '@/lib/chat';
import { useQuery } from 'react-query';
import { useAuth } from '@/hooks/use-auth';

type ChatClientContextType = {
  rooms?: ChatRoom[];
  room?: ChatRoom;
  messages: ChatMessage[];
  loadMoreMessage: () => void;
  sendMessageText: (data: string) => void;
  sendMessageImage: (data: string) => void;
  sendMessagePos: (data: ProductPos) => void;
};

export const ChatClientContext = createContext<ChatClientContextType>({} as ChatClientContextType);

interface ChatClientProviderProps {
  rooms: ChatRoom[];
  refetchRooms: () => void;
  children: ReactNode;
}

export default function ChatClientProvider({ rooms, refetchRooms, children }: Readonly<ChatClientProviderProps>) {
  const { session, status: authStatus } = useAuth();
  const { id: roomId } = useParams<{ id: string }>();
  const { data: room } = useQuery(['chatRoom'], () => getChatRoom(Number(roomId)), {
    enabled: authStatus === 'authenticated' && !!roomId,
  });
  const client = useRef<Client>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [noMoreMessage, setNoMoreMessage] = useState(false);

  const loadMoreMessage = () => {
    if (noMoreMessage || messages.length === 0) return;
    getChatMessages(Number(roomId), messages[0].id).then((data) => {
      if (data.length === 0) {
        setNoMoreMessage(true);
        return;
      }
      setMessages((prev) => [...data, ...prev]);
    });
  };

  const sendMessageText = (content: string) =>
    client.current?.publish({
      destination: `/pub/chat/message/text/${roomId}`,
      body: JSON.stringify({ content, type: 'TEXT' }),
    });
  const sendMessageImage = (path: string) =>
    client.current?.publish({
      destination: `/pub/chat/message/image/${roomId}`,
      body: JSON.stringify({ path, type: 'IMAGE' }),
    });
  const sendMessagePos = (pos: ProductPos) =>
    client.current?.publish({
      destination: `/pub/chat/message/pos/${roomId}`,
      body: JSON.stringify({ ...pos, type: 'POS' }),
    });

  useEffect(() => {
    if (!session || !roomId) return;

    client.current = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_WS_HOST}/stomp`,
      connectHeaders: { Authorization: sessionStorage.getItem('Authorization') as string },
      onConnect: () => {
        if (!client.current) return;
        client.current.subscribe(`/sub/chat/message/${roomId}`, onMessageReceived);
      },
      onStompError: (frame) => console.log(frame),
    });
    client.current.activate();

    const onMessageReceived = (iMessage: IMessage) => {
      const message = JSON.parse(iMessage.body);
      if (message.type === 'READ') {
        setMessages((prev) => prev.map((m) => (m.sender.id !== message.readerId ? { ...m, read: true } : m)));
        return;
      }
      if (message.sender.id != session.id) {
        iMessage.ack({ roomId });
      }
      setMessages((prev) => [...prev, message]);
      refetchRooms();
    };

    getChatMessages(Number(roomId)).then((data) => setMessages(data));

    return () => {
      client.current?.deactivate();
      setMessages([]);
    };
  }, [session, roomId, refetchRooms]);

  return (
    <ChatClientContext.Provider
      value={{
        rooms,
        room,
        messages,
        loadMoreMessage,
        sendMessageText,
        sendMessageImage,
        sendMessagePos,
      }}
    >
      {children}
    </ChatClientContext.Provider>
  );
}
