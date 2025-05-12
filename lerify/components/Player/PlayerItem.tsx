import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import LikeButton from "../UI/LikeButton";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data) || "/placeholder.png"; // Fallback if URL is null

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <div
      className="flex w-full items-center h-[100px] cursor-pointer relative shadow-md hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative flex-[0_0_100px] h-full">
        <Image
          className="object-cover h-full w-full"
          src={imageUrl}
          alt={data.title || "No image available"}
          fill
          priority
        />
      </div>

      {/* Song Details */}
      <div className="flex flex-col justify-center px-4 py-2 text-white">
        <p className="font-bold text-accent-color truncate whitespace-nowrap">
          {data.title}
        </p>
        <p className="text-sm text-gray-300 truncate">{data.author}</p>
      </div>

      {/* Like Button Positioned to the Right */}
      <div className=" flex items-center">
        <LikeButton songId={data.id} />
      </div>
    </div>
  );
};

export default MediaItem;
