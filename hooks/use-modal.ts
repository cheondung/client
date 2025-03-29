import { useContext } from 'react';
import { GlobalModalContext } from '@/providers/global-modal';
import { UserModalContext } from '@/providers/user-modal';
import { ChatModalContext } from '@/providers/chat-modal';

const useGlobalModal = () => useContext(GlobalModalContext);
const useUserModal = () => useContext(UserModalContext);
const useChatModal = () => useContext(ChatModalContext);

export { useGlobalModal, useUserModal, useChatModal };
