
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import EnquiryForm from "../components/forms/EnquiryForm";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-white/10 bg-[#091525] px-5 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Get in touch
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          Let's talk about your requirements.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
          Tell us whether you are interested in drone services or training, and
          submit your enquiry for follow-up.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <aside>
          <h2 className="text-2xl font-bold text-white">
            How can we help?
          </h2>
          <p className="mt-4 leading-7 text-slate-400">
            Share your question with us. Please provide accurate contact
            information so the team can respond to your enquiry.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:info@ipageums.com"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1a2b] p-5 transition hover:border-blue-400/40"
            >
              <span className="rounded-xl bg-blue-500/15 p-3 text-blue-400">
                <Mail size={22} />
              </span>
              <span>
                <span className="block font-medium text-white">Email</span>
                <span className="mt-1 block text-sm text-slate-400">
                  info@ipageums.com
                </span>
              </span>
            </a>

            <a
              href="tel:+918804349999"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1a2b] p-5 transition hover:border-blue-400/40"
            >
              <span className="rounded-xl bg-blue-500/15 p-3 text-blue-400">
                <Phone size={22} />
              </span>
              <span>
                <span className="block font-medium text-white">Phone</span>
                <span className="mt-1 block text-sm text-slate-400">
                  +91 88043 49999
                </span>
              </span>
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/5 p-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="text-blue-400" size={23} />
              <h3 className="font-semibold text-white">
                Need a quick answer?
              </h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Try the support chatbot for answers to common questions.
            </p>
            <Link
              to="/chatbot"
              className="mt-4 inline-block font-semibold text-blue-400 hover:text-blue-300"
            >
              Open chatbot →
            </Link>
          </div>
        </aside>

        <div className="rounded-2xl border border-white/10 bg-[#0d1a2b] p-5 sm:p-8">
          <h2 className="text-2xl font-bold text-white">Submit an enquiry</h2>
          <p className="mt-2 mb-7 text-sm leading-6 text-slate-400">
            Fields marked with an asterisk are required.
          </p>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
