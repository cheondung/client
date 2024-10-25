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

const formSchema = z.object({
  email: z.string().trim().email('이메일 형식이 올바르지 않습니다'),
  password: z
    .string()
    .trim()
    .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
    .max(20, '비밀번호는 최대 20자 이하로 입력해주세요'),
});

export default function SignInForm() {
  const { registerSession } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
        <p className="text-sm text-center">
          계정이 없으신가요?{' '}
          <Link href={'/signup'} className="text-primary underline">
            회원가입하기
          </Link>
        </p>
        <Button type="submit" className="w-full gap-2">
          <KeySquareIcon />
          로그인
        </Button>
      </form>
    </Form>
  );
}
