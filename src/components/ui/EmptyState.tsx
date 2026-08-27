import React from "react";
import Card from "./Card";
import Button from "./Button";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  actionText,
  onAction,
  icon
}: EmptyStateProps) {
  return (
    <Card className="text-center py-10 px-6 space-y-4 max-w-md mx-auto border border-dashed border-white/10 bg-transparent">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/5 text-gray-400">
        {icon || <AlertCircle className="w-6 h-6" />}
      </div>
      <div className="space-y-1.5">
        <h4 className="text-xs uppercase tracking-wider font-bold text-white">{title}</h4>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      {actionText && onAction && (
        <Button onClick={onAction} variant="outline" className="px-6 py-2">
          {actionText}
        </Button>
      )}
    </Card>
  );
}
