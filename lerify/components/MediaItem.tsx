import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import LikeButton from "./UI/LikeButton";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data) || "/placeholder.png";
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <div
      className="flex w-full min-w-0 items-center h-[100px] bg-bg-color rounded-2xl overflow-hidden cursor-pointer relative shadow-md hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex-[0_0_100px] h-full">
        <Image
          className="rounded-l-2xl object-cover h-full w-full"
          src={imageUrl}
          alt={data.title || "No image available"}
          fill
          priority
        />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-dark-bg/60 backdrop-blur-sm rounded-l-2xl transition-all duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <FaPlay size={30} className="text-white" />
        </div>
      </div>
      
      <div className="flex flex-col justify-center px-4 py-2 text-theme flex-grow min-w-0">
        <p className="text-lg font-bold text-accent-color truncate">
          {data.title}
        </p>
        <p className="text-sm text-theme truncate">{data.author}</p>
      </div>

      <div className="pr-4 flex items-center">
        <LikeButton songId={data.id} />
      </div>
    </div>
  );
};

export default MediaItem;
