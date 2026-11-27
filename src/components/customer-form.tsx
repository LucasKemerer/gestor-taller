"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, Save, X, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { clienteSchema, type ClienteFormValues } from "@/lib/schemas/cliente";
import { crearCliente } from "@/lib/api/clientes";
import type { ClienteCreado } from "@/types/customer";

interface ClienteFormProps {
  onSuccess: (cliente: ClienteCreado) => void;
  onCancel: () => void;
}

export function ClienteForm({ onSuccess, onCancel }: ClienteFormProps) {
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: { nombre: "", apellido: "", telefono: "" },
  });

  async function onSubmit(values: ClienteFormValues) {
    try {
      const creado = await crearCliente(values);
      onSuccess(creado);
    } catch (error) {
      // TODO: si es el 409 (teléfono duplicado) → form.setError("telefono", { message: "..." })
      //       si es otro error → mostralo de alguna forma (¿toast?)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                <FormControl>
                  <Input className="p-6 pl-10" placeholder="ej. Carlos" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                <FormControl>
                  <Input className="p-6 pl-10" placeholder="ej. Rodriguez" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                <FormControl>
                  <Input className="p-6 pl-10" placeholder="ej. +5493432345678" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: apellido y telefono: mismo molde. Para el teléfono, pensá qué
            atributo de <input> le dice al celular que muestre el teclado numérico. */}

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full p-6 bg-primary hover:bg-primary-strong"
          >
            <Save /> Guardar cliente
          </Button>
          <Button type="button" variant="outline" className="w-full p-6" onClick={onCancel}>
            <X /> Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}