import SideBarButton from "./SideBarButton";
import Image from "next/image";
import {
  PanelLeftClose,
  Menu,
  CarFront,
  Users,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Receipt,
} from "lucide-react";

interface SideBarProps {
  menuExpandido: boolean;
  toggleMenu: () => void;
}

export default function SideBar({ menuExpandido, toggleMenu }: SideBarProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={`${menuExpandido ? "justify-end" : "justify-center"} mb-8 flex items-center border-b border-slate-700 p-1`}
      >
        <button
          onClick={toggleMenu}
          className="h-10 w-10 rounded-full bg-transparent p-2 text-white hover:bg-slate-700"
        >
          {menuExpandido ? <PanelLeftClose /> : <Menu />}
        </button>
      </div>

      <nav className="flex flex-col">
        <SideBarButton ruta="/">
          <LayoutDashboard /> {menuExpandido ? "Inicio" : null}
        </SideBarButton>
        <SideBarButton ruta="/clientes">
          <Users /> {menuExpandido ? "Clientes" : null}
        </SideBarButton>
        <SideBarButton ruta="/vehiculos">
          <CarFront /> {menuExpandido ? "Vehículos" : null}
        </SideBarButton>
        <SideBarButton ruta="/ordenes">
          <ClipboardList /> {menuExpandido ? "Ordenes" : null}
        </SideBarButton>
        <SideBarButton ruta="/presupuestos">
          <Receipt /> {menuExpandido ? "Presupuestos" : null}
        </SideBarButton>
      </nav>

      <div className="mt-8 mb-8 flex justify-center">
        <Image
          src={
            menuExpandido
              ? "/logoAutoWorks-sinsubtitulo.png"
              : "/logoAutoWorks-sintexto.png"
          }
          alt="logo de la empresa"
          width={menuExpandido ? 200 : 60}
          height={menuExpandido ? 200 : 60}
        />
      </div>

      <div className="border-t border-slate-700 pt-4">
        <SideBarButton ruta="/configuracion">
          <Settings /> {menuExpandido ? "Configuración" : null}
        </SideBarButton>
      </div>
    </div>
  );
}
