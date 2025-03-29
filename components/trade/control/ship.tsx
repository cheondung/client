'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tradeShipSchema } from '@/schemas/trade';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { TruckIcon } from 'lucide-react';
import { shipTrade } from '@/lib/trade';
import { toast } from 'sonner';
import { setErrors } from '@/lib/form';
import { useQueryClient } from 'react-query';

interface TradeControlShipProps {
  id: number;
  refetch: () => void;
}

const shippingCompanies = [
  { value: 'CJ', label: 'CJ 대한통운' },
  { value: 'CU', label: 'CU 편의점택배' },
  { value: 'GS', label: 'GS Postbox 택배' },
  { value: 'EPOST', label: '우체국택배' },
  { value: 'HANJIN', label: '한진택배' },
];

export default function TradeControlShip({ id, refetch }: Readonly<TradeControlShipProps>) {
  const form = useForm({
    resolver: zodResolver(tradeShipSchema),
    defaultValues: {
      shippingCompany: 'CJ',
      trackingNumber: '',
    },
  });
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof tradeShipSchema>) {
    shipTrade(id, values)
      .then((body) => {
        toast.success(body.message);
        refetch();
        queryClient.invalidateQueries(['deliveryTrack', id]);
      })
      .catch((err) => setErrors(err, form.setError));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">운송장 등록</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>운송장 등록</DialogTitle>
          <DialogDescription>운송장을 등록하시려면 아래 폼을 작성해주세요.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="shippingCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>배송사</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="배송사를 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shippingCompanies.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
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
              name="trackingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>운송장번호</FormLabel>
                  <FormControl>
                    <Input placeholder="운송장 번호를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogTrigger asChild>
              <Button type="submit" className="ml-auto">
                <TruckIcon /> 운송장 등록
              </Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
