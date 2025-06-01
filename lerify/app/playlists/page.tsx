"use client";

import Header from "@/components/UI/Header";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { FaPlus } from "react-icons/fa6";
import { useMemo, type FC } from "react";
import ListItem from "@/components/ListItem";
import { usePathname } from "next/navigation";

interface PlaylistsProps {}

const Page: FC<PlaylistsProps> = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    uploadModal.onOpen();
  };

  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: "",
        label: "",
        active: pathname === "./local-songs/",
        href: "/playlists/local-songs",
      },
    ],
    [pathname]
  );

  return (
    <div>
      <Header>
        <div className="mb-2 text-5xl text-theme font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            Плейлисти
          </div>
        </div>
      </Header>
      <div className="flex">
        <div className="px-6">
          <div
            className="text-theme text-xl border-bg-color hover:bg-[var(--bg-color)] transition-all duration-300 border-2 p-5 rounded-xl flex gap-2 items-center cursor-pointer uppercase hover:text-accent-color"
            onClick={onClick}
          >
            Завантажити свою пісню
            <FaPlus className="ml-2" size={20} />
          </div>
        </div>
      </div>
      <div className="mt-4 px-6 text-4xl">
        {routes.map((item, index) => (
          <div key={`route-${index}`} className="flex gap-5">
            <ListItem
              key={`liked-${index}`}
              {...item}
              image="/images/like.png"
              name={"Вподобані"}
              href={"liked"}
            />
            <ListItem
              key={`local-${index}`}
              {...item}
              image="/images/local.png"
              name={"Локальні пісні"}
              href={item.href}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
