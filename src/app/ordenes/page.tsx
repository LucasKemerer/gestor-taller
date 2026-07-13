"use client";
import BarraABM from "@/components/BarraABM";
import FilterBar from "@/components/FilterBar";
import Table from "@/components/Table";
import { Order } from "@/data/mockOrders";
import { mockOrders } from "@/data/mockOrders";
import { useState } from "react";
import {
  Calendar,
  TriangleAlert,
  ChevronRight,
  CircleCheck,
  Ban,
} from "lucide-react";

export default function Home() {
  //Estado para hacer aparecer los botones de ABM
  const [registroSeleccionado, setRegistroSeleccionado] =
    useState<Order | null>(null);

  const statusColors = {
    info: "bg-blue-200 text-blue-700",
    success: "bg-green-200 text-green-700",
    danger: "bg-red-200 text-red-700",
    neutral: "bg-slate-300 text-slate-800",
  };
  const deliveryConfig = {
    normal: { textColor: "text-blue-700", icon: Calendar },
    entregado: { textColor: "text-green-700", icon: CircleCheck },
    suspendido: { textColor: "text-red-700", icon: Ban },
    atrasado: { textColor: "text-yellow-600", icon: TriangleAlert },
  };
  const columnas = [
    {
      header: "NRO. ORDEN",
      cell: (fila: Order) => (
        <p className="px-6 py-4 text-sm font-semibold whitespace-nowrap uppercase">
          {fila.orderNumber}
        </p>
      ),
    },
    {
      header: "CLIENTE",
      cell: (fila: Order) => (
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="bg-aw-neutral text-md pointer-events-none flex h-8 w-8 items-center justify-center rounded-full">
            <p className="text-xs font-bold text-white">
              {fila.clientName.substring(0, 2).toUpperCase()}
            </p>
          </div>
          <p className="text-md font-semibold">{fila.clientName}</p>
        </div>
      ),
    },
    {
      header: "VEHÍCULO",
      cell: (fila: Order) => (
        <div className="px-6 py-4">
          <p className="text-sm font-semibold whitespace-nowrap">
            {fila.vehicleModel}
          </p>
          <span className="pointer-events-none rounded-sm border border-slate-400 bg-slate-200 px-2 text-center text-xs font-semibold uppercase font-stretch-50% shadow-sm">
            {fila.vehiclePlate}
          </span>
        </div>
      ),
    },
    {
      header: "ESTADO ACTUAL",
      headerProperties: "text-center",
      cell: (fila: Order) => (
        <div className="flex flex-col items-center justify-center gap-1 px-6 py-4">
          <span
            className={`rounded-full px-2 py-1 text-center text-xs font-bold whitespace-nowrap uppercase ${
              statusColors[fila.statusType]
            } `}
          >
            {fila.status}
          </span>
        </div>
      ),
    },
    {
      header: "FECHA DE ENTREGA",
      cell: (fila: Order) => {
        const Icono = deliveryConfig[fila.deliveryState].icon;
        return (
          <div
            className={`flex items-center gap-2 px-6 py-4 text-sm ${deliveryConfig[fila.deliveryState].textColor}`}
          >
            <Icono />
            <p className="font-semibold">{fila.deliveryDate}</p>
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
      <BarraABM
        // Funciones vacias temporales hasta implentar la BD
        onEliminarClick={() => {}}
        onModificarClick={() => {}}
        onNuevoClick={() => {}}

        registroSeleccionado={registroSeleccionado}
        title="Ordenes de Trabajo"
      />
      <FilterBar />
      <div className="rounded-xl border border-slate-400 bg-white p-2 shadow-sm">
        <Table
          onRowSelect={(fila) => setRegistroSeleccionado(fila)}
          columns={columnas}
          data={mockOrders}
        />
      </div>
    </div>
  );
}
