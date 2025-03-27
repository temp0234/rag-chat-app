import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatInputProps } from '../types';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        padding: 2,
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f5f5f5',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Type your question..."
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        sx={{ mr: 1 }}
        autoFocus
      />
      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        disabled={disabled || !message.trim()} 
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput; 