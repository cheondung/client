import { clientAPI, serverAPI } from '@/lib/api';
import { toast } from 'sonner';
import { z } from 'zod';
import { productDiscountSchema, productPostSchema, productSearchSchema } from '@/schemas/product';

export const getProducts = (searchParams: z.infer<typeof productSearchSchema>) =>
  serverAPI.get('product', { searchParams }).json<Page<Product>>();

export const getProductDetail = (id: number) => serverAPI.get(`product/${id}`).json<ProductDetail>();

export const getSimilarProducts = (id: number) => serverAPI.get(`product/${id}/similar`).json<Product[]>();

export const getProductCategories = () =>
  serverAPI.get('product/category', { cache: 'force-cache' }).json<ProductCategoryTree[]>();

export const getInterestProducts = () => clientAPI.get('product/interest').json<Product[]>();

export const isInterestProduct = (id: number) =>
  clientAPI.get(`product/${id}/interest`).then((res) => res.status === 200);

export const addInterest = (id: number) =>
  clientAPI
    .post(`product/${id}/interest`)
    .json<MessageBody>()
    .then((body) => toast.success(body.message));

export const removeInterest = (id: number) =>
  clientAPI
    .delete(`product/${id}/interest`)
    .json<MessageBody>()
    .then((body) => toast.success(body.message));

export const postProduct = async (values: z.infer<typeof productPostSchema>) =>
  clientAPI.post('product', { json: { ...values } }).json<IdMessageBody>();

export const editProduct = (id: number, json: z.infer<typeof productPostSchema>) =>
  clientAPI.put(`product/${id}`, { json }).json<IdMessageBody>();

export const setProductDiscount = (id: number, json: z.infer<typeof productDiscountSchema>) =>
  clientAPI.post(`product/${id}/discount`, { json }).json<IdMessageBody>();

export const unsetProductDiscount = (id: number) => clientAPI.delete(`product/${id}/discount`).json<IdMessageBody>();
