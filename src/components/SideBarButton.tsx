"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarButton({
  children,
  ruta,
}: {
  children: React.ReactNode;
  ruta: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === ruta;
  return (
    <Link
      href={ruta}
      className={`font-lg mb-2 flex w-full items-center gap-4 rounded-lg p-3 text-left font-medium transition-all transition-colors ${
        isActive
          ? "bg-aw-primary text-white"
          : "text-aw-text hover:bg-slate-700"
      }`}
    >
      {children}
    </Link>
  );
}
