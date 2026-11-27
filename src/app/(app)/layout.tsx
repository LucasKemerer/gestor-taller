import { Header } from "@/components/header";
import { Nav } from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden min-h-screen pb-16">{children}</main>
      <Toaster className="text-center" position="top-center" />
      <Nav />
    </>
  );
}
