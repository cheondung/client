import { z } from 'zod';

export const tradeShipSchema = z.object({
  shippingCompany: z.union([
    z.literal('CJ'),
    z.literal('CU'),
    z.literal('GS'),
    z.literal('EPOST'),
    z.literal('HANJIN'),
    z.string().transform(() => 'CJ'),
  ]),
  trackingNumber: z.string().regex(/^[0-9]{10,12}$/, '송장번호는 10~12자리의 숫자로 입력해주세요'),
});

export const tradeReviewSchema = z.object({
  score: z.coerce.number().int().min(1, '별점은 1점 이상 입력해주세요').max(10, '별점은 5점 이하 입력해주세요'),
  content: z.string().min(1, '리뷰 내용을 입력해주세요').max(255, '리뷰 내용은 255자 이하로 입력해주세요'),
});
