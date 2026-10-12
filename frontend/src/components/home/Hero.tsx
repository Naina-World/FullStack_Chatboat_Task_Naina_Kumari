
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  GraduationCap,
  Radar,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Drone Services & Training
          </div>

          <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover what's possible with{" "}
            <span className="text-blue-400">drone technology.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            Explore drone-related services, discover training opportunities,
            and get answers to your questions with our AI-powered support
            assistant.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/chatbot"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Bot size={18} />
              Ask Our Assistant
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Radar size={17} className="text-blue-400" />
              Drone solutions
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap size={17} className="text-blue-400" />
              Learning opportunities
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />

          <div className="relative rounded-3xl border border-white/10 bg-[#0d1a2b] p-5 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Your support workspace</p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  How can we help?
                </h2>
              </div>
              <div className="rounded-xl bg-blue-500/15 p-3 text-blue-400">
                <Bot size={25} />
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-blue-300">
                  DRONETV ASSISTANT
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Welcome! I can help you explore services, find training
                  information, or submit an enquiry.
                </p>
              </div>

              <Link
                to="/services"
                className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition hover:border-blue-400/50 hover:bg-blue-400/5"
              >
                <div>
                  <p className="font-medium text-white">Explore services</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Discover available solutions
                  </p>
                </div>
                <ArrowRight size={18} className="text-blue-400" />
              </Link>

              <Link
                to="/courses"
                className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition hover:border-blue-400/50 hover:bg-blue-400/5"
              >
                <div>
                  <p className="font-medium text-white">Training information</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Explore learning opportunities
                  </p>
                </div>
                <ArrowRight size={18} className="text-blue-400" />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition hover:border-blue-400/50 hover:bg-blue-400/5"
              >
                <div>
                  <p className="font-medium text-white">Submit an enquiry</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Tell us what you need
                  </p>
                </div>
                <ArrowRight size={18} className="text-blue-400" />
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-blue-600/10 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                <Bot size={19} />
              </span>
              <div>
                <p className="text-sm font-medium text-white">
                  Need a quick answer?
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Try the rule-based support chatbot.
                </p>
              </div>
              <Link
                to="/chatbot"
                aria-label="Open chatbot"
                className="ml-auto text-blue-400 hover:text-blue-300"
              >
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
