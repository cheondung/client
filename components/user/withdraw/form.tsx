'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserMinusIcon, XIcon } from 'lucide-react';
import { withdrawUser } from '@/lib/user';
import { useUserModal } from '@/hooks/use-modal';
import { setErrors } from '@/lib/form';
import { useAuth } from '@/hooks/use-auth';
import { withdrawSchema } from '@/schemas/user';

export default function UserWithdrawForm() {
  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { password: '' },
  });
  const { closeWithdrawDialog } = useUserModal();
  const { unregisterSession } = useAuth();

  function onSubmit(values: z.infer<typeof withdrawSchema>) {
    withdrawUser(values.password)
      .then(() => {
        closeWithdrawDialog();
        unregisterSession();
      })
      .catch((err) => setErrors(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="flex flex-col gap-2 lg:flex-row">
          <Button type="button" variant="outline" className="w-full" onClick={closeWithdrawDialog}>
            <XIcon />
            <span>취소</span>
          </Button>
          <Button type="submit" className="w-full gap-2">
            <UserMinusIcon />
            <span>회원 탈퇴</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
