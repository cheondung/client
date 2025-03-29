'use client';

import { createContext, ReactNode, useState } from 'react';
import { ChatMessagePosDialog } from '@/components/chat';
import { useKakaoMap } from '@/hooks/use-kakao-map';

type ChatModalContextType = {
  isMessagePosDialogOpen: boolean;
  openMessagePosDialog: () => void;
  closeMessagePosDialog: () => void;
};

export const ChatModalContext = createContext({} as ChatModalContextType);

export default function ChatModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isMessagePosDialogOpen, setIsMessagePosDialogOpen] = useState(false);
  const { mapLoading } = useKakaoMap();

  return (
    <ChatModalContext.Provider
      value={{
        isMessagePosDialogOpen,
        openMessagePosDialog: () => setIsMessagePosDialogOpen(true),
        closeMessagePosDialog: () => setIsMessagePosDialogOpen(false),
      }}
    >
      {children}
      {mapLoading || <ChatMessagePosDialog />}
    </ChatModalContext.Provider>
  );
}
