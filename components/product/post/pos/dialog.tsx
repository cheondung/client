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
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

interface ProductPostPosDialogProps {
  isOpen: boolean;
  close: () => void;
  setPos: React.Dispatch<React.SetStateAction<ProductPos | undefined>>;
}

type Position = { lat: number; lng: number };

export default function ProductPostPosDialog({ isOpen, close, setPos }: Readonly<ProductPostPosDialogProps>) {
  const [street, setStreet] = useState('');
  const [center, setCenter] = useState<Position>({ lat: 37.5665, lng: 126.978 });
  const handleDragEnd = (map: kakao.maps.Map) =>
    setCenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(center.lng, center.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setStreet(result[0].address.address_name);
      }
    });
  }, [center]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>거래 위치 설정</DialogTitle>
          <DialogDescription>거래 위치를 설정하려면 아래 폼을 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Map center={center} onDragEnd={handleDragEnd} className="aspect-square w-full">
            <MapMarker position={center} />
          </Map>
          <p className="text-muted-foreground">{street ? street : '위치를 선택해주세요.'}</p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setPos(undefined);
              close();
            }}
          >
            초기화
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => {
              setPos({ street, ...center });
              close();
            }}
          >
            설정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
