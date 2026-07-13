"use client";
import Table from "@/components/Table";
import FilterBar from "@/components/FilterBar";
import BarraABM from "@/components/BarraABM";
import { ChevronRight } from "lucide-react";
import { mockVehicles, Vehicle } from "@/data/mockVehicles";
import { useState } from "react";

export default function Home() {
  //Estado para hacer aparecer los botones de ABM
  const [registroSeleccionado, setRegistroSeleccionado] =
    useState<Vehicle | null>(null);
  const columnas = [
    {
      header: "PATENTE",
      headerProperties: "text-center",
      cell: (fila: Vehicle) => (
        <div className="flex justify-center px-6 py-4">
          <p className="pointer-events-none rounded-sm border border-slate-400 bg-slate-200 px-2 text-center text-sm font-semibold whitespace-nowrap uppercase font-stretch-50% shadow-sm">
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
      header: "ESTADO ACTUAL",
      headerProperties: "text-center",
      cell: (fila: Vehicle) => (
        <div className="flex flex-col items-center justify-center gap-1 px-6 py-4">
          <span
            className={`rounded-full px-2 py-1 text-center text-xs font-bold whitespace-nowrap uppercase ${
              fila.status === "entregado"
                ? "bg-green-200 text-green-700"
                : fila.status === "en taller"
                  ? "bg-orange-200 text-orange-700"
                  : "bg-slate-400 text-slate-900"
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
      <BarraABM registroSeleccionado={registroSeleccionado} title="Vehículos" />
      <FilterBar placeholder="Buscar vehículos por patente, modelo, cliente..." />
      <div className="rounded-xl border border-slate-400 bg-white p-2 shadow-sm">
        <Table
          onRowSelect={(fila) => setRegistroSeleccionado(fila)}
          data={mockVehicles}
          columns={columnas}
        ></Table>
      </div>
    </div>
  );
}
