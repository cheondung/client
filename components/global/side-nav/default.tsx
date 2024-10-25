import { MessageCircleIcon, PackageSearchIcon } from 'lucide-react';
import NavLink from '@/components/global/nav/link';

export default function SideNavDefault() {
  return (
    <>
      <NavLink href={'/product'}>
        <PackageSearchIcon />
        <span>상품찾기</span>
      </NavLink>
      <NavLink href={'/chat'}>
        <MessageCircleIcon />
        <span>채팅하기</span>
      </NavLink>
    </>
  );
}
