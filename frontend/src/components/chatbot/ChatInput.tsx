
import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = text.trim();

    if (!message) return;

    onSend(message);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-white/10 bg-[#0b1727] p-4"
    >
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type your question..."
        aria-label="Type your question"
        maxLength={1000}
        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
      />

      <button
        type="submit"
        disabled={!text.trim()}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send message"
      >
        <Send size={19} />
      </button>
    </form>
  );
}
