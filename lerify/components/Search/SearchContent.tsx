"use client";

import { Song } from "@/types";
import MediaItem from "../MediaItem";
import SongItem from "../SongItem";
import LikeButton from "../LikeButton";
import SearchItem from "./SearchItem";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return <div className="text-white">No song found</div>;
  }

  return (
    <div className="flex gap-8 justify-center">
      {songs.map((song) => (
        <>
          <div key={song.id} className="">
            <SearchItem onClick={() => {}} data={song} />
          </div>
        </>
      ))}
    </div>
  );
};

export default SearchContent;
