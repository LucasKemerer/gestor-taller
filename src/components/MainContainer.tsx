"use client";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useState } from "react";

export default function MainContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [menuExpandido, setMenuExpandido] = useState(true);

  return (
    <>
      <aside
        className={`bg-aw-secondary h-full p-4 transition-all ${menuExpandido ? "w-60" : "w-20"}`}
      >
        <SideBar
          menuExpandido={menuExpandido}
          toggleMenu={() => setMenuExpandido(!menuExpandido)}
        />
      </aside>

      {/* Contenedor principal de la derecha */}
      <div className="bg-aw-background flex flex-1 flex-col overflow-hidden">
        <TopBar />

        {/* Acá se inyecta tu page.tsx (La tabla de clientes) */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </>
  );
}
