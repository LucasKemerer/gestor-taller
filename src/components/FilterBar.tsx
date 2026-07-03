import Button from "@/components/Button";
import { Funnel, Search, ArrowDownUp } from "lucide-react";

export default function FilterBar({ placeholder = "Buscar..." }) {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-400 bg-white p-2 shadow-sm">
      <div className="bg-aw-background flex w-full items-center gap-2 rounded-lg border border-slate-400 p-3 shadow-sm hover:bg-slate-200">
        <Search className="h-4 w-4 text-slate-600" />
        <input
          className="text-md w-full outline-none"
          placeholder={placeholder}
        />
      </div>
      <Button variant="secondary">
        <div className="flex items-center gap-2">
          <Funnel className="h-4 w-4" />
          <p>Filtrar</p>
        </div>
      </Button>
      <Button variant="secondary">
        <div className="flex items-center gap-2">
          <ArrowDownUp className="h-4 w-4" />
          <p>Ordenar</p>
        </div>
      </Button>
    </div>
  );
}
