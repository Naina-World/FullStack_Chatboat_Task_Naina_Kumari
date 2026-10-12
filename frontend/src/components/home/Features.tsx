
import { Link } from "react-router-dom";
import {
  Bot,
  GraduationCap,
  Headset,
  Map,
  MessageSquareText,
  ClipboardList,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Drone Services",
    description:
      "Explore potential drone applications, mapping, inspection, and other solutions.",
    link: "/services",
    label: "Explore services",
  },
  {
    icon: GraduationCap,
    title: "Courses & Training",
    description:
      "Learn about drone training opportunities and find information relevant to your goals.",
    link: "/courses",
    label: "Explore training",
  },
  {
    icon: Bot,
    title: "AI Support Assistant",
    description:
      "Get quick, rule-based answers to common questions about services and training.",
    link: "/chatbot",
    label: "Start a conversation",
  },
  {
    icon: ClipboardList,
    title: "Enquiry Submission",
    description:
      "Send your contact details, interests, and questions to the support team.",
    link: "/contact",
    label: "Submit an enquiry",
  },
  {
    icon: MessageSquareText,
    title: "Quick Answers",
    description:
      "Choose suggested questions to find relevant information without searching the entire site.",
    link: "/chatbot",
    label: "Ask a question",
  },
  {
    icon: Headset,
    title: "Human Assistance",
    description:
      "Submit your enquiry and request follow-up from a team member.",
    link: "/contact",
    label: "Contact the team",
  },
];

export default function Features() {
  return (
    <section className="border-t border-white/5 bg-[#091525] px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            What you can do
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Everything starts with a question.
          </h2>
          <p className="mt-5 leading-7 text-slate-400">
            Explore information, discover training opportunities, and connect
            with support through one simple interface.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-[#0d1a2b] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 transition group-hover:bg-blue-500 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>

                <Link
                  to={feature.link}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  {feature.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
