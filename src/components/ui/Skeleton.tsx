import React from "react";

interface SkeletonProps {
  className?: string;
  key?: any;
}

export default function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/5 rounded-xl ${className}`}
      {...props}
    />
  );
}
