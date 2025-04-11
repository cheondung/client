'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { SquarePercentIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productDiscountSchema } from '@/schemas/product';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { setProductDiscount, unsetProductDiscount } from '@/lib/product';
import { toast } from 'sonner';
import { setErrors } from '@/lib/form';
import { z } from 'zod';

interface ProductDiscountPopoverProps {
  productId: number;
  discount?: ProductDiscount;
}

export default function ProductDiscountPopover({ productId, discount }: Readonly<ProductDiscountPopoverProps>) {
  const form = useForm<z.infer<typeof productDiscountSchema>>({
    resolver: zodResolver(productDiscountSchema),
    defaultValues: { price: discount?.price.toString(), duration: discount?.duration.toString() },
  });

  function onUnset() {
    unsetProductDiscount(productId)
      .then((body) => {
        toast.success(body.message);
        form.setValue('price', '0');
        form.setValue('duration', '0');
      })
      .catch((err) => setErrors(err, form.setError));
  }

  function onSubmit(values: z.infer<typeof productDiscountSchema>) {
    setProductDiscount(productId, values)
      .then((body) => toast.success(body.message))
      .catch((err) => setErrors(err, form.setError));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="px-3" variant="outline">
          <SquarePercentIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <h4 className="text-lg font-semibold">자동 가격 내림</h4>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>할인 가격</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="자동으로 내릴 가격을 입력해주세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>할인 주기</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="자동으로 내릴 주기를 입력해주세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <hr />
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="w-full" onClick={onUnset}>
                해제
              </Button>
              <Button type="submit" className="w-full">
                저장
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
