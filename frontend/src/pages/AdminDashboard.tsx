
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ClipboardList, LogOut, RefreshCw } from "lucide-react";
import EnquiryFilters from "../components/admin/EnquiryFilters";
import EnquiryTable from "../components/admin/EnquiryTable";
import {
  deleteEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} from "../services/enquiryService";
import type {
  Enquiry,
  EnquiryStatus,
  UserType,
} from "../types/enquiry";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState<UserType | "">("");
  const [status, setStatus] = useState<EnquiryStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getEnquiries({
        q: search.trim() || undefined,
        userType,
        status,
      });

      setEnquiries(data);
    } catch {
      setError(
        "Could not load enquiries. Your session may have expired, or the backend may be unavailable."
      );
    } finally {
      setLoading(false);
    }
  }, [search, userType, status]);

  useEffect(() => {
    if (!sessionStorage.getItem("dronetv_admin_token")) {
      navigate("/admin", { replace: true });
      return;
    }

    void loadEnquiries();
  }, [navigate, loadEnquiries]);

  async function handleStatusChange(
    id: string,
    nextStatus: EnquiryStatus
  ) {
    setError("");
    setNotice("");

    try {
      await updateEnquiryStatus(id, nextStatus);
      setNotice("Enquiry status updated.");
      await loadEnquiries();
    } catch {
      setError("Could not update the enquiry status.");
    }
  }

  async function handleDelete(id: string) {
    setError("");
    setNotice("");

    try {
      await deleteEnquiry(id);
      setNotice("Enquiry deleted successfully.");
      await loadEnquiries();
    } catch {
      setError("Could not delete the enquiry.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("dronetv_admin_token");
    navigate("/admin", { replace: true });
  }

  const newCount = enquiries.filter(
    (item) => item.status === "New"
  ).length;

  const inProgressCount = enquiries.filter(
    (item) => item.status === "In Progress"
  ).length;

  const closedCount = enquiries.filter(
    (item) => item.status === "Closed"
  ).length;

  return (
    <main className="min-h-screen px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Administration
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Enquiry dashboard
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Review enquiries and manage follow-up status.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void loadEnquiries()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mt-7 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
          >
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mt-7 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300"
          >
            {notice}
          </div>
        )}

        <section className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Matching enquiries",
              value: enquiries.length,
              color: "text-white",
            },
            {
              label: "New",
              value: newCount,
              color: "text-blue-300",
            },
            {
              label: "In progress",
              value: inProgressCount,
              color: "text-purple-300",
            },
            {
              label: "Closed",
              value: closedCount,
              color: "text-emerald-300",
            },
          ].map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#0d1a2b] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <ClipboardList size={19} className="text-slate-500" />
              </div>
              <p className={`mt-4 text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0d1a2b] p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-white">
            Search and filter
          </h2>

          <EnquiryFilters
            search={search}
            userType={userType}
            status={status}
            onSearchChange={setSearch}
            onUserTypeChange={setUserType}
            onStatusChange={setStatus}
          />
        </section>

        <section className="mt-8">
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#0d1a2b] p-12 text-center text-slate-400">
              Loading enquiries...
            </div>
          ) : (
            <EnquiryTable
              enquiries={enquiries}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </main>
  );
}
