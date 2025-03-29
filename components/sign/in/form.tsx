'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { KeySquareIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth';
import { setErrors } from '@/lib/form';
import Link from 'next/link';
import { signInSchema } from '@/schemas/auth';

export default function SignInForm() {
  const { registerSession } = useAuth();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    signIn(values.email, values.password)
      .then((session) => registerSession(session))
      .catch((error) => setErrors(error, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-center text-sm">
          계정이 없으신가요?{' '}
          <Link href={'/signup'} className="text-primary underline">
            회원가입하기
          </Link>
        </p>
        <Button type="submit" className="w-full gap-2">
          <KeySquareIcon />
          <span>로그인</span>
        </Button>
      </form>
    </Form>
  );
}
