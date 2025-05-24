"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LuMenu } from "react-icons/lu";
import { HiHome } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { TbPlaylist } from "react-icons/tb";

const Burger = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const userName = user?.user_metadata?.user_name || "Unknown User";

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    setOpen(false);
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="md:hidden text-theme z-25">
        <button onClick={() => setOpen(true)}>
          <LuMenu size={45} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-dark-bg/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-[var(--bg-color)] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 text-theme text-xl">
          <div className="flex flex-col gap-4">
            <div
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => {
                if (user) {
                  router.push("/profile");
                  setOpen(false);
                } else {
                  authModal.onOpen();
                  setOpen(false);
                }
              }}
            >
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[var(--accent-color)]"
                />
              ) : (
                <MdAccountCircle
                  className="border-accent-color border-3 rounded-full"
                  size={50}
                />
              )}
              <div className="text-2xl text-[var(--accent-color)] font-semibold">
                {userName}
              </div>
            </div>

            <hr className="border-gray-600 my-4" />

            <div className="flex flex-col gap-4">
              <button
                className="text-left flex items-center gap-3"
                onClick={() => {
                  router.push("/");
                  setOpen(false);
                }}
              >
                <HiHome size={24} /> Home
              </button>

              <button
                className="text-left flex items-center gap-3"
                onClick={() => {
                  router.push("/playlists");
                  setOpen(false);
                }}
              >
                <TbPlaylist size={24} /> Playlists
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <hr className="border-gray-600 my-4" />
            {user ? (
              <button
                className="text-left flex items-center gap-3 w-full py-2"
                onClick={handleLogout}
              >
                <IoLogOut size={24} /> Log out
              </button>
            ) : (
              <button
                className="text-left flex items-center gap-3 w-full py-2"
                onClick={() => {
                  authModal.onOpen();
                  setOpen(false);
                }}
              >
                <MdAccountCircle size={24} /> Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Burger;