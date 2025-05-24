import { useState } from "react";

export default function VolumeSlider() {
  const [volume, setVolume] = useState(50); // 0 - 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-[150px]">
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={handleChange}
        className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-transparent"
        style={{
          background: `linear-gradient(to right, #4ade80 0%, #4ade80 ${volume}%, #374151 ${volume}%, #374151 100%)`,
        }}
      />
    </div>
  );
}
