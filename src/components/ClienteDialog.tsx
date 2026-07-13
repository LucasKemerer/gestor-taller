"use client";

import { useState } from "react";
import { Customer } from "@/data/mockCustomers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/Button"; // Tu botón personalizado
import {
  UserPlus,
  User,
  CreditCard,
  Mail,
  Phone,
  Smartphone,
  MapPin,
  FileText,
  Save,
} from "lucide-react";

interface ClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Customer | null;
}

export default function ClienteDialog({
  open,
  onOpenChange,
  cliente,
}: ClienteDialogProps) {
  const [tipoCliente, setTipoCliente] = useState<"particular" | "empresa">(
    "particular",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-aw-background overflow-hidden rounded-xl p-0 sm:max-w-220">
        {/* ENCABEZADO */}
        <DialogHeader className="border-b border-slate-300 bg-white px-6 py-4 shadow-xs">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <UserPlus className="text-aw-primary h-6 w-6" />
            {cliente ? "Modificar Cliente" : "Alta de Cliente"}
          </DialogTitle>
        </DialogHeader>

        {/* CUERPO CON SCROLL */}
        <div className="flex max-h-[65vh] flex-col gap-6 overflow-y-auto px-6 py-4">
          {/* SECCIÓN: Información Principal */}
          <section>
            <div className="mb-4 flex items-end justify-between border-b border-slate-600 pb-2">
              <h3 className="flex items-center gap-2 font-semibold">
                <CreditCard className="h-4 w-4" /> Información Principal
              </h3>
              <span className="text-xs text-slate-500">
                * Campos obligatorios
              </span>
            </div>

            {/* Selector Particular/Empresa */}
            <div className="mb-4 flex w-max gap-2 rounded-lg border border-slate-300 bg-white p-1">
              <button
                onClick={() => setTipoCliente("particular")}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  tipoCliente === "particular"
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-200 hover:text-black"
                }`}
              >
                Particular
              </button>
              <button
                onClick={() => setTipoCliente("empresa")}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  tipoCliente === "empresa"
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-200 hover:text-black"
                }`}
              >
                Empresa
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Nombre Completo */}
              <div className="col-span-2 space-y-1.5">
                <Label>
                  Nombre Completo / Razón Social{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative rounded-md border border-slate-400 bg-white">
                  <User className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                  <Input
                    defaultValue={cliente?.name || ""}
                    className="border-none pl-9 outline-none"
                    placeholder="Ej. Juan Pérez / Taller Automotriz S.L."
                  />
                </div>
              </div>

              {/* DNI */}
              <div className="space-y-1.5">
                <Label>
                  NIF / CIF / DNI <span className="text-red-500">*</span>
                </Label>
                <div className="relative rounded-md border border-slate-400 bg-white">
                  <CreditCard className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                  <Input
                    defaultValue={""} //falta agregar en el Customer
                    className="border-none pl-9 outline-none"
                    placeholder="Ej. B12345678"
                  />
                </div>
              </div>

              {/* Correo */}
              <div className="space-y-1.5">
                <Label>Correo Electrónico</Label>
                <div className="relative rounded-md border border-slate-400 bg-white">
                  <Mail className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                  <Input
                    defaultValue={cliente?.email || ""}
                    className="border-none pl-9 outline-none"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              {/* Teléfono 1 */}
              <div className="space-y-1.5">
                <Label>
                  Teléfono Principal <span className="text-red-500">*</span>
                </Label>
                <div className="relative rounded-md border border-slate-400 bg-white">
                  <Phone className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                  <Input
                    defaultValue={cliente?.phone || ""}
                    className="border-none pl-9 outline-none"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              {/* Teléfono 2 */}
              <div className="space-y-1.5">
                <Label>Teléfono Secundario</Label>
                <div className="relative rounded-md border border-slate-400 bg-white">
                  <Smartphone className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                  <Input
                    className="border-none pl-9 outline-none"
                    placeholder="Opcional"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN: Dirección */}
          <section>
            <div className="mb-4 border-b border-slate-600 pb-2">
              <h3 className="flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4" /> Dirección de Facturación
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 space-y-1.5">
                <Label>Dirección (Calle, Número, Piso)</Label>
                <Input
                  className="rounded-md border border-slate-400 bg-white outline-none"
                  placeholder="Ej. Calle Mayor 15, 2ºA"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Código Postal</Label>
                <Input
                  className="rounded-md border border-slate-400 bg-white outline-none"
                  placeholder="Ej. 28001"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Ciudad / Población</Label>
                <Input
                  className="rounded-md border border-slate-400 bg-white outline-none"
                  placeholder="Ej. Madrid"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Provincia</Label>
                <Select>
                  <SelectTrigger className="rounded-md border border-slate-400 bg-white outline-none">
                    <SelectValue placeholder="Seleccione provincia..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="valencia">Valencia</SelectItem>
                    <SelectItem value="sevilla">Sevilla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* SECCIÓN: Notas */}
          <section>
            <div className="mb-4 border-b border-slate-600 pb-2">
              <h3 className="flex items-center gap-2 font-semibold">
                <FileText className="h-4 w-4" /> Información Adicional
              </h3>
            </div>
            <div className="space-y-1.5">
              <Label>Notas / Observaciones Internas</Label>
              <Textarea
                placeholder="Añada cualquier información relevante..."
                className="h-24 resize-none rounded-md border border-slate-400 bg-white outline-none"
              />
            </div>
          </section>
        </div>

        {/* PIE DEL MODAL */}
        <DialogFooter className="flex justify-end gap-3 border-t border-slate-300 bg-slate-50 px-6 py-4">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="primary">
            <Save className="h-4 w-4" /> Guardar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
