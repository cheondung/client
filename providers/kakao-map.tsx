'use client';

import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { createContext } from 'react';

type KakaoMapContextType = {
  mapLoading: boolean;
};

export const KakaoMapContext = createContext({} as KakaoMapContextType);

export default function KakaoMapProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_KEY as string,
    libraries: ['services', 'drawing', 'clusterer'],
  });

  return <KakaoMapContext.Provider value={{ mapLoading: loading }}>{children}</KakaoMapContext.Provider>;
}
