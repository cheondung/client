import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CompanyInfo() {
  return (
    <div className="w-full">
      <h1 className="mb-4">
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt={'Logo'} width={148} height={32} />
        </Link>
      </h1>
      <p className="mb-4 text-muted-foreground">천둥장터는 중고 물품을 사고 팔 수 있는 중고 거래 플랫폼입니다.</p>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <MapPinIcon size={16} className="text-muted-foreground" />
          <span>123 Main St, City, Country</span>
        </li>
        <li className="flex items-center gap-2">
          <PhoneIcon size={16} className="text-muted-foreground" />
          <span>+1 (555) 123-4567</span>
        </li>
        <li className="flex items-center gap-2">
          <MailIcon size={16} className="text-muted-foreground" />
          <span>
            <span>info@company.com</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
