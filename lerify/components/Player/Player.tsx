"use client";

import useGetSongById from "@/hooks/useGetSongById";
import loadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React, { useState, useEffect } from "react";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (song) {
      const fetchSongUrl = async () => {
        const url = await loadSongUrl(song);
        setSongUrl(url);
      };
      fetchSongUrl();
    }
  }, [song]);

  useEffect(() => {
    if (song && songUrl) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [song, songUrl]);

  if (!song || !songUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`text-white border-t-1 border-bg-color bg-black w-full h-[100px] fixed bottom-0 transition-transform duration-500 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <PlayerContent key={song.id} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
