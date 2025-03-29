'use client';

import { createContext, ReactNode, useState } from 'react';
import { GlobalImageDialog } from '@/components/global';

type GlobalModalContextType = {
  image?: string;
  openImageDialog: (image: string) => void;
  closeImageDialog: () => void;
};

export const GlobalModalContext = createContext({} as GlobalModalContextType);

export default function GlobalModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [image, setImage] = useState<string>();

  return (
    <GlobalModalContext.Provider
      value={{
        image,
        openImageDialog: (image: string) => setImage(image),
        closeImageDialog: () => setImage(undefined),
      }}
    >
      {children}
      <GlobalImageDialog />
    </GlobalModalContext.Provider>
  );
}
