import NavLink from '@/components/global/header/nav/link';
import { KeySquareIcon, UserPlusIcon } from 'lucide-react';

export default function SideNavGuest() {
  return (
    <nav className="ml-auto flex gap-2">
      <NavLink href={'/signup'} inactiveVariant={'default'} activeVariant={'default'}>
        <UserPlusIcon />
        <span>회원가입</span>
      </NavLink>
      <NavLink href={'/signin'} inactiveVariant={'outline'}>
        <KeySquareIcon />
        <span>로그인</span>
      </NavLink>
    </nav>
  );
}
