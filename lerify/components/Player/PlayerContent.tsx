"use client";

import { Song } from "@/types";
import React, { useEffect, useState, useCallback } from "react";
import PlayerItem from "./PlayerItem";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPause, FaPlay } from "react-icons/fa";
import VolumeControl from "./VolumeControl";
import useSound from "use-sound";
import usePlayer from "@/hooks/usePlayer";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(
    Number(localStorage.getItem("volume")) || 50
  );

  const Icon = isPlaying ? FaPause : FaPlay;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume / 100,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.volume(volume / 100);
    }
  }, [volume, sound]);

  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  const onPlayNext = useCallback(() => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1] ?? player.ids[0];
    player.setId(nextSong);
  }, [player]);

  const onPlayPrevious = useCallback(() => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong =
      player.ids[currentIndex - 1] ?? player.ids[player.ids.length - 1];
    player.setId(previousSong);
  }, [player]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && !event.ctrlKey && !event.metaKey) {
        event.preventDefault(); // Prevent page scrolling
        handlePlay();
      }
      if (event.ctrlKey && event.key === "ArrowRight") {
        onPlayNext();
      }
      if (event.ctrlKey && event.key === "ArrowLeft") {
        onPlayPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlay, onPlayNext, onPlayPrevious]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full h-full items-center">
      <div className="flex w-full">
        <div className="SongInfo">
          <PlayerItem data={song} />
        </div>
      </div>
      <div className="Play flex items-center gap-3 justify-center">
        <IoPlaySkipBack
          onClick={onPlayPrevious}
          size={25}
          className="cursor-pointer hover:text-accent-color"
        />
        <div
          onClick={handlePlay}
          className="cursor-pointer text-black hover:bg-accent-color rounded-full bg-white p-3"
        >
          <Icon size={20} className={isPlaying ? "pl-0" : "pl-[2px]"} />
        </div>
        <IoPlaySkipForward
          onClick={onPlayNext}
          size={25}
          className="cursor-pointer hover:text-accent-color"
        />
      </div>

      <div className="flex justify-end pr-6">
        <VolumeControl volume={volume} setVolume={setVolume} />
      </div>
    </div>
  );
};

export default PlayerContent;
