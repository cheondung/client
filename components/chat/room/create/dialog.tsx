'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquareIcon, XIcon } from 'lucide-react';
import { createChatRoom } from '@/lib/chat';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ChatRoomCreateDialogProps {
  sellerId: number;
  isOpen: boolean;
  close: () => void;
}

export default function ChatRoomCreateDialog({ sellerId, isOpen, close }: Readonly<ChatRoomCreateDialogProps>) {
  const router = useRouter();
  const handleChatRoomCreate = () =>
    createChatRoom(sellerId)
      .then((res) => {
        toast.success(res.message);
        router.push(`/chat/${res.id}`);
      })
      .catch(() => console.log('Failed to create chat room'));

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>채팅방 생성</DialogTitle>
          <DialogDescription>채팅방을 생성하시려면 아래 버튼을 클릭해주세요.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            <XIcon /> 취소
          </Button>
          <Button type="button" onClick={handleChatRoomCreate}>
            <MessageSquareIcon /> 채팅방 생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
