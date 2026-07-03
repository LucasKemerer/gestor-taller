export interface Customer {
  id: number;
  name: string;
  type: string;
  phone: string;
  email: string;
  vehicles: number;
  lastService: string;
  status: string;
}

export const mockCustomers = [
  {
    id: 1,
    name: "Carlos Estévez",
    type: "Transportes Estévez SL",
    phone: "655 432 198",
    email: "carlos@transestevez.com",
    vehicles: 3,
    lastService: "12 Oct 2023",
    status: "PAGO PENDIENTE",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    type: "Particular",
    phone: "622 119 884",
    email: "maria.rod@email.com",
    vehicles: 1,
    lastService: "05 Sep 2023",
    status: "COMPLETADO",
  },
  {
    id: 3,
    name: "Pepe Ramírez",
    type: "Particular",
    phone: "343 4739267",
    email: "peperamirez@gmail.com",
    vehicles: 5,
    lastService: "30 Jun 2026",
    status: "EN PROCESO",
  },
  {
    id: 4,
    name: "Lionel Messi",
    type: "Asociacion de Fútbol Argentina",
    phone: "+54 9 011 3465782",
    email: "lmessi@gmail.com",
    vehicles: 13,
    lastService: "30 Jan 2026",
    status: "PAGO PENDIENTE",
  },
  {
    id: 5,
    name: "Gustavo Fring",
    type: "Los Pollos Hermanos",
    phone: "+54 9 011 3758492",
    email: "polloshermanos@gmail.com",
    vehicles: 10,
    lastService: "08 Feb 2024",
    status: "COMPLETADO",
  },
];
