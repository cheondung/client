'use client';

import { createContext, ReactNode, useState } from 'react';
import { UserAvatarDialog, UserPasswordDialog, UserWithdrawDialog } from '@/components/user';

type UserModalContextType = {
  avatar?: string;
  openAvatarDialog: (avatar: string | undefined) => void;
  closeAvatarDialog: () => void;
  isPasswordDialogOpen: boolean;
  openPasswordDialog: () => void;
  closePasswordDialog: () => void;
  isWithdrawDialogOpen: boolean;
  openWithdrawDialog: () => void;
  closeWithdrawDialog: () => void;
};

export const UserModalContext = createContext({} as UserModalContextType);

export default function UserModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [avatar, setAvatar] = useState<string>();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  return (
    <UserModalContext.Provider
      value={{
        avatar,
        openAvatarDialog: setAvatar,
        closeAvatarDialog: () => setAvatar(undefined),
        isPasswordDialogOpen,
        openPasswordDialog: () => setIsPasswordDialogOpen(true),
        closePasswordDialog: () => setIsPasswordDialogOpen(false),
        isWithdrawDialogOpen,
        openWithdrawDialog: () => setIsWithdrawDialogOpen(true),
        closeWithdrawDialog: () => setIsWithdrawDialogOpen(false),
      }}
    >
      {children}
      <UserAvatarDialog />
      <UserPasswordDialog />
      <UserWithdrawDialog />
    </UserModalContext.Provider>
  );
}
