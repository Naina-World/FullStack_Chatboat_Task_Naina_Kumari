
import type { EnquiryStatus, UserType } from "../../types/enquiry";

interface EnquiryFiltersProps {
  search: string;
  userType: UserType | "";
  status: EnquiryStatus | "";
  onSearchChange: (value: string) => void;
  onUserTypeChange: (value: UserType | "") => void;
  onStatusChange: (value: EnquiryStatus | "") => void;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none focus:border-blue-400";

export default function EnquiryFilters({
  search,
  userType,
  status,
  onSearchChange,
  onUserTypeChange,
  onStatusChange,
}: EnquiryFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div>
        <label htmlFor="search" className="mb-2 block text-sm text-slate-300">
          Search enquiries
        </label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Name, email or phone..."
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="userTypeFilter"
          className="mb-2 block text-sm text-slate-300"
        >
          User type
        </label>
        <select
          id="userTypeFilter"
          value={userType}
          onChange={(event) =>
            onUserTypeChange(event.target.value as UserType | "")
          }
          className={fieldClass}
        >
          <option value="">All user types</option>
          <option value="Student">Student</option>
          <option value="Customer">Customer</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="statusFilter"
          className="mb-2 block text-sm text-slate-300"
        >
          Enquiry status
        </label>
        <select
          id="statusFilter"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as EnquiryStatus | "")
          }
          className={fieldClass}
        >
          <option value="">All statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
  );
}
