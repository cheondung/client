interface ChatMessageTextContentProps {
  message: ChatMessageText;
}

export default function ChatMessageTextContent({ message }: Readonly<ChatMessageTextContentProps>) {
  return <div className="break-words px-3 py-2">{message.content}</div>;
}
