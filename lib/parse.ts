export const parseImagePath = (path: string, source: 'VERCEL' | 'BUNJANG') => {
  return source === 'BUNJANG'
    ? `${process.env.NEXT_PUBLIC_BUNJANG_MEDIA_HOST}/${path}`
    : `${process.env.NEXT_PUBLIC_BLOB_HOST}/${path}`;
};

export function getRelativeDate(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 0) {
    return '오래 전';
  }

  const intervals = [
    { label: '년', seconds: 31536000 },
    { label: '월', seconds: 2592000 },
    { label: '일', seconds: 86400 },
    { label: '시간', seconds: 3600 },
    { label: '분', seconds: 60 },
    { label: '초', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      // 기본적으로 단수/복수 구분 처리: count가 1이면 단수, 아니면 복수.
      const label = count === 1 ? interval.label : `${interval.label}`;
      return `${count}${label} 전`;
    }
  }

  return '방금 전';
}
