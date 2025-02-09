"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Banner Picture", href: "/dashboard/banner" },
];
export function DashboardNavbar() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={cn(link.href === pathname ? "text-black" : "text-muted-foreground hover:text-foreground ")}>
          {link.name}
        </Link>
      ))}
    </>
  );
}

