"use client";

import useGetSongById from "@/hooks/useGetSongById";
import loadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React, { useState, useEffect } from "react";
import PlayerContent from "./PlayerContent";
import PlayerItem from "./PlayerItem";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
    setIsVisible(!!(song && songUrl));
  }, [song, songUrl]);

  if (!isVisible || !song || !songUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-20 text-white bg-[--dark-bg] border-t border-gray-800">
      {!isExpanded && (
        <div className="md:hidden flex items-center fixed bottom-0 w-full justify-between px-4 py-3 border-t border-gray-800 bg-dark-bg">
          <div
            onClick={() => setIsExpanded(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setIsExpanded(true)
            }
            className="w-full transition flex items-center justify-between cursor-pointer"
            aria-label="Expand player view"
          >
            <PlayerItem data={song} />
          </div>
        </div>
      )}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-screen" : "max-h-0"
        } md:max-h-[100px] md:overflow-visible`}
      >
        <PlayerContent
          key={song.id}
          song={song}
          songUrl={songUrl}
          isExpanded={isExpanded}
          onCollapse={() => setIsExpanded(false)}
        />
      </div>
    </div>
  );
};

export default Player;
