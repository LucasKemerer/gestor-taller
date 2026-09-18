import { Header } from "@/components/header";
import { Nav } from "@/components/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden min-h-screen pb-16">{children}</main>
      <Nav />
    </>
  );
}
