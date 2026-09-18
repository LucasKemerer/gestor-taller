import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Gestor de Taller",
  description: "Sistema de gestion para taller",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={cn("antialiased", "font-sans", inter.variable)}>
      <body className="min-h-full bg-background">{children}</body>
    </html>
  );
}
