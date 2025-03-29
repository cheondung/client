import UnAuthGuard from '@/guards/unauth';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return <UnAuthGuard>{children}</UnAuthGuard>;
}
