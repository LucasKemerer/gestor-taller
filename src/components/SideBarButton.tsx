"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarButton({
  label,
  ruta,
}: {
  label: string;
  ruta: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === ruta;
  return (
    <Link
      href={ruta}
      className={`font-lg mb-2 block w-full rounded-lg p-4 text-left font-medium transition-colors ${
        isActive
          ? "bg-aw-primary text-white"
          : "text-aw-text hover:bg-slate-700"
      }`}
    >
      {label}
    </Link>
  );
}
