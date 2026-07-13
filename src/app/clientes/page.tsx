"use client";
import Table from "@/components/Table";
import FilterBar from "@/components/FilterBar";
import EliminarDialog from "@/components/EliminarDialog";
import BarraABM from "@/components/BarraABM";
import { mockVehicles } from "@/data/mockVehicles";
import { mockCustomers, Customer } from "@/data/mockCustomers";
import { Eye, ChevronRight, Car, CarFront } from "lucide-react";
import { useState } from "react";
import ClienteDialog from "@/components/ClienteDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function Home() {
  //Estado para hacer aparecer los botones de ABM
  const [registroSeleccionado, setRegistroSeleccionado] =
    useState<Customer | null>(null);

  //Estado para visualizar vehiculos de cliente
  const [verVehiculos, setVerVehiculos] = useState<Customer | null>(null);

  //Estado para definir si el dialog alta y modificacion esta abierto
  const [dialogOpen, setDialogOpen] = useState(false);
  //Estado para definir si el dialog de elminiar esta abierto
  const [dialogEliminarOpen, setDialogEliminarOpen] = useState(false);

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
          <button
            onClick={() => setVerVehiculos(fila)}
            className="flex items-center justify-center gap-2 rounded-full px-2 py-1 text-slate-600 outline-none hover:bg-slate-300"
          >
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

          {/* logica condicional para pintar la píldora según el estado */}
          <span
            className={`w-30 rounded-full px-2 py-1 text-center text-xs font-bold whitespace-nowrap uppercase ${
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
      <BarraABM
        onEliminarClick={() => setDialogEliminarOpen(true)}
        onNuevoClick={() => {
          setRegistroSeleccionado(null); // Limpiamos para que abra en blanco
          setDialogOpen(true);
        }}
        onModificarClick={() => setDialogOpen(true)}
        registroSeleccionado={registroSeleccionado}
        title="Clientes"
      />
      <FilterBar placeholder="Buscar clientes por nombre, teléfono, correo, vehículos..." />
      <div className="rounded-xl border border-slate-400 bg-white p-2 shadow-sm">
        <Table
          onRowSelect={setRegistroSeleccionado}
          data={mockCustomers}
          columns={columnas}
        ></Table>
      </div>

      <ClienteDialog
        key={registroSeleccionado ? "modificar" : "nuevo"}
        cliente={registroSeleccionado}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <EliminarDialog
        cliente={registroSeleccionado}
        open={dialogEliminarOpen}
        onOpenChange={setDialogEliminarOpen}
      />

      <Sheet
        open={verVehiculos !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setVerVehiculos(null);
        }}
      >
        <SheetContent className="bg-aw-background rounded-l-4xl border-slate-300 sm:max-w-125">
          <SheetHeader className="rounded-tl-4xl border-b border-slate-300 bg-white shadow-md">
            <SheetTitle className="text-aw-primary flex items-center gap-2 text-2xl font-semibold text-shadow-2xs">
              <CarFront className="text-aw-primary" />
              Vehículos Registrados
            </SheetTitle>
            <SheetDescription className="text-lg font-semibold text-slate-800">
              Cliente: {verVehiculos?.name}
            </SheetDescription>
          </SheetHeader>

          {/* Contenedor de la lista con Scroll por si tiene muchos autos */}
          <div className="mt-6 flex max-h-[80vh] flex-col gap-3 overflow-y-auto pr-2">
            {/* Lógica de filtrado: Buscamos los autos que coincidan con el ID del cliente */}
            {verVehiculos &&
            mockVehicles.filter((v) => v.customerId === verVehiculos.id)
              .length > 0 ? (
              mockVehicles
                .filter((vehiculo) => vehiculo.customerId === verVehiculos.id)
                .map((vehiculo) => (
                  <div
                    key={vehiculo.id}
                    className="hover:border-aw-primary m-2 flex items-center gap-4 rounded-lg border-2 border-slate-200 bg-white p-3 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {vehiculo.model}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-700">
                          {vehiculo.plate}
                        </span>
                        <span>•</span>
                        <span>{vehiculo.year}</span>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              // Mensaje por si el cliente no tiene autos
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 py-8 text-center">
                <Car className="mb-2 h-8 w-8 text-slate-400" />
                <p className="text-sm font-medium text-slate-600">
                  Sin vehículos
                </p>
                <p className="text-xs text-slate-500">
                  Este cliente no tiene vehículos registrados.
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
