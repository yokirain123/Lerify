"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React, { useState, useEffect } from "react";
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForward,
} from "react-icons/io5";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (song && songUrl && player.activeId) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [song, songUrl, player.activeId]);

  return (
    <div
      className={`text-white bg-black w-full h-[100px] fixed bottom-0 transition-transform duration-500 
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
    >
      {song && songUrl && (
        <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
      )}
    </div>
  );
};

export default Player;
