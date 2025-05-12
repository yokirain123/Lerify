import { Metadata } from "next";
import getSongsByQuery from "@/actions/getSongsByQuery";
import Header from "@/components/UI/Header";
import SearchContent from "@/components/Search/SearchContent";

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined> | undefined>;
};

// `generateMetadata` function remains mostly the same, no need for Promise handling
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams; // Resolve the promise
  const query = typeof resolvedSearchParams?.query === "string" ? resolvedSearchParams.query : "";
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

// `Search` function expects searchParams as an object and works asynchronously with them
const Search = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams; // Resolve the promise
  const query = typeof resolvedSearchParams?.query === "string" ? resolvedSearchParams.query : "";
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
