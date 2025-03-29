import { useContext } from 'react';
import { KakaoMapContext } from '@/providers/kakao-map';

const useKakaoMap = () => useContext(KakaoMapContext);

export { useKakaoMap };
