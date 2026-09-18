"use client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Search,
  ScanLine,
  LayoutGrid,
  ClipboardList,
  Wrench,
} from "lucide-react";

import { FilterTabs, FilterOption } from "@/components/filtertabs";
import { useState, useEffect } from "react";

export default function CustomersPage() {
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
        <ClipboardList className="h-4 w-4 text-muted-foreground group-aria-pressed:text-white" />
      ),
    },
  ];

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
      <div className="mt-4">
        <FilterTabs
          options={configFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    </div>
  );
}
