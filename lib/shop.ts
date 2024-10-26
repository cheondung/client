import { clientAPI, serverAPI } from '@/lib/api';
import { toast } from 'sonner';

export const getShop = (id: number) => serverAPI.get(`shop/${id}`).json<Shop>();

export const getShopProducts = (id: number, page = 1) =>
  serverAPI.get(`shop/${id}/product?page=${page}`).json<Page<Product>>();

export const getSelfShop = () => clientAPI.get('shop/self').json<ShopDetail>();

export const editSelfShop = async (request: EditShop) =>
  clientAPI
    .put('shop/self', { json: request })
    .json<IdMessageBody>()
    .then((body) => toast.success(body.message));
