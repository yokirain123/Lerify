"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa6";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="flex relative flex-col w-full max-w-[240px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] items-center rounded-2xl overflow-hidden bg-bg-color cursor-pointer text-white p-3 sm:p-4 gap-x-4"
    >
      <div
        className="relative w-full aspect-square overflow-hidden rounded-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className="object-cover"
          src={imagePath || "/placeholder.png"}
          fill
          alt="Song Cover"
        />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-black/45 backdrop-blur-sm transition-all duration-300 ease-in-out
            ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <FaPlay size={30} className="text-white" />
        </div>
      </div>

      <div className="flex flex-col py-2 w-full">
        <p className="text-center text-base sm:text-lg md:text-xl truncate text-accent-color font-bold">
          {data.title}
        </p>
        <p className="text-center text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default SongItem;
