"use client";

import { useEffect, useState } from "react";
import { useSpotify } from "@/providers/SpotifyProvider";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

const usePlaylists = () => {
  const { fetchSpotifyData, accessToken } = useSpotify();
  const [playlists, setPlaylists] = useState<Playlist[]>([]); // ✅ Default to empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const data = await fetchSpotifyData("me/playlists");
        if (data?.items) {
          setPlaylists(data.items);
        } else {
          setPlaylists([]); // ✅ Ensure it never stays undefined
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setPlaylists([]); // ✅ Handle errors gracefully
      }
      setLoading(false);
    };

    fetchPlaylists();
  }, [accessToken]);

  return { playlists, loading };
};

export default usePlaylists;
