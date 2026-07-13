import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import MainContainer from "@/components/MainContainer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AutoWorks",
  description: "Sistema de gestión para taller",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={cn("font-sans", inter.variable)}>
      <body className="flex h-screen">
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}
