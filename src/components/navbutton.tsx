"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  console.log(isActive, pathname, href);
  return (
    <Link
      href={href}
      className={`flex flex-col text-center items-center p-2 transition-all ${
        isActive
          ? "text-primary-strong"
          : "text-foreground-muted hover:text-gray-400"
      }`}
    >
      {children}
    </Link>
  );
}

export { NavButton };
