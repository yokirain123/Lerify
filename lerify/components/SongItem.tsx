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
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      onClick={() => onClick(data.id)}
      className="flex relative group flex-col w-[240px] items-center justify-center rounded-2xl overflow-hidden bg-bg-color cursor-pointer text-white p-4 gap-x-6"
    >
      <div className="relative aspect-square w-full h-full overflow-hidden rounded-2xl" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
        <Image
          className="object-cover"
          src={imagePath || "Image cannot be loaded"}
          fill
          alt="Song Cover"
        />
         <div
          className={`absolute inset-0 flex justify-center items-center bg-black/45  bg-opacity-75 backdrop-blur-sm
            ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-100"
            } transition-all duration-300 ease-in-out`}
        >
          <FaPlay size={30} className="text-white text-2xl" />
        </div>
      </div>
      <div className="flex flex-col py-3">
        <p className="text-center text-xl text-accent-color font-bold">{data.title}</p>
        <p className="text-center">{data.author}</p>
      </div>
    </div>
  );
};

export default SongItem;
