import NavLink from '@/components/global/nav/link';

export default function TopNavDefault() {
  return (
    <nav className="flex gap-2">
      <NavLink href={'/product'}>상품찾기</NavLink>
      <NavLink href={'/chat'}>채팅하기</NavLink>
    </nav>
  );
}
