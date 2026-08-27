import React from "react";

interface TextareaProps {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export default function Textarea({
  label,
  error,
  className = "",
  id,
  value,
  onChange,
  placeholder,
  rows,
  disabled,
  ...props
}: TextareaProps) {
  const textareaId = id || Math.random().toString(36).substring(7);

  return (
    <div className="space-y-1.5 w-full text-left font-sans">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`w-full bg-[#1f2937] border text-xs text-white rounded-xl p-3 placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/60 disabled:opacity-50 ${error ? "border-red-500/60 focus:border-red-500" : "border-white/10"} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
