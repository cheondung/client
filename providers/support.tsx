'use client';

import { createContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Client, IMessage } from '@stomp/stompjs';
import { SupportWidget } from '@/components/support';

type SupportContextType = {
  responses: SupportResponse[];
  requestSupport: (content: string) => void;
};

export const SupportContext = createContext<SupportContextType>({} as SupportContextType);

interface SupportProviderProps {
  children: React.ReactNode;
}

export default function SupportProvider({ children }: Readonly<SupportProviderProps>) {
  const { session, status: authStatus } = useAuth();
  const client = useRef<Client>();
  const [responses, setResponses] = useState<SupportResponse[]>([]);

  const requestSupport = (content: string) =>
    client.current?.publish({
      destination: `/pub/support/${session?.id}`,
      body: JSON.stringify({ content }),
    });

  useEffect(() => {
    if (!session) return;

    client.current = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_WS_HOST}/stomp`,
      connectHeaders: { Authorization: sessionStorage.getItem('Authorization') as string },
      onConnect: () => {
        if (!client.current) return;
        client.current.subscribe(`/sub/support/${session.id}`, onResponseReceived);
      },
      onStompError: (frame) => console.log(frame),
    });
    client.current.activate();

    const onResponseReceived = (iMessage: IMessage) => {
      const response = JSON.parse(iMessage.body);
      setResponses((prev) => [...prev, response]);
    };

    return () => {
      client.current?.deactivate();
      setResponses([]);
    };
  }, [session]);

  return (
    <SupportContext.Provider value={{ responses, requestSupport }}>
      {children}
      {authStatus === 'authenticated' && <SupportWidget />}
    </SupportContext.Provider>
  );
}
