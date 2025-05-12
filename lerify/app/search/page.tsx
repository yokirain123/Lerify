import getSongsByQuery from "@/actions/getSongsByQuery";
import Header from "@/components/UI/Header";
import SearchContent from "@/components/Search/SearchContent";
import { Metadata } from "next";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = typeof searchParams?.query === "string" ? searchParams.query : "";
  const songs = await getSongsByQuery(query);

  return {
    title: query ? `${query} - Search Results` : "Search",
    openGraph: {
      title: query ? `${query} - Search Results` : "Search",
      description: query ? `Search results for ${query}` : "Browse music by searching keywords.",
      images: query ? ["/search-query-image.jpg"] : ["/default-search-image.jpg"],
    },
  };
}

const Search = async ({ searchParams }: Props) => {
  const query = typeof searchParams?.query === "string" ? searchParams.query : "";
  const songs = await getSongsByQuery(query);

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
          <p className="text-white text-xl font-bold">What’s on your mind now?</p>
        )}
      </div>
    </div>
  );
};

export default Search;
