import Link from 'next/link';

export default function QuickLinks() {
  return (
    <nav className="w-full">
      <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>
      <ul className="space-y-1">
        <li>
          <Link href={'/'} className="hover:underline">
            홈
          </Link>
        </li>
        <li>
          <Link href={'/product'} className="hover:underline">
            상품찾기
          </Link>
        </li>
        <li>
          <Link href={'/chat'} className="hover:underline">
            채팅하기
          </Link>
        </li>
        <li>
          <Link href={'/signin'} className="hover:underline">
            로그인
          </Link>
        </li>
        <li>
          <Link href={'/signup'} className="hover:underline">
            회원가입
          </Link>
        </li>
      </ul>
    </nav>
  );
}
