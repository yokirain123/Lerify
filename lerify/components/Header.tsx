"use client";

import { useRouter } from "next/navigation";

import React from "react";
import { HiSearch } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className}) => {
  const router = useRouter();

  const handleLogout = () => {};

  return (
    <div
      className={twMerge(
        `h-fit bg-black p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-[var(--bg-color)] flex items-center justify-center"
          >
            <RxCaretLeft
              className="text-white hover:text-[var(--accent-color)] transition duration-300"
              size={30}
            />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-[var(--bg-color)] flex items-center justify-center"
          >
            <RxCaretRight
              className="text-white hover:text-[var(--accent-color)] transition duration-300"
              size={30}
            />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button>
            <HiHome
              size={30}
              className="rounded-full p-2  flex items-center justify-center text-white hover:text-[var(--accent-color)] transition duration-300 bg-[var(--bg-color)]"
            />
          </button>
          <button>
            <HiSearch
              size={30}
              className="rounded-full p-2 flex items-center justify-center text-white hover:text-[var(--accent-color)] transition duration-300 bg-[var(--bg-color)]"
            />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <div>
            <Button onClick={() => {}} className="flex items-center gap-x-2 p-1"></Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
