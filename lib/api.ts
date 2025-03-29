import ky, { KyRequest, KyResponse, NormalizedOptions } from 'ky';
import { toast } from 'sonner';
import { notFound } from 'next/navigation';

const toastError = async (request: KyRequest, options: NormalizedOptions, response: KyResponse) => {
  if (response.ok) return;

  const { message } = await response.json<ErrorBody>();
  if (message) toast.error(message);
};

export const serverAPI = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api`,
  hooks: {
    afterResponse: [
      (_req, _opt, res) => {
        if (res.status === 404) {
          notFound();
        }
      },
    ],
  },
});

export const clientAPI = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api`,
  credentials: 'include',
  hooks: {
    beforeRequest: [(request) => request.headers.set('Authorization', sessionStorage.getItem('Authorization') || '')],
    afterResponse: [toastError],
  },
});

export const authAPI = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth`,
  credentials: 'include',
  hooks: { afterResponse: [toastError] },
});
