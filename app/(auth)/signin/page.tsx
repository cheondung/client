import { SignInCard, SignInForm } from '@/components/sign';

export default function SignInPage() {
  return (
    <main className="mx-auto min-h-screen space-y-8 px-8 pb-8 pt-24 lg:container">
      <SignInCard>
        <SignInForm />
      </SignInCard>
    </main>
  );
}
