import React, { useRef, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ChatMessage from './ChatMessage';
import { ChatHistoryProps } from '../types';

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, loading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box 
      sx={{ 
        flex: 1, 
        overflow: 'auto', 
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          flexDirection: 'column',
          opacity: 0.7 
        }}>
          <Typography variant="h6" color="text.secondary">
            Start a conversation with the RAG assistant
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ask questions about the documents in your knowledge base
          </Typography>
        </Box>
      ) : (
        messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatHistory; 