import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().trim().email('이메일 형식이 올바르지 않습니다'),
    shopName: z
      .string()
      .trim()
      .min(2, '상점명은 최소 2자 이상 입력해주세요')
      .max(20, '상점명은 최대 20자 이하로 입력해주세요'),
    password: z
      .string()
      .trim()
      .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
      .max(20, '비밀번호는 최대 20자 이하로 입력해주세요')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&+=]).{8,20}$/, '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'),
    passwordConfirm: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export const signInSchema = z.object({
  email: z.string().trim().email('이메일 형식이 올바르지 않습니다'),
  password: z
    .string()
    .trim()
    .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
    .max(20, '비밀번호는 최대 20자 이하로 입력해주세요')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&+=]).{8,20}$/, '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'),
});
