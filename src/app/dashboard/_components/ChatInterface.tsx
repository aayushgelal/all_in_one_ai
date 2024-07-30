// app/components/ChatLayout.tsx
"use client"
import React, { ReactNode } from 'react';
import { Paperclip, Send, Upload } from 'lucide-react';
import { Button } from '~/components/ui/button';
import Image from 'next/image';

interface ChatLayoutProps {
  children: ReactNode;
  logo: string;
  aiName: string;
  onSend: (message: string) => void;
  onFileUpload: (file: File) => void;
}

export function ChatInterface({ children, logo, aiName, onSend, onFileUpload }: ChatLayoutProps) {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex items-center">
        <Image src={logo} alt={`${aiName} logo`} width={40} height={40} className="mr-4 rounded-lg" />
        <h1 className="text-2xl font-bold">{aiName} Chat</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
      <footer className="relative w-full max-w-3xl mx-auto mb-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-4 pr-24 rounded-full bg-white shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
        placeholder="Type your message..."
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileUpload(file);
            }}
          />
          <Paperclip className="h-6 w-6 text-gray-500 hover:text-blue-500 transition-colors duration-200" />
        </label>
        <Button
          onClick={handleSend}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
        >
          <Send size={20} className="text-white" />
        </Button>
      </div>
    </footer>
    
    </div>
  );
}