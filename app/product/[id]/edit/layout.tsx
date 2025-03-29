import AuthGuard from '@/guards/auth';

interface ProductEditLayoutProps {
  children: React.ReactNode;
}

export default function ProductEditLayout({ children }: Readonly<ProductEditLayoutProps>) {
  return <AuthGuard>{children}</AuthGuard>;
}
