import { PackagePlusIcon, PackageSearchIcon } from 'lucide-react';
import NavLink from '@/components/global/nav/link';

export default function SideNavDefault() {
  return (
    <>
      <NavLink href={'/about'}>
        <PackageSearchIcon size={16} />
        <span>상품찾기</span>
      </NavLink>
      <NavLink href={'/service'}>
        <PackagePlusIcon size={16} />
        <span>상품등록</span>
      </NavLink>
    </>
  );
}
