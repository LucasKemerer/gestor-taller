import { cn } from "@/lib/utils";

// Con esta interfaz se heredan todas las propiedades de un boton html comun
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outlined" | "danger";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  children,
  variant = "secondary",
  className,
  ...props // aca van empaquetadas todas las props de un boton comun
}: ButtonProps) {
  let properties;
  switch (variant) {
    case "primary":
      properties =
        "font-semibold bg-aw-primary text-white outline-aw-primary outline-offset-2 hover:outline-2";
      break;
    case "secondary":
      properties =
        "font-medium bg-aw-background text-aw-text-dark hover:bg-slate-200 border border-slate-400 text-slate-600";
      break;
    case "outlined":
      properties =
        "font-semibold bg-transparent border-2 border-aw-primary text-aw-primary hover:bg-aw-outlined-button-hover";
      break;
    case "danger":
      properties =
        "font-semibold bg-aw-tertiary text-white outline-aw-tertiary outline-offset-2 hover:outline-2";
      break;
  }
  const clasesBase =
    "px-3 py-2 flex gap-2 items-center justify-center rounded-lg text-md shadow-sm";
  return (
    <button {...props} className={cn(clasesBase, properties, className)}>
      {children}
    </button>
  );
}
