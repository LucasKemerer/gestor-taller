"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/logo";
import {
  ArrowRight,
  User,
  Lock,
  Eye,
  EyeClosed,
  ShieldCheck,
  ShieldQuestionMark,
} from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  user: z.string().min(1, "Tenés que ingresar un usuario"),
  pass: z.string().min(1, "Tenés ingresar una contraseña"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const IconShowPass = showPass ? EyeClosed : Eye;

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { user: "", pass: "" },
  });

  function onSubmit(values: LoginValues) {
    // TODO: acá va la llamada real al backend
    console.log(values);
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-background space-y-4">
      <div className="flex flex-col space-y-2 justify-center items-center text-center">
        <Logo className="h-30 w-30 rounded-xl text-primary" />

        <h1 className="font-bold text-3xl">Ingreso al Taller</h1>
        <h3 className="tracking-wider text-muted-foreground text-sm font-semibold">
          TERMINAL DE OPERACIONES
        </h3>
      </div>

      <span className="flex gap-2 items-center bg-tertiary/10 border-tertiary border rounded-full text-[0.6rem] tracking-wider uppercase font-semibold px-3 py-1 text-tertiary-strong">
        <ShieldCheck className="h-4 w-4" />
        Acceso Personal Autorizado
      </span>

      <Card className="bg-card w-full max-w-sm p-6 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Usuario / Legajo
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
                      <Input
                        className="border-slate-400 shadow-sm p-6 pl-10"
                        placeholder="Ej. MEC-0438"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
                      <Input
                        className="border-slate-400 shadow-sm p-6 pl-10"
                        placeholder="Ej. MEC-0438"
                        {...field}
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {/*variable definida al principio*/}
                        <IconShowPass className="h-4 w-4 text-slate-600" />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <Checkbox className="p-2 data-[state=checked]:bg-tertiary data-[state=checked]:border-tertiary"></Checkbox>
              <Label className="text-slate-700">
                {" "}
                Recordar en este dispositivo{" "}
              </Label>
            </div>

            <Button
              type="submit"
              className="shadow-md shadow-primary/40 w-full p-6 gap-2 bg-primary hover:bg-primary-strong hover:shadow-primary-strong/40"
            >
              Ingresar al sistema
              <ArrowRight />
            </Button>
          </form>
        </Form>

        <hr />

        <div className="flex gap-2 justify-center items-center">
          <ShieldQuestionMark className="text-tertiary w-4 h-4" />
          <a
            href="#"
            className="text-xs text-tertiary text-shadow-xs hover:text-tertiary-strong"
          >
            ¿Olvidaste tu clave? Solicitar a administración
          </a>
        </div>
      </Card>
    </div>
  );
}
