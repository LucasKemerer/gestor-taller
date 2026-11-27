import { z } from "zod";

const soloDigitos = (s: string) => s.replace(/\D/g, "");

export const clienteSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresá el nombre"),
  apellido: z.string().trim().min(1, "Ingresá el apellido"),
  telefono: z
    .string()
    .trim()
    .min(1, "Ingresá un teléfono")
    .refine(
      (valor) => {
        const cantidad = soloDigitos(valor).length;
        if (cantidad > 6 && cantidad < 20) return true;
        return false;
      },
      "Teléfono inválido",
    ),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;