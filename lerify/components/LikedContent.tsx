"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MediaItem from "./MediaItem";
import { Song } from "@/types";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return <div className="text-white text-center mt-10">No liked songs yet.</div>;
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {songs.map((song) => (
        <MediaItem key={song.id} onClick={() => {}} data={song} />
      ))}
    </div>
  );
};

export default LikedContent;
