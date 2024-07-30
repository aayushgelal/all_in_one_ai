// app/hooks/useChat.ts
import { useState, useEffect } from 'react';

interface Conversation {
  type: 'user' | 'ai';
  content: string;
}

export function useChat(aiType: 'chatgpt' | 'claude' | 'gemini') {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    // Load conversations from local storage or API
    // This allows persistence of chats per AI type
  }, [aiType]);

  const sendMessage = async (message: string) => {
    setConversations(prev => [...prev, { type: 'user', content: message }]);
    
    // Call API based on aiType
    const response = await fetch(`/api/${aiType}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    
    setConversations(prev => [...prev, { type: 'ai', content: data.response }]);
  };

  const uploadFile = async (file: File) => {
    // Implement file upload logic
  };

  return { conversations, sendMessage, uploadFile };
}