import React from 'react';
import { 
  Box, 
  Container, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Alert, 
  Snackbar 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import useChat from './hooks/useChat';

function App() {
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RAG Document Assistant
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={clearChat}
            title="Clear chat history"
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: 'calc(100% - 64px)' }}>
        <ChatHistory messages={messages} loading={loading} />
        <ChatInput onSendMessage={sendMessage} disabled={loading} />
      </Container>

      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
