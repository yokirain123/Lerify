import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  return (
    <div className="bg-black rounded-xl h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 text-4xl text-white font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/like.png" name={"Liked"} href={"Liked"} />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-black text-2xl">Newest songs</h1>
        </div>
        <div className="text-white">
          list of song
        </div>
      </div>
    </div>
  );
}
