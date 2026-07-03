import Table from "@/components/Table";
import FilterBar from "@/components/FilterBar";
import { mockCustomers, Customer } from "@/data/mockCustomers";
import { Eye, ChevronRight } from "lucide-react";

export default function Home() {
  const columnas = [
    {
      header: "CLIENTE / EMPRESA",
      cell: (fila: Customer) => (
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="bg-aw-neutral flex h-8 w-8 items-center justify-center rounded-full">
            <p className="text-xs font-bold text-white">
              {fila.name.substring(0, 2).toUpperCase()}
            </p>
          </div>
          <div>
            <p className="font-semibold">{fila.name}</p>
            <p className="text-sm text-slate-600">{fila.type}</p>
          </div>
        </div>
      ),
    },
    {
      header: "CONTACTO",
      cell: (fila: Customer) => (
        <div className="px-6 py-4">
          <p className="font-semibold">{fila.phone}</p>
          <p className="text-sm text-slate-600">{fila.email}</p>
        </div>
      ),
    },
    {
      header: "VEHÍCULOS",
      headerProperties: "text-center",
      cell: (fila: Customer) => (
        <div className="flex justify-center px-6 py-4">
          <button className="flex items-center justify-center gap-2 rounded-full px-2 py-1 text-slate-600 outline-none hover:bg-slate-300">
            <p>{fila.vehicles}</p>
            <Eye className="stroke-1" />
          </button>
        </div>
      ),
    },
    {
      header: "ÚLTIMO SERVICIO",
      headerProperties: "text-center",
      cell: (fila: Customer) => (
        <div className="flex flex-col items-center justify-center gap-1 px-6 py-4">
          <span className="text-center font-semibold">{fila.lastService}</span>

          {/* Lógica condicional para pintar la píldora según el estado */}
          <span
            className={`w-30 rounded-full px-2 py-1 text-center text-xs font-bold uppercase ${
              fila.status === "PAGO PENDIENTE"
                ? "bg-red-200 text-red-700"
                : fila.status === "COMPLETADO"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-slate-300 text-slate-700"
            } `}
          >
            {fila.status}
          </span>
        </div>
      ),
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
      <FilterBar placeholder="Buscar clientes por nombre, teléfono, correo, vehículos..." />
      <div className="rounded-xl border border-slate-400 bg-white p-2 shadow-sm">
        <Table data={mockCustomers} columns={columnas}></Table>
      </div>
    </div>
  );
}
