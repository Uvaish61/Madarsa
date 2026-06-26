"use client";

import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState } from "react";

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
  icon: Icon,
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  error?: string;
  icon?: LucideIcon;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-bold text-ink">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 grid w-11 place-items-center text-muted/70">
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          className={`w-full rounded-xl border bg-paper/60 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted/55 focus:bg-white focus:ring-4 focus:ring-green-500/12 ${
            Icon ? "pl-11" : "pl-4"
          } ${isPassword ? "pr-11" : "pr-4"} ${
            error ? "border-red-300 focus:border-red-400" : "border-line focus:border-green-500"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted transition hover:text-green-700"
          >
            {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-[12.5px] font-semibold text-red-500">{error}</p>}
    </div>
  );
}
