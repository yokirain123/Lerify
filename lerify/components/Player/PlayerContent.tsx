import React, { useEffect, useRef, useState, useCallback } from "react";
import { Song } from "@/types";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const Icon = isPlaying ? FaPause : FaPlay;

  const [play, { pause, stop, sound }] = useSound(songUrl, {
    volume: volume / 100,
    format: ["mp3"],
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
  });

  // Auto-play when songUrl changes
  useEffect(() => {
    if (sound) {
      sound.play();
      setCurrentTime(0);
    }

    return () => {
      stop(); // Stop the previous sound when component unmounts or song changes
    };
  }, [songUrl, sound, stop]);

  // Update volume
  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
    if (sound) {
      sound.volume(volume / 100);
    }
  }, [volume, sound]);

  const handlePlay = useCallback(() => {
    if (!sound) return;
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play, sound]);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (sound) {
      sound.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      if (sound && isPlaying) {
        const time = sound.seek() as number;
        setCurrentTime(time);
        setDuration(sound.duration() || 0);
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, sound]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && event.ctrlKey && !event.metaKey) {
        event.preventDefault();
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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full h-full items-center px-4">
      <div className="flex w-full">
        <PlayerItem data={song} />
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="flex items-center gap-3 justify-center">
          <IoPlaySkipBack
            onClick={onPlayPrevious}
            size={25}
            className="cursor-pointer hover:text-accent-color duration-300"
          />
          <div
            onClick={handlePlay}
            className="cursor-pointer text-black hover:bg-accent-color rounded-full bg-white p-3 duration-300"
          >
            <Icon size={20} className={isPlaying ? "pl-0" : "pl-[2px]"} />
          </div>
          <IoPlaySkipForward
            onClick={onPlayNext}
            size={25}
            className="cursor-pointer hover:text-accent-color duration-300"
          />
        </div>

        <div className="w-full mt-2">
          <div className="flex items-center gap-5 justify-between text-sm text-white">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full cursor-pointer rounded-full hover:bg-accent-color appearance-none h-[4px] transition-all duration-300 accent-white"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pr-6">
        <VolumeControl volume={volume} setVolume={setVolume} />
      </div>
    </div>
  );
};

export default PlayerContent;
