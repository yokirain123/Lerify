"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import LikeButton from "../LikeButton";

interface SearchItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data) || "/placeholder.png"; // Fallback if URL is null
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <div
      className="flex w-[350px] h-[120px] bg-bg-color rounded-2xl overflow-hidden cursor-pointer relative shadow-md hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative flex-shrink-0 w-[120px] h-full">
        <Image
          className="rounded-l-2xl object-cover h-full w-full"
          src={imageUrl}
          alt={data.title || "No image available"}
          fill
          priority
        />
        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm rounded-l-2xl transition-all duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <FaPlay size={30} className="text-white" />
        </div>
      </div>
      
      {/* Song Details */}
      <div className="flex flex-col justify-center px-4 py-2 text-white flex-grow relative">
        <p className="text-lg font-bold text-accent-color text-clip">{data.title}</p>
        <p className="text-sm text-gray-300 truncate">{data.author}</p>
        
        {/* Like Button Positioned to the Right */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <LikeButton songId={data.id} />
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
