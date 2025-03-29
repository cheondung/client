import { z } from 'zod';

export const editShopInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, '상점명은 최소 2자 이상 입력해주세요')
    .max(20, '상점명은 최대 20자 이하로 입력해주세요'),
  introduction: z.string().trim().max(1024, '상점 소개는 1024자 이하로 입력해주세요'),
});
