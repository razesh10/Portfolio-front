"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Service", href: "/service" },
  { label: "Resume", href: "/resume" },
  { label: "Project", href: "/project" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

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
        "fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2",
        "transition-all duration-300 ease-in-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-[120%] opacity-0"
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between px-3 py-2",
          "rounded-full bg-[#1a1a1a] shadow-lg",
          "transition-shadow duration-300",
          !atTop && "shadow-black/50 shadow-2xl"
        )}
      >
        {/* Left nav links */}
        <div className="flex items-center gap-1">
          {/* Active pill — Home */}
          <Link
            href="/"
            className={cn(
              "rounded-full bg-[#F97316] px-5 py-2 text-sm font-bold text-white",
              "transition-transform duration-150 hover:scale-105 hover:brightness-110 active:scale-95"
            )}
          >
            Home
          </Link>

          {NAV_LINKS.slice(0, 2).map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
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
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center",
              "rounded-full bg-[#F97316]",
              "text-sm font-black text-white tracking-tight"
            )}
          >
            R
          </span>
          <span className="text-lg font-black text-white tracking-widest">
            RAJESH
          </span>
        </Link>

        {/* Right nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.slice(2).map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium text-white/80",
        "rounded-full transition-all duration-150",
        "hover:text-white hover:bg-white/10",
        "after:absolute after:bottom-1.5 after:left-1/2 after:-translate-x-1/2",
        "after:h-[2px] after:w-0 after:rounded-full after:bg-[#F97316]",
        "after:transition-all after:duration-200",
        "hover:after:w-4"
      )}
    >
      {label}
    </Link>
  );
}