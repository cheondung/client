import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
      .max(20, '비밀번호는 최대 20자 이하로 입력해주세요'),
    newPassword: z
      .string()
      .trim()
      .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
      .max(20, '비밀번호는 최대 20자 이하로 입력해주세요'),
    newPasswordConfirm: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export const withdrawSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
    .max(20, '비밀번호는 최대 20자 이하로 입력해주세요'),
});

export const addUserWishlistSchema = z.object({
  keyword: z.string().min(4, '키워드는 최소 4자 이상 입력해주세요').max(255, '키워드는 최대 255자 이하로 입력해주세요'),
});
