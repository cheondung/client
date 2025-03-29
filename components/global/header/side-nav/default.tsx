import { MessageSquareIcon, PackageSearchIcon } from 'lucide-react';
import NavLink from '@/components/global/header/nav/link';

export default function SideNavDefault() {
  return (
    <>
      <NavLink href={'/product'}>
        <PackageSearchIcon />
        <span>상품찾기</span>
      </NavLink>
      <NavLink href={'/chat'}>
        <MessageSquareIcon /> 채팅하기
      </NavLink>
    </>
  );
}
