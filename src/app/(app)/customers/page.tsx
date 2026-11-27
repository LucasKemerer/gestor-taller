"use client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClientCardSkeleton } from "@/components/customer-card-skeleton";
import {
  User,
  Users,
  Search,
  ScanLine,
  LayoutGrid,
  Wrench,
  UserRoundPlus,
  Clock,
  TriangleAlert,
  SearchX,
} from "lucide-react";

import { FilterTabs, FilterOption } from "@/components/filtertabs";
import { useState, useEffect } from "react";

import { CustomerCard } from "@/components/customer-card";

import { toast } from "sonner";
import { ClienteFormDialog } from "@/components/customer-form-dialog";
import type { ClienteResumen, ClienteCreado, ListadoClientesResponse } from "@/types/customer";
import { listarClientes } from "@/lib/api/clientes";
import { useDebounce } from "@/hooks/use-debounce";
import { EmptyState } from "@/components/empty-state";

export default function CustomersPage() {

// BUSCADOR //////////////////
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search.trim(), 300);

// FILTROS //////////////////

const [activeFilter, setActiveFilter] = useState("todos");
const [refreshKey, setRefreshKey] = useState(0);


type Resultado =
  | { key: string; status: "ok"; data: ListadoClientesResponse }
  | { key: string; status: "error" };

const [resultado, setResultado] = useState<Resultado | null>(null);

// Identifica el pedido actual: cambia si cambia el filtro o si se pide refrescar
const requestKey = `${activeFilter}:${debouncedSearch}:${refreshKey}`;
// Si lo que tengo guardado no es de este pedido, estoy cargando (se calcula, no se guarda)
const isLoading = resultado?.key !== requestKey;
const hasError = !isLoading && resultado?.status === "error";
const clientes = resultado?.status === "ok" ? resultado.data.items : [];
const conteos = resultado?.status === "ok" ? resultado.data.conteos : null;

useEffect(() => {
  let ignore = false;

  listarClientes(activeFilter, debouncedSearch)
    .then((data) => {
      if (!ignore) setResultado({ key: requestKey, status: "ok", data });
    })
    .catch(() => {
      if (!ignore) setResultado({ key: requestKey, status: "error" });
    });


  return () => {
    ignore = true;
  };
}, [activeFilter, debouncedSearch, refreshKey, requestKey]);

  // valores para los filtros
  const configFilters: FilterOption[] = [
    {
      value: "todos",
      label: "Todos",
      count: conteos?.todos ?? 0, // a futuro este numero deberia venir del fetch anterior
      icon: (
        <LayoutGrid className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
    {
      value: "taller",
      label: "En taller",
      count: conteos?.taller ?? 0,
      icon: (
        <Wrench className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
    {
      value: "turno",
      label: "Turno pendiente",
      count: conteos?.turno ?? 0,
      icon: (
        <Clock className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
  ];
  // FIN DE LOS FILTROS //////////////////////////////////

  function handleRetry() {
  setRefreshKey((k) => k + 1);
}

  // DIALOG ALTA CLIENTE
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCreated(cliente: ClienteCreado) {
    console.log("Cliente creado:", cliente);
    toast.success(`${cliente.nombre} ${cliente.apellido} guardado`);
    setRefreshKey((k) => k + 1); // vuelve a correr el efecto de arriba
}

function getEmptyContent() {
  // Usa debouncedSearch (no search) para que el mensaje coincida con la lista que se ve
  if (debouncedSearch) {
    return {
      icon: <SearchX />,
      title: "Sin resultados",
      description: `No encontramos clientes que coincidan con "${debouncedSearch}".`,
      action: (
        <Button onClick={() => setSearch("")}>
          Limpiar búsqueda
        </Button>
      ),
      iconClassName: "text-tertiary h-6 w-6",
    };
  }

  if (activeFilter !== "todos") {
    const textos: Record<string, { title: string; description: string }> = {
      taller: {
        title: "No hay clientes en taller",
        description: "Cuando ingrese un vehículo con una orden abierta, aparece acá.",
      },
      turno: {
        title: "No hay clientes con turno pendiente",
        description: "Los turnos que se soliciten o se carguen aparecen acá.",
      },
    };
    const texto = textos[activeFilter] ?? { title: "Sin clientes en esta vista" };

    return {
      icon: <Users />,
      ...texto,
      action: (
        <Button onClick={() => setActiveFilter("todos")}>
          Ver todos
        </Button>
      ),
    };
  }

  // Sin filtro ni búsqueda: no hay ningún cliente cargado
  return {
    icon: <Users />,
    title: "Todavía no hay clientes",
    description: "Cargá el primero para empezar a registrar turnos y órdenes.",
    action: (
      <Button onClick={() => setDialogOpen(true)}>
        <UserRoundPlus /> Nuevo cliente
      </Button>
    ),
  };
}


  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="tracking-wider pb-1 text-muted-foreground text-sm uppercase font-semibold">
            Directorio activo
          </p>
          <h1 className="font-bold flex gap-2 items-center text-3xl">
            Clientes
            <Users className="stroke-3" />
          </h1>
        </div>
        <Badge variant="outline" className="items-center">
          <User className="text-tertiary" />
          {conteos?.todos ?? 0} clientes
        </Badge>
      </div>
      <div className="relative">
        <Search className="w-4 h-4 text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, patente, teléfono..."
          className="border-slate-300 bg-card shadow-sm p-6 pl-10"
        />
        <button className="lg:hidden flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8  justify-center items-center rounded-full">
          <ScanLine className="w-6 h-6 text-slate-600" />
        </button>
      </div>
      <div className="mt-6 mb-4">
        <FilterTabs
          options={configFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <ClientCardSkeleton key={i} />
          ))}
        </div>
      ) : hasError ? (
        <EmptyState
          icon={<TriangleAlert />}
          title="No pudimos cargar los clientes"
          description="Revisá tu conexión e intentá de nuevo."
          action={<Button onClick={handleRetry}>Reintentar</Button>}
          iconClassName="text-tertiary h-6 w-6"
        />
      ) : clientes.length === 0 ? (
        <EmptyState {...getEmptyContent()} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {clientes.map((cliente) => (
            <CustomerCard key={cliente.id} cliente={cliente} />
          ))}
        </div>
      )}
      <Button onClick={() => setDialogOpen(true)} className="font-semibold fixed bottom-20 right-4 z-50 py-6 px-4 rounded-full bg-primary hover:bg-primary-strong hover:shadow-primary-strong/40 shadow-md shadow-primary/40 transition-transform active:scale-95">
        <UserRoundPlus className="stroke-3" /> Nuevo Cliente
      </Button>

      <ClienteFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreated}
      />
    </div>
  );
}
