"use client";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

interface ChatLayoutProps {
  children: ReactNode;
  logo: string;
  aiName: string;
  onSend: (message: string) => void;
  onFileUpload: (file: File) => void;
  isSignedIn: boolean;
}

export function ChatInterface({
  children,
  logo,
  aiName,
  onSend,
  onFileUpload,
  isSignedIn = true,
}: ChatLayoutProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && isSignedIn) {
      onSend(message);
      setMessage("");
    }
  };

  const isButtonDisabled = !message.trim() || !isSignedIn;

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="flex items-center bg-white p-4 shadow-sm">
        <Image
          src={logo}
          alt={`${aiName} logo`}
          width={36}
          height={36}
          className="mr-4 rounded-md"
        />
        <h1 className="text-xl font-semibold">{aiName} Chat</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
      <footer className="bg-white p-4">
        <div className="relative mx-auto max-w-3xl">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none overflow-hidden rounded-3xl border border-gray-300 bg-gray-100 p-3 pr-20 text-sm shadow-sm transition-shadow duration-200 ease-in-out focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type your message..."
            rows={1}
            style={{ minHeight: "50px" }}
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center space-x-2">
            <label className="cursor-pointer rounded-full bg-white p-1.5 transition-colors duration-200 hover:bg-gray-100">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onFileUpload(file);
                }}
              />
              <Paperclip className="h-4 w-4 text-gray-400 transition-colors duration-200 hover:text-blue-500" />
            </label>
            <Button
              onClick={handleSend}
              disabled={isButtonDisabled}
              className="rounded-full bg-blue-500 p-3 text-center transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={20} className="text-white" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
