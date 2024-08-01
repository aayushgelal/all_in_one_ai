// app/hooks/useChat.ts
import { useState } from "react";
import { LanguageModel, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

interface Conversation {
  type: "user" | "ai";
  content: string;
  model?: string;
}

export function useChat(aiType: "chatgpt" | "claude" | "gemini" | "all") {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const sendMessage = async (message: string) => {
    setConversations((prev) => [...prev, { type: "user", content: message }]);

    if (aiType === "all") {
      const models = [
        { name: "ChatGPT", model: openai("gpt-4-turbo") },
        { name: "Claude", model: anthropic("claude-3-5-sonnet-20240620") },
        { name: "Gemini", model: google("models/gemini-1.5-flash-latest") },
      ];

      for (const { name, model } of models) {
        try {
          const { text } = await generateText({
            model: model,
            prompt: message,
          });

          setConversations((prev) => [
            ...prev,
            { type: "ai", content: text, model: name },
          ]);
        } catch (error: any) {
          console.error(`Error with ${name}:`, error);
          setConversations((prev) => [
            ...prev,
            {
              type: "ai",
              content: `Error with ${name}: ${error.message}`,
              model: name,
            },
          ]);
        }
      }
    } else {
      let model: LanguageModel;
      let modelName: string;

      if (aiType === "chatgpt") {
        model = openai("gpt-4-turbo");
        modelName = "ChatGPT";
      } else if (aiType === "claude") {
        model = anthropic("claude-3-5-sonnet-20240620");
        modelName = "Claude";
      } else if (aiType === "gemini") {
        model = google("models/gemini-1.5-flash-latest");
        modelName = "Gemini";
      } else {
        throw new Error("Invalid AI type");
      }

      try {
        const { text } = await generateText({
          model: model,
          prompt: message,
        });

        setConversations((prev) => [
          ...prev,
          { type: "ai", content: text, model: modelName },
        ]);
      } catch (error: any) {
        console.error(`Error with ${modelName}:`, error);
        setConversations((prev) => [
          ...prev,
          {
            type: "ai",
            content: `Error with ${modelName}: ${error.message}`,
            model: modelName,
          },
        ]);
      }
    }
  };

  const uploadFile = async (file: File) => {
    // Implement file upload logic if needed
    console.log("File upload not implemented yet");
  };

  return { conversations, sendMessage, uploadFile };
}
