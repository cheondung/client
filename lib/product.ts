import { clientAPI, serverAPI } from '@/lib/api';
import { toast } from 'sonner';

export const getProducts = (searchParams: SearchProduct) =>
  serverAPI
    .get('product', {
      searchParams: {
        category: searchParams.category || '',
        query: searchParams.query || '',
        includeUsed: searchParams.includeUsed ? 'true' : 'false',
        includeSoldOut: searchParams.includeSoldOut ? 'true' : 'false',
        page: searchParams.page ? searchParams.page.toString() : '1',
      },
    })
    .json<Page<Product>>();

export const getProductDetail = (id: number) => serverAPI.get(`product/${id}`).json<ProductDetail>();

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
