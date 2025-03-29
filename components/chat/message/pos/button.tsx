'use client';

import { Button } from '@/components/ui/button';
import { MapPinIcon } from 'lucide-react';
import { useChatModal } from '@/hooks/use-modal';

export default function ChatMessagePosButton() {
  const { openMessagePosDialog } = useChatModal();

  return (
    <Button type="button" variant="outline" className="rounded-full p-2.5" onClick={openMessagePosDialog}>
      <MapPinIcon />
    </Button>
  );
}
