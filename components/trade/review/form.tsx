'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { tradeReviewSchema } from '@/schemas/trade';
import { zodResolver } from '@hookform/resolvers/zod';
import { StarHalfIcon, StarIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { postTradeReview } from '@/lib/trade';
import { toast } from 'sonner';
import { setErrors } from '@/lib/form';

const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface TradeReviewFormProps {
  tradeId: number;
}

export default function TradeReviewForm({ tradeId }: Readonly<TradeReviewFormProps>) {
  const form = useForm<z.infer<typeof tradeReviewSchema>>({
    resolver: zodResolver(tradeReviewSchema),
    defaultValues: { score: 10, content: '' },
  });
  const renderStars = (score: number) => {
    const isHalf = score % 2 !== 0;
    const fullStars = Math.floor(score / 2);
    return (
      <div className="flex items-center pr-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={i} className="size-4 fill-yellow-500 text-yellow-500" />
        ))}
        {isHalf && <StarHalfIcon className="size-4 fill-yellow-500 text-yellow-500" />}
      </div>
    );
  };

  function onSubmit(values: z.infer<typeof tradeReviewSchema>) {
    postTradeReview(tradeId, values)
      .then((body) => {
        toast.success(body.message);
        form.reset();
      })
      .catch((err) => setErrors(err, form.setError));
  }

  return (
    <Card className="mt-6 w-full">
      <CardHeader>
        <CardTitle>거래 후기 작성</CardTitle>
        <CardDescription>거래가 완료된 상대방에 대한 평가를 남겨주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="score"
              render={({ field, ref }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger ref={ref} className="w-fit">
                        <SelectValue placeholder="점수를 입력해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SCORES.map((score) => (
                        <SelectItem key={score.toString()} value={score.toString()}>
                          {renderStars(score)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>리뷰 내용</FormLabel>
                  <FormControl>
                    <Textarea placeholder="리뷰 내용을 입력해주세요." className="h-24 resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="submit">작성하기</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
