import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.bunjang.co.kr',
        pathname: '/product/**',
      },
      {
        protocol: 'https',
        hostname: process.env.BLOB_HOST as string,
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
