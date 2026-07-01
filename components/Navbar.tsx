"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowRightIcon, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setAtTop(currentY < 10);

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 backdrop-blur-sm",
        "transition-all duration-300 ease-in-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-[-120%] opacity-0"
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between px-3 py-2 md:py-3",
          "rounded-full bg-[#1a1a1a]/80 shadow-lg",
          "transition-shadow duration-300",
          !atTop && "shadow-black/50 shadow-2xl"
        )}
      >
        {/* Left nav links — desktop only */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} isActive={isActive(link.href)} />
          ))}
        </div>

        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-2",
            "transition-opacity duration-150 hover:opacity-80"
          )}
          aria-label="JCREA Home"
        >
          <Image src="/images/logo.svg" alt="Rajesh" width={100} height={100} className="h-7 md:h-9 w-auto object-contain" />
        </Link>

        {/* Right side — desktop */}
        <div className="hidden md:flex items-center gap-1">
          <ThemeToggle />
          <div className="h-5 w-px bg-white/10" />
          <NavLink href={"/contact"} label={"Resume"} isActive={isActive("/contact")} />
          <Button className="rounded-full group/button" size={"lg"}>
            Let's Talk
            <ArrowRightIcon className="w-5 h-5 ml-2 -rotate-45 group-hover/button:rotate-0 transition-transform duration-300" />
          </Button>
        </div>

        {/* Right side — mobile */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-full",
              "text-white/80 hover:text-white hover:bg-white/10",
              "transition-colors duration-150"
            )}
          >
            <AnimatePresence initial={false} mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "mt-2 flex flex-col gap-1 rounded-3xl bg-[#1a1a1a]/95 p-3 shadow-2xl shadow-black/50",
              "md:hidden"
            )}
          >
            {NAV_LINKS.map((link) => (
              <MobileNavLink key={link.href} href={link.href} label={link.label} isActive={isActive(link.href)} />
            ))}
            <MobileNavLink href="/contact" label="Resume" isActive={isActive("/contact")} />

            <div className="my-1 h-px w-full bg-white/10" />

            <Button className="rounded-full group/button w-full" size={"lg"}>
              Let's Talk
              <ArrowRightIcon className="w-5 h-5 ml-2 -rotate-45 group-hover/button:rotate-0 transition-transform duration-300" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium text-white/80",
        "rounded-full transition-all duration-150",
        "hover:text-white hover:bg-white/10",
        "after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2",
        "after:h-[2px] after:w-0 after:rounded-full after:bg-primary",
        "after:transition-all after:duration-200",
        "hover:after:w-6",
        isActive && "text-white after:w-6 after:bg-primary"
      )}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "w-full rounded-2xl px-4 py-3 text-base font-medium text-white/80",
        "transition-colors duration-150",
        "hover:text-white hover:bg-white/10",
        isActive && "text-white bg-white/10"
      )}
    >
      {label}
    </Link>
  );
}