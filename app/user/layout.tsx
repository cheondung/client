import UserModalProvider from '@/providers/user-modal';
import AuthGuard from '@/guards/auth';

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <UserModalProvider>{children}</UserModalProvider>
    </AuthGuard>
  );
}
