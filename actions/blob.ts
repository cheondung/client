'use server';

import { put } from '@vercel/blob';

export async function uploadAvatar(file: File) {
  const { url } = await put(`avatars/${file.name}`, file, { access: 'public' });
  return url.slice(url.lastIndexOf('/') + 1);
}
