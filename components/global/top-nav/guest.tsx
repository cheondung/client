import NavLink from '@/components/global/nav/link';
import { KeySquareIcon, UserPlusIcon } from 'lucide-react';

export default function TopNavGuest() {
  return (
    <nav className="flex gap-2 ml-auto">
      <NavLink href={'/signin'} inactiveVariant={'outline'}>
        <KeySquareIcon size={16} />
        로그인
      </NavLink>
      <NavLink href={'/signup'} inactiveVariant={'default'} activeVariant={'default'}>
        <UserPlusIcon size={16} />
        회원가입
      </NavLink>
    </nav>
  );
}
