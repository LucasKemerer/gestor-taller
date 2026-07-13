"use client";

import { Customer } from "@/data/mockCustomers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface EliminarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Customer | null;
}

export default function EliminarDialog({
  open,
  onOpenChange,
  cliente,
}: EliminarDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            ¿Estás completamente seguro?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-base text-slate-600">
            Estás a punto de eliminar al cliente{" "}
            <span className="font-bold text-slate-900">
              {cliente?.name || "seleccionado"}
            </span>
            . Esta acción no se puede deshacer y los datos se perderán para
            siempre.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 font-semibold text-white hover:bg-red-700"
            onClick={() => {
              // Acá en el futuro vas a poner la lógica para borrar de la base de datos
              console.log("Eliminando a:", cliente?.id);
            }}
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
