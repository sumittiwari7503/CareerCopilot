import React from "react";

interface InputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export default function Input({
  label,
  error,
  icon,
  className = "",
  id,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  disabled,
  ...props
}: InputProps) {
  const inputId = id || Math.random().toString(36).substring(7);

  return (
    <div className="space-y-1.5 w-full text-left">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-gray-500 shrink-0">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          disabled={disabled}
          className={`w-full bg-[#1f2937] border text-xs text-white rounded-xl py-2.5 px-3 placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/60 disabled:opacity-50 disabled:cursor-not-allowed ${icon ? "pl-9" : ""} ${error ? "border-red-500/60 focus:ring-red-500/20 focus:border-red-500" : "border-white/10"} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] text-red-400 font-medium font-sans">
          {error}
        </p>
      )}
    </div>
  );
}
