import { authAPI } from '@/lib/api';
import { KyResponse } from 'ky';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';

export const signUp = async (requestBody: SignUpDTO) => {
  const response = await authAPI.post('signup', { json: requestBody });
  if (response.ok) {
    const body = await response.json<MessageBody>();
    toast.success(body.message);
  }
};

export const signIn = async (username: string, password: string) => {
  const credentials = btoa(`${username}:${password}`);
  const response = await authAPI.post('signin', { headers: { Authorization: `Basic ${credentials}` } });
  if (response.ok) {
    const body = await response.json<MessageBody>();
    toast.success(body.message);
  }
  return handleAuth(response);
};

export const signOut = async () => {
  const response = await authAPI.post('signout');
  if (response.ok) {
    sessionStorage.removeItem('Authorization');
    const body = await response.json<MessageBody>();
    toast.success(body.message);
  }
};

export const refreshToken = async () =>
  authAPI
    .post('refresh')
    .then(handleAuth)
    .catch((error) => Promise.reject(error));

const handleAuth = (response: KyResponse) => {
  const Authorization = response.headers.get('Authorization');
  if (!Authorization) {
    return Promise.reject(new Error('No authorization header'));
  }

  sessionStorage.setItem('Authorization', Authorization);

  const token = Authorization.substring(7);
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  return {
    id: decodedToken.sub,
    email: decodedToken.email,
    name: decodedToken.name,
    avatar: decodedToken.avatar,
    role: decodedToken.role,
  } as Session;
};
