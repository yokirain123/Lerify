// components/Playlist.tsx
import { FC } from "react";

interface PlaylistProps {
  name: string;
  imageUrl: string;
  href: string;
}

const Playlist: FC<PlaylistProps> = ({ name, imageUrl, href }) => {
  return (
    <div className="bg-black text-white rounded-lg p-4">
      <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-md" />
      <h2 className="mt-4 text-xl font-bold">{name}</h2>
      <a href={href} className="text-sm text-gray-400 hover:text-white">
        View Playlist
      </a>
    </div>
  );
};

export default Playlist;
