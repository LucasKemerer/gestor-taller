"use client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClientCardSkeleton } from "@/components/customer-card-skeleton";
import {
  User,
  Search,
  ScanLine,
  LayoutGrid,
  CreditCard,
  Wrench,
  UserRoundPlus,
  Clock,
} from "lucide-react";

import { FilterTabs, FilterOption } from "@/components/filtertabs";
import { useState, useEffect } from "react";

import customerData from "@/mocks/customer.json";
import { CustomerCard } from "@/components/customer-card";
import type { ClienteResumen } from "@/types/customer";

export default function CustomersPage() {
  // BLOQUE TEMPORAL PARA VER EL SKELETON
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  ////////////////////////

  // FILTROS //////////////////
  const [activeFilter, setActiveFilter] = useState("todos");

  // cuando cambian los filtros se llama al backend
  useEffect(() => {
    console.log("Peticion al backend para:", activeFilter);
    // fetch(...)
  }, [activeFilter]);

  // valores para los filtros
  const configFilters: FilterOption[] = [
    {
      value: "todos",
      label: "Todos",
      count: 148, // a futuro este numero deberia venir del fetch anterior
      icon: (
        <LayoutGrid className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
    {
      value: "taller",
      label: "En taller",
      count: 14,
      icon: (
        <Wrench className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
    {
      value: "saldo",
      label: "Saldo pendiente",
      count: 5,
      icon: (
        <CreditCard className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
    {
      value: "turno",
      label: "Turno pendiente",
      count: 1,
      icon: (
        <Clock className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
  ];
  // FIN DE LOS FILTROS //////////////////////////////////

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="tracking-wider pb-1 text-muted-foreground text-sm uppercase font-semibold">
            Directorio activo
          </p>
          <h1 className="font-bold text-3xl">Clientes</h1>
        </div>
        <Badge variant="outline" className="items-center">
          <User className="text-tertiary" />
          148 registros
        </Badge>
      </div>
      <div className="relative">
        <Search className="w-4 h-4 text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Buscar por nombre, patente, teléfono..."
          className="border-slate-300 bg-card shadow-sm p-6 pl-10"
        />
        <button className="w-8 h-8 flex justify-center items-center absolute right-3 top-1/2 -translate-y-1/2 rounded-full">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ClientCardSkeleton key={i} />
            ))
          : (customerData as ClienteResumen[]).map((cliente) => (
              <CustomerCard key={cliente.id} cliente={cliente} />
            ))}
      </div>
      <Button className="font-semibold fixed bottom-20 right-4 z-50 py-6 px-4 rounded-full bg-primary hover:bg-primary-strong hover:shadow-primary-strong/40 shadow-md shadow-primary/40 transition-transform active:scale-95">
        <UserRoundPlus className="stroke-3" /> Nuevo Cliente
      </Button>
    </div>
  );
}
