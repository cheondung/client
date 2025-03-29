'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SquareAsteriskIcon } from 'lucide-react';
import { updateUserPassword } from '@/lib/user';
import { useUserModal } from '@/hooks/use-modal';
import { setErrors } from '@/lib/form';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { updatePasswordSchema } from '@/schemas/user';

export default function UserPasswordForm() {
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', newPasswordConfirm: '' },
  });
  const { closePasswordDialog } = useUserModal();

  function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    updateUserPassword(values)
      .then(closePasswordDialog)
      .catch((err) => setErrors(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>기존 비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="기존 비밀번호를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새 비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="새 비밀번호를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPasswordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새 비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" placeholder="새 비밀번호를 다시 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 lg:flex-row">
          <Button type="button" variant="outline" className="w-full" onClick={closePasswordDialog}>
            <CloseIcon />
            <span>취소</span>
          </Button>
          <Button type="submit" className="w-full">
            <SquareAsteriskIcon />
            <span>비밀번호 변경</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
