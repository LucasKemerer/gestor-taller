import { History, Bell, Search, CircleUserRound, Plus } from "lucide-react";

export default function TopBar() {
  return (
    <header className="bg-aw-header flex h-16 items-center justify-between border border-slate-400 bg-white px-6 shadow-md">
      <div className="bg-aw-background flex w-150 items-center rounded-full border border-slate-400 px-3 py-2 shadow-sm hover:bg-slate-200">
        <Search className="mr-2 size-5 text-slate-800" />

        <input
          type="text"
          placeholder="Buscar en el sistema..."
          className="text-md w-full placeholder-gray-800 outline-none"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-slate-200">
          <Bell className="size-6 text-slate-700" />
        </button>
        <button className="rounded-full p-2 hover:bg-slate-200">
          <History className="size-6 text-slate-700" />
        </button>

        <button className="outline-aw-primary bg-aw-primary flex h-9 w-35 items-center justify-center rounded-full p-2 text-sm font-bold text-white outline-offset-2 hover:outline-2">
          <Plus className="mr-2 size-4 stroke-3" />
          <p className="text-sm">Acción Rápida</p>
        </button>

        <button className="rounded-full p-2 hover:bg-slate-200">
          <CircleUserRound className="size-6 text-slate-700" />
        </button>
      </div>
    </header>
  );
}
