import { Song } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa6";

interface SongItemProps {
  data: Song;
  onClick?: () => void; // Simplified to no parameters
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className="flex relative flex-col w-[240px] items-center rounded-2xl overflow-hidden bg-bg-color cursor-pointer text-white p-4 gap-x-6"
    >
      <div
        className="relative h-[200px] aspect-square w-full overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className="object-cover"
          src={data.imageUrl}
          fill
          alt="Song Cover"
        />
        {isHovered && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/45 bg-opacity-75 backdrop-blur-sm transition-all duration-300 ease-in-out">
            <FaPlay size={30} className="text-white text-2xl" />
          </div>
        )}
      </div>
      <div className="flex flex-col py-3 w-full">
        <p className="text-center text-xl truncate text-accent-color font-bold">
          {data.title}
        </p>
        <p className="text-center truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default SongItem;