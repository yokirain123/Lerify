// components/SearchContent.tsx
"use client";

import { Song } from "@/types";
import SearchItem from "./SearchItem";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs); // This hook can be used for managing playback logic

  if (songs.length === 0) {
    return <div className="text-white">No song found</div>;
  }

  return (
    <div className="flex gap-8 justify-center">
      {songs.map((song) => (
        <div key={song.id}>
          <SearchItem onClick={(id: string) => onPlay(id)} data={song} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
