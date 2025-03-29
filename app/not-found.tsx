import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center gap-2 px-6 pb-4 pt-20">
      <h2 className="text-center text-2xl font-semibold">찾을 수 없음</h2>
      <p className="text-center text-muted-foreground">
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
