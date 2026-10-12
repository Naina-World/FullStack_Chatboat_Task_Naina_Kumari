
import { useState } from "react";
import { Download, Eye, Trash2 } from "lucide-react";
import type { Enquiry, EnquiryStatus } from "../../types/enquiry";

interface EnquiryTableProps {
  enquiries: Enquiry[];
  onStatusChange: (id: string, status: EnquiryStatus) => void;
  onDelete: (id: string) => void;
}

const statuses: EnquiryStatus[] = [
  "New",
  "Contacted",
  "In Progress",
  "Closed",
];

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function exportCsv(enquiries: Enquiry[]) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "User Type",
    "Interest",
    "Message",
    "Status",
    "Created At",
  ];

  const rows = enquiries.map((item) => [
    item.name,
    item.email,
    item.phone,
    item.userType,
    item.interest,
    item.message,
    item.status,
    item.createdAt,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => escapeCsv(String(value ?? ""))).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "dronetv-enquiries.csv";
  anchor.click();

  URL.revokeObjectURL(url);
}

function statusClass(status: EnquiryStatus) {
  switch (status) {
    case "New":
      return "border-blue-400/20 bg-blue-400/10 text-blue-300";
    case "Contacted":
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    case "In Progress":
      return "border-purple-400/20 bg-purple-400/10 text-purple-300";
    case "Closed":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }
}

export default function EnquiryTable({
  enquiries,
  onStatusChange,
  onDelete,
}: EnquiryTableProps) {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1a2b]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
          <div>
            <h2 className="font-semibold text-white">Enquiry records</h2>
            <p className="mt-1 text-sm text-slate-400">
              {enquiries.length} record{enquiries.length === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => exportCsv(enquiries)}
            disabled={enquiries.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {enquiries.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-medium text-white">No enquiries found</p>
            <p className="mt-2 text-sm text-slate-400">
              Try changing your filters or submit a test enquiry.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">User type</th>
                  <th className="px-5 py-4">Interest</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {enquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.email}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {item.userType}
                    </td>

                    <td className="max-w-48 px-5 py-4 text-slate-300">
                      <p className="truncate">{item.interest}</p>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        aria-label={`Status for ${item.name}`}
                        value={item.status}
                        onChange={(event) =>
                          onStatusChange(
                            item._id,
                            event.target.value as EnquiryStatus
                          )
                        }
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium outline-none ${statusClass(item.status)}`}
                      >
                        {statuses.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-[#0d1a2b] text-white"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(item)}
                          aria-label={`View ${item.name}'s enquiry`}
                          className="rounded-lg p-2 text-blue-400 hover:bg-blue-400/10"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Delete the enquiry from ${item.name}?`
                              )
                            ) {
                              onDelete(item._id);
                            }
                          }}
                          aria-label={`Delete ${item.name}'s enquiry`}
                          className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-detail-title"
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1a2b] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="enquiry-detail-title"
              className="text-xl font-bold text-white"
            >
              Enquiry details
            </h2>

            <dl className="mt-6 space-y-4">
              {[
                ["Name", selectedEnquiry.name],
                ["Email", selectedEnquiry.email],
                ["Phone", selectedEnquiry.phone],
                ["User type", selectedEnquiry.userType],
                ["Interest", selectedEnquiry.interest],
                ["Status", selectedEnquiry.status],
                [
                  "Submitted",
                  new Date(selectedEnquiry.createdAt).toLocaleString(),
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-slate-500">{label}</dt>
                  <dd className="mt-1 break-words text-sm text-slate-200">
                    {value}
                  </dd>
                </div>
              ))}

              <div>
                <dt className="text-xs text-slate-500">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">
                  {selectedEnquiry.message}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setSelectedEnquiry(null)}
              className="mt-7 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Close details
            </button>
          </section>
        </div>
      )}
    </>
  );
}
