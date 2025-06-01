import getSongs from "@/actions/getSongs";
import Header from "@/components/UI/Header";
import React from "react";
import LocalContent from "./components/LocalContent";

export const revalidate = 0;

async function localSongs() {
  
  const songs = await getSongs()

  return (
    <div className="">
      <Header>
        <div className="mb-2 text-4xl text-theme font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">Локальні пісні</div>
        </div>
      </Header>
      
      <LocalContent songs={songs}/>
    </div>
  );
}

export default localSongs;
