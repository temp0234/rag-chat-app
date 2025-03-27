export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatHistoryProps {
  messages: Message[];
  loading: boolean;
} 