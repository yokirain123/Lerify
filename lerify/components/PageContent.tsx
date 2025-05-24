"use client";

import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import SongItem from "./SongItem";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  if (songs.length === 0) {
    return <div className="text-theme">No songs, womp womp</div>;
  }

  return (
    <div className="relative group z-0 overflow-visible">
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-bg-color border-2 border-accent-color text-theme hover:border-[#3b82f6] p-4 rounded-xl transition opacity-0 group-hover:opacity-100"
      >
        <FaArrowLeft />
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-bg-color border-2 border-accent-color text-theme hover:border-[#3b82f6] p-4 rounded-xl transition opacity-0 group-hover:opacity-100"
      >
        <FaArrowRight />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        onSwiper={setSwiperInstance}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 7,
          },
          1536: {
            slidesPerView: 8,
          },
          1920: {
            slidesPerView: 9, 
          },
        }}
      >
        {songs.map((item) => (
          <SwiperSlide key={item.id}>
            <SongItem onClick={() => onPlay(item.id)} data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PageContent;
