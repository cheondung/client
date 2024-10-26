import { clientAPI } from '@/lib/api';
import { toast } from 'sonner';

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
