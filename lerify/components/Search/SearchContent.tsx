"use client";

import { Song } from "@/types";
import SearchItem from "./SearchItem";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="text-white text-center mt-10">No song found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 md:px-10">
      {songs.map((song) => (
        <div key={song.id}>
          <SearchItem onClick={(id: string) => onPlay(id)} data={song} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
