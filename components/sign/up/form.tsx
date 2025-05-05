'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { requestSignUp } from '@/lib/auth';
import { setErrors } from '@/lib/form';
import Link from 'next/link';
import { signUpSchema } from '@/schemas/auth';

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', shopName: '', password: '', passwordConfirm: '' },
  });
  const router = useRouter();

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    requestSignUp(values)
      .then(() => router.replace('/'))
      .catch((err) => setErrors(err, form.setError));
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
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상점명</FormLabel>
              <FormControl>
                <Input placeholder="상점명 입력해주세요" {...field} />
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 다시 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-center text-sm">
          이미 계정이 있습니까?{' '}
          <Link href={'/signin'} className="text-primary underline">
            로그인하기
          </Link>
        </p>
        <Button type="submit" className="w-full gap-2">
          <UserPlusIcon />
          <span>회원가입</span>
        </Button>
      </form>
    </Form>
  );
}
