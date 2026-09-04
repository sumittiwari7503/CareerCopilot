import React from "react";

interface CardProps {
  variant?: "default" | "elevated" | "compact" | "interactive";
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  key?: any;
}

export default function Card({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}: CardProps) {
  const baseStyle = "rounded-2xl border border-white/8 bg-[#111827] transition-colors duration-150";
  
  const variants = {
    default: "p-5 md:p-6",
    elevated: "p-5 md:p-6 bg-[#161f33] border-white/10 shadow-lg",
    compact: "p-3.5 text-xs rounded-xl",
    interactive: "p-5 md:p-6 hover:border-white/15 cursor-pointer hover:bg-white/2"
  };

  const currentVariant = variants[variant];

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} ${currentVariant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
