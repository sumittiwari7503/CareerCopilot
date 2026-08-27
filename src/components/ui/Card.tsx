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
  const baseStyle = "rounded-2xl border border-white/5 bg-[#111827] transition-all duration-200";
  
  const variants = {
    default: "p-5",
    elevated: "p-6 bg-[#1f2937]/50 border-white/10 shadow-xl",
    compact: "p-3 text-xs rounded-xl",
    interactive: "p-5 hover:border-white/10 cursor-pointer hover:bg-white/2 hover:scale-[1.005]"
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
