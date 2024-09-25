"use client";

import { useRouter } from "next/navigation";

import React from "react";
import { HiSearch } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { MdAccountCircle } from "react-icons/md";


interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className}) => {
  const authModal = useAuthModal();
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
        <div className="hidden md:flex gap-[3px] items-center">
          <button
            onClick={() => router.back()}
            className="rounded-l-lg bg-[var(--bg-color)] flex items-center justify-center"
          >
            <RxCaretLeft
              className="text-white hover:text-[var(--accent-color)] transition duration-300"
              size={40}
            />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-r-lg bg-[var(--bg-color)] flex items-center justify-center"
          >
            <RxCaretRight
              className="text-white hover:text-[var(--accent-color)] transition duration-300"
              size={40}
            />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button>
            <HiHome
              size={60}
              className="rounded-full p-2  flex items-center justify-center text-white hover:text-[var(--accent-color)] transition duration-300 bg-[var(--bg-color)]"
            />
          </button>
          <button>
            <HiSearch
              size={60}
              className="rounded-full p-2 flex items-center justify-center text-white hover:text-[var(--accent-color)] transition duration-300 bg-[var(--bg-color)]"
            />
          </button>
        </div>
        <div className="flex items-center gap-x-1 text-lg">
          <div>
            <Button onClick={authModal.onOpen} className="flex items-center rounded-2xl p-2 text-white font-bold gap-2"> Log in
            <MdAccountCircle size={30} />
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
