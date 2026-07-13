"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface Column<T> {
  header: string;
  headerProperties?: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  // Nueva prop: una función para avisarle a la página qué fila se seleccionó
  onRowSelect?: (row: T | null) => void;
}

export default function Table<T extends { id: number | string }>({
  data,
  columns,
  onRowSelect,
}: TableProps<T>) {
  // estado para guardar el ID de la fila seleccionada (por defecto ninguna)
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  // aviso a la página padre cuando cambia la seleccion
  useEffect(() => {
    if (!onRowSelect) return;

    if (selectedId === null) {
      onRowSelect(null);
    } else {
      const selectedRow = data.find((r) => r.id === selectedId);
      if (selectedRow) onRowSelect(selectedRow); //solo setteo si efectivamente encontro algo
    }
  }, [selectedId, data, onRowSelect]);

  // capturar las flechas del teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!data || data.length === 0) return;

      const currentIndex = data.findIndex((row) => row.id === selectedId);

      if (e.key === "ArrowDown") {
        e.preventDefault(); // Evita que la página scrollee
        const nextIndex =
          currentIndex < data.length - 1 ? currentIndex + 1 : currentIndex;
        setSelectedId(data[nextIndex].id);
      } else if (e.key === "ArrowUp") {
        e.preventDefault(); // Evita que la página scrollee
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        setSelectedId(data[prevIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // limpieza del evento al desmontar el componente
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, data]);

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-400 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-aw-background border-b border-slate-300 text-left">
          <tr>
            {columns.map((columna, index) => (
              <th
                key={index}
                className={`px-6 py-2 text-sm uppercase ${columna.headerProperties || ""}`}
              >
                {columna.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((fila) => {
            const isSelected = fila.id === selectedId;

            return (
              <tr
                key={fila.id}
                // actualizar la selección al hacer clic
                onClick={() => {
                  if (selectedId === fila.id) {
                    setSelectedId(null);
                  } else {
                    setSelectedId(fila.id);
                  }
                }}

                className={`cursor-pointer border-b border-slate-300 transition-colors ${
                  isSelected
                    ? "border-l-4 border-l-blue-600 bg-blue-100" // Borde azul y fondito celeste
                    : "border-l-4 border-l-transparent even:bg-slate-100 hover:bg-slate-200" // Transparente para no romper el margen
                } `}
              >
                {columns.map((columna, index) => (
                  <td key={index}>
                    {columna.cell
                      ? columna.cell(fila)
                      : columna.accessorKey
                        ? String(fila[columna.accessorKey as keyof T])
                        : null}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/*Paginacion*/}
      <div className="bg-aw-background flex items-center justify-between gap-4 px-6 py-2">
        <p className="font-semibold text-slate-600">Mostrando 1-3 de 43</p>
        <div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-200">
            <ChevronLeft className="text-slate-600" />
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-200">
            <ChevronRight className="text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
