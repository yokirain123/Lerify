"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const onClick = () => {
    router.push(href);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group flex items-center w-full max-w-[350px] justify-start rounded-3xl py-2 overflow-hidden gap-x-4 p-4 border-4 border-[var(--bg-color)] bg-dark-bg transition"
    >
      <div className="relative h-[96px] w-[96px] md:h-[128px] md:w-[128px] min-w-[64px]">
        <Image className="object-cover rounded-2xl" fill src={image} alt="Image" />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-dark-bg bg-opacity-50
            ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-100"}
            transition-all duration-300 ease-in-out rounded-2xl`}
        >
          <FaPlay size={24} className="text-theme" />
        </div>
      </div>
      <p className="text-[var(--accent-color)] font-bold text-base sm:text-lg md:text-2xl truncate">
        {name}
      </p>
    </button>
  );
};

export default ListItem;
