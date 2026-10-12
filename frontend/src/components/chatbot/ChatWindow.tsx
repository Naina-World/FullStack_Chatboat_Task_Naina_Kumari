
import { Bot, RotateCcw } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { suggestedQuestions } from "../../data/chatbotResponses";
import type { ChatMessageData } from "../../hooks/useChatbot";

interface ChatWindowProps {
  messages: ChatMessageData[];
  onSend: (message: string) => void;
  onReset: () => void;
}

export default function ChatWindow({
  messages,
  onSend,
  onReset,
}: ChatWindowProps) {
  return (
    <section className="flex h-[650px] max-h-[80vh] min-h-[480px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1a2b] shadow-2xl">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#0b1727] p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-semibold text-white">DroneTV Assistant</h2>
            <p className="mt-1 text-xs text-emerald-400">
              Rule-based support
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          title="Clear conversation"
        >
          <RotateCcw size={15} />
          <span className="hidden sm:inline">Reset chat</span>
        </button>
      </header>

      <div
        className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className="border-t border-white/10 px-4 pt-4">
        <p className="mb-3 text-xs font-medium text-slate-400">
          Suggested questions
        </p>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {suggestedQuestions.map((question) => (
            <button
              type="button"
              key={question}
              onClick={() => onSend(question)}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-blue-400/50 hover:text-white"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <ChatInput onSend={onSend} />
    </section>
  );
}
