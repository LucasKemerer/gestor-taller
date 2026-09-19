import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ClientCardSkeleton() {
  return (
    <Card className="gap-3 p-4 m-2">
      {/* Fila superior: avatar + nombre/tipo + badge de estado — mismo layout que ClientCard */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-20 shrink-0 rounded-full" />
      </div>

      {/* Sub-card del vehículo/actividad */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-muted/40 p-3">
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-5 w-5 shrink-0 rounded" />
      </div>

      {/* Fila de botones */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
        <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
        <Skeleton className="h-9 flex-1 rounded-md" />
      </div>
    </Card>
  );
}
