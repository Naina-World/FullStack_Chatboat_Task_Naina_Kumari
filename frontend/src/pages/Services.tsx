
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Map,
  ScanSearch,
  Sprout,
  Building2,
} from "lucide-react";

const services = [
  {
    icon: Map,
    title: "Aerial Mapping",
    description:
      "Explore how aerial imagery and drone data can support mapping and surveying workflows.",
  },
  {
    icon: ScanSearch,
    title: "Inspection & Monitoring",
    description:
      "Learn about drone-based inspection and monitoring applications for suitable sites and assets.",
  },
  {
    icon: Camera,
    title: "Aerial Photography",
    description:
      "Discover aerial image and video capture for documentation and visual communication.",
  },
  {
    icon: Sprout,
    title: "Agriculture Applications",
    description:
      "Explore potential uses of drone technology in crop observation and agricultural assessment.",
  },
  {
    icon: Building2,
    title: "Infrastructure Applications",
    description:
      "Understand how aerial data may support infrastructure documentation and project planning.",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-white/10 bg-[#091525] px-5 py-20 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Explore possibilities
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
          Drone services for a changing world.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
          Discover common drone application areas and enquire about the
          solutions relevant to your requirements.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="rounded-2xl border border-white/10 bg-[#0d1a2b] p-7 transition hover:border-blue-400/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <Icon size={24} />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  Enquire about this
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <h2 className="text-2xl font-bold text-white">
            Have a specific requirement?
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Describe what you need, and the team can review your enquiry and
            advise you on relevant options.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Submit an enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
