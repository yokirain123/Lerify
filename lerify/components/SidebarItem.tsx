import React from "react";
import Link from "next/link";

import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex
        items-center
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        transition
        duration-300
        w-full
        hover:text-[var(--accent-color)]
        text-[var(--inactive-text)]
        `,
        active && "text-[var(--accent-color)] drop-shadow-3xl"
      )}
    >
      <Icon className="" size={40} />
    </Link>
  );
};

export default SidebarItem;
