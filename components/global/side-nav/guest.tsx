import NavLink from '@/components/global/nav/link';
import { KeySquareIcon, UserPlusIcon } from 'lucide-react';

export default function SideNavGuest() {
  return (
    <nav className="flex gap-2 ml-auto">
      <NavLink href={'/signup'} inactiveVariant={'default'} activeVariant={'default'}>
        <UserPlusIcon size={16} />
        <span>회원가입</span>
      </NavLink>
      <NavLink href={'/signin'} inactiveVariant={'outline'}>
        <KeySquareIcon size={16} />
        <span>로그인</span>
      </NavLink>
    </nav>
  );
}
