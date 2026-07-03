import SideBarButton from "./SideBarButton";

export default function SideBar() {
  return (
    <aside className="w-64 bg-aw-secondary h-full flex flex-col p-4">
      <div className="mb-6 p-4">
        <h1 className="text-aw-text text-2xl font-bold">AutoWorks 🔧</h1>
        <p className="text-aw-text">Gestor de Taller</p>
      </div>

      <nav className="flex flex-col flex-1">
        <SideBarButton ruta="/" label="Inicio" />
        <SideBarButton ruta="/clientes" label="Clientes" />
        <SideBarButton ruta="/vehiculos" label="Vehículos" />
        <SideBarButton ruta="/ordenes" label="Ordenes de Trabajo" />
      </nav>

      <div className="border-t border-slate-700 pt-4">
        <SideBarButton ruta="/configuracion" label="Configuración" />
      </div>
    </aside>
  );
}
