import { Plus, Trash2, SquarePen } from "lucide-react";
import Button from "@/components/Button";

export default function BarraABM({
  title,
  registroSeleccionado,
  onNuevoClick,
  onModificarClick,
  onEliminarClick,
}: {
  title: string;
  registroSeleccionado: unknown | null;
  onNuevoClick: () => void;
  onModificarClick: () => void;
  onEliminarClick: () => void;
}) {
  return (
    <div className="flex justify-between py-4">
      <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
      <div className="flex gap-3">
        <div className={`gap-3 ${registroSeleccionado ? "flex" : "hidden"}`}>
          <Button
            onClick={onEliminarClick}
            className="h-12 w-30"
            variant="danger"
          >
            <Trash2 /> Eliminar
          </Button>
          <Button
            className="h-12 w-30"
            onClick={onModificarClick}
            variant="outlined"
          >
            <SquarePen /> Editar
          </Button>
        </div>

        <Button className="h-12 w-30" onClick={onNuevoClick} variant="primary">
          <Plus /> Nuevo
        </Button>
      </div>
    </div>
  );
}
