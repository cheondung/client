'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserMinusIcon } from 'lucide-react';
import { withdrawUser } from '@/lib/user';
import { useUserModal } from '@/hooks/use-modal';
import { setErrors } from '@/lib/form';
import { useAuth } from '@/hooks/use-auth';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';

const formSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
    .max(20, '비밀번호는 최대 20자 이하로 입력해주세요'),
});

export default function UserWithdrawForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '' },
  });
  const { closeWithdrawDialog } = useUserModal();
  const { unregisterSession } = useAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
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
        <div className="flex flex-col lg:flex-row gap-2">
          <Button type="button" variant="outline" className="w-full" onClick={closeWithdrawDialog}>
            <CloseIcon />
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
