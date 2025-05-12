"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";

import { twMerge } from "tailwind-merge";

import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { HiSearch } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useUser } from "@/hooks/useUser";
import { IoLogOut } from "react-icons/io5";
import { MdAccountCircle, MdOutlineKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";
import Logo from "./Logo";
import SearchInput from "../Search/SearchInput";
import Button from "./Button";
import Image from "next/image";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const userName = user?.user_metadata?.user_name || "Unknown User";

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  return (
    <div className={twMerge(`h-fit bg-black py-3 pl-6`, className)}>
      <div className="w-full flex items-center justify-between relative">
        <div className="hidden md:flex gap-[2px] items-center">
          <button
            onClick={() => router.back()}
            className="rounded-l-lg bg-[var(--bg-color)] flex items-center justify-center py-4"
          >
            <RxCaretLeft
              className="text-white hover:text-[var(--accent-color)] transition duration-300"
              size={40}
            />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-r-lg bg-[var(--bg-color)] flex items-center justify-center py-4"
          >
            <RxCaretRight
              className="text-white hover:text-[var(--accent-color)] transition duration-300"
              size={40}
            />
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block w-full ">
          <SearchInput />
        </div>

        {/* Mobile Nav Buttons */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button>
            <HiHome
              size={60}
              className="rounded-full p-2 text-white hover:text-[var(--accent-color)] transition duration-300 bg-[var(--bg-color)]"
            />
          </button>
          <button onClick={toggleMobileSearch}>
            <HiSearch
              size={60}
              className="rounded-full p-2 text-white hover:text-[var(--accent-color)] transition duration-300 bg-[var(--bg-color)]"
            />
          </button>
        </div>

        {/* User Menu / Login Button */}
        <div className="flex items-center gap-x-1 text-lg">
          {user ? (
            <div className="bg-bg-color p-3 rounded-xl w-[210px]">
              <Menu>
                <MenuButton className="text-white hover:text-[var(--accent-color)] transition duration-300 flex items-center gap-3 justify-between">
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--accent-color)]"
                    />
                  ) : (
                    <MdAccountCircle
                      className="border-accent-color border-3 rounded-full"
                      size={50}
                    />
                  )}
                  {userName}
                  <MdOutlineKeyboardArrowDown size={30} />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-44 origin-top-right rounded-xl mt-4 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem as="div">
                    <Button
                      onClick={() => router.push("/profile")}
                      className="flex gap-3 text-lg items-center justify-center"
                    >
                      Profile <MdAccountCircle size={25} />
                    </Button>
                  </MenuItem>
                  <MenuSeparator className="h-px bg-black" />
                  <MenuItem as="div">
                    <Button
                      className="flex gap-3 text-lg items-center justify-center"
                      onClick={handleLogout}
                    >
                      Log out <IoLogOut size={25} />
                    </Button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <Button
              onClick={authModal.onOpen}
              className="flex items-center rounded-2xl px-4 text-white font-bold gap-2 py-8 text-2xl"
            >
              Log in
              <MdAccountCircle size={30} />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search Input Dropdown */}
      {showMobileSearch && (
        <div className="md:hidden px-4 py-2 mt-2 bg-black z-10">
          <SearchInput />
        </div>
      )}

      {children}
    </div>
  );
};

export default Header;
