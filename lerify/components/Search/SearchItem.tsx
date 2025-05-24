"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import LikeButton from "../UI/LikeButton";

interface SearchItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data) || "/placeholder.png";
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    if (onClick && !isLiked) {
      onClick(data.id);
    }
  };

  return (
    <div
      className="flex sm:flex-row flex-col w-full sm:max-w-[350px] h-auto sm:h-[120px] bg-bg-color rounded-2xl overflow-hidden cursor-pointer relative shadow-md hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex-shrink-0 w-full sm:w-[120px] h-[200px] sm:h-full">
        <Image
          className="object-cover h-full w-full sm:rounded-l-2xl rounded-t-2xl sm:rounded-t-none"
          src={imageUrl}
          alt={data.title || "No image available"}
          fill
          priority
        />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-dark-bg/60 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            isHovered && !isLiked ? "opacity-100" : "opacity-0"
          } ${!isLiked && "sm:rounded-l-2xl rounded-t-2xl sm:rounded-t-none"}`}
        >
          <FaPlay size={30} className="text-theme" />
        </div>
      </div>

      <div className="flex flex-col justify-center px-4 py-3 text-theme flex-grow relative">
        <p className="text-base sm:text-lg font-bold text-accent-color line-clamp-1">{data.title}</p>
        <p className="text-sm text-gray-300 truncate">{data.author}</p>

        <div className="absolute right-4 top-3 sm:top-1/2 sm:-translate-y-1/2">
          <LikeButton songId={data.id} />
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
