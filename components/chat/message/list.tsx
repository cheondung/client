'use client';

import { CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ChatMessageListProps {
  ref: React.RefObject<HTMLDivElement>;
  children: ReactNode;
}

export default function ChatMessageList({ ref, children }: Readonly<ChatMessageListProps>) {
  return (
    <CardContent ref={ref} className="flex flex-grow flex-col gap-2 overflow-y-scroll scroll-smooth pt-6">
      {children}
    </CardContent>
  );
}
