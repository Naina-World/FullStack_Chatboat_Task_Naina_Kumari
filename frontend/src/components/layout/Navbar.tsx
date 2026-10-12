
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  MessageCircle,
  X,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Courses", to: "/courses" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-blue-400"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            D
          </span>

          <span className="text-xl font-bold tracking-tight text-white">
            DroneTV<span className="text-blue-400">.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}

          {/* AI Assistant */}
          <Link
            to="/chatbot"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <MessageCircle size={17} />
            AI Assistant
          </Link>

          {/* Admin icon */}
          <Link
            to="/admin"
            title="Admin Login"
            aria-label="Admin Login"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:bg-white/5 hover:text-blue-400"
          >
            <ShieldCheck size={19} />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/chatbot"
              className="flex items-center gap-2 text-sm font-semibold text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              <MessageCircle size={18} />
              Chat with AI Assistant
            </Link>

            {/* Mobile Admin link */}
            <Link
              to="/admin"
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              <ShieldCheck size={18} />
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

