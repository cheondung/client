import NavLink from '@/components/global/header/nav/link';
import { KeySquareIcon, UserPlusIcon } from 'lucide-react';

export default function TopNavGuest() {
  return (
    <nav className="ml-auto flex gap-2">
      <NavLink href={'/signin'} inactiveVariant={'outline'}>
        <KeySquareIcon />
        로그인
      </NavLink>
      <NavLink href={'/signup'} inactiveVariant={'default'} activeVariant={'default'}>
        <UserPlusIcon />
        회원가입
      </NavLink>
    </nav>
  );
}
