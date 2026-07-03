export default function Button({
  children,
  variant,
  className,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "outlined" | "danger";
  className?: string;
}) {
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
  properties = properties + " " + "py-3 px-4 rounded-lg text-md shadow-sm";
  return <button className={properties + " " + className}>{children}</button>;
}
