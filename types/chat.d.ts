interface ChatRoom {
  id: number;
  lastMessageContent: string;
  participant: Shop;
}

interface ChatMessage {
  id: number;
  type: ChatMessageType;
  read: boolean;
  createdAt: Date;
  sender: Shop;
}

interface ChatMessageText extends ChatMessage {
  content: string;
}

interface ChatMessageImage extends ChatMessage {
  path: string;
}

interface ChatMessagePos extends ChatMessage {
  pos: ProductPos;
}

interface ChatMessageTrade extends ChatMessage {
  productName: string;
  productThumbnail: ProductImage;
  status: TradeStatus;
  statusMessage: string;
}

type ChatMessageType = 'TEXT' | 'IMAGE' | 'POS' | 'TRADE' | 'READ';
