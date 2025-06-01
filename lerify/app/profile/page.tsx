"use client";

import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import Header from "@/components/UI/Header";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

const Profile = () => {
  const { user } = useUser();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const userName = user?.user_metadata?.user_name || "Unknown User";

  useEffect(() => {
    const fetchLikedSongs = async () => {
      setLoading(true);
      const supabase = createClientComponentClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const { data, error } = await supabase
        .from("liked_songs")
        .select("*, songs(*)")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch liked songs:", error.message);
      }

      if (data) {
        setLikedSongs(data.map((item) => item.songs));
      }

      setLoading(false);
    };

    if (user) {
      fetchLikedSongs();
    }
  }, [user]);

  const onPlay = useOnPlay(likedSongs);


  return (
    <div>
      <Header>
        <div className="mb-2 text-5xl text-theme font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            Профіль
          </div>
        </div>
      </Header>

<div className="px-6">
      <div className="px-10 text-theme text-4xl flex flex-col gap-6 bg-bg-color p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full object-cover"
            />
          ) : (
            <MdAccountCircle
              className="border-accent-color border-3 rounded-full"
              size={80}
              style={{ fontSize: "120px" }}
            />
          )}
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <span className="text-4xl sm:text-7xl text-accent-color font-bold">
              {userName}
            </span>
            <div className="text-lg sm:text-xl">
              Вподобаних пісень: {loading ? "Loading..." : likedSongs.length}
            </div>
          </div>
        </div>
      </div>
      {!loading && likedSongs.length > 0 && (
        <div className="mt-6 pb-[150px] justify-items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {likedSongs.map((song) => (
              <SongItem
                key={song.id}
                onClick={() => onPlay(song.id)}
                data={song}
              />
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;
