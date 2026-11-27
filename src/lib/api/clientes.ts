import customerData from "@/mocks/customer.json";
import created from "@/mocks/customer-created.json";
import type {
  ClienteCreateInput,
  ClienteCreado,
  ClienteResumen,
  ListadoClientesResponse,
} from "@/types/customer";

// Solo para probar la pantalla de error. TRUE LO GENERA
export const SIMULAR_ERROR = false;



// Simula la tabla Cliente mientras no haya backend. Se reinicia al recargar la
// página: sirve solo para ver el flujo completo (crear → aparece en la lista).
const clientesMock: ClienteResumen[] = [...(customerData as ClienteResumen[])];
let nextId = 149;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// BUSQUEDA
// "Méndez" → "mendez": minúsculas y sin acentos (la ñ también queda como n)
const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const soloDigitos = (s: string) => s.replace(/\D/g, "");

// Solo letras y números, sin espacios ni símbolos: "AB 342 CD" → "ab342cd"
const compacto = (s: string) => normalizar(s).replace(/[^a-z0-9]/g, "");

// Con menos dígitos que esto, una búsqueda numérica todavía no filtra
const MIN_DIGITOS = 3;

function coincide(c: ClienteResumen, q: string): boolean {
  const texto = normalizar(q).trim();
  if (!texto) return true;

  // Cada palabra del nombre y apellido por separado: "Ana María" + "De la Fuente"
  const palabras = normalizar(`${c.nombre} ${c.apellido}`)
    .split(/\s+/)
    .map(compacto);
  const patente = compacto(c.resumenActividad.vehiculoPatente ?? "");
  const telefono = soloDigitos(c.telefono);

  // Búsqueda "tipo teléfono": solo números y separadores ("3434 82", "(343) 482-09")
  if (/^[\d\s()+-]+$/.test(texto)) {
    const digitos = soloDigitos(texto);
    if (digitos.length < MIN_DIGITOS) return true; // todavía muy corto: no filtra
    // También contra la patente, porque "342" puede ser parte de "AB 342 CD"
    return telefono.includes(digitos) || patente.includes(digitos);
  }

  // Búsqueda de texto: TODAS las palabras tipeadas tienen que coincidir, en cualquier orden
  return texto.split(/\s+/).every((token) => {
    const t = compacto(token);
    if (!t) return true;
    return (
      palabras.some((p) => p.startsWith(t)) || // prefijo de alguna palabra del nombre
      (t.length >= 2 && patente.includes(t)) // o parte de la patente
    );
  });
}



// GET /clientes?filtro=...&q=...
export async function listarClientes(
  filtro: string,
  q: string = "",
): Promise<ListadoClientesResponse> {
  await delay(500);


if (SIMULAR_ERROR) throw new Error("fallo simulado");

  const conteos = {
    todos: clientesMock.length,
    taller: clientesMock.filter((c) => c.resumenActividad.situacion === "ot_en_curso").length,
    turno: clientesMock.filter((c) => c.resumenActividad.situacion === "turno_programado").length,
  };

  let items = [...clientesMock];
  if (filtro === "taller") items = items.filter((c) => c.resumenActividad.situacion === "ot_en_curso");
  if (filtro === "turno") items = items.filter((c) => c.resumenActividad.situacion === "turno_programado");

  if (q.trim()) items = items.filter((c) => coincide(c, q));

  return { items, conteos };

  // TODO backend: fetch(`/api/clientes?filtro=${filtro}&q=${encodeURIComponent(q)}`)
}

// POST /clientes
export async function crearCliente(input: ClienteCreateInput): Promise<ClienteCreado> {
  await delay(600);

  // El id va al final del spread para que pise al del mock; si no, todos los
  // clientes creados tendrían el id 149 y React se quejaría de keys repetidas.
  const creado: ClienteCreado = { ...(created as ClienteCreado), ...input, id: nextId++ };

  // Simula que el backend ya lo guardó: la próxima vez que se pida la lista, está.
  clientesMock.unshift({
    id: creado.id,
    nombre: creado.nombre,
    apellido: creado.apellido,
    telefono: creado.telefono,
    telegramVinculado: false,
    cantidadVehiculos: 0,
    resumenActividad: {
      situacion: "sin_actividad",
      estadoLabel: "Sin órdenes",
      enEspera: false,
      ordenTrabajoId: null,
      vehiculoPatente: null,
      vehiculoModelo: null,
      tipoVehiculo: null,
      descripcion: "Cliente nuevo",
    },
  });

  return creado;
}