'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productPostSchema } from '@/schemas/product';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImagePlusIcon, PackagePlusIcon, RotateCcwIcon, TrashIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { parseImagePath } from '@/lib/parse';
import { uploadImage } from '@/lib/image';
import { editProduct } from '@/lib/product';
import { setErrors } from '@/lib/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ProductPostCategoryMenu } from '@/components/product';
import { Switch } from '@/components/ui/switch';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

interface ProductEditFormProps {
  id: number;
  categories: ProductCategoryTree[];
  defaultValues: z.infer<typeof productPostSchema>;
  defaultCategory: ProductCategory;
}

export default function ProductEditForm({
  id,
  categories,
  defaultValues,
  defaultCategory,
}: Readonly<ProductEditFormProps>) {
  const form = useForm({ resolver: zodResolver(productPostSchema), defaultValues });
  const router = useRouter();
  const [category, setCategory] = useState<ProductCategory | undefined>(defaultCategory);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file).then(({ pathname }) =>
        form.setValue('images', [...form.getValues('images'), { path: pathname, source: 'VERCEL' }])
      );
    }
  }

  function onImageDelete(index: number) {
    form.setValue(
      'images',
      form.getValues('images').filter((_, i) => i !== index)
    );
  }

  function onSubmit(values: z.infer<typeof productPostSchema>) {
    editProduct(id, values)
      .then((body) => {
        toast.success(body.message);
        router.push(`/product/${body.id}`);
      })
      .catch((err) => setErrors(err, form.setError));
  }

  useEffect(() => {
    if (category) {
      form.setValue('categoryId', category.id);
    }
  }, [form, category]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>상품 이미지 ({field.value.length}/10)</FormLabel>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {field.value.map((image: ProductImage, index: number) => (
                  <ContextMenu key={index}>
                    <ContextMenuTrigger className="relative aspect-square overflow-hidden rounded-md border">
                      <Image
                        src={parseImagePath(image.path, image.source)}
                        alt={'상품 이미지'}
                        fill
                        className="object-cover"
                      />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem className="gap-2" onClick={() => onImageDelete(index)}>
                        <TrashIcon size={16} /> 삭제
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="aspect-square h-auto w-auto border-dashed"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <ImagePlusIcon /> 사진 추가
                  <input type="file" className="hidden" ref={imageInputRef} onChange={onImageChange} />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품명</FormLabel>
              <FormControl>
                <Input type="text" placeholder="상품명을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품 설명</FormLabel>
              <FormControl>
                <Textarea className="h-64 resize-none" placeholder="상품 설명을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4 md:flex-row lg:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>가격</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="가격을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingFee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>배송비</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="배송비를 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isUsed"
          render={({ field }) => (
            <FormItem>
              <Card className="flex items-center justify-between rounded-md shadow-none">
                <CardHeader className="p-4">
                  <FormLabel>중고 상품 여부</FormLabel>
                  <FormDescription>중고 상품인 경우 체크해주세요.</FormDescription>
                  <FormMessage />
                </CardHeader>
                <CardContent className="p-4">
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </CardContent>
              </Card>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={() => (
            <FormItem>
              <Card className="flex items-center justify-between rounded-md shadow-none">
                <CardHeader className="p-4">
                  <FormLabel>상품 카테고리</FormLabel>
                  <FormDescription>{category?.name || '카테고리를 선택해주세요'}</FormDescription>
                  <FormMessage />
                </CardHeader>
                <CardContent className="p-4">
                  <ProductPostCategoryMenu categories={categories} setCategory={setCategory} />
                </CardContent>
              </Card>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="reset" variant="outline" onClick={() => form.reset()}>
            <RotateCcwIcon /> 초기화
          </Button>
          <Button type="submit">
            <PackagePlusIcon /> 상품 등록
          </Button>
        </div>
      </form>
    </Form>
  );
}
