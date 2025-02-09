// app/chatgpt/page.tsx
"use client"
import React from 'react';
import { ChatInterface } from '../_components/ChatInterface';
import { useChat } from '~/hooks/useChat';

export default function ChatGPTPage() {
  const { conversations, sendMessage, uploadFile } = useChat('chatgpt');

  return (
    <ChatInterface
      logo="/Claude_logo.png"
      aiName="Claude"
      onSend={sendMessage}
      onFileUpload={uploadFile}
    >
      {conversations.map((conv:any, index:any) => (
        <div key={index} className={`mb-4 ${conv.type === 'user' ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-2 rounded-lg ${conv.type === 'user' ? 'bg-blue-500 text-white' : 'bg-green-200'}`}>
            {conv.content}
          </div>
        </div>
      ))}
    </ChatInterface>
  );
}