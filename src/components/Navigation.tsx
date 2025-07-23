"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/our-services" },
  { name: "Our Customers", href: "/customers" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For non-home pages, always use white background
  const navbarBg = scrolled
    ? "bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm"
    : "bg-transparent";

  const textColor = scrolled ? "text-primary-800" : "text-white";
  const buttonStyle = scrolled
    ? "bg-accent-500 text-white hover:bg-accent-600"
    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm";

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
      maxWidth="xl"
      height="80px">
      <NavbarContent className="flex-shrink-0">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`sm:hidden mr-2 ${textColor}`}
        />
        <NavbarBrand className="flex-shrink-0 max-w-none">
          <Link
            as={NextLink}
            href="/"
            className={`flex items-center gap-2 font-light transition-colors duration-300 ${textColor}`}>
            <Image
              src="/image/logo/40028.png"
              alt="Mekong Border Run Logo"
              width={32}
              height={32}
              className="object-contain flex-shrink-0"
            />
            <span className="hidden xs:inline text-xl sm:text-2xl">
              Mekong{" "}
              <span className="text-accent-500 font-extralight">
                Border Run
              </span>
            </span>
            <span className="xs:hidden text-lg">Mekong</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-12" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              as={NextLink}
              href={item.href}
              className={`font-light text-lg transition-all duration-300 ${
                pathname === item.href
                  ? "text-accent-500 border-b-2 border-accent-500"
                  : scrolled
                  ? "text-primary-700 hover:text-accent-600"
                  : "text-white hover:text-accent-300"
              }`}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="flex-shrink-0">
        <NavbarItem className="hidden xs:flex">
          <Button
            as="a"
            href="tel:+66951029528"
            className={`font-light rounded-full px-4 sm:px-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 text-base sm:text-base ${buttonStyle}`}>
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </Button>
        </NavbarItem>
        <NavbarItem className="xs:hidden">
          <Button
            as="a"
            href="tel:+66951029528"
            className={`font-light rounded-full px-3 border-0 shadow-md hover:shadow-lg transition-all duration-300 text-base ${buttonStyle}`}
            size="sm">
            Call
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white/95 backdrop-blur-md">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              as={NextLink}
              href={item.href}
              className={`w-full text-lg font-light py-3 ${
                pathname === item.href ? "text-accent-600" : "text-primary-700"
              }`}
              size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
