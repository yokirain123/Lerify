"use client";

import Header from "@/components/Header";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { FaPlus } from "react-icons/fa6";
import type { FC } from "react";

interface PlaylistsProps {}

const Page: FC<PlaylistsProps> = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    uploadModal.onOpen(); // Open upload modal when the user is authenticated
  };

  return (
    <div>
      <Header>
        <div className="mb-2 text-4xl text-white font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"></div>
        </div>
      </Header>
      <div className="flex">
        <div className="px-6">
          <div
            className="text-white text-xl flex gap-2 items-center cursor-pointer hover:text-accent-color"
            onClick={onClick}
          >
            Add your song
            <FaPlus className="ml-2" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
