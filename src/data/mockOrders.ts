export interface Order {
  id: number;
  orderNumber: string; // Ej: ORD-2023-089
  vehicleModel: string; // Ej: Toyota Tacoma TRD Pro
  vehiclePlate: string; // Ej: AB-123-CD
  clientName: string; // Ej: James Wilson
  entryDate: string; // Fecha en la que el auto entró al taller
  deliveryDate: string; // Fecha prometida de entrega
  deliveryState: "suspendido" | "normal" | "atrasado" | "entregado"; // Para el ícono del calendario
  status: string; // El texto exacto de la fase (Ej: "Chapa", "Pintura")
  statusType: "neutral" | "info" | "danger" | "success"; // El color de la píldora
}

export const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-2023-089",
    vehicleModel: "Toyota Tacoma 2021",
    vehiclePlate: "XYZ-123",
    clientName: "Carlos Mendoza",
    entryDate: "10 Nov 2023",
    deliveryDate: "15 Nov 2023",
    deliveryState: "atrasado",
    status: "Chapa (Desarme)",
    statusType: "neutral",
  },
  {
    id: 2,
    orderNumber: "ORD-2023-090",
    vehicleModel: "Honda Civic 2019",
    vehiclePlate: "ABC-987",
    clientName: "Ana Ramírez",
    entryDate: "05 Nov 2023",
    deliveryDate: "12 Nov 2023",
    deliveryState: "normal",
    status: "Pintura (Cabina)",
    statusType: "info",
  },
  {
    id: 3,
    orderNumber: "ORD-2023-091",
    vehicleModel: "Ford Explorer 2018",
    vehiclePlate: "LMN-456",
    clientName: "Empresa Logística SA",
    entryDate: "28 Oct 2023",
    deliveryDate: "05 Nov 2023",
    deliveryState: "suspendido",
    status: "Falla Transmisión",
    statusType: "danger",
  },
  {
    id: 4,
    orderNumber: "ORD-2023-092",
    vehicleModel: "Nissan Sentra 2022",
    vehiclePlate: "JKL-321",
    clientName: "Luis García",
    entryDate: "01 Nov 2023",
    deliveryDate: "03 Nov 2023",
    deliveryState: "entregado",
    status: "Finalizado (Listo)",
    statusType: "success",
  },
];
