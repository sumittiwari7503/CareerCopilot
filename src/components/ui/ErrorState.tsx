import React from "react";
import Card from "./Card";
import Button from "./Button";
import { AlertOctagon } from "lucide-react";

interface ErrorStateProps {
  message: string;
  dataSaved?: boolean;
  actionText?: string;
  onAction?: () => void;
}

export default function ErrorState({
  message,
  dataSaved = false,
  actionText = "Retry Action",
  onAction
}: ErrorStateProps) {
  return (
    <Card className="border border-red-500/20 bg-red-950/10 p-5 rounded-2xl space-y-4 max-w-md mx-auto text-center">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
        <AlertOctagon className="w-6 h-6" />
      </div>
      
      <div className="space-y-1.5">
        <h4 className="text-xs uppercase tracking-wider font-bold text-white">An error occurred</h4>
        <p className="text-[11px] text-gray-300 leading-relaxed">
          {message}
        </p>
        <span className="text-[10px] font-mono text-gray-400 block pt-1">
          Data Saved status: <b className={dataSaved ? "text-emerald-400" : "text-amber-400"}>{dataSaved ? "Synced successfully" : "Unsynchronized (Check connection)"}</b>
        </span>
      </div>

      {onAction && (
        <Button onClick={onAction} variant="outline" className="px-6 py-2 border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-500/50">
          {actionText}
        </Button>
      )}
    </Card>
  );
}
