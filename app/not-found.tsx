import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen pt-20 pb-4 px-6 flex flex-col justify-center gap-2">
      <h2 className="font-semibold text-2xl text-center">찾을 수 없음</h2>
      <p className="text-muted-foreground text-center">
        죄송합니다. 찾을 수 없는 페이지입니다.
        <br />
        URL을 확인하거나&nbsp;
        <Link href={'/'} className="font-medium underline">
          홈으로
        </Link>
        &nbsp;이동해주세요.
      </p>
    </main>
  );
}
