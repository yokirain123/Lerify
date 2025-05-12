"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { HiHome } from "react-icons/hi2";
import { HiSearch } from "react-icons/hi";


import SidebarItem from "./SidebarItem";
import { TbPlaylist } from "react-icons/tb";
import Box from "../Box";
import Logo from "../Logo";

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
        active: pathname === "/",
        href: "/",
      },
      {
        icon: HiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
      {
        icon: TbPlaylist,
        label: "Playlists",
        active: pathname === "/playlists",
        href: "/playlists",
      },
    ],
    [pathname]
  );
  

  return (
    <div>
      <div className="flex h-full px-4">
        <Logo/>
        <div className="hidden md:flex flex-col justify-center gap-y-2 w-[100px] h-screen bg-black p-2 text-[var(--accent-color)]">
          <Box className="flex">
            <div className="flex flex-col justify-center gap-y-6 px-5 py-4 h-[700px]">
              {routes.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
        </div>

        <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
