
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/login", { token: token.trim(), });
      const adminToken = response.data.data.token;

      sessionStorage.setItem("dronetv_admin_token", adminToken);
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof err.response === "object" &&
        err.response !== null &&
        "data" in err.response &&
        typeof err.response.data === "object" &&
        err.response.data !== null &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
          ? err.response.data.message
          : "Unable to connect. Please check your backend.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b17] px-4 py-12 text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-violet-600/20 blur-[110px]" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 shadow-lg shadow-blue-950/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-8 w-8 text-blue-400"
              aria-hidden="true"
            >
              <path d="M12 8v8M8 12h8M5 5l4 4m6 6 4 4M19 5l-4 4m-6 6-4 4" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="5" cy="5" r="2" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
            </svg>
          </div>

          <p className="text-sm font-semibold tracking-[0.3em] text-blue-400">
            DRONETV
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Admin Portal
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Manage enquiries and keep your operations running smoothly.
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15" r="1" />
              </svg>
            </div>

            <div>
              <h2 className="font-semibold text-white">Secure sign in</h2>
              <p className="mt-1 text-xs text-slate-400">
                Administrator access only
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-token"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Admin access token
              </label>

              <div className="relative">
                <input
                  id="admin-token"
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="Enter your secret token"
                  autoComplete="off"
                  spellCheck={false}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowToken((current) => !current)}
                  className="absolute inset-y-0 right-3 text-xs font-medium text-slate-400 transition hover:text-blue-400"
                >
                  {showToken ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !token.trim()}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-violet-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Verifying access..." : "Access Dashboard"}
              {!loading && (
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Protected administrator area
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} DroneTV. All rights reserved.
        </p>
      </div>
    </main>
  );
}


