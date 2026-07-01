"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
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
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          "flex items-center justify-between px-3 py-3",
          "rounded-full bg-[#1a1a1a]/80 shadow-lg",
          "transition-shadow duration-300",
          !atTop && "shadow-black/50 shadow-2xl"
        )}
      >
        {/* Left nav links */}
        <div className="flex items-center gap-1">
          {/* Active pill — Home */}
          

          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} isActive={isActive(link.href)} />
          ))}
        </div>

        {/* Center logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-2",
            "transition-opacity duration-150 hover:opacity-80"
          )}
          aria-label="JCREA Home"
        >
          {/* Logo mark */}
          <Image src="/images/logo.svg" alt="JCREA" width={100} height={100} className="h-9 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-1">
          {/* Active pill — Home */}
          

            <ThemeToggle />
            <div className="h-5 w-px bg-white/10" />
            <NavLink href={"/contact"} label={"Resume"} isActive={isActive("/contact")} />
            <Button className="rounded-full group/button" size={"lg"}>
              Let's Talk
              <ArrowRightIcon className="w-5 h-5 ml-2 -rotate-45 group-hover/button:rotate-0 transition-transform duration-300" />
            </Button>
        </div>

        
      </nav>
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