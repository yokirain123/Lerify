"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";

import { HiHome } from "react-icons/hi2";
import { HiSearch } from "react-icons/hi";
import { TbPlaylist } from "react-icons/tb";
import Logo from "../Logo";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      { icon: HiHome, 
        label: "Home", 
        active: pathname === "/", 
        href: "/" 
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
    <div className="flex h-full md:pl-4">
      <div className=" hidden md:flex flex-col w-[100px] items-center px-2 py-3 text-[var(--accent-color)] flex-shrink-0 gap-32">
      <Logo />
        <div className="flex flex-col bg-bg-color rounded-xl gap-y-6 px-5 py-[100px]">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
