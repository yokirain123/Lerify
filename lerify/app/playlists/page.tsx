import Header from "@/components/Header";
import type { FC } from "react";

interface PlaylistsProps {}

const page: FC<PlaylistsProps> = ({}) => {
  return (
    <div className="">
      <Header>
        <div className="mb-2 text-4xl text-white font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"></div>
        </div>
      </Header>
      <div>playlists</div>
    </div>
  );
};
export default page;
