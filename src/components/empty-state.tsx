import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  iconClassName?: string;
}

export function EmptyState({ icon, title, description, action, iconClassName }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <div
        className={cn(
          "flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 [&_svg]:size-7",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-slate-900">{title}</p>
        {description && (
          <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}