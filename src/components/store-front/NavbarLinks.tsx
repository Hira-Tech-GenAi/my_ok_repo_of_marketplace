"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/products/all" },
  { id: 2, name: "Men", href: "/products/men" },
  { id: 3, name: "Women", href: "/products/women" },
  { id: 4, name: "Kids", href: "/products/kids" },
];

const NavbarLinks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Desktop Links */}
      <div className="hidden md:flex justify-center items-center gap-x-6 ml-8">
        {navbarLinks.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className={cn(
              location === item.href
                ? "bg-muted text-primary font-semibold"
                : "hover:bg-muted hover:bg-opacity-75",
              "group p-2 font-medium rounded-md"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-600 focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            isMenuOpen ? "translate-x-0" : "-translate-x-full",
            "fixed top-0 left-0 w-64 h-screen bg-white shadow-md transition-transform duration-300 ease-in-out z-50"
          )}
        >
          <div className="flex flex-col items-start p-6 space-y-4">
            {navbarLinks.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
                className={cn(
                  location === item.href
                    ? "bg-muted text-primary font-semibold"
                    : "hover:bg-muted hover:bg-opacity-75",
                  "block p-2 font-medium rounded-md w-full"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarLinks;
