"use client";

import useGetSongById from "@/hooks/useGetSongById";
import loadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React, { useState, useEffect } from "react";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const [songUrl, setSongUrl] = useState<string | null>(null); // Initialize songUrl state as null
  const [isVisible, setIsVisible] = useState(false);

  // Load the song URL when the song changes
  useEffect(() => {
    if (song) {
      const fetchSongUrl = async () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const url = await loadSongUrl(song);
        setSongUrl(url); // Set the URL once it's fetched
      };
      fetchSongUrl(); // Fetch URL whenever song is available
    }
  }, [song]); // Depend on `song` to refetch URL when it changes

  useEffect(() => {
    // Show the player only if song and songUrl are both available
    if (song && songUrl) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [song, songUrl]);

  if (!song || !songUrl) {
    return <div>Loading...</div>; // Show loading state while song or URL is not available
  }

  return (
    <div
      className={`text-white bg-black w-full h-[100px] fixed bottom-0 transition-transform duration-500 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <PlayerContent key={song.id} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
