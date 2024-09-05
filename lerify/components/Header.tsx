"use client";

import { useRouter } from "next/navigation";

import React from "react";
import { RxCaretLeft } from "react-icons/rx";

import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = (children, className) => {
  const router = useRouter();

  const handleLogout = () => {};

  return (
    <div
      className={twMerge(
        `
                h-fit bg-gradient-to-b from-[var(--accent-color)] p-6
                `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
            <button className="rounded-full bg-[var(--bg-color)] flex items-center justify-center">
                <RxCaretLeft className="text-white hover:text-[var(--accent-color)] transition duration-300" size={30}/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
