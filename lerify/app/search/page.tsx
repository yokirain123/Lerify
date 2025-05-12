import getSongsByQuery from "@/actions/getSongsByQuery";
import Header from "@/components/UI/Header";
import SearchContent from "@/components/Search/SearchContent";

interface SearchProps {
  searchParams: {
    query: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByQuery(searchParams.query);
  const query = searchParams?.query ?? '';
  
  return (
    <div className="bg-black rounded-xl h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 text-5xl text-white font-black py-4">
          <h1 className="text-5xl text-white font-black pt-4">Search</h1>
        </div>
      </Header>

      <div className="p-6 flex flex-col gap-6 pb-[120px]">
      {query ? (
        <SearchContent songs={songs} />
      ) : (
        <p className="text-white">Type something to search for songs.</p>
      )}
      </div>
    </div>
  );
};

export default Search;
