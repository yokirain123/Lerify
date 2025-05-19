import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React from "react";
import Image from "next/image";
import LikeButton from "../UI/LikeButton";
import { IoChevronDown } from "react-icons/io5";

interface MobilePlayerItemProps {
  data: Song;
  onClick?: (id: string) => void;
  isExpanded: boolean;
  onCollapse?: () => void;
}

const MobilePlayerItem: React.FC<MobilePlayerItemProps> = ({
  data,
  onClick,
  isExpanded,
  onCollapse,
}) => {
  const imageUrl = useLoadImage(data) || "/placeholder.png";

  const handleClick = () => {
    if (!isExpanded && onClick) {
      onClick(data.id);
    } else if (onCollapse) {
      onCollapse();
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden text-white transition-all duration-500 ease-in-out ${
        isExpanded ? "h-[85vh] p-4" : "h-[100px] px-2 py-1"
      }`}
      onClick={handleClick}
    >
      <Image
        src={imageUrl}
        alt="Background"
        fill
        className="object-cover blur-md scale-110 z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 h-full w-full">
        {isExpanded && (
          <div className="flex justify-start items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCollapse && onCollapse();
              }}
              className="text-white text-xl hover:text-accent-color transition"
            >
              <IoChevronDown size={45} />
            </button>
          </div>
        )}

        <div
          className={`flex items-center transition-all duration-500 ${
            isExpanded ? "flex-col justify-center h-full" : "flex-row"
          }`}
        >
          <div
            className={`relative overflow-hidden ${
              isExpanded
                ? "w-3/4 aspect-square shadow-sm shadow-accent-color"
                : "flex-[0_0_80px] h-[80px]"
            } rounded-2xl`}
          >
            <Image
              className="object-cover"
              src={imageUrl}
              alt={data.title || "No image available"}
              fill
              priority
            />
          </div>

          <div
            className={`text-center ${
              isExpanded ? "mt-6" : "flex-1 ml-2 text-left"
            }`}
          >
            <p className="font-bold truncate text-accent-color text-3xl">
              {data.title}
            </p>
            <p className="text-xl text-gray-300 truncate">{data.author}</p>
          </div>

          {!isExpanded && (
            <div className="ml-auto">
              <LikeButton songId={data.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default MobilePlayerItem;
