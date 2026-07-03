// Exportamos la interface para que la puedas importar en tu page.tsx de vehículos
export interface Vehicle {
  id: number;
  plate: string;
  model: string;
  year: number;
  color: string;
  clientName: string;
  status: string;
  // Usamos estos tipos literales para que sea fácil darle color a las píldoras en la vista
  statusType: "neutral" | "info" | "danger" | "success";
  deliveryDate: string;
  deliveryState: "normal" | "atrasado" | "entregado";
}

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    plate: "AB-123-CD",
    model: "Toyota Hilux",
    year: 2022,
    color: "Gris Plata",
    clientName: "Martín Rodríguez",
    status: "Chapa (Desarme)",
    statusType: "neutral",
    deliveryDate: "15 Nov 2023",
    deliveryState: "normal",
  },
  {
    id: 2,
    plate: "XYZ-987",
    model: "Ford Ranger",
    year: 2020,
    color: "Blanco",
    clientName: "Empresa Gamma S.A.",
    status: "Pintura (Cabina)",
    statusType: "info",
    deliveryDate: "12 Nov 2023",
    deliveryState: "normal",
  },
  {
    id: 3,
    plate: "KLM-456",
    model: "Volkswagen Amarok",
    year: 2023,
    color: "Negro Profundo",
    clientName: "Laura Pérez", // En tu diseño se ve gris clarito
    status: "Detailing (Pulido)",
    statusType: "danger",
    deliveryDate: "10 Nov 2023",
    deliveryState: "atrasado",
  },
  {
    id: 4,
    plate: "EFG-789",
    model: "Chevrolet Cruze",
    year: 2019,
    color: "Rojo Rubí",
    clientName: "Carlos Gómez",
    status: "Finalizado (Listo)",
    statusType: "success",
    deliveryDate: "Entregado",
    deliveryState: "entregado",
  },
];
