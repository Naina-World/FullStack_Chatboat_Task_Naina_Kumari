
import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { createEnquiry } from "../../services/enquiryService";
import type { CreateEnquiryInput } from "../../types/enquiry";
import axios from "axios";

const initialForm: CreateEnquiryInput = {
  name: "",
  email: "",
  phone: "",
  userType: "Student",
  interest: "",
  message: "",
};

export default function EnquiryForm() {
  const [form, setForm] = useState<CreateEnquiryInput>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof CreateEnquiryInput,
    value: string
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSuccessMessage("");
    setErrorMessage("");
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter your name (at least 2 characters).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.interest.trim()) {
      nextErrors.interest = "Please select an area of interest.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      await createEnquiry({
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        interest: form.interest.trim(),
        message: form.message.trim(),
      });

      setSuccessMessage(
        "Your enquiry has been submitted successfully. Thank you!"
      );
      setForm(initialForm);
      setErrors({});
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  data?: { message?: string };
                };
              }
            ).response?.data?.message
          : undefined;

      setErrorMessage(
        message ||
          "We could not submit your enquiry. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400";

  const labelClass = "text-sm font-medium text-slate-200";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {successMessage && (
        <div
          role="status"
          className="flex gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300"
        >
          <CheckCircle2 className="shrink-0" size={20} />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name *
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            placeholder="Enter your name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="userType" className={labelClass}>
            I am a *
          </label>
          <select
            id="userType"
            name="userType"
            className={fieldClass}
            value={form.userType}
            onChange={(event) =>
              updateField("userType", event.target.value)
            }
          >
            <option value="Student">Student</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={labelClass}>
          Area of interest *
        </label>
        <select
          id="interest"
          name="interest"
          className={fieldClass}
          value={form.interest}
          onChange={(event) => updateField("interest", event.target.value)}
          aria-invalid={Boolean(errors.interest)}
          required
        >
          <option value="">Select your interest</option>
          <option value="Drone Services">Drone Services</option>
          <option value="Drone Pilot Training">Drone Pilot Training</option>
          <option value="Drone Fundamentals">Drone Fundamentals</option>
          <option value="Safety & Regulations">Safety & Regulations</option>
          <option value="Other">Other</option>
        </select>
        {errors.interest && (
          <p className="mt-2 text-xs text-red-400">{errors.interest}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Your message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          className={fieldClass}
          placeholder="Tell us what you need help with..."
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-help"
          required
        />
        <div className="mt-2 flex items-start justify-between gap-4">
          {errors.message ? (
            <p className="text-xs text-red-400">{errors.message}</p>
          ) : (
            <p id="message-help" className="text-xs text-slate-500">
              Please provide at least 10 characters.
            </p>
          )}
          <span className="shrink-0 text-xs text-slate-500">
            {form.message.length}/2000
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" size={18} />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Enquiry
          </>
        )}
      </button>

      <p className="text-xs leading-6 text-slate-500">
        Your enquiry will be sent to the support system for follow-up. Do not
        include passwords or other sensitive information in your message.
      </p>
    </form>
  );
}
