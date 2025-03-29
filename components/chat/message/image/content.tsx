'use client';

import Image from 'next/image';
import { useGlobalModal } from '@/hooks/use-modal';
import { parseImagePath } from '@/lib/parse';

interface ChatMessageTextContentProps {
  message: ChatMessageImage;
}

export default function ChatMessageTextContent({ message }: Readonly<ChatMessageTextContentProps>) {
  const { openImageDialog } = useGlobalModal();

  return (
    <div
      className="relative aspect-video w-64 cursor-pointer"
      onClick={() => openImageDialog(parseImagePath(message.path, 'VERCEL'))}
    >
      <Image
        src={parseImagePath(message.path, 'VERCEL')}
        alt={`${message.sender.name} 님의 이미지`}
        fill
        className="object-cover"
      />
    </div>
  );
}
