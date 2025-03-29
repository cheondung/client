import { clientAPI } from '@/lib/api';
import { z } from 'zod';
import { tradeReviewSchema, tradeShipSchema } from '@/schemas/trade';

export const getTrades = () => clientAPI.get('trade').json<Trade[]>();

export const getTrade = (id: number) => clientAPI.get(`trade/${id}`).json<TradeDetail>();

export const getDeliveryTrack = (id: number) =>
  clientAPI
    .get(`trade/${id}/delivery/track`)
    .json<DeliveryTrack[]>()
    .catch(() => []);
export const requestTrade = (productId: number) =>
  clientAPI.post(`trade/request`, { json: { productId } }).json<IdMessageBody>();

export const cancelTrade = (id: number) => clientAPI.post(`trade/${id}/cancel`).json<IdMessageBody>();

export const rejectTrade = (id: number) => clientAPI.post(`trade/${id}/reject`).json<IdMessageBody>();

export const acceptTrade = (id: number) => clientAPI.post(`trade/${id}/accept`).json<IdMessageBody>();

export const shipTrade = (id: number, json: z.infer<typeof tradeShipSchema>) =>
  clientAPI.post(`trade/${id}/ship`, { json }).json<IdMessageBody>();

export const completeTrade = (id: number) => clientAPI.post(`trade/${id}/complete`).json<IdMessageBody>();

export const postTradeReview = (id: number, json: z.infer<typeof tradeReviewSchema>) =>
  clientAPI.post(`trade/${id}/review`, { json }).json<IdMessageBody>();

export const removeTradeReview = (tradeId: number, reviewId: number) =>
  clientAPI.delete(`trade/${tradeId}/review/${reviewId}`).json<MessageBody>();
