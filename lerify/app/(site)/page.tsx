import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";
import { fetchTopSpotifyTracks } from "@/actions/getSongsSpotify";
import TestSession from "@/components/TestSession";

export const revalidate = 0;

export default async function Home() {
  const songs = await fetchTopSpotifyTracks();

  return (
    <div className="bg-black rounded-xl h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 text-5xl text-white font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            Home
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ListItem image="/images/like.png" name="Liked" href="liked" />
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between flex-col">
          <h1 className="text-white font-black text-3xl mb-6">Popular songs</h1>
          <div className="w-full">
            <PageContent songs={songs} />
            <TestSession/>
          </div>
        </div>
      </div>
    </div>
  );
}
