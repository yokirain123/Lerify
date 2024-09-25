"use client";

import { useRouter } from "next/navigation";

import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";

import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { HiSearch } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useUser } from "@/hooks/useUser";
import { IoLogOut } from "react-icons/io5";
import { BsGearFill } from "react-icons/bs";
import { MdAccountCircle, MdOutlineKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className={twMerge(`h-fit bg-black p-6`, className)}>
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
        <div className="flex items-center gap-x-1 text-lg ">
          {user ? (
            <div className="">
              <Menu>
                <MenuButton
                  className={`text-white hover:text-accent-color transition duration-300 flex flex-row items-center gap-3`}
                >
                  <MdAccountCircle className="border-accent-color border-3 rounded-full" size={50} />
                  Nickname
                  <MdOutlineKeyboardArrowDown />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className={`w-36 origin-top-right rounded-xl mt-3
                  transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0`}
                >
                  <MenuItem as="div">
                    <Button
                      onClick={() => router.push("/account")}
                      className="flex gap-3 text-lg items-center justify-center"
                    >
                      Account <MdAccountCircle size={23} />
                    </Button>
                  </MenuItem>
                  <MenuSeparator className="h-px bg-black" />
                  <MenuItem as="div">
                    <Button className="flex gap-3 text-lg items-center justify-center">
                      Options <BsGearFill size={20} />
                    </Button>
                  </MenuItem>
                  <MenuSeparator className="h-px bg-black" />
                  <MenuItem as="div">
                    <Button
                      className="flex gap-3 text-lg items-center justify-center"
                      onClick={handleLogout}
                    >
                      {" "}
                      Log out <IoLogOut size={25} />
                    </Button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <>
              <Button
                onClick={authModal.onOpen}
                className="flex items-center rounded-2xl p-2 text-white font-bold gap-2"
              >
                {" "}
                Log in
                <MdAccountCircle size={30} />
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
