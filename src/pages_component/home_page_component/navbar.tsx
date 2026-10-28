"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/micro-components/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2da872] flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
            <span className="text-black text-lg font-bold">T</span>
          </div>
          <span className="text-foreground text-xl font-semibold tracking-tight">
            Taxora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          >
            <Link href="/signin">Sign in</Link>
          </Button>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-semibold"
          >
            <Link href="/signup">Start Free</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-muted-foreground hover:text-foreground transition-colors text-base font-medium py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-border/30 flex flex-col gap-3">
            <Button asChild variant="outline" className="w-full justify-center">
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button asChild className="w-full justify-center bg-primary text-primary-foreground">
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
