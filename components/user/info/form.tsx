'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserCogIcon } from 'lucide-react';
import { editSelfShop } from '@/lib/shop';
import { setErrors } from '@/lib/form';
import { refreshToken } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { Label } from '@/components/ui/label';
import { editShopInfoSchema } from '@/schemas/shop';

interface UserInfoFormProps {
  shop: ShopDetail;
}

export default function UserInfoForm({ shop }: Readonly<UserInfoFormProps>) {
  const form = useForm<z.infer<typeof editShopInfoSchema>>({
    resolver: zodResolver(editShopInfoSchema),
    defaultValues: { ...shop, introduction: shop.introduction || '' },
  });
  const { registerSession, unregisterSession } = useAuth();

  function onSubmit(values: z.infer<typeof editShopInfoSchema>) {
    editSelfShop(values)
      .then(() => refreshToken().then(registerSession).catch(unregisterSession))
      .catch((err) => setErrors(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-2">
          <Label>이메일</Label>
          <FormControl>
            <Input value={shop.email} disabled />
          </FormControl>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상점명</FormLabel>
              <FormControl>
                <Input placeholder="상점명을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상점 소개</FormLabel>
              <FormControl>
                <Textarea placeholder="상점 소개를 입력해주세요" {...field} className="h-48 resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full gap-2">
          <UserCogIcon />
          <span>수정 완료</span>
        </Button>
      </form>
    </Form>
  );
}
