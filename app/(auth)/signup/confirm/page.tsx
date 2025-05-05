import { SignUpConfirmForm } from '@/components/sign';

interface SignUpConfirmPageProps {
  searchParams: Promise<{ email: string; token: string }>;
}

export default async function SignUpConfirmPage({ searchParams }: SignUpConfirmPageProps) {
  const { email, token } = await searchParams;

  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <SignUpConfirmForm email={email} token={token} />
    </main>
  );
}
