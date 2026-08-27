import React from "react";

interface SelectProps {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: any) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export default function Select({
  label,
  error,
  options,
  className = "",
  id,
  value,
  onChange,
  disabled,
  ...props
}: SelectProps) {
  const selectId = id || Math.random().toString(36).substring(7);

  return (
    <div className="space-y-1.5 w-full text-left font-sans">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-[#1f2937] border text-xs text-white rounded-xl py-2.5 px-3 uppercase tracking-wider font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/60 disabled:opacity-50 ${error ? "border-red-500/60 focus:border-red-500" : "border-white/10"} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-[10px] text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
