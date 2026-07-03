import type { Metadata } from "next";
import "./globals.css";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

export const metadata: Metadata = {
  title: "AutoWorks",
  description: "Sistema de gestión para taller",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="flex h-screen">
        <SideBar />

        {/* Contenedor principal de la derecha */}
        <div className="bg-aw-background flex flex-1 flex-col overflow-hidden">
          <TopBar />

          {/* Acá se inyecta tu page.tsx (La tabla de clientes) */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
