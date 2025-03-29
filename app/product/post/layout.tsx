import AuthGuard from '@/guards/auth';

interface ProductPostLayoutProps {
  children: React.ReactNode;
}

export default function ProductPostLayout({ children }: Readonly<ProductPostLayoutProps>) {
  return <AuthGuard>{children}</AuthGuard>;
}
