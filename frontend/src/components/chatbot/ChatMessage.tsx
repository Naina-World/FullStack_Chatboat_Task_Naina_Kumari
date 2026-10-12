
import { Bot, UserRound } from "lucide-react";
import type { ChatMessageData } from "../../hooks/useChatbot";

interface ChatMessageProps {
  message: ChatMessageData;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot";

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
          <Bot size={19} />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isBot
            ? "rounded-tl-sm border border-white/10 bg-white/5 text-slate-200"
            : "rounded-tr-sm bg-blue-600 text-white"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-7">{message.text}</p>
        <p
          className={`mt-2 text-right text-[10px] ${
            isBot ? "text-slate-500" : "text-blue-100/70"
          }`}
        >
          {time}
        </p>
      </div>

      {!isBot && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-200">
          <UserRound size={18} />
        </div>
      )}
    </div>
  );
}
