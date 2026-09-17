import {
  House,
  Contact,
  CarFront,
  Wrench,
  ChartNoAxesColumn,
} from "lucide-react";
import { NavButton } from "@/components/navbutton";
function Nav() {
  return (
    <nav className="fixed flex bottom-0 left-0 z-50 bg-foreground w-full justify-center gap-8 items-center h-16 text-muted-foreground">
      <NavButton href="/">
        <House />
        Inicio
      </NavButton>

      <NavButton href="/customers">
        <Contact />
        Clientes
      </NavButton>

      <NavButton href="/vehicles">
        <CarFront />
        Vehículos
      </NavButton>

      <NavButton href="/orders">
        <Wrench />
        Órdenes
      </NavButton>

      <NavButton href="/reports">
        <ChartNoAxesColumn />
        Reportes
      </NavButton>
    </nav>
  );
}

export { Nav };
