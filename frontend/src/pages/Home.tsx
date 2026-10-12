
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-blue-400/20 bg-gradient-to-r from-blue-600/15 to-cyan-500/5 p-8 sm:p-12 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Have a question?
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Let our support assistant help you.
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-slate-400">
              Find information about services and training, or submit an
              enquiry for follow-up.
            </p>
          </div>

          <a
            href="/chatbot"
            className="shrink-0 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500"
          >
            Open Assistant →
          </a>
        </div>
      </section>
    </>
  );
}
