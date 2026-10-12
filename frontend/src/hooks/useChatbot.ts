
import { useEffect, useState } from "react";
import { getBotResponse } from "../data/chatbotResponses";

export interface ChatMessageData {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const STORAGE_KEY = "dronetv_chat_history";

function createMessage(
  sender: ChatMessageData["sender"],
  text: string
): ChatMessageData {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    sender,
    text,
    timestamp: new Date().toISOString(),
  };
}

const welcomeMessage = (): ChatMessageData =>
  createMessage(
    "bot",
    "Welcome to DroneTV Support! Choose a suggested question or type your question below."
  );

function getInitialMessages(): ChatMessageData[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as ChatMessageData[];
      }
    }
  } catch {
    // Use the welcome message if session storage contains invalid data.
  }

  return [welcomeMessage()];
}

export function useChatbot() {
  const [messages, setMessages] =
    useState<ChatMessageData[]>(getInitialMessages);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Chat still works if browser storage is unavailable.
    }
  }, [messages]);

  function sendMessage(text: string) {
    const cleaned = text.trim();

    if (!cleaned) return;

    const userMessage = createMessage("user", cleaned);
    const botMessage = createMessage("bot", getBotResponse(cleaned));

    setMessages((current) => [...current, userMessage, botMessage]);
  }

  function resetChat() {
    setMessages([welcomeMessage()]);
  }

  return {
    messages,
    sendMessage,
    resetChat,
  };
}
