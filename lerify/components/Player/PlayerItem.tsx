import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React from "react";
import Image from "next/image";
import LikeButton from "../UI/LikeButton";

interface PlayerItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data) || "/placeholder.png";

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <div
      className="flex w-full justify-between items-center h-[100px] cursor-pointer relative shadow-md hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      <div className="relative flex-[0_0_100px] h-full">
        <Image
          className="object-cover h-full w-full"
          src={imageUrl}
          alt={data.title || "No image available"}
          fill
          priority
        />
      </div>
      <div className="flex flex-1 items-center gap-3 px-4">
        <div className="flex flex-col justify-center px-4 py-2 text-theme">
          <p className="font-bold text-accent-color truncate whitespace-nowrap">
            {data.title}
          </p>
          <p className="text-sm text-gray-300 truncate">{data.author}</p>
        </div>

        <div className=" flex items-center">
          <LikeButton songId={data.id} />
        </div>
      </div>
    </div>
  );
};

export default PlayerItem;
