"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { ClienteForm } from "./customer-form"; // ajustá el import al nombre real de tu archivo
import type { ClienteCreado } from "@/types/customer";

interface ClienteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (cliente: ClienteCreado) => void;
}

export function ClienteFormDialog({ open, onOpenChange, onCreated }: ClienteFormDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Alta de cliente"
      description="Nombre y teléfono de contacto."
    >
      <ClienteForm
        onSuccess={(cliente) => {
          onCreated(cliente);
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}