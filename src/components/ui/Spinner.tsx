import React from "react";

export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <span className={`w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin shrink-0 ${className}`}></span>
  );
}
