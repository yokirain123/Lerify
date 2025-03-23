"use client";

import React from "react";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import { useSpotify } from "@/providers/SpotifyProvider";
import usePlaylists from "@/hooks/usePlaylists";
import { FaPlus } from "react-icons/fa6";

const Page = () => {
  const { loginWithSpotify, accessToken } = useSpotify();
  const { playlists, loading } = usePlaylists();

  return (
    <div>
      <Header>
        <div className="mb-2 text-4xl text-white font-black py-4">Playlists</div>
      </Header>
      <div className="flex px-6">
        {!accessToken ? (
          <button className="text-white text-xl cursor-pointer" onClick={loginWithSpotify}>
            Login with Spotify
          </button>
        ) : (
          <div className="text-white text-xl flex gap-2 items-center cursor-pointer">
            Add your song <FaPlus className="ml-2" size={20} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-4 px-6">
        {loading ? (
          <p className="text-white">Loading playlists...</p>
        ) : (
          playlists.map((playlist) => (
            <ListItem
              key={playlist.id}
              image={playlist.images?.[0]?.url || "/images/default-playlist.png"}
              name={playlist.name}
              href={`/playlists/${playlist.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
