import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  
  return (
    <div className="bg-black rounded-xl h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 text-5xl text-white font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            Home
          </div>
        </div>
        <ListItem image="/images/like.png" name={"Liked"} href={"liked"} />
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between flex-col">
          <h1 className="text-white font-black text-3xl mb-6">Newest songs</h1>
          <div className="w-full">
            <PageContent songs={songs} />
          </div>
        </div>
      </div>
    </div>
  );
}

