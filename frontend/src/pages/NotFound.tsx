
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <p className="text-7xl font-bold text-blue-400">404</p>

        <h1 className="mt-5 text-3xl font-bold text-white">
          Page not found
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          The page you are looking for does not exist or may have moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
        >
          <ArrowLeft size={18} />
          Return home
        </Link>
      </div>
    </main>
  );
}
