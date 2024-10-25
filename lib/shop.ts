import { serverAPI } from '@/lib/api';

export const getShop = (id: number) => serverAPI.get(`shop/${id}`).json<Shop>();
export const getShopProducts = (id: number, page = 1) =>
  serverAPI.get(`shop/${id}/product?page=${page}`).json<Page<Product>>();
