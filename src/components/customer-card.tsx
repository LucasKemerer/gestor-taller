"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageSquare,
  ChevronRight,
  CreditCard,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClienteResumen } from "@/types/customer";

interface ClientCardProps {
  cliente: ClienteResumen;
  onVerFicha?: (id: string) => void;
  onCobrar?: (id: string) => void;
}

// Un solo lugar que decide el color según el estado — si mañana se agrega
// un sexto estado, se toca acá y no en cada lugar donde se pinta un badge.
function getEstadoBadgeClasses(
  estado: ClienteResumen["resumenActividad"]["estado"],
) {
  switch (estado) {
    case "en_proceso":
      return "bg-warning-bg text-warning";
    case "cobro_pendiente":
      return "bg-danger-bg text-danger-text";
    case "turno_programado":
    case "completado":
      return "bg-tertiary/10 text-tertiary-strong";
    case "sin_actividad":
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Esto es puramente copy de UI (qué dice el botón), no dato de negocio —
// por eso se resuelve acá y no viaja como campo del backend.
function getEtiquetaAccion(cliente: ClienteResumen) {
  if (cliente.resumenActividad.estado === "sin_actividad") return "Historial";
  if (cliente.tipo === "empresa") return "Flota";
  return "Ficha";
}

export function CustomerCard({
  cliente,
  onVerFicha,
  onCobrar,
}: ClientCardProps) {
  const { resumenActividad: resumen } = cliente;
  const iniciales = cliente.nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="gap-3 p-4 m-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-warning-bg font-semibold text-warning">
              {iniciales}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{cliente.nombre}</span>
              <Badge
                variant="outline"
                className="text-[0.65rem] uppercase text-muted-foreground"
              >
                {cliente.tipo === "empresa" ? "Flota" : "Particular"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {cliente.tipo === "empresa"
                ? `${cliente.contactoNombre} (${cliente.contactoRol})`
                : `${cliente.cantidadVehiculos} vehículo${cliente.cantidadVehiculos !== 1 ? "s" : ""} registrado${cliente.cantidadVehiculos !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        <Badge
          className={cn("shrink-0", getEstadoBadgeClasses(resumen.estado))}
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
          {resumen.saldoPendiente !== undefined && (
            <p className="text-sm font-semibold text-danger-text">
              ${resumen.saldoPendiente.toLocaleString("es-AR")} saldo pendiente
            </p>
          )}
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

        {resumen.estado === "cobro_pendiente" ? (
          <Button
            className="flex-1 bg-primary hover:bg-primary-strong"
            onClick={() => onCobrar?.(cliente.id)}
          >
            <CreditCard className="h-4 w-4" />
            Cobrar
          </Button>
        ) : (
          <Button
            variant="outline"
            className="flex-1 justify-between"
            onClick={() => onVerFicha?.(cliente.id)}
          >
            {getEtiquetaAccion(cliente)}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
