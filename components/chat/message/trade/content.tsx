import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { parseImagePath } from '@/lib/parse';

interface ChatMessageTradeContentProps {
  message: ChatMessageTrade;
}

export default function ChatMessageTradeContent({ message }: Readonly<ChatMessageTradeContentProps>) {
  const {
    productThumbnail: { path, source },
    productName,
    statusMessage,
  } = message;

  return (
    <div>
      <div className="relative aspect-square">
        <Image src={parseImagePath(path, source)} alt={productName} fill className="object-contain" />
      </div>
      <div className="px-3 py-2">
        <h5 className="font-medium">{productName}</h5>
        <p className="text-muted-foreground">{statusMessage}</p>
        <Button variant="outline" className="mt-2 w-full" asChild>
          <Link href={`/user/trade`}>거래 페이지로</Link>
        </Button>
      </div>
    </div>
  );
}
