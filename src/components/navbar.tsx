"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import * as React from "react";

import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./shared/ui/button";

const navItems = [
  { href: "/#/about", label: "About" },
  { href: "#", label: "Docs" },
  { href: "#", label: <FaXTwitter size="1.5em" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 justify-between">
          <a href="/" className="flex space-x-2 pl-4 items-center">
            <img
              src="/coophive-logo-greyscale.png"
              alt="CoopHive Logo"
              className="h-8"
            />
            <span className="font-bold">CoopHive</span>
          </a>
          <nav className="hidden md:flex space-x-6 text-sm font-medium max-w-[20%]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
