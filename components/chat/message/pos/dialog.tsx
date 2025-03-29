'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useChatModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';
import { MapPinIcon, XIcon } from 'lucide-react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useChatClient } from '@/hooks/use-chat-client';
import { toast } from 'sonner';

export default function ChatMessagePosDialog() {
  const { isMessagePosDialogOpen, closeMessagePosDialog } = useChatModal();
  const { sendMessagePos } = useChatClient();
  const [query, setQuery] = useState('');
  const [street, setStreet] = useState<string>();
  const handleQuerySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const places = new kakao.maps.services.Places();
    places.keywordSearch(query, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const place = result[0];
        setPosition({ lat: Number(place.y), lng: Number(place.x) });
      }
    });
  };

  const [position, setPosition] = useState({ lat: 37.3948, lng: 127.1112 });
  const handleDragEnd = (map: kakao.maps.Map) => {
    const center = map.getCenter();
    setPosition({ lat: center.getLat(), lng: center.getLng() });
  };

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setStreet(result[0].address.address_name);
      }
    });
  }, [position]);

  return (
    <Dialog open={isMessagePosDialogOpen} onOpenChange={closeMessagePosDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>거래 위치 전송</DialogTitle>
          <DialogDescription>거래 위치를 전송하시려면 지도에서 위치를 선택해주세요.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleQuerySubmit}>
          <Input type="text" placeholder="위치를 입력하세요" value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
        <Map center={position} className="aspect-square w-full rounded-md" onDragEnd={handleDragEnd}>
          <MapMarker position={position} />
        </Map>
        <p className="text-muted-foreground">{street ? street : '위치를 선택해주세요.'}</p>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeMessagePosDialog}>
            <XIcon /> 취소
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (!street) {
                return toast.error('위치를 선택해주세요.');
              }
              sendMessagePos({ street, ...position });
              closeMessagePosDialog();
            }}
          >
            <MapPinIcon /> 전송
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
