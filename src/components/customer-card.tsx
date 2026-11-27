"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageSquare,
  ChevronRight,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClienteResumen } from "@/types/customer";

interface ClientCardProps {
  cliente: ClienteResumen;
  onVerFicha?: (id: number) => void;
  onCobrar?: (id: string) => void;
}

// Un solo lugar que decide el color según el estado 
function getEstadoBadgeClasses(resumen: ClienteResumen["resumenActividad"]) {
  switch (resumen.situacion) {
    case "ot_en_curso":
      if (resumen.enEspera) {
        return "bg-warning-bg text-warning";
      } else {
        return "bg-tertiary/10 text-tertiary-strong";
      }
    case "turno_programado":
      return "bg-success-bg text-success-text";
    case "sin_actividad":
      return "bg-muted text-muted-foreground";
  }
}

// Esto es puramente copy de UI (qué dice el botón), no dato de negocio —
// por eso se resuelve acá y no viaja como campo del backend.
function getEtiquetaAccion(cliente: ClienteResumen) {
  if (cliente.resumenActividad.situacion === "sin_actividad") return "Historial";
  return "Ficha";
}

export function CustomerCard({
  cliente,
  onVerFicha,
}: ClientCardProps) {
  const { resumenActividad: resumen } = cliente;
  const iniciales =  `${cliente.nombre[0]}${cliente.apellido[0]}`.toUpperCase();

  return (
    <Card className="gap-3 p-4 m-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-muted font-semibold text-muted-foreground">
              {iniciales}
            </AvatarFallback>
          </Avatar>
          <p className="font-bold line-clamp-1">{cliente.nombre} {cliente.apellido}</p>
        </div>

        <Badge
          className={cn("shrink-0", getEstadoBadgeClasses(resumen))}
        >
          {resumen.estadoLabel}
        </Badge>
      </div>

      {/* Sub-card: siempre vehículo + descripción, nunca un formato distinto según el caso */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-muted/40 p-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {resumen.vehiculoModelo && (
              <span className="truncate text-sm font-medium">
                {resumen.vehiculoModelo}
              </span>
            )}
            {resumen.vehiculoPatente && (
              <Badge
                variant="outline"
                className="shrink-0 font-mono text-[0.65rem]"
              >
                {resumen.vehiculoPatente}
              </Badge>
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {resumen.descripcion}
          </p>
        </div>
        <Car className="h-5 w-5 shrink-0 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="shrink-0">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="shrink-0">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 justify-between"
          onClick={() => onVerFicha?.(cliente.id)}
        >
          {getEtiquetaAccion(cliente)}
          <ChevronRight className="h-4 w-4" />
        </Button>
   
      </div>
    </Card>
  );
}
