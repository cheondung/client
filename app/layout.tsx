import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ReactQueryProvider from '@/providers/react-query';
import AuthProvider from '@/providers/auth';
import GlobalHeader from '@/components/global/header/header';
import GlobalFooter from '@/components/global/footer/footer';
import GlobalModalProvider from '@/providers/global-modal';
import './globals.css';
import KakaoMapProvider from '@/providers/kakao-map';
import SupportProvider from '@/providers/support';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = { title: '천둥장터' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProvider>
          <TooltipProvider>
            <AuthProvider>
              <KakaoMapProvider>
                <GlobalModalProvider>
                  <SupportProvider>
                    <GlobalHeader />
                    {children}
                    <GlobalFooter />
                  </SupportProvider>
                </GlobalModalProvider>
              </KakaoMapProvider>
            </AuthProvider>
          </TooltipProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
