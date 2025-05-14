import React, { useEffect, useRef, useState, useCallback } from "react";
import { Song } from "@/types";
import PlayerItem from "./PlayerItem";
import MobilePlayerItem from "./MobilePlayerItem";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiShuffleFill } from "react-icons/pi";
import VolumeControl from "./VolumeControl";
import useSound from "use-sound";
import usePlayer from "@/hooks/usePlayer";
import { LuRepeat1, LuRepeat } from "react-icons/lu";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  isExpanded: boolean;
  onCollapse: () => void;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
  isExpanded,
  onCollapse,
}) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(
    Number(localStorage.getItem("volume")) || 100
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffling, setIsShuffling] = useState(() => {
    return localStorage.getItem("isShuffling") === "true";
  });

  type RepeatMode = "off" | "all" | "one";
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(() => {
    return (localStorage.getItem("repeatMode") as RepeatMode) || "off";
  });

  const Icon = isPlaying ? FaPause : FaPlay;

  const [play, { pause, stop, sound }] = useSound(songUrl, {
    volume: volume / 100,
    format: ["mp3"],
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      if (repeatMode === "one") {
        sound?.stop();
        sound?.play();
      } else {
        onPlayNext();
      }
    },
  });

  useEffect(() => {
    localStorage.setItem("isShuffling", String(isShuffling));
  }, [isShuffling]);

  useEffect(() => {
    localStorage.setItem("repeatMode", repeatMode);
  }, [repeatMode]);

  useEffect(() => {
    if (sound) {
      sound.play();
      setCurrentTime(0);
    }
    return () => {
      stop();
    };
  }, [songUrl, sound, stop]);

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
    if (sound) {
      sound.volume(volume / 100);
    }
  }, [volume, sound]);

  const handlePlay = useCallback(() => {
    if (!sound) return;
    isPlaying ? pause() : play();
  }, [isPlaying, pause, play, sound]);

  const onPlayNext = useCallback(() => {
    if (player.ids.length === 0) return;
    if (isShuffling) {
      const randomIndex = Math.floor(Math.random() * player.ids.length);
      player.setId(player.ids[randomIndex]);
    } else {
      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      const nextSong = player.ids[currentIndex + 1] ?? player.ids[0];
      player.setId(nextSong);
    }
  }, [player, isShuffling]);

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

  const handleRepeatToggle = () => {
    setRepeatMode((prev) =>
      prev === "off" ? "all" : prev === "all" ? "one" : "off"
    );
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        handlePlay();
      }
      if (event.ctrlKey && event.key === "ArrowRight") onPlayNext();
      if (event.ctrlKey && event.key === "ArrowLeft") onPlayPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePlay, onPlayNext, onPlayPrevious]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {isExpanded && (
        <div className="md:hidden w-full">
          <MobilePlayerItem
            data={song}
            isExpanded={true}
            onCollapse={onCollapse}
          />
        </div>
      )}

      {isExpanded && (
        <div className="md:hidden w-full flex flex-col items-center justify-center gap-4 px-4 mt-4">
          <div className="flex items-center justify-center gap-6">
            <PiShuffleFill
              onClick={() => setIsShuffling(!isShuffling)}
              size={22}
              className={`cursor-pointer hover:text-accent-color transition ${
                isShuffling ? "text-accent-color" : "text-white"
              }`}
            />
            <IoPlaySkipBack
              onClick={onPlayPrevious}
              size={26}
              className="cursor-pointer hover:text-accent-color text-white transition"
            />
            <div
              onClick={handlePlay}
              className="cursor-pointer text-black bg-white hover:bg-accent-color rounded-full p-3 transition"
            >
              <Icon size={24} className={isPlaying ? "pl-0" : "pl-[2px]"} />
            </div>
            <IoPlaySkipForward
              onClick={onPlayNext}
              size={26}
              className="cursor-pointer hover:text-accent-color text-white transition"
            />
            <button
              onClick={handleRepeatToggle}
              className="text-white hover:text-accent-color transition"
            >
              {repeatMode === "off" && <LuRepeat />}
              {repeatMode === "all" && (
                <LuRepeat className="text-accent-color" />
              )}
              {repeatMode === "one" && (
                <LuRepeat1 className="text-accent-color" />
              )}
            </button>
          </div>

          <div className="w-full px-1">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 mt-1 cursor-pointer rounded-full appearance-none bg-gray-700 accent-accent-color"
              style={{
                background: `linear-gradient(to right, hsl(217.21925133689842, 91.21951219512198%, 59.80392156862745%) ${
                  (currentTime / duration) * 100
                }%, #4b5563 ${(currentTime / duration) * 100}%)`,
              }}
            />
          </div>
        </div>
      )}

      <div className="md:opacity-100 opacity-0 grid grid-cols-2 md:grid-cols-3 w-full h-full items-center">
        <div className="flex w-full">
          <PlayerItem data={song} />
        </div>

        <div className="hidden md:flex flex-col items-center w-full">
          <div className="flex items-center gap-3 justify-center">
            <PiShuffleFill
              onClick={() => setIsShuffling(!isShuffling)}
              size={20}
              className={`cursor-pointer hover:text-accent-color duration-300 ${
                isShuffling ? "text-accent-color" : ""
              }`}
            />
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
            <button
              onClick={handleRepeatToggle}
              className="text-white hover:text-accent-color transition"
            >
              {repeatMode === "off" && <LuRepeat />}
              {repeatMode === "all" && (
                <LuRepeat className="text-accent-color" />
              )}
              {repeatMode === "one" && (
                <LuRepeat1 className="text-accent-color" />
              )}
            </button>
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
                className="w-full cursor-pointer rounded-full appearance-none h-[4px] transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    (currentTime / duration) * 100
                  }%, #4b5563 ${
                    (currentTime / duration) * 100
                  }%, #4b5563 100%)`,
                }}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pr-6">
          <div className="md:hidden">
            <div
              onClick={handlePlay}
              className="cursor-pointer text-black hover:bg-accent-color rounded-full bg-white p-3 duration-300"
            >
              <Icon size={20} className={isPlaying ? "pl-0" : "pl-[2px]"} />
            </div>
          </div>
          <div className="hidden md:flex">
            <VolumeControl volume={volume} setVolume={setVolume} />
          </div>
        </div>
      </div>
    </>
    
  );
};

export default PlayerContent;
