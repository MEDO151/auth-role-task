"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

// Hamburger icon
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    aria-label="Menu"
    className={cn(
      "pointer-events-none",
      className
    )}
    fill="none"
    height={18}
    role="img"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={18}
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      className="
        origin-center
        translate-y-[-7px]
        transition-all
        duration-300
        group-aria-expanded:translate-y-0
        group-aria-expanded:rotate-315
      "
      d="M4 12L20 12"
    />

    <path
      className="
        origin-center
        transition-all
        duration-300
        group-aria-expanded:rotate-45
      "
      d="M4 12H20"
    />

    <path
      className="
        origin-center
        translate-y-[7px]
        transition-all
        duration-300
        group-aria-expanded:translate-y-0
        group-aria-expanded:rotate-135
      "
      d="M4 12H20"
    />
  </svg>
);

export interface NavbarNavLink {
  href: string;
  label: string;
}

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement> {
  navigationLinks?: NavbarNavLink[];
}

export const Navbar =
  React.forwardRef<
    HTMLElement,
    NavbarProps
  >(
    (
      {
        className,
        navigationLinks,
        ...props
      },
      ref
    ) => {
      const t = useTranslations("Navbar");
      const defaultLinks: NavbarNavLink[] = [
        { href: "#", label: t("Startseite") },
        { href: "#services", label: t("Dienstleistungen") },
        { href: "#about", label: t("Über uns") },
        { href: "#blogs", label: t("Blogs") },
        { href: "#contact", label: t("Kontakt") },
      ];
      
      const activeLinks = navigationLinks || defaultLinks;

      const [
        isMobile,
        setIsMobile,
      ] = useState(false);

      const containerRef =
        useRef<HTMLElement>(
          null
        );

      useEffect(() => {
        const checkWidth =
          () => {
            if (
              containerRef.current
            ) {
              const width =
                containerRef.current
                  .offsetWidth;

              setIsMobile(
                width < 1024
              );
            }
          };

        checkWidth();

        const resizeObserver =
          new ResizeObserver(
            checkWidth
          );

        if (
          containerRef.current
        ) {
          resizeObserver.observe(
            containerRef.current
          );
        }

        return () => {
          resizeObserver.disconnect();
        };
      }, []);

      const combinedRef =
        React.useCallback(
          (
            node:
              | HTMLElement
              | null
          ) => {
            containerRef.current =
              node;

            if (
              typeof ref ===
              "function"
            ) {
              ref(node);
            } else if (
              ref
            ) {
              ref.current =
                node;
            }
          },
          [ref]
        );

      return (
        <header
          className={cn(`fixed top-0 z-50 w-full bg-white px-4 md:px-8 lg:px-[135px]`,className)}
          ref={combinedRef}
          {...(props as any)}
        >
          <div className="flex w-full items-center justify-between py-6">
            {/* Logo */}
            <div className="shrink-0">
              <a href="#">
                <Image
                  src="/nav/main_icon.png"
                  alt="logo"
                  width={133}
                  height={40}
                  priority
                  className="object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList className="flex gap-15 truncate">
                  {activeLinks.map(
                    (
                      link,
                      index
                    ) => (
                      <NavigationMenuItem
                        key={index}
                      >
                        <a href={link.href} className={cn(`inline-flex items-center justify-center transition-all duration-200`,index === 0? "font-bold text-[#161A1E]": "text-[#161A1E] hover:text-black")}>
                          {link.label}
                        </a>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* Mobile Menu */}
            {isMobile && (
              <div className="ms-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="group h-10 w-10 cursor-pointer" size="icon" variant="ghost">
                      <img
                        src="/nav/hamburger_icon.png"
                        alt="hamburger icon"
                      />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent align="end" className="w-64 rounded-2xl border border-slate-200 p-2">
                    <NavigationMenu className="max-w-none">
                      <NavigationMenuList className="flex-col items-start gap-1">
                        {activeLinks.map(
                          (
                            link,
                            index
                          ) => (
                            <NavigationMenuItem className="w-full" key={index}>
                              <a href={link.href} className={cn(`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition`,index === 0? "bg-slate-100 font-semibold text-slate-900": "text-slate-600 hover:bg-slate-100")}>
                                {link.label}
                              </a>
                            </NavigationMenuItem>
                          )
                        )}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </header>
      );
    }
  );

Navbar.displayName =
  "Navbar";

export default Navbar;