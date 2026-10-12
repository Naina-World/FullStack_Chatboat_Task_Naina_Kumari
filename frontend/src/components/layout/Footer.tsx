
import { Link } from "react-router-dom";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050c16]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            DroneTV<span className="text-blue-400">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Explore drone-related services, training opportunities and support
            through one convenient platform.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link className="hover:text-blue-400" to="/services">
              Our Services
            </Link>
            <Link className="hover:text-blue-400" to="/courses">
              Courses & Training
            </Link>
            <Link className="hover:text-blue-400" to="/chatbot">
              AI Support Assistant
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link className="hover:text-blue-400" to="/contact">
              Submit an Enquiry
            </Link>
            <Link className="hover:text-blue-400" to="/admin">
              Admin Login
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-4 flex flex-col gap-4 text-sm text-slate-400">
            <a
              href="mailto:info@ipageums.com"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Mail size={17} />
              info@ipageums.com
              <ArrowUpRight size={13} />
            </a>
            <a
              href="tel:+918804349999"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Phone size={17} />
              +91 88043 49999
            </a>
            <a
              href="https://ipageums.com/contact-us/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Official contact page ↗
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DroneTV AI Support Assistant. Built as a
        full-stack project.
      </div>
    </footer>
  );
}
