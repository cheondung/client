import { clientAPI } from '@/lib/api';

export const getChatRooms = () => clientAPI.get('chat/room').json<ChatRoom[]>();

export const getChatRoom = (id: number) => clientAPI.get(`chat/room/${id}`).json<ChatRoom>();

export const getChatMessages = (id: number, cursor?: number) => {
  const searchParams = new URLSearchParams();
  if (cursor) {
    searchParams.append('cursor', cursor.toString());
  }
  return clientAPI.get(`chat/room/${id}/message`, { searchParams }).json<ChatMessage[]>();
};

export const createChatRoom = (sellerId: number) =>
  clientAPI.post(`chat/room`, { json: { sellerId } }).json<IdMessageBody>();
