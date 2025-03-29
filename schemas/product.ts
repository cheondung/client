import { z } from 'zod';

export const productSearchSchema = z.object({
  category: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().int().optional()),
  query: z.string().optional(),
  excludeUsed: z.preprocess((val) => val === 'on' || val === true, z.boolean().default(true)),
  excludeSoldOut: z.preprocess((val) => val === 'on' || val === true, z.boolean().default(true)),
  page: z.coerce.number().int().default(1),
});

export const productPostSchema = z.object({
  name: z.string().min(6, '상품명은 최소 6자 이상 입력해주세요').max(30, '상품명은 최대 30자 이하로 입력해주세요'),
  description: z
    .string()
    .min(10, '상품 설명은 최소 10자 이상 입력해주세요')
    .max(1024, '상품 설명은 최대 1024자 이하로 입력해주세요'),
  price: z
    .string()
    .min(1, '상품 가격을 입력해주세요')
    .default('')
    .refine((val) => !isNaN(Number(val)), { message: '상품 가격은 숫자로 입력해주세요' })
    .refine((val) => Number(val) > 1_000 && Number(val) < 1_000_000, {
      message: '상품 가격은 1,000원 이상 1,000,000원 이하로 입력해주세요',
    }),
  shippingFee: z
    .string()
    .min(1, '배송비를 입력해주세요')
    .default('')
    .refine((val) => !isNaN(Number(val)), { message: '배송비는 숫자로 입력해주세요' })
    .refine((val) => Number(val) >= 0 && Number(val) < 100_000, {
      message: '배송비는 100,000원 이하로 입력해주세요',
    }),
  isUsed: z.boolean(),
  categoryId: z.number(),
  images: z
    .array(
      z.object({
        path: z.string(),
        source: z.enum(['VERCEL', 'BUNJANG']),
      })
    )
    .min(1, '상품 이미지는 최소 1개 이상 등록해주세요')
    .max(10, '상품 이미지는 최대 10개까지 등록할 수 있습니다'),
});

export const productDiscountSchema = z.object({
  price: z
    .string()
    .min(1, '할인 가격을 입력해주세요')
    .default('')
    .refine((val) => !isNaN(Number(val)), { message: '할인 가격은 숫자로 입력해주세요' })
    .refine((val) => Number(val) > 0 && Number(val) < 100_000, {
      message: '할인 가격은 0원 이상 100,000원 이하로 입력해주세요',
    }),
  duration: z
    .string()
    .min(1, '할인 주기를 입력해주세요')
    .default('')
    .refine((val) => !isNaN(Number(val)), { message: '할인 주기는 숫자로 입력해주세요' }),
});
