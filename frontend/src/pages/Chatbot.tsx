
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { Link } from "react-router-dom";

import {
  Bot,
  MessageCircle,
  RotateCcw,
  Send,
  User,
} from "lucide-react";

import {
  getBotResponse,
  suggestedQuestions,
} from "../data/chatbotResponses";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const initialMessage: Message = {
  id: 1,
  sender: "bot",
  text: "Hello! 👋 Welcome to DroneTV Support. Select a suggested question or type your message below.",
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    initialMessage,
  ]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message without moving the input section.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  function sendMessage(question?: string) {
    const userText = (question ?? input).trim();

    if (!userText) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userText,
    };

    const botMessage: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotResponse(userText),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  function resetConversation() {
    setMessages([initialMessage]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-white md:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Home
        </Link>

        {/* Fixed-height chatbot layout */}
        <section className="mt-6 flex h-[75vh] min-h-[550px] max-h-[750px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">

          {/* Header stays at the top */}
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <MessageCircle size={23} />
              </div>

              <div className="min-w-0">
                <h1 className="truncate font-bold">
                  DroneTV Support
                </h1>

                <p className="text-sm text-green-400">
                  Virtual Assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetConversation}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              aria-label="Reset conversation"
              title="Reset conversation"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </header>

          {/* Only the messages area scrolls */}
          <div
            className="flex flex-1 min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain p-4 sm:p-5"
            aria-live="polite"
            aria-label="Conversation history"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex shrink-0 items-start gap-3 ${
                  message.sender === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >
                {/* Message avatar */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    message.sender === "user"
                      ? "bg-blue-600"
                      : "bg-slate-700"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Auto-scroll target */}
            <div
              ref={messagesEndRef}
              className="h-px shrink-0"
              aria-hidden="true"
            />
          </div>

          {/* Input section stays at the bottom */}
          <div className="shrink-0 border-t border-white/10 bg-slate-900 p-4 sm:p-5">

            {/* Suggested questions */}
            <p className="mb-3 text-sm font-medium text-slate-300">
              Suggested Questions
            </p>

            <div className="mb-4 flex max-h-24 flex-wrap gap-2 overflow-y-auto">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-white/10 px-3 py-2 text-left text-xs leading-5 text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Message input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                aria-label="Type your message"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-slate-500">
              DroneTV Support Assistant
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}



