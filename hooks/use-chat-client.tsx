import { useContext } from 'react';
import { ChatClientContext } from '@/providers/chat-client';

const useChatClient = () => useContext(ChatClientContext);

export { useChatClient };
