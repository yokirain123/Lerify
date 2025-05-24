"use client";

import React from "react";
import {
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute,
} from "react-icons/io5";

interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume }) => {
  const getVolumeIcon = () => {
    if (volume === 0) return IoVolumeMute;
    if (volume < 30) return IoVolumeLow;
    if (volume < 70) return IoVolumeMedium;
    return IoVolumeHigh;
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    localStorage.setItem("volume", String(newVolume));
  };

  const toggleMute = () => {
    if (volume === 0) {
      const prevVolume = Number(localStorage.getItem("prevVolume")) || 100;
      setVolume(prevVolume);
    } else {
      localStorage.setItem("prevVolume", String(volume));
      setVolume(0);
    }
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className="flex items-center gap-2">
      <VolumeIcon
        size={25}
        className="cursor-pointer text-white hover:text-accent-color transition"
        onClick={toggleMute}
      />

      <input
        type="range"
        min={0}
        max={100}
        step="1"
        value={volume}
        onChange={handleVolumeChange}
        className="w-[100px] cursor-pointer rounded-full appearance-none h-[4px] transition-all duration-300"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`,
        }}
      />
    </div>
  );
};

export default VolumeControl;
