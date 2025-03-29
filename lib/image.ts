import ky from 'ky';

export const uploadImage = (file: File) => ky.post(`/api/image`, { body: file }).json<{ pathname: string }>();
