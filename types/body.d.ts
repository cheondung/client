interface MessageBody {
  message: string;
  status: string;
  timestamp: Date;
}

interface ErrorBody extends MessageBody {
  fieldErrors?: Record<string, string>;
}

interface IdMessageBody extends MessageBody {
  id: string;
}
