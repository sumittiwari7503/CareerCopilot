import React from "react";

interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "default";
  children?: React.ReactNode;
  className?: string;
  key?: any;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const baseStyle = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border select-none";

  const variants = {
    default: "bg-slate-800/60 border-slate-700/60 text-slate-300",
    success: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
    warning: "bg-amber-500/10 border-amber-500/25 text-amber-400",
    error: "bg-red-500/10 border-red-500/25 text-red-400",
    info: "bg-blue-500/10 border-blue-500/25 text-blue-400"
  };

  const currentVariant = variants[variant];

  return (
    <span
      className={`${baseStyle} ${currentVariant} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
