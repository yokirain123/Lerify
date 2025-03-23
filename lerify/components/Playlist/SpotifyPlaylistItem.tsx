"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";

interface SpotifyPlaylistItemProps {
  image: string;
  name: string;
  href: string;
}

const SpotifyPlaylistItem: React.FC<SpotifyPlaylistItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => router.push(href)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group flex items-center sm:w-[350px] justify-around rounded-3xl py-2 overflow-hidden gap-x-4 pr-4 border-4 border-[var(--bg-color)] transition-all duration-300 hover:border-[var(--accent-color)]"
    >
      <div className="relative min-h-[64px] sm:w-[128px] sm:h-[128px] min-w-[64px]">
        <Image className="object-cover rounded-lg" fill src={image} alt={name} />
        <div className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 
            ${isHovered ? "opacity-100 scale-110" : "opacity-0 scale-90"} transition-all duration-300 ease-in-out`}>
          <FaPlay size={30} className="text-white text-2xl" />
        </div>
      </div>
      <p className="text-[var(--accent-color)] font-bold text-[24px]">{name}</p>
    </button>
  );
};

export default SpotifyPlaylistItem;
