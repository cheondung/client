import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

export async function POST(req: Request) {
  const blob = await req.blob();
  const { url } = await put(randomUUID(), blob, { access: 'public' });
  return NextResponse.json({ pathname: new URL(url).pathname.slice(1) });
}
