import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { MessageCircleIcon } from 'lucide-react';

interface ProductControlChatProps {
  id: number;
}

export default function ProductControlChat({}: Readonly<ProductControlChatProps>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" className="px-3">
          <MessageCircleIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>채팅문의하기</TooltipContent>
    </Tooltip>
  );
}
