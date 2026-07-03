import Table from "@/components/Table";
import FilterBar from "@/components/FilterBar";
import {
  ChevronRight,
  Calendar,
  TriangleAlert,
  CircleCheck,
} from "lucide-react";
import { mockVehicles, Vehicle } from "@/data/mockVehicles";

export default function Home() {
  const deliveryConfig = {
    entregado: { textColor: "text-green-700", Icon: CircleCheck },
    atrasado: { textColor: "text-red-700", Icon: TriangleAlert },
    normal: { textColor: "text-slate-700", Icon: Calendar },
  };

  const columnas = [
    {
      header: "PATENTE",
      headerProperties: "text-center",
      cell: (fila: Vehicle) => (
        <div className="flex justify-center px-6 py-4">
          <p className="pointer-events-none w-20 rounded-md border border-slate-400 bg-slate-200 text-center font-semibold uppercase font-stretch-50% shadow-sm">
            {fila.plate}
          </p>
        </div>
      ),
    },
    {
      header: "VEHÍCULO",
      cell: (fila: Vehicle) => (
        <div className="px-6 py-4">
          <p className="text-md font-bold">{fila.model}</p>
          <p className="text-sm font-semibold text-slate-600">
            {fila.year} · {fila.color}
          </p>
        </div>
      ),
    },
    {
      header: "CLIENTE",
      cell: (fila: Vehicle) => (
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="bg-aw-neutral flex h-8 w-8 items-center justify-center rounded-full">
            <p className="text-xs font-bold text-white">
              {fila.clientName.substring(0, 2).toUpperCase()}
            </p>
          </div>
          <p className="text-md font-semibold">{fila.clientName}</p>
        </div>
      ),
    },
    {
      header: "ESTADO",
      headerProperties: "text-center",
      cell: (fila: Vehicle) => (
        <div className="flex flex-col items-center justify-center gap-1 px-6 py-4">
          <span
            className={`rounded-full px-2 py-1 text-center text-xs font-bold uppercase ${
              fila.statusType === "danger"
                ? "bg-red-200 text-red-700"
                : fila.statusType === "info"
                  ? "bg-blue-200 text-blue-700"
                  : fila.statusType === "neutral"
                    ? "bg-slate-300 text-slate-700"
                    : "bg-green-200 text-green-700" // Por si agregás un estado "EN PROCESO"
            } `}
          >
            {fila.status}
          </span>
        </div>
      ),
    },
    {
      header: "ENTREGA PROMETIDA",
      cell: (fila: Vehicle) => {
        const config = deliveryConfig[fila.deliveryState];
        return (
          <div
            className={`flex items-center gap-2 px-6 py-4 ${config.textColor}`}
          >
            <config.Icon />
            <p>{fila.deliveryDate}</p>
          </div>
        );
      },
    },
    {
      header: "ACCIONES",
      headerProperties: "text-center",
      cell: () => (
        <div className="flex justify-center">
          <button className="rounded-full p-1 hover:bg-slate-300">
            <ChevronRight className="stroke-1" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <FilterBar placeholder="Buscar vehículos por patente, modelo, cliente..." />
      <div className="rounded-xl border border-slate-400 bg-white p-2 shadow-sm">
        <Table data={mockVehicles} columns={columnas}></Table>
      </div>
    </div>
  );
}
