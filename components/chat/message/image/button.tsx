'use client';

import { Button } from '@/components/ui/button';
import { ImagePlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';
import { useChatClient } from '@/hooks/use-chat-client';
import { uploadImage } from '@/lib/image';

export default function ChatMessageImageButton() {
  const { room, sendMessageImage } = useChatClient();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return toast.error('사진을 선택해주세요.');
    }
    if (!room) {
      return toast.error('채팅방을 선택해주세요.');
    }

    toast.promise(
      uploadImage(files[0]).then(({ pathname }) => sendMessageImage(pathname)),
      {
        loading: '사진 전송 중...',
        success: '사진 전송 완료!',
        error: '사진 전송 실패!',
      }
    );
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="rounded-full p-2.5"
      onClick={() => imageInputRef.current?.click()}
    >
      <ImagePlusIcon />
      <Input type="file" className="hidden" accept="image/*" ref={imageInputRef} onChange={handleImageChange} />
    </Button>
  );
}
