import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ReactMarkdown from 'react-markdown';
import { ChatMessageProps } from '../types';

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 2,
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          mx: 1,
        }}
      >
        {isUser ? <PersonIcon /> : <SmartToyIcon />}
      </Avatar>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          backgroundColor: isUser ? 'primary.light' : 'grey.100',
          borderRadius: isUser ? '16px 0 16px 16px' : '0 16px 16px 16px',
        }}
      >
        {isUser ? (
          <Typography variant="body1">
            {message.content}
          </Typography>
        ) : (
          <Box sx={{ 
            '& p': { margin: '0 0 0.5rem 0' },
            '& h1': { fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' },
            '& h2': { fontSize: '1.3rem', marginTop: '0.5rem', marginBottom: '0.5rem' },
            '& h3': { fontSize: '1.1rem', marginTop: '0.5rem', marginBottom: '0.5rem' },
            '& ul, & ol': { marginTop: '0.2rem', paddingLeft: '1.5rem' },
            '& li': { margin: '0.1rem 0' },
            '& code': { 
              backgroundColor: 'rgba(0, 0, 0, 0.05)', 
              padding: '0.2rem 0.4rem', 
              borderRadius: '3px',
              fontFamily: 'monospace'
            },
            '& pre': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '0.5rem',
              borderRadius: '4px',
              overflowX: 'auto',
              '& code': {
                backgroundColor: 'transparent',
                padding: 0
              }
            },
            '& a': { color: 'primary.main' },
            '& blockquote': {
              borderLeft: '3px solid #ddd',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              margin: '0.5rem 0'
            },
            '& table': {
              borderCollapse: 'collapse',
              width: '100%',
              marginBottom: '1rem'
            },
            '& th, & td': {
              border: '1px solid #ddd',
              padding: '0.3rem'
            },
            '& th': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
            }
          }}>
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage; 