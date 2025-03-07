"use client";

import Header from "@/components/Header";
import LikedContent from "@/components/LikedContent";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

function Liked() {
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLikedSongs = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*, songs(*)") // Fetch liked_songs along with song details
        .eq("user_id", user.id);

      if (!error && data) {
        setSongs(data.map((item) => item.songs));
      }
      setLoading(false);
    };

    fetchLikedSongs();
  }, [supabaseClient, user]);

  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col sm:flex-row items-center gap-5 px-4 sm:px-10 my-5">
        <div className="relative w-40 h-40">
          <Image
            src="/images/like.png"
            alt="Liked Songs"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col text-center sm:text-left">
          <p className="font-semibold text-inactive-text">Playlist</p>
          <h1 className="mb-2 text-4xl sm:text-5xl text-white font-black">
            Liked Songs
          </h1>
        </div>
      </div>
      <div className="px-10">
        <div className="w-full backdrop-blur-xl rounded-2xl h-screen p-3">
          <div className="flex flex-col">
            {loading ? (
              <p className="text-white text-center">Loading...</p>
            ) : (
              <LikedContent songs={songs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Liked;
