// app/all/page.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "~/hooks/useChat";
import { ChatInterface } from "../_components/ChatInterface";
import { Button } from "~/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";

const AIResponse = ({ model, content }: { model: string; content: string }) => {
  const colors: { [key: string]: string } = {
    ChatGPT: "bg-green-100 border-green-300",
    Claude: "bg-purple-100 border-purple-300",
    Gemini: "bg-blue-100 border-blue-300",
  };

  return (
    <div className={`mb-4 rounded-lg border p-3 ${colors[model]} `}>
      <strong className="mb-1 block">{model}:</strong>
      <div>{content}</div>
    </div>
  );
};

const AISection = ({
  title,
  conversations,
}: {
  title: string;
  conversations: any[];
}) => (
  <div className="h-full overflow-auto rounded border border-gray-300 p-4">
    <h2 className="mb-4 text-xl font-bold">{title}</h2>
    {conversations.map((conv, index) => (
      <div
        key={index}
        className={`mb-4 ${conv.type === "user" ? "text-right" : "text-left"}`}
      >
        <div
          className={`inline-block rounded-lg p-2 ${
            conv.type === "user" ? "bg-blue-500 text-white" : "bg-green-200"
          }`}
        >
          {conv.content}
        </div>
      </div>
    ))}
  </div>
);

export default function AllAIPage() {
  const { conversations, sendMessage, uploadFile } = useChat("all");
  const [isColumnView, setIsColumnView] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const filteredConversations = (model: string) =>
    conversations.filter(
      (conv) => conv.model === model || conv.type === "user",
    );
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversations]);

  const ToggleViewButton = () => (
    <Button
      onClick={() => setIsColumnView(!isColumnView)}
      className="absolute top-[-10] z-10"
    >
      {isColumnView ? <LayoutList size={20} /> : <LayoutGrid size={20} />}
    </Button>
  );

  const ColumnView = () => (
    <div className="grid h-full grid-cols-3 gap-4" ref={chatContainerRef}>
      <AISection
        title="ChatGPT"
        conversations={filteredConversations("ChatGPT")}
      />
      <AISection
        title="Claude"
        conversations={filteredConversations("Claude")}
      />
      <AISection
        title="Gemini"
        conversations={filteredConversations("Gemini")}
      />
    </div>
  );

  const RowView = () => (
    <div className="space-y-4" ref={chatContainerRef}>
      {conversations.map((conv, index) => (
        <div key={index}>
          {conv.type === "user" ? (
            <div className="mb-4 text-right">
              <div className="inline-block rounded-lg bg-blue-500 p-3 text-white">
                {conv.content}
              </div>
            </div>
          ) : (
            <AIResponse model={conv.model!} content={conv.content} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <ChatInterface
      logo="/AI_logo.png"
      aiName="All AI Models"
      onSend={sendMessage}
      onFileUpload={uploadFile}
      isSignedIn={true}
    >
      <div className="relative h-full">
        <ToggleViewButton />
        {isColumnView ? <ColumnView /> : <RowView />}
      </div>
    </ChatInterface>
  );
}
