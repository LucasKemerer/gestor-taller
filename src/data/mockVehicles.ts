export interface Vehicle {
  id: number;
  plate: string;
  model: string;
  year: number;
  color: string;
  clientName: string;
  clientInitials: string; // Útil para el avatar de la tabla
  customerId: number;
  status: "en taller" | "entregado" | "sin historial";
}

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    plate: "AB-123-CD",
    model: "Toyota Hilux",
    year: 2022,
    color: "Gris Plata",
    clientName: "Martín Rodríguez",
    clientInitials: "MR",
    customerId: 1,
    status: "sin historial",
  },
  {
    id: 2,
    plate: "XYZ-987",
    model: "Ford Ranger",
    year: 2020,
    color: "Blanco",
    clientName: "Empresa Gamma S.A.",
    clientInitials: "EG",
    customerId: 1,
    status: "en taller",
  },
  {
    id: 3,
    plate: "KLM-456",
    model: "Volkswagen Amarok",
    year: 2023,
    color: "Negro Profundo",
    clientName: "Laura Pérez",
    clientInitials: "LP",
    customerId: 1,
    status: "entregado",
  },
  {
    id: 4,
    plate: "EFG-789",
    model: "Chevrolet Cruze",
    year: 2019,
    color: "Rojo Rubí",
    clientName: "Carlos Gómez",
    clientInitials: "CG",
    customerId: 1,
    status: "entregado",
  },
];
