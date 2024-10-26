'use client';

import { createContext, ReactNode, useState } from 'react';
import { UserPasswordDialog, UserWithdrawDialog } from '@/components/user';

type UserModalContextType = {
  isPasswordDialogOpen: boolean;
  openPasswordDialog: () => void;
  closePasswordDialog: () => void;
  isWithdrawDialogOpen: boolean;
  openWithdrawDialog: () => void;
  closeWithdrawDialog: () => void;
};

export const UserModalContext = createContext({} as UserModalContextType);

export default function UserModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  return (
    <UserModalContext.Provider
      value={{
        isPasswordDialogOpen,
        openPasswordDialog: () => setIsPasswordDialogOpen(true),
        closePasswordDialog: () => setIsPasswordDialogOpen(false),
        isWithdrawDialogOpen,
        openWithdrawDialog: () => setIsWithdrawDialogOpen(true),
        closeWithdrawDialog: () => setIsWithdrawDialogOpen(false),
      }}
    >
      {children}
      <UserPasswordDialog />
      <UserWithdrawDialog />
    </UserModalContext.Provider>
  );
}
