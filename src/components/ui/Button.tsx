import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "danger";
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  key?: any;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  icon,
  className = "",
  disabled,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-normal transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-[#0b0f19] disabled:opacity-50 disabled:cursor-not-allowed select-none";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-sm",
    secondary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm",
    outline: "bg-transparent border border-white/10 hover:border-white/20 text-gray-200 hover:bg-white/5",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    destructive: "bg-red-600 hover:bg-red-500 text-white shadow-sm",
    danger: "bg-red-600 hover:bg-red-500 text-white shadow-sm"
  };

  const currentVariant = variants[variant];

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${currentVariant} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
