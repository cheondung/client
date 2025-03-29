'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { BotIcon, ChevronRightIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SupportRequest, SupportResponse } from '@/components/support';
import { useSupport } from '@/hooks/use-support';
import { FormEvent, useState } from 'react';

export default function SupportWidget() {
  const { responses, requestSupport } = useSupport();
  const [content, setContent] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content) {
      requestSupport(content);
      setContent('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="fixed bottom-4 right-4 z-50" asChild>
        <Button variant={'default'} size={'icon'} className="rounded-full bg-primary/80">
          <BotIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mb-2 w-96 max-w-96 p-0">
        <div className="flex h-96 max-h-96 flex-grow flex-col gap-2 overflow-y-scroll scroll-smooth p-4">
          <SupportResponse content={'안녕하세요! 어떻게 도와드릴까요?'} />
          {responses.map((response, index) =>
            response.fromBot ? (
              <SupportResponse key={index} {...response} />
            ) : (
              <SupportRequest key={index} {...response} />
            )
          )}
        </div>
        <hr />
        <form className="flex w-full gap-2 p-2" onSubmit={handleSubmit}>
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
      </PopoverContent>
    </Popover>
  );
}
