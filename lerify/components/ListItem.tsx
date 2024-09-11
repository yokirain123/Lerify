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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group flex items-center justify-around rounded-md overflow-hidden gap-x-4 pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px] h-[128px] w-[128px]">
        {" "}
        {/* Explicit size is important */}
        <Image className="object-cover" fill src={image} alt="Liked" />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 
            ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-100"
            } transition-all duration-300 ease-in-out`}
        >
          <FaPlay size={30} className="text-white text-2xl" />
        </div>
      </div>
      <p>{name}</p>
    </button>
  );
};

export default ListItem;
