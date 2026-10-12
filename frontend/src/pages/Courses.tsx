
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const learningAreas = [
  {
    icon: GraduationCap,
    title: "Drone Pilot Training",
    description:
      "Enquire about available pilot training programmes, eligibility and registration.",
  },
  {
    icon: BookOpen,
    title: "Drone Fundamentals",
    description:
      "Build an understanding of drone components, basic terminology and operating principles.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Regulations",
    description:
      "Learn why safe operations and applicable aviation rules matter in drone activities.",
  },
  {
    icon: Wrench,
    title: "Practical Applications",
    description:
      "Explore how drone technology may be applied to mapping, inspection and other use cases.",
  },
];

export default function Courses() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-white/10 bg-[#091525] px-5 py-20 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Learning opportunities
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
          Take your first step into drone technology.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
          Explore learning areas and contact the team to confirm currently
          available courses, prerequisites, fees and schedules.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {learningAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article
                key={area.title}
                className="flex gap-5 rounded-2xl border border-white/10 bg-[#0d1a2b] p-6 sm:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {area.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {area.description}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Ask about training
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-400/20 bg-blue-500/5 p-7 sm:p-10">
          <h2 className="text-2xl font-bold text-white">
            Interested in learning?
          </h2>
          <p className="mt-3 leading-7 text-slate-400">
            Tell us whether you are a student or an existing customer and what
            you want to learn. We can record your enquiry for follow-up.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Register your interest
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
