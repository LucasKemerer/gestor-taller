import { ChevronRight, ChevronLeft } from "lucide-react";

export interface Column<T> {
  header: string; // El título de la columna ("CLIENTE", "ESTADO")
  headerProperties?: string; // propiedades css adicionales (text-center, etc.)

  // 'keyof T' es pura magia: obliga a que el accessor sea una propiedad real de tu dato.
  // Si T es Customer, no te va a dejar poner "patente" porque no existe en Customer.
  // El '?' es porque una columna de "Acciones" capaz no lee ningún dato directo.
  accessorKey?: keyof T;

  // La función cell es opcional ('?').
  // Recibe toda la fila (del tipo T) y devuelve ReactNode (que es cualquier etiqueta HTML/JSX).
  cell?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[]; // Un arreglo de lo que sea que valga 'T'
  columns: Column<T>[]; // Un arreglo de nuestras columnas, atadas al mismo tipo 'T'
}

export default function Table<T extends { id: number | string }>({
  data,
  columns,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-400 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-aw-background border-b border-slate-300 text-left">
          <tr>
            {columns.map((columna, index) => (
              // px-6 py-2 text-sm uppercase
              <th
                key={index}
                className={`uppercase" px-6 py-2 text-sm ${columna.headerProperties || ""}`}
              >
                {columna.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((fila) => (
            <tr
              key={fila.id}
              className="border-b border-slate-300 even:bg-slate-100 hover:bg-slate-200"
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
          ))}
        </tbody>
      </table>

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
