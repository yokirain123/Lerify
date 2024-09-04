"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { HiHome } from "react-icons/hi2";
import { HiSearch } from "react-icons/hi";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: HiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div>
      <div className="flex h-screen">
        <div className="hidden md:flex flex-col gap-y-2 w-[320px] h-full bg-black p-2 text-[var(--accent-color)]">
          <Box>
            <div className="flex flex-col gap-y-4 px-5 py-4">
                {routes.map((item) => (<SidebarItem key={item.label}
                {...item}
                ></SidebarItem>) )}
            </div>
          </Box>
          <Box className="overflow-y-auto h-full">
            <Library/>
          </Box>
        </div>
        <main className="h-full flex-1 overflow-y-auto py-2">
            {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
