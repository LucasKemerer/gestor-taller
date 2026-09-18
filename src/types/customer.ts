// Esta forma coincide con lo que devuelve GET /clientes (lista paginada).
// El backend arma "resumenActividad" agregando OrdenTrabajo + EstadoOT +
// Vehiculo (vía PropiedadVehiculo, para el dueño actual) — el frontend
// nunca hace ese join, solo consume el DTO ya resuelto.
export interface ClienteResumen {
  id: string; // Cliente.id
  nombre: string; // Cliente.nombre (o razón social si tipo === "empresa")
  tipo: "particular" | "empresa"; // Cliente.tipo
  telefono: string; // Cliente.telefono
  contactoNombre?: string; // Cliente.contactoNombre — solo aplica si tipo === "empresa"
  contactoRol?: string; // Cliente.contactoRol — ej. "Jefe de flota"
  cantidadVehiculos: number; // COUNT de PropiedadVehiculo vigente para este cliente

  // Siempre la última OrdenTrabajo relevante (la activa si existe,
  // si no la más reciente). Mismo shape en los 5 escenarios posibles.
  resumenActividad: {
    estado:
      | "en_proceso"
      | "cobro_pendiente"
      | "turno_programado"
      | "completado"
      | "sin_actividad";
    estadoLabel: string; // texto ya resuelto por el backend (ej. "1 en taller", "Hoy 15:00 hs")
    vehiculoPatente: string | null; // Vehiculo.patente del vehículo destacado
    vehiculoModelo: string | null; // Vehiculo.modelo
    descripcion: string; // OrdenTrabajo.descripcion, o resumen si no hay OT activa
    saldoPendiente?: number; // suma de Presupuesto/Factura impagos de este cliente
  };
}
