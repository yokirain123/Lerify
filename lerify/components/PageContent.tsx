"use client";

import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import SongItem from "./SongItem";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs); // ✅ Pass songs as required by the hook

  if (songs.length === 0) {
    return (
      <div className="text-white">
        no songs womp womp
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-10 justify-items-center">
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={() => onPlay(item.id)} // ✅ Now onPlay works correctly
          data={item}
        />
      ))}
    </div>
  );
};

export default PageContent;
