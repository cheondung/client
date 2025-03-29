import { clientAPI, serverAPI } from '@/lib/api';
import { toast } from 'sonner';

export const getShopDetail = async (id: number) => serverAPI.get(`shop/${id}`).json<Shop>();

export const getShopProducts = async (id: number, page = 1) =>
  serverAPI.get(`shop/${id}/product?page=${page}`).json<Page<Product>>();

export const editSelfShopAvatar = async (avatar: string) =>
  clientAPI.patch('shop/self/avatar', { json: { avatar } }).json<IdMessageBody>();

export const getSelfShop = async () => clientAPI.get('shop/self').json<ShopDetail>();

export const editSelfShop = async (request: EditShop) =>
  clientAPI
    .put('shop/self', { json: request })
    .json<IdMessageBody>()
    .then((body) => toast.success(body.message));
