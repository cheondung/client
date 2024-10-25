import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import ReactQueryProvider from '@/providers/react-query';
import AuthProvider from '@/providers/auth';
import GlobalHeader from '@/components/global/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = { title: '천둥장터' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProvider>
          <TooltipProvider>
            <AuthProvider>
              <GlobalHeader />
              {children}
            </AuthProvider>
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
