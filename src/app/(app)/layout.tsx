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
      <main className="flex-1 pb-16">{children}</main>
      <Nav />
    </>
  );
}
