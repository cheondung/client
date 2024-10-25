'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth';
import { setErrors } from '@/lib/form';
import Link from 'next/link';

const formSchema = z
  .object({
    email: z.string().trim().email('이메일 형식이 올바르지 않습니다'),
    shopName: z
      .string()
      .trim()
      .min(2, '상점명은 최소 2자 이상 입력해주세요')
      .max(20, '상점명은 최대 20자 이하로 입력해주세요'),
    password: z
      .string()
      .trim()
      .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
      .max(20, '비밀번호는 최대 20자 이하로 입력해주세요'),
    passwordConfirm: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', shopName: '', password: '', passwordConfirm: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUp(values)
      .then(() => router.replace('/signin'))
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
        <p className="text-sm text-center">
          이미 계정이 있습니까?{' '}
          <Link href={'/signin'} className="text-primary underline">
            로그인하기
          </Link>
        </p>
        <Button type="submit" className="w-full gap-2">
          <UserPlusIcon />
          회원가입
        </Button>
      </form>
    </Form>
  );
}
