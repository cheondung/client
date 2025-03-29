import { clientAPI } from '@/lib/api';
import { toast } from 'sonner';
import { z } from 'zod';
import { addUserWishlistSchema } from '@/schemas/user';

export const updateUserPassword = (requestBody: EditUserPassword) =>
  clientAPI
    .patch('user/password', { json: requestBody })
    .json<IdMessageBody>()
    .then((body) => toast.success(body.message));

export const withdrawUser = (password: string) =>
  clientAPI
    .post('user/withdraw', { json: { password } })
    .json<IdMessageBody>()
    .then((body) => toast.success(body.message));

export const getUserNotifications = () => clientAPI.get('user/notification').json<UserNotification[]>();

export const getUserWishlist = () => clientAPI.get('user/wishlist').json<UserWishlist[]>();

export const addUserWishlist = (json: z.infer<typeof addUserWishlistSchema>) =>
  clientAPI
    .post('user/wishlist', { json })
    .json<IdMessageBody>()
    .then((body) => toast.success(body.message));

export const deleteUserWishlist = (id: number) =>
  clientAPI
    .delete(`user/wishlist/${id}`)
    .json<IdMessageBody>()
    .then((body) => toast.success(body.message));
