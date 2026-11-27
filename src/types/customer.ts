// ---------- Alta de cliente ----------

// POST /clientes: body
export interface ClienteCreateInput {
  nombre: string; 
  apellido: string; 
  telefono: string;
}

// POST /clientes: respuesta 201
export interface ClienteCreado {
  id: number; 
  nombre: string;
  apellido: string;
  telefono: string;
  telegramVinculado: boolean; // Cliente.telegram_chat_id !== null
  activo: boolean; 
}
// Error esperado: 409 si ya hay un Cliente activo con ese teléfono




// El backend arma resumenActividad; el frontend nunca hace esos joins.

export interface ClienteResumen {
  id: number; 
  nombre: string; 
  apellido: string; 
  telefono: string; 
  telegramVinculado: boolean; // Cliente.telegram_chat_id !== null (el id crudo no viaja al front)
  // COUNT(DISTINCT OrdenTrabajo.vehiculo_id) WHERE OrdenTrabajo.cliente_id = Cliente.id
  // (el vehículo no tiene dueño: se vincula al cliente solo a través de sus OTs)
  cantidadVehiculos: number;

  // Misma forma para las 3 situaciones posibles.
  resumenActividad: {

    situacion: "ot_en_curso" | "turno_programado" | "sin_actividad";
    // ot_en_curso: TipoEstado.nombre del HistorialEstadoOT vigente (fecha_fin IS NULL)
    // turno_programado: texto armado desde Turno.inicio_programado (ej. "Hoy 15:00 hs")
    // sin_actividad: ej. "Sin órdenes"

    estadoLabel: string;
    // TipoEstado.es_espera del estado vigente (Presupuestada, Espera de repuestos…).
    // false en las otras dos situaciones.

    enEspera: boolean;
    ordenTrabajoId: number | null; // OrdenTrabajo.id (OT en curso o la última)
    vehiculoPatente: string | null; // Vehiculo.patente. SIEMPRE null en turno_programado
    vehiculoModelo: string | null; // Vehiculo.modelo. SIEMPRE null en turno_programado

    // Vehiculo.tipo_vehiculo de la OT, o Turno.tipo_vehiculo si es un turno
    tipoVehiculo: string | null;
    
    // No existe como columna: el backend concatena los Servicio.nombre de
    // DetalleServicioOT (o de DetalleServicioTurno, por `orden`, si es un turno)
    descripcion: string;
  };
}


// GET /clientes?filtro=todos|taller|turno&q=texto
export interface ListadoClientesResponse {
  items: ClienteResumen[];
  // Siempre sobre el total, sin importar el filtro activo ni la búsqueda: son los
  // números de las pestañas, y no deberían cambiar al tipear en el buscador
  conteos: {
    // COUNT(Cliente) WHERE activo = true. También es el "N registros" del encabezado
    todos: number;
    // Clientes con al menos una OrdenTrabajo con fecha_egreso IS NULL (OT en curso)
    taller: number;
    // Clientes con un Turno en estado pendiente o confirmado, con inicio_programado futuro
    // y que todavía no originó OT
    turno: number;
  };
}