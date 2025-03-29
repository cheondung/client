import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useChatClient } from '@/hooks/use-chat-client';

export default function ChatMessageTextForm() {
  const { sendMessageText } = useChatClient();
  const [content, setContent] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content) {
      sendMessageText(content);
      setContent('');
    }
  };

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        className="w-full"
        placeholder="메시지를 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" className="p-3">
        <ChevronRightIcon />
      </Button>
    </form>
  );
}
