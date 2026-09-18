import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface FilterTabsProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

function FilterTabs({
  options,
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar clientes"
      className="flex w-screen gap-3 overflow-x-auto pr-12 scrollbar-none"
    >
      {options.map((opt) => {
        const isActive = opt.value === activeFilter;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(opt.value)}
            className={cn(
              "transition-all group flex shrink-0 items-center gap-3 rounded-md px-4 py-4 text-sm font-semibold",
              isActive
                ? "bg-card-foreground text-white"
                : "bg-card text-muted-foreground",
            )}
          >
            {opt.icon}
            <span className="flex items-center leading-tight">
              {opt.label}
              {opt.count !== undefined && (
                <span className="ml-1 font-normal opacity-70">
                  ({opt.count})
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { FilterTabs };
