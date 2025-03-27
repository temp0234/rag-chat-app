import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatState } from '../types';
import { sendMessage } from '../services/api';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
  });

  // Get or create a unique session ID
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Check if sessionId exists in localStorage
    const existingSessionId = localStorage.getItem('chatSessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      // Create a new sessionId
      const newSessionId = uuidv4();
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
    
    // Load existing messages if any
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        setState(prevState => ({
          ...prevState,
          messages: JSON.parse(savedMessages),
        }));
      } catch (e) {
        console.error('Error parsing saved messages', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (state.messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    }
  }, [state.messages]);

  const sendUserMessage = useCallback(async (content: string) => {
    if (!content.trim() || !sessionId) return;

    // Create new user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    // Add user message to state
    setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, userMessage],
      loading: true,
      error: null,
    }));

    try {
      // Send message to API and get response
      const response = await sendMessage(content, sessionId);
      
      // Extract the assistant's response from the actual response format
      let assistantContent = 'Sorry, I could not process your request.';
      
      // Check the different possible response formats
      if (response && response.output) {
        // Direct object with output property - actual format from n8n
        assistantContent = response.output;
      } else if (Array.isArray(response) && response.length > 0 && response[0].output) {
        // Array format with objects containing output
        assistantContent = response[0].output;
      } else if (response.text) {
        // Object with text property
        assistantContent = response.text;
      }

      // Create assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: assistantContent,
        role: 'assistant',
        timestamp: Date.now(),
      };

      // Add assistant message to state
      setState(prevState => ({
        ...prevState,
        messages: [...prevState.messages, assistantMessage],
        loading: false,
      }));
    } catch (error) {
      console.error('Error in chat:', error);
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: 'Failed to get response. Please try again.',
      }));
    }
  }, [sessionId]);

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      loading: false,
      error: null,
    });
    localStorage.removeItem('chatMessages');
  }, []);

  return {
    messages: state.messages,
    loading: state.loading,
    error: state.error,
    sendMessage: sendUserMessage,
    clearChat,
  };
};

export default useChat; 