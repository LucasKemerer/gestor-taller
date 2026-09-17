import { Bell, CircleUserRound } from "lucide-react";
import { Logo } from "@/components/logo";

function Header() {
  return (
    <header className="flex justify-between h-16 bg-white shadow-sm border border-slate-400 items-center px-6">
      <div className="flex overflow-hidden gap-4 items-center">
        <Logo className="rounded-md h-10 w-10 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Gestor de Taller
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-slate-200">
          <Bell className="size-6" />
        </button>
        <button className="rounded-full p-2 hover:bg-slate-200">
          <CircleUserRound className="size-6" />
        </button>
      </div>
    </header>
  );
}

export { Header };
