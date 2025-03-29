import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Badge } from '@/components/ui/badge';

interface ChatMessagePosContentProps {
  message: ChatMessagePos;
}

export default function ChatMessagePosContent({ message }: Readonly<ChatMessagePosContentProps>) {
  const {
    pos: { street, lat, lng },
  } = message;

  return (
    <div>
      <Map center={{ lat, lng }} className="aspect-square w-full rounded-md">
        <MapMarker position={{ lat, lng }} />
      </Map>
      <div className="flex items-center gap-2 px-3 py-2">
        <Badge>주소</Badge>
        {street}
      </div>
    </div>
  );
}
